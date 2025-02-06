/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */
interface Ability {
    use(): void;
}

class SwordAttack implements Ability {
    use(): void {
        console.log('Sword Attack');
    }
}

class AxeAttack implements Ability {
    use(): void {
        console.log('Axe Attack');
    }
}

class MagicSpell implements Ability {
    use(): void {
        console.log('Magic Spell');
    }
}

abstract class Character {
    abstract performAbility(): void;

    constructor(protected ability: Ability) {}

    public setAbility(ability: Ability): void {
        this.ability = ability;
    }
}

class Warrior extends Character {
    override performAbility(): void {
        console.log('Warrior fighting');
        this.ability.use();
    }
}

class Wizard extends Character {
    override performAbility(): void {
        console.log('Wizard fighting');
        this.ability.use();
    }
}

function main(): void {
    const warrior = new Warrior(new SwordAttack());
    const wizard = new Wizard(new MagicSpell());

    warrior.performAbility();
    warrior.setAbility(new AxeAttack());
    warrior.performAbility();
    wizard.performAbility();
}

main();