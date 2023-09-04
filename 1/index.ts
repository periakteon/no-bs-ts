let userName = "Masum";
let hasLoggedIn = true;

userName += " Gökyüz";

console.log(hasLoggedIn);
// true Gökyüz

/*****************************************/

let myNumber: number = 10;
let myDecimal: number = 10.1;

/*****************************************/

let myRegex: RegExp = /foo/;

/*****************************************/

const names: string[] = ["Masum", "Gökyüz"];
const names2: Array<string> = ["Masum", "Gökyüz"];

/*****************************************/

const myNumbers: number[] = [1, 2, 3, 4, 5];
const myNumbers2: Array<number> = [1, 2, 3, 4, 5];

/*****************************************/

interface Person {
  firstName: string;
  lastName: string;
}

const myPerson: Person = {
  firstName: "Masum",
  lastName: "Gökyüz",
};

// "myPerson." yazdığımızda artık firstName ve lastName özelliklerini görebiliriz.

/*****************************************/

// Utility Type: "Record<typeX,typeY>"
const ids: Record<number, string> = {
  10: "a",
  20: "b",
};

ids[30] = "c";

// Record utility sayesinde aşağıdaki gibi bir if ifadesinde tip hatası almayız.
if (ids[30] === "D") {
  // ...
}

/*****************************************/

for (let i: number = 0; i < 10; i++) {
  console.log(i);
}

/*****************************************/

[1, 2, 3, 4, 5].forEach((n: number) => console.log(n));

[6, 7, 8, 9, 10].map((n: number) => console.log(n));

const out: number[] = [6, 7, 8, 9, 10].map((n: number) => n * 10);
const out2: Array<number> = [6, 7, 8, 9, 10].map((n: number) => n * 10);

// template string kullandığımız için string array olur.
const outButAsString: string[] = [6, 7, 8, 9, 10].map(
  (n: number) => `${n * 10}`,
);
const outButAsString2: Array<string> = [6, 7, 8, 9, 10].map(
  (n: number) => `${n * 10}`,
);
