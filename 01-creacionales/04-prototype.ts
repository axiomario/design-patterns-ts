/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Document {
    constructor(
        public title: string,
        private content: string,
        public author: string
    ) {}

    public displayInfo(): void {
        console.log(this);
    }

    public clone(): Document {
        return new Document(this.title, this.content, this.author);
    }
}

function main(): void {
    const document1 = new Document('Documento1', 'abc', 'Mario');
    const document2 = {...document1};
    const document3 = structuredClone(document1);
    const document4 = document1.clone();
    
    console.log(document1);
    console.log(document2);
    console.log(document3);
    console.log(document4);
}

main();
