/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */
interface State {
    name: string;

    insertMoney(): void;

    selectProduct(): void;

    dispenseProduct(): void;
}

class VendingMachine {
    private state: State;

    constructor() {
        this.state = new WaitingForMoney(this);
    }

    public insertMoney(): void {
        this.state.insertMoney();
    }

    public selectProduct(): void {
        this.state.selectProduct();
    }

    public dispenseProduct(): void {
        this.state.dispenseProduct();
    }

    public getStateName(): string {
        return this.state.name;
    }

    public setState(state: State): void {
        this.state = state;
        console.log(`%cState changed to ${ state.name }`, COLORS.yellow);
    }
}

class WaitingForMoney implements State {
    public name: string = 'Waiting for money';

    constructor(private vendingMachine: VendingMachine) {}

    insertMoney(): void {
        console.log('Money received, select a product');
        this.vendingMachine.setState(new SelectProduct(this.vendingMachine));
    }

    selectProduct(): void {
        console.log('%cNot possible, insert money', COLORS.red);
    }

    dispenseProduct(): void {
        console.log('%cNot possible, insert money', COLORS.red);
    }
}

class SelectProduct implements State {
    public name: string = 'Select product';

    constructor(private vendingMachine: VendingMachine) {}

    insertMoney(): void {
        console.log('%cNot possible, select a product', COLORS.red);
    }

    selectProduct(): void {
        console.log('Product selected, take it');
        this.vendingMachine.setState(new DispenseProduct(this.vendingMachine));
    }

    dispenseProduct(): void {
        console.log('%cNot possible, select a product', COLORS.red);
    }
}

class DispenseProduct implements State {
    public name: string = 'Dispense product';

    constructor(private vendingMachine: VendingMachine) {}

    insertMoney(): void {
        console.log('%cNot possible, dispense the product', COLORS.red);
    }

    selectProduct(): void {
        console.log('%cNot possible, dispense the product', COLORS.red);
    }

    dispenseProduct(): void {
        console.log('Product dispensed');
        this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
    }
}

function main(): void {
    const vendingMachine = new VendingMachine();
    
    vendingMachine.selectProduct();
    vendingMachine.dispenseProduct();
    vendingMachine.insertMoney();
    vendingMachine.dispenseProduct();
    vendingMachine.selectProduct();
    vendingMachine.dispenseProduct();
}

main();