export class CompilerInterface {
  /**
   * Run code with custom input (no hidden test cases)
   * @param {string} code
   * @param {string} language
   * @param {string} input
   * @returns {Promise<{success: boolean, stdout: string, stderr: string, compileOutput?: string, time?: number, memory?: number, errorType?: string}>}
   */
  async execute(code, language, input) {
    throw new Error("Method 'execute' must be implemented.");
  }

  /**
   * Submit code against hidden test cases
   * @param {string} code
   * @param {string} language
   * @param {Array<{input: string, expectedOutput: string}>} testCases
   * @returns {Promise<{status: string, passedCount: number, totalCount: number, runtime: number, memory: number, failedTestCase?: {input: string, expectedOutput: string, userOutput: string}}>}
   */
  async submit(code, language, testCases) {
    throw new Error("Method 'submit' must be implemented.");
  }
}
