// # Classes implement interfaces

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

// --------------------------------------------------------------- //
// #### Member Visibility ####

interface IDatabase {
  get(id: string): string;
  set(id: string, value: string): void;
}

class InMemoryDatabase2 implements IDatabase {
  private db: Record<string, string> = {};

  get(id: string): string {
    return this.db[id];
  }

  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

const myDB2 = new InMemoryDatabase2();
myDB2.set("foo", "bar");
console.log(myDB2.get("foo"));
// Output: bar

myDB2.db["foo"] = "baz";
// Property 'db' is private and only accessible within class 'InMemoryDatabase2'.

// --------------------------------------------------------------- //
// #### Extending Classes ####

class PersistentDatabase extends InMemoryDatabase {
  saveToFile() {
    console.log("Saving to file...");
  }
}

const myDB3 = new PersistentDatabase();

myDB.set("foo", "bar");
console.log(myDB.get("foo"));
// Output: bar

myDB3.saveToFile();
// Output: Saving to file...

// --------------------------------------------------------------- //

interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

class InMemoryDatabase3 implements Database {
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

class PersistentDatabase2 extends InMemoryDatabase implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDB4 = new PersistentDatabase2();
myDB4.set("foo", "bar");

console.log(myDB4.get("foo"));
// Output: bar

// console.log(myDB.saveToString());
// Output: {"foo":"bar"}

//   myDB4.db["foo"] = "baz";
//         ~~~
// Property 'db' is protected and only accessible within class 'InMemoryDatabase2' and its subclasses.

const saved = myDB4.saveToString();

myDB4.set("foo", "db1 - bar");

console.log(myDB4.get("foo"));
// Output: db1 - bar

const myDB5 = new PersistentDatabase2();
myDB5.restoreFromString(saved);
console.log(myDB5.get("foo"));
