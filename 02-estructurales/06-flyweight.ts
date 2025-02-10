import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */
interface Location {
    display(coordinates: { x: number, y: number }): void;
}

class LocationIcon implements Location {
    constructor(private type: string, private iconImage: string) {}

    display({x, y}: { x: number; y: number; }): void {
      console.log(`Coords: ${ this.type } at ${ x }, ${ y } with icon %c[${ this.iconImage }]`, COLORS.green);
    }
}

class LocationFactory {
    private icons: Record<string, LocationIcon> = {};

    public getLocationIcon(type: string): LocationIcon {
        if (!this.icons[type]) {
            const image = `${ type.toLowerCase() }.png`;
            
            console.log('%cCreating... ' + image, COLORS.red);
            this.icons[type] = new LocationIcon(type, image);
        }

        return this.icons[type];
    }
}

class MapLocation {
    private coordinates: { x: number, y: number };

    constructor(x: number, y: number, private icon: LocationIcon) {
        this.coordinates = { x, y };
    }

    public display() {
        this.icon.display(this.coordinates);
    }
}

function main(): void {
    const factory = new LocationFactory();
    const locations = [
        new MapLocation(10, 20, factory.getLocationIcon('hospital')),
        new MapLocation(20, 20, factory.getLocationIcon('hospital')),
        new MapLocation(30, 20, factory.getLocationIcon('hospital')),
        new MapLocation(30, 20, factory.getLocationIcon('park')),
        new MapLocation(30, 20, factory.getLocationIcon('hospital')),
        new MapLocation(30, 20, factory.getLocationIcon('park')),
    ];

    locations.forEach(location => location.display());
}

main();