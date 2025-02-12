/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */
interface MovementStrategy {
    move(): void;
}

class SwimFast implements MovementStrategy {
    public move(): void {
        console.log('swim fast');
    }
}

class FlyOverWater implements MovementStrategy {
    public move(): void {
        console.log('fly over water');
    }
}

class WalkClumsily implements MovementStrategy {
    public move(): void {
        console.log('walk clumsily');
    }
}

class Duck {
    constructor(private name: string, private strategy: MovementStrategy) {
        console.log(`%c${ this.name } ready to compete`, COLORS.green);
    }

    public performMove(): void {
        console.log(`%c${ this.name } is preparing to move`, COLORS.yellow);
        this.strategy.move();
    }

    setMovementStrategy(strategy: MovementStrategy): void {
        this.strategy = strategy;
        console.log(`%c${ this.name } changing strategy`, COLORS.red);
    }
}

function main():void {
    const duck1 = new Duck('duck1', new SwimFast());
    const duck2 = new Duck('duck2', new FlyOverWater());
    const duck3 = new Duck('duck3', new WalkClumsily());

    duck1.performMove();
    duck3.performMove();
    duck2.setMovementStrategy(new SwimFast());
    duck2.performMove();
}

main();