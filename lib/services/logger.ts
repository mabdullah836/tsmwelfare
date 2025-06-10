export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
}

class Logger {
  private static instance: Logger;
  private isProduction: boolean;

  private constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatLogEntry(level: LogLevel, message: string, context?: Record<string, any>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context
    };
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    const logEntry = this.formatLogEntry(level, message, context);

    if (this.isProduction) {
      console.log(JSON.stringify(logEntry));
    } else {
      const color = {
        [LogLevel.ERROR]: '\x1b[31m',
        [LogLevel.WARN]: '\x1b[33m',
        [LogLevel.INFO]: '\x1b[36m',
        [LogLevel.DEBUG]: '\x1b[90m'
      }[level];

      console.log(
        `${color}[${logEntry.timestamp}] ${level.toUpperCase()}: ${message}\x1b[0m`,
        context ? context : ''
      );
    }
  }

  public error(message: string, context?: Record<string, any>) {
    this.log(LogLevel.ERROR, message, context);
  }

  public warn(message: string, context?: Record<string, any>) {
    this.log(LogLevel.WARN, message, context);
  }

  public info(message: string, context?: Record<string, any>) {
    this.log(LogLevel.INFO, message, context);
  }

  public debug(message: string, context?: Record<string, any>) {
    if (!this.isProduction) {
      this.log(LogLevel.DEBUG, message, context);
    }
  }
}

export const logger = Logger.getInstance(); 