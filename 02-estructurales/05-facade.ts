/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */
class Projector {
    public turnOn(): void {
        console.log('Projector: on');
    }

    public turnOff(): void {
        console.log('Projector: off');
    }
}

class SoundSystem {
    public on(): void {
        console.log('Sound: on');
    }

    public off(): void {
        console.log('Sound: off');
    }
}

class VideoPlayer {
    public on(): void {
        console.log('Video: on');
    }

    public play(movie: string): void {
        console.log('Watching', movie);
    }

    public stop(): void {
        console.log('Stopping');
    }

    public off(): void {
        console.log('Video: off');
    }
}

class HomeTheaterFacade {
    private projector: Projector = new Projector();
    private soundSystem: SoundSystem = new SoundSystem();
    private videoPlayer: VideoPlayer = new VideoPlayer();

    public watchMovie(movie: string): void {
        this.projector.turnOn();
        this.soundSystem.on();
        this.videoPlayer.on();
        this.videoPlayer.play(movie);
    }

    public stopMovie(): void {
        this.videoPlayer.stop();
        this.videoPlayer.off();
        this.soundSystem.off();
        this.projector.turnOff();
    }
}

function main(): void {
    const homeTheaterFacade = new HomeTheaterFacade();

    homeTheaterFacade.watchMovie('Transformers One');
    homeTheaterFacade.stopMovie();
}

main();