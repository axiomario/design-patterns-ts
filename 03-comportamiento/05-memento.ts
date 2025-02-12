/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */
class GameMemento {
    constructor(private level: number, private health: number, private position: string) {}

    public getLevel(): number {
        return this.level;
    }

    public getHealth(): number {
        return this.health;
    }

    public getPosition(): string {
        return this.position;
    }
}

class Game {
    constructor(private level: number = 1, private health: number = 100, private position: string = 'start') {
        console.log('Starting...', {
            level,
            health,
            position
        });
    }

    public save(): GameMemento {
        return new GameMemento(this.level, this.health, this.position);
    }

    public play(level: number, health: number, position: string): void {
        this.level = level;
        this.health = health;
        this.position = position;

        console.log('Playing...', {
            level,
            health,
            position
        });
    }

    public restore(memento: GameMemento): void {
        const level = memento.getLevel();
        const health = memento.getHealth();
        const position = memento.getPosition();

        this.level = level;
        this.health = health;
        this.position = position;

        console.log('Restoring...', {
            level,
            health,
            position
        });
    }
}

class GameHistory {
    private mementos: GameMemento[] = [];

    public push(memento: GameMemento): void {
        this.mementos.push(memento);
    }

    public pop(): GameMemento | undefined {
        return this.mementos.pop();
    }
}

function main(): void {
    const game = new Game();
    const history = new GameHistory();

    history.push(game.save());

    game.play(2, 90, 'level2');
    history.push(game.save());
    
    game.play(3, 70, 'level3');
    history.push(game.save());
    
    game.play(4, 40, 'level4');
    game.play(4, 30, 'level4');
    history.push(game.save());

    game.play(5, 0, 'level5');
    game.restore(history.pop()!);
}

main();