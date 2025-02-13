/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */
interface Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void;
    visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
    accept(visitor: Visitor): void;
}

class RollerCoaster implements Attraction {
    private price = 50;

    public getPrice(): number {
        return this.price;
    }

    public accept(visitor: Visitor): void {
        visitor.visitRollerCoaster(this);
    }
}

class FerrisWheel implements Attraction {
    private price = 40;

    public getPrice(): number {
        return this.price;
    }

    public accept(visitor: Visitor): void {
        visitor.visitFerrisWheel(this);
    }
}

class ChildVisitor implements Visitor {
    private discount = 0.5;

    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`Child visitor - roller coaster, price: ${ rollerCoaster.getPrice() * this.discount }`);
    }

    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`Child visitor - ferris wheel, price: ${ ferrisWheel.getPrice() * this.discount }`);
    }
}

class AdultVisitor implements Visitor {
    private discount = 1;
    
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`Adult visitor - roller coaster, price: ${ rollerCoaster.getPrice() * this.discount }`);
    }

    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`Adult visitor - ferris wheel, price: ${ ferrisWheel.getPrice() * this.discount }`);
    }
}

function main(): void {
    const attractions: Attraction[] = [
        new RollerCoaster(),
        new FerrisWheel()
    ];
    const child = new ChildVisitor();
    const adult = new AdultVisitor();

    attractions.forEach(attraction => {
        attraction.accept(child);
        attraction.accept(adult);
    });
}

main();