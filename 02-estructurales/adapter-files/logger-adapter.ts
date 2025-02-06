import { Logger } from 'jsr:@deno-library/logger';

// TODO: Implementar el LoggerAdapter
interface ILoggerAdapter {
    file: string;
    writeLog: (message: string) => void;
    writeWarning: (message: string) => void;
    writeError: (message: string) => void;
}

export class LoggerAdapter implements ILoggerAdapter {
    private logger: Logger;

    constructor(public file: string) {
        this.logger = new Logger();
    }

    public writeLog(message: string): void {
        this.logger.info(`[${ this.file } Log] ${ message }`);
    }

    public writeWarning(message: string): void {
        this.logger.warn(`[${ this.file } Warning] ${ message }`);
    }

    public writeError(message: string): void {
        this.logger.error(`[${ this.file } Error] ${ message }`);
    }
}