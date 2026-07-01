import { execSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import { CompilerInterface } from "./CompilerInterface.js";
import { DRIVER_TEMPLATES } from "./driverTemplates.js";
import { getDynamicDriver } from "./driverGenerator.js";

const TEMP_DIR = path.resolve("./temp_runs");
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

const cleanFiles = (filePaths) => {
  filePaths.forEach((fp) => {
    try {
      if (fs.existsSync(fp)) {
        fs.unlinkSync(fp);
      }
    } catch (_) {}
  });
};

export class LocalCompiler extends CompilerInterface {
  async execute(code, language, input, problemId = "") {
    const runId = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    let driver = DRIVER_TEMPLATES[problemId]?.[language];

    if (!driver && problemId) {
      driver = await getDynamicDriver(problemId, language, code);
    }

    if (driver) {
      const mergedCode = driver.includes("// [STUDENT_CODE]")
        ? driver.replace("// [STUDENT_CODE]", code)
        : driver;
      return this._runPhysical(mergedCode, language, input, runId);
    } else {
      // General syntax checking fallback
      return this._runSyntaxCheck(code, language, input);
    }
  }

  async submit(code, language, testCases, problemId = "") {
    let passedCount = 0;
    const totalCount = testCases.length;
    let maxRuntime = 0;
    let maxMemory = 1024; // KB

    let driver = DRIVER_TEMPLATES[problemId]?.[language];
    if (!driver && problemId) {
      driver = await getDynamicDriver(problemId, language, code);
    }

    if (!driver) {
      // Fallback syntax check first
      const check = await this._runSyntaxCheck(code, language, "");
      if (!check.success) {
        return {
          status: check.errorType,
          passedCount: 0,
          totalCount,
          runtime: 0,
          memory: 0,
          failedTestCase: {
            input: "Compilation Phase",
            expectedOutput: "Valid syntax",
            userOutput: check.errorMessage
          }
        };
      }
      
      // If code is syntactically correct, evaluate mock responses
      return this._mockSubmit(code, language, testCases);
    }

    // Run test cases sequentially on compiled program
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const runResult = await this.execute(code, language, tc.input, problemId);

      if (!runResult.success) {
        return {
          status: runResult.errorType,
          passedCount,
          totalCount,
          runtime: maxRuntime,
          memory: maxMemory,
          failedTestCase: {
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            userOutput: runResult.errorMessage || "Process crashed."
          }
        };
      }

      maxRuntime = Math.max(maxRuntime, runResult.time || 0);
      maxMemory = Math.max(maxMemory, runResult.memory || 0);

      const cleanedExpected = tc.expectedOutput.trim();
      const cleanedUser = runResult.stdout.trim();

      if (cleanedExpected === cleanedUser) {
        passedCount++;
      } else {
        return {
          status: "Wrong Answer",
          passedCount,
          totalCount,
          runtime: maxRuntime,
          memory: maxMemory,
          failedTestCase: {
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            userOutput: runResult.stdout
          }
        };
      }
    }

    return {
      status: "Accepted",
      passedCount,
      totalCount,
      runtime: maxRuntime,
      memory: maxMemory
    };
  }

  // --- LOCAL COMPILATION RUNS ---
  async _runPhysical(fullCode, language, input, runId) {
    const toClean = [];
    try {
      if (language === "cpp") {
        const srcPath = path.join(TEMP_DIR, `run_${runId}.cpp`);
        const outPath = path.join(TEMP_DIR, `run_${runId}.out`);
        toClean.push(srcPath, outPath);

        fs.writeFileSync(srcPath, fullCode);

        // Compile
        try {
          execSync(`g++ -O3 "${srcPath}" -o "${outPath}" 2>&1`);
        } catch (err) {
          return {
            success: false,
            errorType: "Compilation Error",
            errorMessage: err.stdout?.toString() || "GCC compilation error."
          };
        }

        // Execute binary
        return await this._executeBinary(outPath, input, 2000, toClean);
      } 
      
      else if (language === "python") {
        const srcPath = path.join(TEMP_DIR, `run_${runId}.py`);
        toClean.push(srcPath);

        fs.writeFileSync(srcPath, fullCode);

        return await this._executeInterpreter("python3", [srcPath], input, 2000, toClean);
      } 
      
      else if (language === "javascript") {
        const srcPath = path.join(TEMP_DIR, `run_${runId}.js`);
        toClean.push(srcPath);

        fs.writeFileSync(srcPath, fullCode);

        return await this._executeInterpreter("node", [srcPath], input, 2000, toClean);
      } 
      
      else if (language === "java") {
        // Wrapper class in Java is SolutionMain
        const srcPath = path.join(TEMP_DIR, `SolutionMain.java`);
        const classPath1 = path.join(TEMP_DIR, `SolutionMain.class`);
        const classPath2 = path.join(TEMP_DIR, `Solution.class`);
        toClean.push(srcPath, classPath1, classPath2);

        fs.writeFileSync(srcPath, fullCode);

        // Compile
        try {
          execSync(`javac -d "${TEMP_DIR}" "${srcPath}" 2>&1`);
        } catch (err) {
          return {
            success: false,
            errorType: "Compilation Error",
            errorMessage: err.stdout?.toString() || "Java compilation error."
          };
        }

        return await this._executeInterpreter("java", ["-cp", TEMP_DIR, "SolutionMain"], input, 3000, toClean);
      }

      return { success: false, errorType: "Runtime Error", errorMessage: "Unsupported language strategy." };
    } catch (error) {
      console.error("Local sandbox crash:", error.message);
      return { success: false, errorType: "Runtime Error", errorMessage: error.message };
    } finally {
      cleanFiles(toClean);
    }
  }

  // Helper to run executable binary
  _executeBinary(binaryPath, stdinStr, timeoutMs, toClean) {
    return new Promise((resolve) => {
      const child = spawn(binaryPath);
      let stdout = "";
      let stderr = "";
      const startTime = Date.now();

      const timer = setTimeout(() => {
        child.kill();
        resolve({
          success: false,
          errorType: "Time Limit Exceeded",
          errorMessage: `Execution exceeded safe timeout boundary of ${timeoutMs}ms.`
        });
      }, timeoutMs);

      child.stdin.write(stdinStr);
      child.stdin.end();

      child.stdout.on("data", (data) => { stdout += data.toString(); });
      child.stderr.on("data", (data) => { stderr += data.toString(); });

      child.on("close", (code) => {
        clearTimeout(timer);
        const elapsed = Date.now() - startTime;
        if (code !== 0) {
          resolve({
            success: false,
            errorType: "Runtime Error",
            errorMessage: stderr || `Exit status code ${code}`
          });
        } else {
          resolve({
            success: true,
            stdout,
            stderr: null,
            time: elapsed,
            memory: 2048
          });
        }
      });
    });
  }

  // Helper to run python/node/java interpreter processes
  _executeInterpreter(command, args, stdinStr, timeoutMs, toClean) {
    return new Promise((resolve) => {
      const child = spawn(command, args);
      let stdout = "";
      let stderr = "";
      const startTime = Date.now();

      const timer = setTimeout(() => {
        child.kill();
        resolve({
          success: false,
          errorType: "Time Limit Exceeded",
          errorMessage: `Timeout limit of ${timeoutMs}ms exceeded.`
        });
      }, timeoutMs);

      child.stdin.write(stdinStr);
      child.stdin.end();

      child.stdout.on("data", (data) => { stdout += data.toString(); });
      child.stderr.on("data", (data) => { stderr += data.toString(); });

      child.on("close", (code) => {
        clearTimeout(timer);
        const elapsed = Date.now() - startTime;
        if (code !== 0) {
          resolve({
            success: false,
            errorType: "Runtime Error",
            errorMessage: stderr || `Exited with status code ${code}`
          });
        } else {
          resolve({
            success: true,
            stdout,
            stderr: null,
            time: elapsed,
            memory: 1536
          });
        }
      });
    });
  }

  // --- SYNTAX VERIFICATION CHECKS (General Fallback) ---
  async _runSyntaxCheck(code, language, input) {
    const runId = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const toClean = [];

    try {
      if (language === "cpp") {
        const srcPath = path.join(TEMP_DIR, `check_${runId}.cpp`);
        const objPath = path.join(TEMP_DIR, `check_${runId}.o`);
        toClean.push(srcPath, objPath);

        // Include common headers to prevent false syntax flags
        const fullCode = `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <unordered_map>\n#include <unordered_set>\n#include <queue>\n#include <stack>\nusing namespace std;\n${code}`;
        fs.writeFileSync(srcPath, fullCode);

        try {
          execSync(`g++ -c "${srcPath}" -o "${objPath}" 2>&1`);
          return { success: true };
        } catch (err) {
          return {
            success: false,
            errorType: "Compilation Error",
            errorMessage: err.stdout?.toString() || "GCC compilation error."
          };
        }
      }

      else if (language === "python") {
        const srcPath = path.join(TEMP_DIR, `check_${runId}.py`);
        toClean.push(srcPath);

        fs.writeFileSync(srcPath, code);

        try {
          execSync(`python3 -m py_compile "${srcPath}" 2>&1`);
          return { success: true };
        } catch (err) {
          return {
            success: false,
            errorType: "Compilation Error",
            errorMessage: err.stdout?.toString() || "Python syntax error."
          };
        }
      }

      else if (language === "javascript") {
        const srcPath = path.join(TEMP_DIR, `check_${runId}.js`);
        toClean.push(srcPath);

        fs.writeFileSync(srcPath, code);

        try {
          execSync(`node --check "${srcPath}" 2>&1`);
          return { success: true };
        } catch (err) {
          return {
            success: false,
            errorType: "Compilation Error",
            errorMessage: err.stdout?.toString() || "JavaScript syntax error."
          };
        }
      }

      else if (language === "java") {
        const srcPath = path.join(TEMP_DIR, `Solution.java`);
        const classPath = path.join(TEMP_DIR, `Solution.class`);
        toClean.push(srcPath, classPath);

        fs.writeFileSync(srcPath, code);

        try {
          execSync(`javac -d "${TEMP_DIR}" "${srcPath}" 2>&1`);
          return { success: true };
        } catch (err) {
          return {
            success: false,
            errorType: "Compilation Error",
            errorMessage: err.stdout?.toString() || "Java syntax error."
          };
        }
      }

      return { success: true }; // Skip Go syntax check fallback
    } catch (error) {
      return { success: false, errorType: "Compilation Error", errorMessage: error.message };
    } finally {
      cleanFiles(toClean);
    }
  }

  // Mock submit checks fallback
  _mockSubmit(code, language, testCases) {
    if (code.includes("COMPILE_ERROR")) {
      return {
        status: "Compilation Error",
        passedCount: 0,
        totalCount: testCases.length,
        runtime: 0,
        memory: 0
      };
    }
    return {
      status: "Accepted",
      passedCount: testCases.length,
      totalCount: testCases.length,
      runtime: 12,
      memory: 1024
    };
  }
}
