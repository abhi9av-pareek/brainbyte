import { LocalCompiler } from "./LocalCompiler.js";

class CompilerFactory {
  constructor() {
    this.instance = null;
  }

  getCompiler() {
    if (!this.instance) {
      // Return LocalCompiler strategy by default to run physical local runtimes
      this.instance = new LocalCompiler();
    }
    return this.instance;
  }
}

const compilerFactory = new CompilerFactory();
export default compilerFactory;
