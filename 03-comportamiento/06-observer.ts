import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */
interface Observer {
    notify(videoTitle: string): void;
}

class YoutubeChannel {
    private subscribers: Observer[] = [];

    constructor(private name: string) {}

    public subscribe(observer: Observer): void {
        this.subscribers.push(observer);
        console.log(`%cNew subscriber to channel ${ this.name }`, COLORS.green);
    }

    public unsubscribe(observer: Observer): void {
        console.log('%cUnsubscriber', COLORS.red);
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== observer);
    }

    public uploadVideo(title: string): void {
        console.log(`%c${ this.name } - ${ title }`, COLORS.yellow);
        this.subscribers.forEach(subscriber => subscriber.notify(title));
    }
}

class Subscriber implements Observer {
    constructor(private name: string) {}

    public notify(videoTitle: string): void {
        console.log(`${ this.name } - new video: ${ videoTitle }`);
    }
}

function main(): void {
    const channel1 = new YoutubeChannel('My Channel');
    const channel2 = new YoutubeChannel('Other Channel');
    const subscriber1 = new Subscriber('One');
    const subscriber2 = new Subscriber('Two');
    const subscriber3 = new Subscriber('Three');

    channel1.subscribe(subscriber1);
    channel2.subscribe(subscriber1);
    channel2.subscribe(subscriber2);
    
    channel1.uploadVideo('video1');
    channel2.uploadVideo('video2');
    
    channel1.subscribe(subscriber3);
    channel1.uploadVideo('video3');
    
    channel2.unsubscribe(subscriber2);
    channel2.uploadVideo('video4');
}

main();