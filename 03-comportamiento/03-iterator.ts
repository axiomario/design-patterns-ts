/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */
interface Iterator<T> {
    getNext(): T | null;

    hasMore(): boolean;
}

class Pokemon {
    constructor(public name: string, public type: string) {}
}

class PokemonCollection {
    private pokemons: Pokemon[] = [];

    public add(pokemon: Pokemon): void {
        this.pokemons.push(pokemon);
    }

    public get(index: number): Pokemon | null {
        if (index >= 0 && index < this.pokemons.length) {
            return this.pokemons[index];
        }

        return null;
    }

    public getLength(): number {
        return this.pokemons.length;
    }

    public createIterator(): PokemonIterator {
        return new PokemonIterator(this);
    }
}

class PokemonIterator implements Iterator<Pokemon> {
    private position: number = 0;

    constructor(private pokemonCollection: PokemonCollection) {}
    
    getNext(): Pokemon | null {
        if (this.hasMore()) {
            return this.pokemonCollection.get(this.position++);
        }

        return null;
    }
    
    hasMore(): boolean {
        return this.position < this.pokemonCollection.getLength();
    }
}

function main(): void {
    const pokedex = new PokemonCollection();

    pokedex.add(new Pokemon('Pikachu', 'Electric'));
    pokedex.add(new Pokemon('Charmander', 'Fire'));
    pokedex.add(new Pokemon('Squirtle', 'Water'));
    pokedex.add(new Pokemon('Bulbasaur', 'Plant'));

    for (const iterator = pokedex.createIterator(); iterator.hasMore();) {
        const pokemon = iterator.getNext();
        
        console.log(pokemon);
    }
}

main();