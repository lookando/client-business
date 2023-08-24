/* eslint no-console:0 */
export class Logger {
  private logPrefix = '';

  constructor(logPrefix?: string) {
    if (logPrefix) {
      this.logPrefix = `[${logPrefix}]: `;
    }
  }

  get log(): Function {
    const { NODE_ENV } = process.env;
    if (NODE_ENV !== 'development') {
      return () => {};
    }

    if (this.logPrefix) {
      return console.log.bind(window.console, this.logPrefix);
    }
    return console.log.bind(window.console);
  }

  get warn(): Function {
    const { NODE_ENV } = process.env;
    if (NODE_ENV !== 'development') {
      return () => {};
    }

    if (this.logPrefix) {
      return console.warn.bind(window.console, this.logPrefix);
    }
    return console.warn.bind(window.console);
  }

  get dir(): Function {
    const { NODE_ENV } = process.env;
    if (NODE_ENV !== 'development') {
      return () => {};
    }

    if (this.logPrefix) {
      return console.dir.bind(window.console, this.logPrefix);
    }
    return console.dir.bind(window.console);
  }

  get error(): Function {
    const { NODE_ENV } = process.env;
    if (NODE_ENV !== 'development') {
      return () => {};
    }

    if (this.logPrefix) {
      return console.error.bind(window.console, this.logPrefix);
    }
    return console.error.bind(window.console);
  }
}

const defaultLogger = new Logger('Default');
export default defaultLogger;
