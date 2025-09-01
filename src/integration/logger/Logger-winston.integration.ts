import * as winston from 'winston';
import { injectable } from 'inversify';
import ILogger from '../../services/interface/logger/i-logger';

/**
 * Optimized system logger with environment-based configuration
 * - Development: Console output only
 * - Production: File output with optional console
 */
@injectable()
class LoggerWinstonIntegration implements ILogger {

  private _logFormat?: winston.Logform.Format;
  private logger: winston.Logger | undefined;
  public static instance: ILogger;
  private readonly isDevelopment: boolean;
  
  constructor() {
    // Check if we're in development mode
    this.isDevelopment = process.env.MODE_DEVELOPER?.toLowerCase() === 'true';
    
    this._defineFormateLogger();
    this._initializeLogger();
  }

  private _initializeLogger(): void {
    const transports: winston.transport[] = [];
    
    if (this.isDevelopment) {
      // Development mode: Console output only with debug level
      transports.push(
        new winston.transports.Console({ 
          format: this._getConsoleFormat(),
          level: 'debug'
        })
      );
    } else {
      // Production mode: File outputs with optional console
      transports.push(
        // Error log file
        new winston.transports.File({ 
          filename: 'microservice-engine-download-error.log', 
          level: 'error', 
          dirname: process.env.FOLDER_LOGS || './logs',
          maxsize: 5 * 1024 * 1024, // 5MB
          maxFiles: 5,
          format: this._getFileFormat()
        }),
        // Combined log file
        new winston.transports.File({ 
          filename: 'microservice-engine-download-combined.log', 
          dirname: process.env.FOLDER_LOGS || './logs',
          maxsize: 5 * 1024 * 1024, // 5MB
          maxFiles: 5,
          format: this._getFileFormat()
        })
      );
      
      // Optional console output in production (only for info and above)
      if (process.env.CONSOLE_LOG_PRODUCTION?.toLowerCase() === 'true') {
        transports.push(
          new winston.transports.Console({ 
            format: this._getConsoleFormat(),
            level: 'info'
          })
        );
      }
    }

    this.logger = winston.createLogger({
      level: this.isDevelopment ? 'debug' : 'info',
      transports
    });
  }

  private _defineFormateLogger(): void {
    this._logFormat = winston.format.combine(
      winston.format.label({
        label: `Node-engine`
      }),
      winston.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss'
      }),
      winston.format.errors({ stack: true })
    );
  }

  private _getConsoleFormat(): winston.Logform.Format {
    return winston.format.combine(
      this._logFormat!,
      winston.format.colorize(),
      winston.format.printf(info => {
        const level = info.level.padEnd(7);
        const timestamp = info.timestamp;
        const message = info.message;
        const stack = info.stack ? `\n${info.stack}` : '';
        
        return `${level} ${timestamp} [${info.label}] ${message}${stack}`;
      })
    );
  }

  private _getFileFormat(): winston.Logform.Format {
    return winston.format.combine(
      this._logFormat!,
      winston.format.json(),
      winston.format.printf(info => {
        const logEntry: any = {
          level: info.level,
          timestamp: info.timestamp,
          label: info.label,
          message: info.message
        };
        
        if (info.stack) {
          logEntry.stack = info.stack;
        }
        
        return JSON.stringify(logEntry);
      })
    );
  }

  public error(message: string, error?: Error): void {
    if (error) {
      this.logger?.error(message, { stack: error.stack });
    } else {
      this.logger?.error(message);
    }
  }

  public info(message: string): void {
    this.logger?.info(message);
  }

  public warn(message: string): void {
    this.logger?.warn(message);
  }

  public debug(message: string): void {
    this.logger?.debug(message);
  }

  public static getInstance(): ILogger {
    if (!LoggerWinstonIntegration.instance) {
      LoggerWinstonIntegration.instance = new LoggerWinstonIntegration();
    }
    return LoggerWinstonIntegration.instance;
  }
  
  // Utility method to check current mode
  public isDevelopmentMode(): boolean {
    return this.isDevelopment;
  }
}

export default LoggerWinstonIntegration;