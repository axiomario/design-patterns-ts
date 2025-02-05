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
class DragonBalls {
    private static instance: DragonBalls;
    private ballsCollected: number = 0;

    private constructor() { }

    public static getInstance(): DragonBalls {
        if (!DragonBalls.instance) {
            DragonBalls.instance = new DragonBalls();
        }

        return DragonBalls.instance;
    }

    public collectBall(): void {
        if (this.ballsCollected < 7) {
            this.ballsCollected++;
            console.log('Esfera del dragon recolectada', this.ballsCollected);
        } else {
            console.log('No hay esferas del dragon por recolectar');
        }
    }

    public summonShengLong(): void {
        if (this.ballsCollected < 7) {
            console.log('Aun faltan esferas del dragon por recolectar');
        } else {
            console.log('Sheng Long invocado, se ha cumplido el deseo');
            this.ballsCollected = 0;
        }
    }
}

function main(): void {
    //const dragonBalls: DragonBalls = new DragonBalls();
    const goku: DragonBalls = DragonBalls.getInstance();
    const vegeta: DragonBalls = DragonBalls.getInstance();

    goku.collectBall();
    goku.collectBall();
    goku.collectBall();
    goku.summonShengLong();

    vegeta.collectBall();
    vegeta.collectBall();
    vegeta.collectBall();
    vegeta.summonShengLong();
    
    goku.collectBall();
    goku.collectBall();
    goku.summonShengLong();
    vegeta.summonShengLong();
}

main();