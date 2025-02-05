/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { configManager } from "./singleton/config-manager.ts";

configManager.setConfig('url', 'http://localhost:4200/');
configManager.setConfig('user', 'Mario');
configManager.setConfig('apiKey', 'abc');

console.log(configManager.getConfig('user'));
console.log(configManager.getConfig('password'));

for (const key in configManager.getAllConfig()) {
    console.log(`${ key }: ${ configManager.getConfig(key) }`);
}