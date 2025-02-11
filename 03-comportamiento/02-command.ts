/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */
interface Command {
    execute(): void;
}

class Light {
    turnOn(): void {
        console.log('light - turn on');
    }

    turnOff(): void {
        console.log('light - turn off');
    }
}

class Fan {
    on(): void {
        console.log('fan - turn on');
    }

    off(): void {
        console.log('fan - turn off');
    }
}

class LightOnCommand implements Command {
    constructor(private light: Light) {}

    execute(): void {
        this.light.turnOn();
    }
}

class LightOffCommand implements Command {
    constructor(private light: Light) {}

    execute(): void {
        this.light.turnOff();
    }
}

class FanOnCommand implements Command {
    constructor(private fan: Fan) {}

    execute(): void {
        this.fan.on();
    }
}

class FanOffCommand implements Command {
    constructor(private fan: Fan) {}

    execute(): void {
        this.fan.off();
    }
}

class RemoteControl {
    private commands: Record<string, Command> = {};

    public setCommand(button: string, command: Command): void {
        this.commands[button] = command;
    }

    public pressButton(button: string): void {
        if (this.commands[button]) {
            this.commands[button].execute();
        } else {
            console.log('button not valid');
        }
    }
}

function main(): void {
    const remoteControl = new RemoteControl();
    const light = new Light();
    const fan = new Fan();
    const lightOnCommand = new LightOnCommand(light);
    const lightOffCommand = new LightOffCommand(light);
    const fanOnCommand = new FanOnCommand(fan);
    const fanOffCommand = new FanOffCommand(fan);

    remoteControl.setCommand('light.on', lightOnCommand);
    remoteControl.setCommand('light.off', lightOffCommand);
    remoteControl.setCommand('fan.on', fanOnCommand);
    remoteControl.setCommand('fan.off', fanOffCommand);

    remoteControl.pressButton('light.on');
    remoteControl.pressButton('fan.off');
    remoteControl.pressButton('button');
}

main();