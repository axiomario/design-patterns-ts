import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */
class Player {
    constructor(public name: string, public level: number) {}
}

interface Room {
    enter(player: Player): void;
}

class SecretRoom implements Room {
    public enter(player: Player): void {
        console.log(`Welcome ${ player.name }`);
    }
}

class MagicPortal implements Room {
    constructor(private room: Room) {}

    public enter(player: Player): void {
        if (player.level >= 10) {
            this.room.enter(player);
        } else {
            console.log('%cNo valid', COLORS.red);
        }
    }
}

function main(): void {
    const magicPortal = new MagicPortal(new SecretRoom());
    const player1 = new Player('player1', 5);
    const player2 = new Player('player2', 10);

    magicPortal.enter(player1);
    magicPortal.enter(player2);
}

main();