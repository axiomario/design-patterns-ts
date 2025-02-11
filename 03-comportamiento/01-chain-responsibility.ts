import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */
interface Handler {
    setNext(handler: Handler): Handler;
    
    handle(request: string): void;
}

abstract class BaseHandler implements Handler {
    private nextHandler?: Handler;

    setNext(handler: Handler): Handler {
        return this.nextHandler = handler;
    }

    handle(request: string): void {
        if (this.nextHandler) {
            this.nextHandler.handle(request);
        }
    }
}

class BasicSupport extends BaseHandler {
    override handle(request: string): void {
        if (request === 'basic') {
            console.log('%cbasic support', COLORS.green);
        } else {
            super.handle(request);
        }
    }
}

class AdvancedSupport extends BaseHandler {
    override handle(request: string): void {
        if (request === 'advanced') {
            console.log('%cadvanced support', COLORS.yellow);
        } else {
            super.handle(request);
        }
    }
}

class ExpertSupport extends BaseHandler {
    override handle(request: string): void {
        if (request === 'expert') {
            console.log('%cexpert support', COLORS.blue);
        } else {
            console.log('%chelp', COLORS.red);
        }
    }
}

function main(): void {
    const basicSupport = new BasicSupport();
    const advancedSupport = new AdvancedSupport();
    const expertSupport = new ExpertSupport();

    basicSupport.setNext(advancedSupport).setNext(expertSupport);

    basicSupport.handle('expert');
    basicSupport.handle('basic');
    basicSupport.handle('advanced');
    basicSupport.handle('hello');
}

main();