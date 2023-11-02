/**
 * Readonly 1
 * interface Cat {
 *  readonly name: string;
 *  readonly breed: string;
 * }
 */

interface Cat {
  name: string;
  breed: string;
}

// Readonly<T> is a generic type that takes a type T and returns a new type where all properties are readonly.
type ReadonlyCat = Readonly<Cat>;

function makeCat(name: string, breed: string): ReadonlyCat {
  return {
    name,
    breed,
  };
}

const myCat = makeCat("Tom", "Tabby");
myCat.name = "Sylvester";
myCat.breed = "Tuxedo";

// Readonly Tuples

function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  return [x, y, z];
}

const c1 = makeCoordinate(10, 20, 30);
c1[0] = 50;

const reallyConst: readonly number[] = [1, 2, 3];
reallyConst[0] = 50;

const reallyConst2 = [1, 2, 3] as const;
reallyConst2[0] = 50;
reallyConst2.push(4);
