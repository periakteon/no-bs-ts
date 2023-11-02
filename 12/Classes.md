## Typescript Classes; Member Visibility and Implements

Diyelim ki bir database'imiz var ve bu database için bir `interface` oluşturmak istiyoruz. Oluşturacağımız `class`ın da bu `interface` içerisindeki metodları **implement** etmesini istiyoruz.

```typescript
interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

class InMemoryDatabase implements Database {
  db: Record<string, string> = {};

  get(id: string): string {
    return this.db[id];
  }

  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

const myDB = new InMemoryDatabase();
myDB.set("foo", "bar");
console.log(myDB.get("foo"));
// Output: bar

myDB.db["foo"] = "baz";
console.log(myDB.get("foo"));
// Output: baz
```

Yukarıdaki örnekte `InMemoryDatabase` class'ı `Database` interface'ini **implement** etti. Bu sayede `InMemoryDatabase` class'ı `Database` interface'indeki metodları içermek zorunda kaldı. Ardından bu `class` içerisinde `db` adında bir property oluşturduk ve bu property'nin tipini `Record<string, string>` olarak belirledik. Bu sayede `db` property'si bir `string` key ve `string` value içeren bir obje olmak zorunda kaldı. Sonrasında `getter` ve `setter` metodlarını oluşturduk ve bu metodların içerisinde `db` property'sine eriştik.

### Member Visibility

Yukarıdaki örnekte `db` objesini `public` olarak tanımladık. Bu sayede bu objeye her yerden erişebildik. Ancak bu objeyi `private` olarak tanımlasaydık bu objeye sadece `InMemoryDatabase` class'ı içerisinden erişebilirdik. `protected` olarak tanımlasaydık bu objeye sadece `InMemoryDatabase` class'ı ve bu class'ı `extend` eden, yani bu class'tan **miras alan** class'lar erişebilirdi.

`db` adındaki objeyi `private` olarak tanımlayalım.

```typescript

interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

class InMemoryDatabase implements Database {
  private db: Record<string, string> = {};

  get(id: string): string {
    return this.db[id];
  }

  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

const myDB = new InMemoryDatabase();
myDB.set("foo", "bar");
console.log(myDB.get("foo"));
// Output: bar

myDB.db["foo"] = "baz";
      ~~~
     // Property 'db' is private and only accessible within class 'InMemoryDatabase2'.
```

Yukarıdaki örnekte `db` objesini `private` olarak tanımladık. Bu sayede bu obje içerisindeki değerlere sadece `InMemoryDatabase` class'ı içerisinden erişebildik (**get**) veya yalnızca bu class içerisinde **set** edebildik. Ancak `myDB` adındaki obje `InMemoryDatabase` class'ının bir **instance**'ı olduğu için bu obje üzerinden `db` objesine erişmeye çalıştığımızda hata aldık.

### Extending Classes

Bir `class`'tan başka bir `class` türetmek için `extends` keyword'ünü kullanırız. Örneğin `InMemoryDatabase` class'ını `Database` interface'ini **implement** eden bir `class` olarak tanımlamıştık. Şimdi bu `class`'tan başka bir `class` türetelim.

**NOT:** `db` adını verdiğimiz objeyi `protected` olarak tanımladığımıza dikkat edelim.

```typescript
interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

class InMemoryDatabase implements Database {
  // UYARI: db objesini private olarak tanımladığımız için bu class'ı extend eden class'lar bu objeye
  // erişemeyecekler. Bu yüzden bu objeyi PROTECTED olarak tanımlamalıyız.
  protected db: Record<string, string> = {};

  get(id: string): string {
    return this.db[id];
  }

  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

class PersistentDatabase extends InMemoryDatabase implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDB = new PersistentDatabase();
myDB.set("foo", "bar");

console.log(myDB.get("foo"));
// Output: bar

// console.log(myDB.saveToString());
// Output: {"foo":"bar"}

myDB.db["foo"] = "baz";
      ~~~
     // Property 'db' is protected and only accessible within class 'InMemoryDatabase2' and its subclasses.

const saved = myDB.saveToString();

myDB.set("foo", "db1 - bar");

console.log(myDB.get("foo"));
// Output: db1 - bar

const myDB2 = new PersistentDatabase();
myDB2.restoreFromString(saved);
console.log(myDB2.get("foo"));
```

Yukarıdaki örnekte `InMemoryDatabase` class'ını `Database` interface'ini **implement** eden bir `class` olarak tanımlamıştık. Ardından `InMemoryDatabase` class'ından `PersistentDatabase` adında bir `class` türettik. Bu sayede `PersistentDatabase` class'ı `InMemoryDatabase` class'ının tüm metodlarını ve property'lerini içerdi. `PersistentDatabase` class'ı `InMemoryDatabase` class'ının tüm metodlarını ve property'lerini içerdiği için `myDB` adındaki obje üzerinden `set` ve `get` metodlarını çağırabildik. Ayrıca yeni oluşturduğumuz `class`'ta `saveToFile` adında bir metod oluşturduk ve bu metodun içerisinde `console.log` ile bir çıktı verdik. Bu sayede `myDB` adındaki obje üzerinden `saveToFile` metodunu çağırabildik.
