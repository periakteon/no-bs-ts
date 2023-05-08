# JavaScript'e Dair Sorunlar

Elimizde aşağıdaki gibi bir JavaScript kodu olduğunu düşünelim:

```js
let userName = 'Masum';
let hasLoggedIn = true;

hasLoggedIn += " Gökyüz";

console.log(hasLoggedIn);
// true Gökyüz

```

Bu JavaScript kodunu Node ile çalıştırdığımızda, Node'un `hasLoggedIn` adındaki değişkenimizi `coerce` ettiğini, yani halihazırda `boolean` tipinde olan değişkenimizi `string` tipine çevirmeye `zorladığını (*coerce*)` görüyoruz. Bu durumda `true` değerimiz `string` tipine dönüştürülmüş ve `+` operatörü ile birleştirilmiş oluyor. Aksi takdirde bu çıktıyı, yani `true Gökyüz` çıktısını alamazdık. Burada istemediğimiz bir şekilde `coerce` işlemi gerçekleşmiş oldu.

TypeScript, bu tür sorunlarla karşılaşmamak için `strict` modda çalışır. Bu modda, yukarıdaki kodu çalıştırdığımızda aşağıdaki gibi bir hata alırız:

```bash
hasLoggedIn += " Gökyüz";
             ~~~~~~~~~~~~~
error TS2365: Operator '+=' cannot be applied to types 'true' and 'string'.
```

Sonuç olarak, JavaScript kullanarak tip güvenliği sağlamak mümkün değildir. Bu nedenle, TypeScript gibi bir dil kullanmak olası hataları önlemek açısından makul görünmektedir.

***

# TypeScript Kurulumu

Öncelikle Node.js'in bilgisayarımızda kurulu olduğundan emin olalım. Node.js kurulu değilse, [buradan](https://nodejs.org/en/download/) indirip kurabiliriz.

Node.js kurulumunu tamamladıktan sonra, ilk olarak `package.json` dosyası oluşturmak için aşağıdaki komutu çalıştıralım:

```bash
npm init -y
```

Daha sonra TypeScript'i kuralım:

```bash
npm install typescript --save-dev
```

TS-Node'u da kuralım:

```bash
npm install ts-node --save-dev
```

Son olarak, `tsconfig.json` dosyasını oluşturalım:

```bash
npx tsc --init
```

Daha sonra bir TypeScript dosyası oluşturalım (ben `index.ts` olarak adlandırdım) ve az önceki JavaScript kodunu bu dosyaya kopyalayalım:

index.ts:
```ts

let userName = 'Masum';
let hasLoggedIn = true;

hasLoggedIn += " Gökyüz";

console.log(hasLoggedIn);
// true Gökyüz

```

Bunu yaptığımızda `hasLoggedIn` değişkeninin bağırdığını, yani kırmızıya yandığını ve bize bir hata fırlattığını görürüz:

```bash

Type 'string' is not assignable to type 'boolean'.ts(2322)

```

Bu hata, `hasLoggedIn` değişkeninin `boolean` tipinde olması gerektiğini (çünkü bir üst satırda `true` değeri verildiğini ve bu itibarla da `boolean` tipi olarak iş gördüğünü görüyoruz), ancak `string` tipinde olduğunu bize söylemektedir. Biz `index.ts` dosyasını çalıştırmak istediğimizde, yani `npx ts-node index.ts` komutunu çalıştırdığımızda, aşağıdaki hatayı alırız:

```bash
index.ts:4:1 - error TS2322: Type 'string' is not assignable to type 'boolean'.
4 hasLoggedIn += " Gökyüz";
  ~~~~~~~~~~~
```

***

# Tip Belirleme (*Type Specifying*)

Yukarıda yazmış olduğumuz `index.ts` dosyasına yakından bakalım. Kodu tekrar yazalım:

```ts
let userName = 'Masum';
let hasLoggedIn = true;

hasLoggedIn += " Gökyüz";
```

Bu koddaki `hasLoggedIn` değişkeninin üzerine geldiğimizde şunu görürüz: `let hasLoggedIn: boolean`. Bu hint bize `hasLoggedIn` değişkeninin `boolean` tipinde olduğunu, yani sadece `true` ya da `false` alabileceğini belirtir. `userName` değişkeninin üzerine geldiğimizde de `let userName: string` ifadesini görürüz. O zaman **artık tip belirleyebiliriz**. Tip belirlemek (*type specifying*) için iki nokta `:` kullanırız. İki noktayı, yani `:` işaretini değişkene bitiştirmemiz gerekmektedir. Yani, yukarıdaki kodu şu şekilde düzeltmemiz gerekmektedir:

```ts
let userName: string = 'Masum';
let hasLoggedIn: boolean = true;

userName += " Gökyüz";
```

Ayrıca hata almamak, yani `boolean` değeri bir `string` tipindeki ifadeyle, yani `Gökyüz` ile birleştirmemek için `hasLoggedIn += "Gökyüz";` ifadesini `userName += " Gökyüz";` olarak değiştirelim. Artık tip güvenliği (*type safety*) sağlamış olduk. Bundan böyle `hasLoggedIn` değişkenine `string` tipinde bir değer atamaya çalıştığımızda, yani `hasLoggedIn += "Gökyüz";` dediğimizde hata alacağız. Aynı şekilde `userName` değişkenine `boolean` tipinde bir değer atamaya çalıştığımızda da hata alacağız. Çünkü `userName` değişkeninin tipi `string`; `hasLoggedIn` değişkeninin tipi ise `boolean` şeklindedir.

Başka ne tür tipler vardır? Aslında JavaScript biçiminde yazdığımız kodların hangi tipte olduğunu VS Code bize söylemektedir (yukarıda olduğu gibi, değişkenin üzerine mouse ile geldiğimizde bize hint/ipucu vermektedir). `index.ts` dosyasını şu şekilde genişletelim:

```ts

let userName = 'Masum';
let hasLoggedIn = true;

userName += " Gökyüz";

console.log(hasLoggedIn);
// true Gökyüz

let myNumber = 10;
let myDecimal = 10.10;

let myRegex = /foo/;

const names = ['Masum', 'Gökyüz'];

const myNumbers = [1, 2, 3, 4, 5];

const myPerson = {
    firstName: 'Masum',
    lastName: 'Gökyüz'
};

const ids = {
    10: 'a',
    20: 'b'
}
```

Burada yazdığımız değişkenlerin üzerine geldiğimizde VS Code bize bu değişkenlerin hangi tipte olduğunu söyleyecektir. Buna göre kodu düzenleyelim:

```ts

let userName = 'Masum';
let hasLoggedIn = true;

userName += " Gökyüz";

console.log(hasLoggedIn);
// true Gökyüz

/*****************************************/

let myNumber: number = 10;
let myDecimal: number = 10.10;

/*****************************************/

let myRegex: RegExp = /foo/;

/*****************************************/

const names: string[] = ['Masum', 'Gökyüz'];
const names2: Array<string> = ['Masum', 'Gökyüz'];

/*****************************************/

const myNumbers: number[] = [1, 2, 3, 4, 5];
const myNumbers2: Array<number> = [1, 2, 3, 4, 5];

/*****************************************/

interface Person {
  firstName: string;
  lastName: string;
}

const myPerson: Person = {
    firstName: 'Masum',
    lastName: 'Gökyüz'
};

// "myPerson." yazdığımızda artık firstName ve lastName özelliklerini görebiliriz.

/*****************************************/

// Utility Type: "Record<typeX,typeY>"
const ids: Record<number, string> = {
    10: 'a',
    20: 'b'
}

ids[30] = 'c';

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

[6,7,8,9,10].map((n:number) => console.log(n));

const out: number[] = [6,7,8,9,10].map((n:number) => n*10);
const out2: Array<number> = [6,7,8,9,10].map((n:number) => n*10);

// template string kullandığımız için string array olur.
const outButAsString: string[] = [6,7,8,9,10].map((n:number) => `${n*10}`);
const outButAsString2: Array<string> = [6,7,8,9,10].map((n:number) => `${n*10}`);

```

Bu kodu ayrıca `transpile` edebiliriz, yani JavaScript koduna dönüştürebiliriz. Bunun için aşağıdaki komutu terminalimize yazalım:

```bash
npx tsc index.ts
```

Bu komutu çalıştırdıktan sonra klasörümüzde yeni bir `.js` dosyası oluşacaktır.