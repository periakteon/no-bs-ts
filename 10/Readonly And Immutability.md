## Readonly And Immutability

TypeScript'teki [Utility Type'lardan](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype) biri de **Readonly**'dir.

### Readonly<Type>

Bu type, bir type'ın property'lerini **readonly**, yani **değiştirilemez ve salt okunur** bir hale getirir.

```typescript
interface Cat {
  name: string;
  breed: string;
}

function makeCat(name: string, breed: string): Cat {
  return {
    name,
    breed,
  };
}

const myCat = makeCat("Tom", "Tabby");
myCat.name = "Sylvester";
myCat.breed = "Tuxedo";
```

Yukarıdaki örnekte `myCat` değişkeni, `Cat` interface'ini implemente eden bir obje. Bu objenin property'lerini değiştirmek istediğimizde herhangi bir hata almayız. Ancak bu objenin property'lerini değiştirmek istemiyorsak, `Readonly` type'ını kullanabiliriz.

```typescript
interface Cat {
  readonly name: string;
  breed: string;
}

function makeCat(name: string, breed: string): Cat {
  return {
    name,
    breed,
  };
}

const myCat = makeCat("Tom", "Tabby");
myCat.name = "Sylvester";
     ~~~~~~
     // Cannot assign to 'name' because it is a read-only property.
myCat.breed = "Tuxedo";
     // OK
```

Aynı şekilde return type'ını da `Readonly` type'ı olarak belirtebiliriz.

```typescript
interface Cat {
  name: string;
  breed: string;
}

type ReadonlyCat = Readonly<Cat>;

function makeCat(name: string, breed: string): ReadonlyCat {
  return {
    name,
    breed,
  };
}

const myCat = makeCat("Tom", "Tabby");
myCat.name = "Sylvester";
     ~~~~~~
     // Cannot assign to 'name' because it is a read-only property.
myCat.breed = "Tuxedo";
      ~~~~~~
      // Cannot assign to 'breed' because it is a read-only property.
```

### Readonly Tuples

`Readonly` type'ını aynı şekilde tuple'lar için de kullanabiliriz. Bunun için yapmamız gereken tek şey, tuple'ın başına `readonly` keyword'ünü eklemek.

```typescript
function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  return [x, y, z];
}

const c1 = makeCoordinate(10, 20, 30);
c1[0] = 50;
  ~~~
  // Cannot assign to '0' because it is a read-only property.
```

Peki `const` kullanıp bir array oluştursak ve bu array'in bir elemanını değiştirmeye çalışsak ne olur?

```typescript
const reallyConst = [1, 2, 3];
reallyConst[0] = 50;
// OK
```

Gördüğünüz gibi herhangi bir sorun olmadı. Bunun sebebi, `const` keyword'ünün, sadece değişkenin kendisini değiştirmesini engellemesidir. Ancak array'in elemanlarını değiştirmesini engellemez. Peki engellemek için ne yapmamız gerekir?

```typescript
const reallyConst: readonly number[] = [1, 2, 3];
reallyConst[0] = 50;
~~~~~~~~~~~~~~
// Index signature in type 'readonly number[]' only permits reading.
```

Ancak bu pek pratik değil. Bunun yerine başka bir yöntem daha var.

### as const

`as const` keyword'ü, bir değişkenin içindeki tüm elemanların `readonly` olmasını sağlar.

```typescript
const reallyConst = [1, 2, 3] as const;
reallyConst[0] = 50;
           ~~~
           // Cannot assign to '0' because it is a read-only property.
reallyConst2.push(4);
             ~~~~
              // Property 'push' does not exist on type 'readonly [1, 2, 3]'.
```

Bu şekilde, yani `as const` kullanarak oluşturduğumuz array'lerin elemanlarını değiştirmek mümkün değildir. `as const` o array'in tüm elemanlarını `readonly` yapar ve bu sebeple de elemanlarını değiştirmemize izin vermediği gibi yeni bir eleman da eklememize izin vermez.
