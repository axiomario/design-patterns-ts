import { COLORS } from '../../helpers/colors.ts';

// TODO: Implementar el LocalLogger Class
export class LocalLogger {
    constructor(private file: string) {}

    public writeLog(message: string): void {
        console.log(`[${ this.file } Log] %c${ message }`, COLORS.white);
    }

    public writeError(message: string): void {
        console.log(`[${ this.file } Error] %c${ message }`, COLORS.red);
    }

    public writeWarning(message: string): void {
        console.log(`[${ this.file } Warning] %c${ message }`, COLORS.yellow);
    }
}