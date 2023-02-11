// ref.: https://www.npmjs.com/package/clean-terminal-webpack-plugin

import type { Compiler } from 'webpack';

type Option = {
  message: string[];
};

/* Main */
/** 在 WebpackDevServer 運行時，清除並印出自定義的終端資訊 */
class PrintToConsolePlugin {
  message: string[];

  constructor(options: Option) {
    const { message } = options;
    this.message = [...message];
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterCompile.tap('PrintToConsolePlugin', () => {
      this.clearConsole();
    });
  }

  clearConsole() {
    const clear =
      process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H';
    const output = `${clear}${this.message.join('\n')}\n`;
    process.stdout.write(output);
  }
}

export default PrintToConsolePlugin;
