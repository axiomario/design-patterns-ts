/**
 * ! Patrón Template Method
 *
 * El patrón Template Method es un patrón de diseño de comportamiento
 * que define el esqueleto de un algoritmo en una operación,
 * delegando algunos pasos a las subclases.
 *
 * Permite que las subclases redefinan ciertos pasos de un algoritmo
 * sin cambiar su estructura.
 *
 * * Es útil cuando se tiene un algoritmo que sigue una secuencia de pasos
 * * y se quiere permitir a las subclases que redefinan algunos de esos pasos.
 *
 * https://refactoring.guru/es/design-patterns/template-method
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Vamos a implementar un sistema que permite preparar
 * diferentes bebidas calientes, como café y té.
 *
 * Aunque el proceso general para preparar ambas bebidas es similar
 * (hervir agua, añadir el ingrediente principal, servir en una taza),
 * hay pasos específicos que varían dependiendo de la bebida.
 *
 * El patrón Template Method es perfecto para este caso,
 * ya que define un esqueleto general del algoritmo en una clase base
 * y delega los detalles específicos a las subclases.
 */
abstract class HotBeverage {
    protected abstract addMainIngredient(): void;

    protected abstract addCondiments(): void;

    public prepare(): void {
        this.boilWater();
        this.addMainIngredient();
        this.pourInCup();
        this.addCondiments();
    }

    private boilWater(): void {
        console.log('boiling water');
    }

    private pourInCup(): void {
        console.log('pouring in cup');
    }
}

class Tea extends HotBeverage {
    protected override addMainIngredient(): void {
        console.log('Tea');
    }
    
    protected override addCondiments(): void {
        console.log('Honey');
    }
}

class Coffee extends HotBeverage {
    protected override addMainIngredient(): void {
        console.log('Coffee');
    }

    protected override addCondiments(): void {
        console.log('Sugar');
    }
}

function main(): void {
    const coffee = new Coffee();
    const tea = new Tea();

    console.log('%cPreparing coffee', COLORS.brown);
    coffee.prepare();
    console.log('%cPreparing coffee', COLORS.green);
    tea.prepare();
}

main();