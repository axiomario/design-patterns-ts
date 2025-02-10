import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */
interface Notification {
    send(message: string): void;
}

class BasicNotification implements Notification {
    send(message: string): void {
        console.log(`Basic Notification: %c${ message }`, COLORS.yellow);
    }
}

abstract class NotificationDecorator implements Notification {
    constructor(protected notification: Notification) {}

    send(message: string): void {
        this.notification.send(message);
    }
}

class EmailDecorator extends NotificationDecorator {
    private sendEmail(message: string): void {
        console.log(`Email notification: %c${ message }`, COLORS.red);
    }

    override send(message: string): void {
        super.send(message);
        this.sendEmail(message);
    }
}

class SMSDecorator extends NotificationDecorator {
    private sendSMS(message: string): void {
        console.log(`SMS notification: %c${ message }`, COLORS.green);
    }

    override send(message: string): void {
        super.send(message);
        this.sendSMS(message);
    }
}

function main(): void {
    let notification: Notification = new BasicNotification();

    notification = new EmailDecorator(notification);
    notification = new SMSDecorator(notification);

    notification.send('System alert');
}

main();