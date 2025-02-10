/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */
interface FileSystemComponent {
    showDetails(indent?: string): void;
}

class File implements FileSystemComponent {
    constructor(private name: string) {}

    showDetails(indent?: string): void {
        console.log(`${ indent } - Archivo: ${ this.name }`);
    }
}

class Folder implements FileSystemComponent {
    private contents: FileSystemComponent[] = [];
    
    constructor(private name: string) {}

    showDetails(indent: string = ''): void {
        console.log(`${ indent } + Carpeta: ${ this.name }`);
        this.contents.forEach(component => component.showDetails(indent + ' '));
    }

    add(...components: FileSystemComponent[]): void {
        this.contents = [
            ...this.contents,
            ...components
        ]
    }
}

function main(): void {
    const file1 = new File('file1.txt');
    const file2 = new File('file2.txt');
    const file3 = new File('file3.txt');
    const file4 = new File('file4.txt');
    const folder1 = new Folder('Folder1');
    const folder2 = new Folder('Folder2');
    const rootFolder = new Folder('Root');

    folder1.add(file1, file2);
    folder2.add(file3);
    rootFolder.add(folder1, folder2, file4);
    rootFolder.showDetails();
}

main();