import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */
class ChatRoom {
    private users: User[] = [];
    
    constructor(public title: string) {}

    public addUser(user: User): void {
        this.users.push(user);
    }

    public sendMessage(sender: User, message: string): void {
        this.users.filter(
            user => user !== sender
        ).forEach(
            user => user.receiveMessage(sender, message)
        );
    }
}

class User {
    constructor(private username: string, private chatRoom: ChatRoom) {
        chatRoom.addUser(this);
    }

    public sendMessage(message: string): void {
        console.log(`%c${ this.username } sends: ${ message }`, COLORS.red);
        this.chatRoom.sendMessage(this, message);
    }

    public receiveMessage(sender: User, message: string): void {
        console.log(`%c${ this.username } receives: ${ message } - from ${ sender.username }`, COLORS.green);
    }
}

function main(): void {
    const chatRoom = new ChatRoom('Work group');
    const user1 = new User('Mario', chatRoom);
    const user2 = new User('Daniel', chatRoom);
    const user3 = new User('Omar', chatRoom);

    user1.sendMessage('Hello');
    user2.sendMessage('Whats up!');
    user3.sendMessage('Hi guys');
    user2.sendMessage('Give me a second');
}

main();