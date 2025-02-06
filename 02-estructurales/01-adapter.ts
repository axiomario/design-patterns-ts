import { LocalLogger } from "./adapter-files/local-logger.ts";
import { LoggerAdapter } from "./adapter-files/logger-adapter.ts";

/**
 * ! Patrón Adapter
 *  Permite que objetos con interfaces incompatibles trabajen juntos, también es muy
 *  util para utilizar librerías de terceros en nuestra aplicación sin depender
 *  directamente de ellas.
 *
 * * Es útil cuando se quiere reutilizar una clase que no tiene la interfaz que
 * * necesitamos o cuando queremos crear una capa de abstracción para una librería
 * * de terceros.
 *
 * https://refactoring.guru/es/design-patterns/adapter
 */
//const logger = new LocalLogger('01-adapter.ts');
const logger = new LoggerAdapter('01-adapter.ts');

logger.writeLog('This is a log message');
logger.writeWarning('This is a warning message');
logger.writeError('This is an error message');