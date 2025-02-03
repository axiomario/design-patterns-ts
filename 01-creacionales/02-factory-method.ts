/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Burger {
    prepare(): void;
}

class ChickenBurger implements Burger {
  prepare(): void {
    console.log('%cChicken', COLORS.yellow);
  }   
}

class BeefBurger implements Burger {
  prepare(): void {
    console.log('%cMeat', COLORS.brown);
  }   
}

class BeanBurger implements Burger {
  prepare(): void {
    console.log('%cBean', COLORS.orange);
  }   
}

abstract class Restaurant {
    protected abstract createBurger(): Burger;

    orderBurger(): void {
        const Burger = this.createBurger();

        Burger.prepare();
    }
}

class ChickenRestaurant extends Restaurant {
    override createBurger(): Burger {
        return new ChickenBurger();
    }
}

class BeefRestaurant extends Restaurant {
    override createBurger(): Burger {
        return new BeefBurger();
    }
}

class BeanRestaurant extends Restaurant {
    override createBurger(): Burger {
        return new BeanBurger();
    }
}

function main() {
    let restaurant: Restaurant;
    const burgerType = prompt('Burger type? (chicken/beef/bean)');

    switch (burgerType) {
        case 'chicken':
            restaurant = new ChickenRestaurant();
            break;
        case 'beef':
            restaurant = new BeefRestaurant();
            break;
        case 'bean':
            restaurant = new BeanRestaurant();
            break;
        default:
            throw new Error('no valid');
    }
    restaurant.orderBurger();
}

main();