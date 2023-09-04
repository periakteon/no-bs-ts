# No BullShit TypeScript Notes

Jack Herrington's No BS TS Notes

https://www.youtube.com/playlist?list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n

**Not:** "İçindekiler" listesi en son eklenecektir.

---

# JavaScript'e Dair Sorunlar

Elimizde aşağıdaki gibi bir JavaScript kodu olduğunu düşünelim:

```js
let userName = "Masum";
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

---

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
let userName = "Masum";
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

---

# Tip Belirleme (_Type Specifying_)

Yukarıda yazmış olduğumuz `index.ts` dosyasına yakından bakalım. Kodu tekrar yazalım:

```ts
let userName = "Masum";
let hasLoggedIn = true;

hasLoggedIn += " Gökyüz";
```

Bu koddaki `hasLoggedIn` değişkeninin üzerine geldiğimizde şunu görürüz: `let hasLoggedIn: boolean`. Bu hint bize `hasLoggedIn` değişkeninin `boolean` tipinde olduğunu, yani sadece `true` ya da `false` alabileceğini belirtir. `userName` değişkeninin üzerine geldiğimizde de `let userName: string` ifadesini görürüz. O zaman **artık tip belirleyebiliriz**. Tip belirlemek (_type specifying_) için iki nokta `:` kullanırız. İki noktayı, yani `:` işaretini değişkene bitiştirmemiz gerekmektedir. Yani, yukarıdaki kodu şu şekilde düzeltmemiz gerekmektedir:

```ts
let userName: string = "Masum";
let hasLoggedIn: boolean = true;

userName += " Gökyüz";
```

Ayrıca hata almamak, yani `boolean` değeri bir `string` tipindeki ifadeyle, yani `Gökyüz` ile birleştirmemek için `hasLoggedIn += "Gökyüz";` ifadesini `userName += " Gökyüz";` olarak değiştirelim. Artık tip güvenliği (_type safety_) sağlamış olduk. Bundan böyle `hasLoggedIn` değişkenine `string` tipinde bir değer atamaya çalıştığımızda, yani `hasLoggedIn += "Gökyüz";` dediğimizde hata alacağız. Aynı şekilde `userName` değişkenine `boolean` tipinde bir değer atamaya çalıştığımızda da hata alacağız. Çünkü `userName` değişkeninin tipi `string`; `hasLoggedIn` değişkeninin tipi ise `boolean` şeklindedir.

Başka ne tür tipler vardır? Aslında JavaScript biçiminde yazdığımız kodların hangi tipte olduğunu VS Code bize söylemektedir (yukarıda olduğu gibi, değişkenin üzerine mouse ile geldiğimizde bize hint/ipucu vermektedir). `index.ts` dosyasını şu şekilde genişletelim:

```ts
let userName = "Masum";
let hasLoggedIn = true;

userName += " Gökyüz";

console.log(hasLoggedIn);
// true Gökyüz

let myNumber = 10;
let myDecimal = 10.1;

let myRegex = /foo/;

const names = ["Masum", "Gökyüz"];

const myNumbers = [1, 2, 3, 4, 5];

const myPerson = {
  firstName: "Masum",
  lastName: "Gökyüz",
};

const ids = {
  10: "a",
  20: "b",
};
```

Burada yazdığımız değişkenlerin üzerine geldiğimizde VS Code bize bu değişkenlerin hangi tipte olduğunu söyleyecektir. Buna göre kodu düzenleyelim:

```ts
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
```

Bu kodu ayrıca `transpile` edebiliriz, yani JavaScript koduna dönüştürebiliriz. Bunun için aşağıdaki komutu terminalimize yazalım:

```bash
npx tsc index.ts
```

Bu komutu çalıştırdıktan sonra klasörümüzde yeni bir `.js` dosyası oluşacaktır.

---

---

# Functions

## Primitive Types

Bir fonksiyona type vermek:

```ts
export default function addNumbers(a: number, b: number): number {
  return a + b;
}
```

Burada `a` ve `b` parametrelerine `number` type'ı vermiş olduk. Ayrıca fonksiyonun dönüş değerinin de `number` olacağını belirttik.

Peki `arrow function`lar nasıl yazılır?

```ts
export const addStrings = (str1: string, str2: string): string =>
  `${str1} ${str2}`;

export const addStringsWithDefaultValue = (
  str1: string,
  str2: string = "World",
): string => `${str1} ${str2}`;
```

Burada `addStrings` fonksiyonu `str1` ve `str2` parametrelerini alıyor ve dönüş değeri olarak `string` döndürüyor. `addStringsWithDefaultValue` fonksiyonu ise `str2` parametresine `default` bir değer veriyor.

## Union Type

Bir fonksiyonun parametrelerine birden fazla type vermek için `union` kullanabiliriz.

```ts
export const format = (title: string, param: string | number): string =>
  `${title} ${param}`;
```

Burada `param` parametresine `string` veya `number` type'ı vermiş olduk. Yani, `format` fonksiyonu `title` parametresine `string` ve `param` parametresine ise `string` veya `number` type'ı alabilir. Ayrıca bu fonksiyonun dönüş type'ı da `string` olacaktır.

## Void Functions

Peki hiçbir şey `return` etmeyen, yani `void` fonksiyonlara nasıl type veririz?

```ts
export const printFormat = (title: string, param: string | number): void => {
  console.log(format(title, param));
};
```

Burada `printFormat` fonksiyonu `format` fonksiyonunu çağırıyor ve `console.log` ile ekrana yazdırıyor. Bu fonksiyonun, yani `printFormat` fonksiyonunun dönüş değeri ise `void`tir. Yani, bize hiçbir şey `return` etmez.

## Promise Functions

Bir fonksiyonun `Promise` döndürmesi için `Promise` type'ını kullanabiliriz.

```ts
export const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`Data from ${url}`);
```

Burada `fetchData` fonksiyonu `url` parametresine `string` alıyor ve dönüş değeri olarak `Promise<string>` döndürüyor. Yani, bu fonksiyon bize bir `Promise` döndürüyor ve bu `Promise`'in dönüş değeri `string` oluyor.

## Rest Parameters

Bir fonksiyona `rest` parametreleri vermek için `...` kullanabiliriz.

```ts
export const introduce = (salutation: string, ...names: string[]): string =>
  `${salutation} ${names.join(" ")}`;
```

Burada `introduce` fonksiyonu `salutation` parametresine `string` alıyor ve `names` parametresi ise `...` ile `rest` parametrelerini alıyor. Bu fonksiyonun dönüş değeri ise `string` oluyor. Örneğin, `introduce('Hello', 'John', 'Doe')` şeklinde kullanabiliriz. Bu fonksiyon bize `Hello John Doe` döndürecektir. Buradaki `Hello` ifadesi `salutation` parametresine, `John` ve `Doe` ise `names` parametresine denk düşmektedir.

## Object Types

Bir fonksiyonun parametresine `object` vermek için aşağıdaki gibi bir şey yapabiliriz:

```ts
export function getName(user: { first: string; last: string }): string {
  return `${user.first} ${user.last}`;
}
```

Burada `getName` fonksiyonu bir parametre olarak `user`i alıyor ve bu `user` de esasen bir `object`tir. Dönüş değeri olarak `string` döndürüyor. Bu fonksiyonu aşağıdaki gibi kullanabiliriz:

```ts
getName({ first: "John", last: "Doe" });
// John Doe
```

---

---

## Function Parameters

Diyelim ki bir fonksiyon oluşturmak istiyorsunuz ve bu fonksiyonun ``callback` desteklemesini istiyorsunuz. Örneğin, bir dosyaya yazma fonksiyonu oluşturmak istediğinizi düşünelim.

```ts
export function printToFile(text: string, callback: () => void): void {
  console.log(text);
  callback();
}
```

Bu fonksiyon birinci parametresine `text` adında bir `string` alıyor ve ikinci parametresine `callback` adında bir fonksiyon alıyor. Bu `callback` fonksiyonu `void` döndürüyor. Aynı şekilde `printToFile` fonksiyonu da `void` döndürüyor. Yani, bize bir şey `return` Bu fonksiyonu kullanmak için aşağıdaki gibi kullanabilirsiniz.

```ts
printToFile("Hi, there!", () => console.log("Callback"));
```

Bu fonksiyonun çıktısı, yani output'u şu şekilde olacaktır:

```ts
Hi, there!;
Callback;
```

---

## Function With Params

Parametre olarak `number[]` (sayı dizisi) alan bir `array mutation function` oluşturalım.

```ts
export function arrayMutate(
  numbers: number[],
  mutate: (v: number) => number,
): number[] {
  return numbers.map(mutate);
}
```

Bu fonksiyon `numbers` adında bir `number[]` ve `mutate` adında bir fonksiyon alıyor. `mutate` fonksiyonu kendi içerisinde bir parametre olarak `number` değeri (**v**) alıyor ve bir `number` döndürüyor (`(v: number) => number`). `arrayMutate` fonksiyonu da sonuç olarak bize `number[]` döndürüyor. En son olarak da bu fonksiyon bize `numbers` dizisini `map` fonksiyonu ile `mutate` fonksiyonuna gönderiyor. Örnek olarak aşağıdaki gibi kullanabiliriz.

```ts
console.log(arrayMutate([1, 2, 3], (v) => v * 10));
// Output: [10, 20, 30]
```

Bu örnek kullanımda aslında şunu yapmış olduk: İlk olarak `arrayMutate` fonksiyonuna sayılardan oluşan bir diziyi (**number[]**) ilk parametre (**[1, 2, 3]**) olarak verdik. İkinci parametre olarak da bir fonksiyon verdik. Bu fonksiyonun içerisinde bir parametre olarak **v** adında bir sayı aldık ve bu sayıyı 10 ile çarptık. Bu çarpım sonucunda ortaya çıkan değerleri de `numbers.map()` fonksiyonuna parametre olarak verdik. Bu fonksiyon da bize sonuç olarak bir sayı dizisi (**number[]**) döndürdü (hatırlayın, fonksiyonumuzun dönüş type'ı `number[]` şeklindeydi).

`arrayMutate` fonksiyonunu okumak ilk bakışta biraz zor olabilir. Bu yüzden bu fonksiyona atamak için yeni bir `type` oluşturalım ve daha sonrasında da fonksiyona atayalım.

```ts
type MutationFunction = (v: number) => number;

export function arrayMutateButMoreReadable(
  numbers: number[],
  mutate: MutationFunction,
): number[] {
  return numbers.map(mutate);
}
```

Bu şekilde daha okunabilir bir hale geldi.

---

Ayrıca `arrow function` oluşturduğumuzda da bu `type`ı aşağıdaki gibi kullanabiliriz:

```ts
export const myNewMutation: MutationFunction = (v) => v * 100;
console.log(myNewMutation(3));
// Output: 300
```

`arrow function` oluştururken `type`ı parametreleri yazarken de belirtebiliriz ancak bu okunuşu zaman zaman zorlaştırabilir. Örneğin:

```ts
const mutationArrowFunction = (
  n: number[],
  mutate: (v: number) => number,
): number[] => {
  return n.map(mutate);
};

console.log(mutationArrowFunction([1, 2, 3], (v) => v * 10));
// Output: [10, 20, 30]
```

Aynı fonksiyonu yeni bir `type` oluşturarak yazalım:

```ts
type ArrowFunctionMutation = (
  numbers: number[],
  mutate: (v: number) => number,
) => number[];

const mutationArrowFunctionButMoreReadable: ArrowFunctionMutation = (
  n,
  mutate,
) => {
  return n.map(mutate);
};

console.log(mutationArrowFunctionButMoreReadable([1, 2, 3], (v) => v * 10));
// Output: [10, 20, 30]
```

Bu şekilde daha okunabilir bir hale geldiğini söyleyebiliriz.

---

İşleri biraz daha karmaşıklaştırıp `arrow function`ın `type`ını tanımlarken bir `object` olarak da `type` verebiliriz. Örneğin:

```ts
type ArrowFunctionMutationButAsObject = {
  numbers: number[];
  mutate: (v: number) => number;
};

export const arrowFunctionMutationButObject = (
  data: ArrowFunctionMutationButAsObject,
): number[] => {
  return data.numbers.map(data.mutate);
};
console.log(
  arrowFunctionMutationButObject({ numbers: [1, 2, 3], mutate: (v) => v * 10 }),
);
// Output: [10, 20, 30]
```

Gördüğünüz üzere, bu sefer `arrowFunctionMutationButObject` adındaki fonksiyona parametre olarak bir `object` verdik. Bu `object`in içerisinde `numbers` ve `mutate` adında iki adet `property` var. `numbers` adındaki `property` bir `number[]` alıyor ve `mutate` adındaki `property` bir `(v: number) => number` alıyor. Bu `object`i fonksiyonumuza parametre olarak verdiğimizde de `numbers` ve `mutate` adındaki `property`leri `map` fonksiyonuna parametre olarak veriyoruz. Bu fonksiyon da bize sonuç olarak bir sayı dizisi (**number[]**) döndürüyor.

---

## Returning Functions

Bir fonksiyonun dönüş değeri olarak başka bir fonksiyon döndürebiliriz. Klasik bir JavaScript `closure` örneği olarak aşağıdaki fonksiyonu yazabiliriz:

```ts
export function createAdder(num: number) {
  return (val: number) => num + val;
}

const addOne = createAdder(1);
console.log(addOne(55));
// Output: 56
```

İlk olarak `createAdder` adında bir fonksiyon oluşturduk ve bu fonksiyon parametre olarak bir `num (number)` alıyor. Ardından bize `return` değeri olarak bir `arrow function` döndürüyor. Bu `arrow function` da bir `val (number)` alıyor ve bu `val` değerini `num` ile toplayıp sonucu döndürüyor. Daha sonrasında `addOne` adında bir değişken oluşturduk ve bu değişken içerisinde `createAdder` fonksiyonunu `1` parametresi ile çağırdık. Bu fonksiyon bize bir `arrow function` döndürdüğü için `addOne` adındaki değişken aslında bir `arrow function` olmuş oldu. Daha sonrasında da `addOne` fonksiyonunu `55` parametresi ile çağırdık ve sonucu ekrana yazdırdık.

Ancak `createAdder` fonksiyonunun `return type`ını belirlemedik. Bu fonksiyonun nasıl bir `return type`ına sahip olduğunu görmek için VSCode'da bu fonksiyonun üzerine gelebiliriz ve `return type`ını görebiliriz (çünkü TypeScript bize bu fonksiyonun `type`ını infer edebiliyor): `function createAdder(num: number): (val: number) => number`. Öyleyse bunu kopyalayıp fonksiyonumuza yapıştıralım:

```ts
export function createAdder(num: number): (val: number) => number {
  return (val: number) => num + val;
}
```

Bu şekilde fonksiyonumuzun `return type`ını da belirlemiş olduk.

---

Eğer bu fonksiyonun okunuşu biraz zor geliyorsa, `type`ını bir değişkene atayabiliriz:

```ts
type AdderFunction = (val: number) => number;

export function createAdderButMoreReadable(num: number): AdderFunction {
  return (val: number) => num + val;
}
```

Bu şekilde daha okunabilir bir hale geldiğini söyleyebiliriz.

---

---

## Function Overloading'e Giriş

`Function Overloading` ne yazık ki TypeScript'in en çok gözden kaçan özelliklerinden biridir. Bu özellik sayesinde aynı isimde fakat farklı parametreler alan fonksiyonlar tanımlayabiliriz. Bu sayede aynı fonksiyonu farklı parametrelerle kullanabiliriz.

`parseCoordinate.ts` adında bir dosya oluşturalım. Bu dosyada koordinatın **ne olduğunu** tesis etmek için öncelikle bir `interface` tanımlayalım.

```ts
interface Coordinate {
  x: number;
  y: number;
}
```

Şimdi de `parseCoordinate` adında bir fonksiyon tanımlayalım. Bu fonksiyon `Coordinate` tipinde bir `obj` alsın ve yine `Coordinate` tipinde bir `obj` döndürsün.

```ts
function parseCoordinateFromObject(obj: Coordinate): Coordinate {
  return {
    ...obj,
  };
}

// Example usage
const coordinate = parseCoordinateFromObject({
  x: 12,
  y: 21,
});
console.log(coordinate);
// { x: 12, y: 21 }
```

Burada `spread operatörü` kullanmamızın asıl nedeni `obj`'nin referansını kopyalamak değil, `obj`'nin içindeki değerleri kopyalamaktır. Yani, `obj`'nin referansını kopyalasaydık, `obj`'nin içindeki değerler değiştiğinde `return` edilen değer de değişecekti. Fakat biz `obj`'nin içindeki değerleri kopyaladığımız için `obj`'nin içindeki değerler değişse bile `return` edilen değer değişmeyecektir. Sonuç olarak bu kopyalama işlemi, `parseCoordinate` fonksiyonunun çağrıldığı yerde, orijinal `obj` nesnesinin referansını koruyarak **yeni** bir nesne döndürmek için yapılır. Bu sayede, orijinal `obj` nesnesi değiştirilmeden kalır ve fonksiyonun döndürdüğü nesne üzerinde istenilen değişiklikler yapılabilir. Bunu daha basit bir örnek üzerinden şöyle de anlatabiliriz:

```ts
const originalObject = { a: 1, b: 2 };
const copiedObject = { ...originalObject };

console.log(copiedObject); // { a: 1, b: 2 }
console.log(originalObject === copiedObject); // false

const originalObject = { a: 1, b: 2 };
const copiedObject = { ...originalObject };

console.log(copiedObject); // { a: 1, b: 2 }
console.log(originalObject === copiedObject); // false
```

Yukarıdaki örnekte, `originalArray` adlı bir dizi oluşturulur. Sonrasında `copiedArray` adlı yeni bir dizi, spread operatörü kullanılarak `originalArray`'in tüm elemanlarıyla oluşturulur. console.log kullanılarak her iki dizinin değerleri ve `=== (sıkı eşitlik)` ile referans kontrolü yapılır. Sonuç olarak, iki dizi **_aynı elemanlara_ sahip olmasına rağmen _farklı referanslara_ sahip**tir. Aynı durum `object`'ler için de geçerlidir.

Bununla ilgili başka bir örnek daha verelim:

```ts
function cloneArray(arr: number[]): number[] {
  return [...arr];
}

const originalArray = [1, 2, 3];
const clonedArray = cloneArray(originalArray);

originalArray[0] = 10;

console.log(originalArray); // [10, 2, 3]
console.log(clonedArray); // [1, 2, 3]
```

Bu örnekte, `cloneArray` fonksiyonu, `arr` dizisinin değerlerini spread operatörü kullanarak yeni bir dizi oluşturur. Oluşturulan bu yeni dizi, orijinal dizinin bir kopyasıdır. Sonrasında, `originalArray` dizisinin ilk elemanı değiştirilir, ancak `clonedArray` dizisi değişmez. Bu, `spread operatörü`nün kullanıldığı durumlarda orijinal verinin değişmesini önlemek için yapılan bir kopyalama işlemidir.

Bu nedenle, `spread operatörü (...)` kullanılarak bir nesnenin veya dizinin içindeki değerlerin kopyalanması, orijinal verinin değişmesini önlemek ve yeni bir veri üzerinde değişiklikler yapabilmek için yaygın bir kullanımdır.

---

Benzer bir işlemi `object` üzerinden yapmak yerine `number` üzerinden yapalım.

## Function Overloading

Aynı isme sahip fakat farklı parametreler alan fonksiyonlar tanımlayabiliriz. Bu sayede aynı fonksiyonu farklı parametrelerle kullanabiliriz. Bu duruma `Function Overloading` denir.

```ts
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };
  if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as Coordinate),
    };
  } else if (typeof arg1 === "number" && typeof arg2 === "number") {
    coord = {
      x: arg1,
      y: arg2,
    };
  }
  return coord;
}
```

Biraz karışık göründüğünün farkındayım. Ancak bu fonksiyonda yaptığımız her adımı tek tek açıklayalım.

İlk olarak, `parseCoordinate` fonksiyonunu 3 farklı şekilde tanımladık. İlk tanımlamada fonksiyonun tek bir parametre alacağını ve bu parametrenin `Coordinate` tipinde bir `obj` olacağını belirttik. İkinci tanımlamada fonksiyonun iki parametre alacağını ve bu parametrelerin `number` tipinde olacağını belirttik. Son tanımlamada ise fonksiyonun birinci parametresinin `unknown` tipinde, ikinci parametresinin ise `optional` olduğunu belirttik. Bu tanımlamaların hepsinde tüm fonksiyonların `Coordinate` tipinde bir `obj` döndüreceğini belirttik. Kaldığımız yerden devam etmeden önce `unknown` tipinin ne olduğunu açıklayalım.

#### `unknown` tipi nedir?

`unknown` tipi, `any` tipine benzer. Ancak `any` tipinden farklı olarak `unknown` tipi, `type-checking` işleminden geçirilmeden kullanılamaz. Yani, `unknown` tipinde bir değişken tanımladığımızda, bu değişkeni kullanmadan önce `type-checking` işleminden geçirmemiz gerekir. Bu işlemi `typeof` operatörü ile yapabiliriz. Örneğin:

```ts
let value:
  | string
  | number
  | boolean
  | object
  | symbol
  | (() => void)
  | undefined
  | bigint;

// Örnek 1: String
value = "Merhaba dünya!";
if (typeof value === "string") {
  console.log(value.toUpperCase()); // Çıktı: "MERHABA DÜNYA!"
}

// Örnek 2: Number
value = 3.14159;
if (typeof value === "number") {
  console.log(value.toFixed(2)); // Çıktı: "3.14"
}

// Örnek 3: Boolean
value = true;
if (typeof value === "boolean") {
  console.log(value ? "TRUE" : "FALSE"); // Çıktı: "TRUE"
}

// Örnek 4: Object
value = { name: "John", age: 30 };
if (typeof value === "object") {
  console.log(JSON.stringify(value)); // Çıktı: "{"name":"John", "age":30}
}

// Örnek 5: Symbol
value = Symbol("mySymbol");
if (typeof value === "symbol") {
  console.log(value.toString()); // Çıktı: "Symbol(mySymbol)"
}

// Örnek 6: Function
value = () => console.log("Hello");
if (typeof value === "function") {
  console.log(value.toString()); // Çıktı: "() => console.log("Hello")"
}

// Örnek 7: Undefined
value = undefined;
if (typeof value === "undefined") {
  console.log(value); // Çıktı: "undefined"
}

// Örnek 8: BigInt
value = BigInt(10);
if (typeof value === "bigint") {
  console.log(value.toString()); // Çıktı: "10"
}
```

Sonuç olarak TypeScript'te, `unknown` türü, belirsiz olan veya henüz bilinmeyen türleri temsil etmek için kullanılan bir türdür. `unknown` türü, JavaScript'teki `any` türünden daha güvenli bir alternatif olarak sunulmuştur. `unknown` türü, hiçbir tipe otomatik olarak dönüştürülmez veya hiçbir işlem yapılamaz. Bu türü kullanarak, tür güvenliğini sağlamak için ek kontrol ve işlemler yapmanız gerekebilir.

`unknown` türü, herhangi bir türe otomatik olarak dönüştürülmez. Bu nedenle, `value` değişkenini kullanırken önceden belirlenmiş bir tipe dönüştürmek veya kontrol etmek gerekebilir. Bunun için `type casting` (_tür dönüştürme_) kullanılır.

`Type casting` veya `tür dönüştürme`, bir değişkenin türünü açıkça belirtmek için kullanılan bir işlemdir. Bu işlem, TypeScript derleyicisine, değişkenin belirli bir türüne sahip olduğunu bildirir. Böylece, derleyici, ilgili tür üzerinde doğru tür denetimlerini yapabilir ve ilgili türün yöntemlerini veya özelliklerini kullanabilirsiniz.

TypeScript'te `type casting` iki şekilde yapılabilir: `as` operatörü veya `< >` (_köşeli parantez_) syntax'ı.

```ts
let value: unknown;

// Type casting with 'as' operator
let strLength1 = (value as string).length;

// Type casting with '<>' syntax
let strLength2 = (<string>value).length;
```

Yukarıdaki örnekte, `value` değişkeni `unknown` tipindedir ve `.length` özelliğine sahip olmayan bir tiptir. Ancak, `type casting` kullanarak value değişkeninin bir `string` olduğunu belirtiyoruz. Böylece, `strLength1` ve `strLength2` değişkenleri, `value` değişkeninin _string uzunluğunu_ içerecektir.

`Type casting` kullanırken dikkat etmeniz gereken nokta, doğru olmayan bir tip dönüştürmesi yapmaktan kaçınmaktır. Uygun bir tip dönüştipme yapmadan önce, value değişkeninin gerçek tipini doğrulamak veya kontrol etmek için uygun kontroller yapmanız önemlidir.

---

Şimdi kaldığımız yerden devam edebiliriz. Elimizde en son aşağıdaki gibi bir `Function Overloading` örneği vardı:

```ts
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };
  if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as Coordinate),
    };
  } else if (typeof arg1 === "number" && typeof arg2 === "number") {
    coord = {
      x: arg1,
      y: arg2,
    };
  }
  return coord;
}

// Example usage

// Ok

const coordinate1 = parseCoordinate(10, 20);
const coordinate2 = parseCoordinate({ x: 52, y: 35 });
console.log(coordinate1, coordinate2);
// Çıktı: {x: 10, y: 20} {x: 52, y: 35}

// Error

const coordinate3 = parseCoordinate("52", "35");
const coordinate4 = parseCoordinate({ x: 52 });
console.log(coordinate3, coordinate4);
// Çıktı: {x: 0, y: 0} {x: 52}
```

Yukarıdaki örnekte, `parseCoordinate` fonksiyonu iki farklı `function signature`a sahiptir. İlk imza (_signature_), `obj` parametresi olarak bir `Coordinate` nesnesi alırken, ikinci imza `number` tipinde olmak üzere `x` ve `y` parametrelerini alır.

Fonksiyonun gövdesindeki `typeof` ifadeleri, verilen argümanların tiplerini kontrol etmek için kullanılmıştır.

İlk olarak, `arg1` parametresinin bir `obje` olup olmadığı kontrol edilir ve `tip dönüştürmesi` ile `coord` nesnesine atılır.

İkinci olarak, `arg1` ve `arg2` parametrelerinin sırasıyla `number` türünde olup olmadığı kontrol edilir ve bu değerler `coord` nesnesine atanır.

Bu şekilde, `parseCoordinate` fonksiyonu, gelen argümanlara bağlı olarak farklı işlemler gerçekleştirir ve uygun tip kontrolleriyle güvenli bir şekilde çalışır.

---

Peki aynı fonksiyona bir de `string` tipinde bir parametre eklemek isteseydik ne yapardık?

```ts
/*******************************************************************************************/

interface Coordinate {
  x: number;
  y: number;
}

function parseCoordinateWithString(str: string): Coordinate;
function parseCoordinateWithString(obj: Coordinate): Coordinate;
function parseCoordinateWithString(x: number, y: number): Coordinate;
function parseCoordinateWithString(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };
  if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as Coordinate),
    };
  } else if (typeof arg1 === "string") {
    (arg1 as string).split(",").forEach((str) => {
      const [key, value] = str.split(":");
      coord[key as "x" | "y"] = parseInt(value, 10);
    });
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }
  return coord;
}

// Example usage

const coordinate5 = parseCoordinateWithString("x:12,y:21");
console.log(coordinate5);
// { x: 12, y: 21 }
```

Bu TypeScript kodu, `Coordinate` adında bir arabirim (_interface_) tanımlıyor ve `parseCoordinateWithString` adında bir fonksiyon içeriyor.

`Coordinate` arabirimi, `x` ve `y` olmak üzere iki sayısal özelliğe sahiptir.

Fonksiyon, üç farklı aşırı yüklemeye (_overload_) sahiptir. Her bir aşırı yüklemesi, farklı parametre kombinasyonlarına sahiptir:

1. `parseCoordinateWithString(str: string): Coordinate;`

   - Bu aşırı yükleme, bir dize (_string_) parametresi alır ve bu dizeden bir `Coordinate` nesnesi döndürür.

2. `parseCoordinateWithString(obj: Coordinate): Coordinate;`

   - Bu aşırı yükleme, bir `Coordinate` nesnesi parametresi alır ve bu nesneyi doğrudan döndürür.

3. `parseCoordinateWithString(x: number, y: number): Coordinate;`
   - Bu aşırı yükleme, iki ayrı sayısal parametre alır (`x` ve `y`) ve bu parametrelerle yeni bir `Coordinate` nesnesi oluşturarak döndürür.

Ana fonksiyon olan `parseCoordinateWithString(arg1: unknown, arg2?: unknown): Coordinate` ise bu üç aşırı yüklemeyi içerir. Bu fonksiyonun aldığı ilk parametre `arg1` adıyla belirtilir ve ikinci parametre ise isteğe bağlı olarak `arg2` olarak adlandırılır.

Fonksiyonun gerçek işlevi şu şekildedir:

1. İlk olarak, `coord` adında bir `Coordinate` nesnesi oluşturulur ve varsayılan olarak `{ x: 0, y: 0 }` değerleri atanır.

2. Ardından, `arg1` parametresinin tipine göre bir kontrol yapılır. Eğer `arg1` bir nesne ise (`typeof arg1 === "object"`), `coord` nesnesi, `arg1` nesnesinin özelliklerini alarak güncellenir.

3. Eğer `arg1` bir dize (_string_) ise, dizeyi parçalamak için `split(",")` yöntemi kullanılır ve her bir parçayı işlemek için `forEach` döngüsü kullanılır. Her parça, `":"` karakterine göre ayrıştırılır ve `key` ve `value` adlı değişkenlere atanır. `key` değeri, `x` veya `y` olabilir. `value` değeri ise bir sayıya (`parseInt(value, 10)`) dönüştürülerek `coord` nesnesinin ilgili özelliğine atanır.

4. Eğer yukarıdaki kontrollerin hiçbiri geçerli değilse, yani `arg1` ne bir nesne ne de bir dize değilse, `arg1` parametresi `x` ve `arg2` parametresi ise `y` olarak kabul edilerek yeni bir `Coordinate` nesnesi oluşturulur.

5. Son olarak, `coord` nesnesi döndürülür.

Kodun kullanım örneğinde, `parseCoordinateWithString` fonksiyonu `"x:12,y:21"` dizesiyle çağrılır ve dönen `Coordinate` nesnesi `coordinate5` değişkenine atanır. Bu nesne, `x` değeri **12** ve `y` değeri **21** olan bir koordinatı temsil eder. `console.log(coordinate5)` ifadesiyle bu nesne konsola yazdırılır. Sonuç olarak, `{ x: 12, y: 21 }` çıktısı elde edilir.

---

## Optional Parameters (İsteğe Bağlı Parametreler)

Bir tarifteki malzemeleri yazdıran bir fonksiyon yazdığımızı düşünelim:

```ts
function printIngredient(quantity: string, ingredient: string) {
  console.log(`${quantity} ${ingredient}`);
}

console.log(printIngredient("1C", "Flour"));
// Output: 1C Flour
```

Diyelim ki bu malzemelere başka bir şey daha eklemek istiyoruz. Ancak bu sefer hata alırız çünkü `printIngredient` fonksiyonu yalnızca iki parametre/argüman almaktadır: `quantity` ve `ingredient`.

```ts
printIngredient("1C", "Flour", "something more");
// ERROR: Expected 2 arguments, but got 3.
```

Bu hatayı almamak için ilk olarak ne yapabiliriz? Elbette `printIgredient` fonksiyonuna başka bir parametre daha eklerdik:

```ts
function printIngredient(quantity: string, ingredient: string, extra: string) {
  console.log(`${quantity} ${ingredient} ${extra}`);
}

console.log(printIngredient("1C", "Flour", "something more"));
// Output: 1C Flour something more
```

Ancak bu sefer de `extra` parametresini kullanmak istemediğimiz durumlarda hata alırız:

```ts
console.log(printIngredient("1C", "Flour"));
// ERROR: Expected 3 arguments, but got 2.
```

İşte tam da bu sorunu çözmek için **isteğe bağlı parametreler** kullanırız. İsteğe bağlı parametreler (_optional parameters_), parametrelerin sonuna soru işareti (`?`) ekleyerek oluşturulur:

```ts
function printIngredient(quantity: string, ingredient: string, extra?: string) {
  console.log(`${quantity} ${ingredient} ${extra ? extra : ""}`);
}

console.log(printIngredient("1C", "Flour"));
// Output: 1C Flour

console.log(printIngredient("1C", "Flour", "something more"));
// Output: 1C Flour something more
```

İşte bu sayede `extra` parametresini kullanmak istemediğimiz durumlarda hata almazken, kullanmak istediğimiz durumlarda da herhangi bir sorun yaşamaksızın bu parametreyi kullanabiliriz.

---

## Optional Fields (İsteğe Bağlı Alanlar)

İsteğe bağlı parametrelerin yanı sıra, isteğe bağlı alanlar (_optional fields_) da tanımlayabiliriz. İsteğe bağlı alanlar, bir nesnenin içindeki alanlardır. Örneğin, bir `User` nesnesi tanımlayalım:

```ts
interface User {
  id: string;
  info?: {
    email?: string;
  };
}
```

Bu `User` nesnesinin içinde `info` adında bir alan bulunmaktadır. Bu alanın içinde de `email` adında bir alan bulunmaktadır. Ancak bu alanların ikisi de isteğe bağlıdır. Yani `User` nesnesinin içinde `info` alanı bulunmayabilir. Ya da `info` alanı bulunsa bile, `email` alanı bulunmayabilir. Yani, bu iki alan da `undefined` olabilir.

Bir e-mail bulma fonksiyonu yazalım:

```ts
function getEmail(user: User): string {
  if (user.info) {
    return user.info.email;
  }

  return "";
}
```

Ancak bu fonksiyonu daha çalıştırmadan bile bir hata alırız:

```ts

Type 'string | undefined' is not assignable to type 'string'.

```

Bu hatanın sebebi, `user.info.email` ifadesinin `string | undefined` tipinde bir değer döndürmesidir. Yani bu ifade, ya bir `string` değer döndürür, ya da `undefined` döndürür. Ancak bizim fonksiyonumuz `string` tipinde bir değer döndürmektedir. Bu yüzden de `user.info.email` ifadesinin `string` tipinde bir değer döndüreceğini TypeScript'ten daha iyi bilerek, `string` tipinde bir değer döndüreceğinden emin olduğumuzu belirtmeliyiz. Bunun için `!` operatörünü kullanırız. Bu operatör, bir değerin `undefined` olmadığını belirtir:

```ts
function getEmail(user: User): string {
  if (user.info) {
    return user.info.email!;
  }

  return "";
}
```

Ancak bu yöntem pek de sağlıklı bir yöntem değildir. Bu hatadan kurtulmanın çok daha kolay bir yolu vardır:

```ts
function getEmail(user: User): string {
  return user?.info?.email ?? "email is undefined";
}
```

Burada `coalescing` operatörü olan `??` operatörünü kullanıyoruz. Bu operatör, bir değerin `undefined` olup olmadığını kontrol eder. Eğer `undefined` ise, **sağ** tarafındaki değeri döndürür. Eğer `undefined` değilse, **sol** tarafındaki değeri döndürür. Yani, `user?.info?.email` ifadesi `undefined` ise, `email is undefined` değerini döndürür. Eğer `undefined` değilse, `user.info.email` ifadesinin döndürdüğü değeri döndürür.

---

## Optional Callbacks (İsteğe Bağlı Callback Fonksiyonlar)

İsteğe bağlı parametreler ve isteğe bağlı alanlar gibi, isteğe bağlı callback fonksiyonları (_optional callback functions_) da tanımlayabiliriz. Örneğin, bir `addWithCallback` fonksiyonu tanımlayalım:

```ts
function addWithCallback(x: number, y: number, callback?: () => void) {
  console.log(x + y);
  callback?.();
}
```

Bu fonksiyon, `x` ve `y` parametrelerini toplar ve sonucu konsola yazdırır. Eğer `callback` parametresi de verilmişse, o zaman bu fonksiyonu da en son çağırır (_invoke_).

---

---

## Tuples (Demetler)

`Tuple`ın ne olduğunu anlatabilmek için basit bir örnek verelim. Bir 3 boyutlu koordinat `type`ı yazalım.

```ts
type ThreeDCoordinate = [x: number, y: number, z: number];
```

`Tuple`, görüldüğü üzere esasen bir `array`dir. Bir de bu `ThreeDCoordinate` adını verdiğimiz `type`ı kullanacağımız bir fonksiyon yazalım:

```ts
function add3DCoordinate(
  c1: ThreeDCoordinate,
  c2: ThreeDCoordinate,
): ThreeDCoordinate {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]];
}

console.log(add3DCoordinate([0, 100, 0], [10, 20, 30]));
// Output: [10, 120, 30]
```

İlk olarak, `add3DCoordinate` adında bir fonksiyon tanımlanıyor. Bu fonksiyon iki parametre alıyor: `c1` ve `c2`. Hem `c1` hem de `c2` parametreleri `ThreeDCoordinate` tipinde olmalıdır.

Fonksiyonun body'si bir `array`, yani dizi döndürür. Dizinin ilk elemanı `c1`'in ilk elemanı ile `c2`'nin ilk elemanının toplamıdır. İkinci elemanı, `c1`'in ikinci elemanı ile `c2`'nin ikinci elemanının toplamıdır. Üçüncü elemanı ise `c1`'in üçüncü elemanı ile `c2`'nin üçüncü elemanının toplamıdır. Yani, bu kod 3 boyutlu koordinatların `x`, `y` ve `z` bileşenlerini toplar.

Son olarak, `add3DCoordinate` fonksiyonu `[0, 100, 0]` ve `[10, 20, 30]` dizileri ile çağrılır. Bu dizi, her biri 3 boyutlu bir noktanın `x`, `y` ve `z` koordinatlarını temsil eder. Fonksiyon, bu iki noktanın koordinatlarını toplar ve sonucu `console.log` ile konsola yazdırır.

---

## Tuples with Different Types (Farklı Tiplere Sahip Demetler)

Aslında React ile uygulama geliştirirken çok sık kullandığımız bir `tuple` vardır: `useState`. `useState` aslında bir `state` ve `state setter`ı bize `return` eder. `useState` ile benzer bir işlevi yerine kendi `string` tipindeki state'imizi ve `state setter`ımızı döndüren bir `tuple` yazalım:

```ts
function simpleStringState(
  initial: string,
): [() => string, (v: string) => void] {
  let str: string = initial;
  return [
    () => str,
    (v: string) => {
      str = v;
    },
  ];
}

const [str1getter, str1setter] = simpleStringState("hello");
console.log(str1getter());
// Output: hello

str1setter("goodbye");
console.log(str1getter());
// Output: goodbye
```

Aslında React ile birlikte çok sık kullandığımız `useState`'in birebir aynısını yazmış olduk. Bu kodu daha yakından inceleyelim ve ne işe yaradığını detaylı bir şekilde görelim.

İlk olarak, `simpleStringState` adında bir fonksiyon tanımlanıyor. Bu fonksiyon bir `string` alıyor ve `tuple` olarak bir `getter`, yani `() => string` ve bir `setter`, yani `(v: string) => void` döndürüyor. `getter` fonksiyonu, `string` tipindeki `state`'i döndürür. `setter` fonksiyonu ise `string` tipinde bir parametre alır ve bu parametreyi `state`'e atar.

Fonksiyonun body'si bir `array`, yani dizi döndürür. Dizinin ilk elemanı bir `getter` fonksiyonudur. Bu fonksiyon, `str` adındaki `string` tipindeki `state`'i döndürür. İkinci elemanı ise bir `setter` fonksiyonudur. Bu fonksiyon, `str` adındaki `string` tipindeki `state`'e bir `string` tipinde parametre alır ve bu parametreyi `str`'e atar.

Son olarak, `simpleStringState` fonksiyonu `"hello"` ile çağrılır. Bu fonksiyon, `str` adındaki `string` tipindeki `state`'e `"hello"` değerini atar ve `getter` ve `setter` fonksiyonlarını döndürür. Bu fonksiyonlar, `str1getter` ve `str1setter` adındaki değişkenlere atanır. `str1getter` fonksiyonu, `str` adındaki `string` tipindeki `state`'i döndürür. `str1setter` fonksiyonu ise `str` adındaki `string` tipindeki `state`'e bir `string` tipinde parametre alır ve bu parametreyi `str`'e atar.

Not: `const [str1getter, str1setter] = simpleStringState("hello");` kısmında `array destructing` işlemi yaptığımıza dikkat edelim. Bu işlem, `simpleStringState` fonksiyonunun döndürdüğü `tuple`'ın ilk elemanını `str1getter`'a, ikinci elemanını ise `str1setter`'a atar, tıpkı aşağıdaki gibi:

```ts
const tuple = simpleStringState("hello");
const str1getter = tuple[0];
const str1setter = tuple[1];

// ya da

const str1getter = simpleStringState("hello")[0];
const str1setter = simpleStringState("hello")[1];

// en kısa haliyle

const [str1getter, str1setter] = simpleStringState("hello");
```

---

---

## Generics (Jenerikler)

Bir önceki derste kendi yazdığımız `useState` hook'unu alalım:

```ts
function simpleStringState(
  initial: string,
): [() => string, (v: string) => void] {
  let str: string = initial;
  return [
    () => str,
    (v: string) => {
      str = v;
    },
  ];
}
```

Bu fonksiyondaki `string` type'ını herhangi bir type ile değiştirmek isteseydik, ne yapmamız gerekirdi? Meselâ yukarıdaki fonksiyonu aşağıdaki gibi yeniden yazalım:

```ts
function simpleStringState<T>(initial: T): [() => T, (v: T) => void] {
  let str: T = initial;
  return [
    () => str,
    (v: T) => {
      str = v;
    },
  ];
}
```

**NOT:** Generic bir type verirken fonksiyon adından sonra `<>` içinde type'ı belirtiyoruz. Bu type'ı fonksiyonun içinde kullanırken de `T` olarak kullanıyoruz. Fonksiyon adından sonra `<T>` kullanmazsak hata alırız.

Peki neden `T` harfini kullandık? `T` dememiz zorunlu mu? `T` tam olarak ne anlama geliyor? `T` yerine başka bir harf kullanabilir miyiz? Bu sorunun cevabı: Evet, `T` yerine başka bir harf kullanabiliriz. `T` harfi `Type`'ın ilk harfi olduğu için kullanılıyor. Yani `T` yerine `A` da kullanabiliriz, `B` de. Ama `T` kullanmak daha yaygın olduğu için biz de `T` kullanacağız.

Yukarıdaki kodda yer alan `str` ifadelerini de daha generic bir hale getirmek için `val` ile değiştirelim:

```ts
function simpleStringState<T>(initial: T): [() => T, (v: T) => void] {
  let val: T = initial;
  return [
    () => val,
    (v: T) => {
      val = v;
    },
  ];
}
```

Bu kodun ne yaptığını yeniden hatırlayalım: Bu fonksiyon parametre olarak bir `initial`, yani bir başlangıç değeri alıyor ve bu değer `T` tipinde oluyor. Daha sonra ise bize `tuple` şeklinde iki array dönüyor:

- Birinci elemanı bir fonksiyon, bu fonksiyon `T` tipinde bir değer dönüyor.
- İkinci elemanı da bir fonksiyon, bu fonksiyon da parametre olarak `T` tipinde bir değer alıyor.

Ardından `simpleStringState` adlı fonksiyonun `T` tipinde almış olduğu `initial`, yani başlangıç değeri yine `T` tipinde olan `val` adındaki bir değişkene atanıyor.

Son olarak ise bize array içerisinde iki şey `return` ediliyor:

- Array'in ilk elemanı bir fonksiyon ve bu fonksiyon da `val` değişkeninin kendisini bize döndürüyor.
- Array'in ikinci elemanı da bir fonksiyon ve bu fonksiyon da parametre olarak `v` adında bir değer alıyor ve bu değeri `val` değişkenine atıyor. Yani, `val` değişkeninin değerini değiştiriyor.

Yine hatırlanacağı üzere biz bunu tıpkı React'taki `useState` hook'u gibi destruct ederek `getter` ve `setter` olarak kullanıyoruz:

```ts
const [getter, setter] = simpleStringState("initial");
```

Peki `initial` bir değer vermeseydik ne olurdu? Hata alırdık. Değer vermeden fonksiyonun üzerine geldiğimizde şöyle bir hint ile karşılaşıyoruz:

```ts
function simpleStringState<unknown>(
  initial: unknown,
): [() => unknown, (v: unknown) => void];
```

Yani, `T` tipi aslında `initial` bir tip verilmeden önce `unknown` tipi gibi davranıyor. Fakat biz bu fonksiyona bir sayı verirsek:

```ts
function simpleStringState<number>(
  initial: number,
): [() => number, (v: number) => void];
```

Gördüğünüz gibi artık `unknown` olan tüm değerler `number` oluyor. Yani, `T` tipi aslında `initial` bir tip verilmeden önce `unknown` tipi gibi davranıyor fakat biz bu fonksiyona bir değer verdiğimizde o fonksiyon içerisindeki tüm `T` ifadeleri verdiğimiz o değer ile aynı tipten oluyor. Aynı şekilde `getter` ve `setter`'ın da tipi `number` oluyor.

```ts
const getter: () => number;
```

```ts
const setter: (v: number) => void;
```

Hemen çalışıyor mu diye kontrol edelim:

```ts
const [getter, setter] = simpleStringState(10);
console.log(getter());
setter(20);
console.log(getter());

// 10
// 20
```

## Overriding Inferred Generic Types (Çıkarsanan Generic Type'ları Geçersiz Kılma)

Yeni bir `getter` ve `setter` oluşturalım:

```ts
const [getter2, setter2] = simpleStringState();
```

`T` tipini belirlemek için `initial` değeri verelim. Ben bu sefer `null` ya da `string` olmasını istiyorum fakat ilk değer olarak `null` veriyorum:

```ts
const [getter2, setter2] = simpleStringState(null);
```

Şimdi ise `setter2` fonksiyonunu kullanarak `initial` değeri, yani `null` olan değeri `string` tipine çevirmek istiyorum:

```ts
const [getter2, setter2] = simpleStringState(null);
console.log(getter2());
setter2("hello");
console.log(getter2());
```

Ancak `setter2("hello")` kısmında hata alıyorum:

```ts
Argument of type '"hello"' is not assignable to parameter of type 'null'.
```

Peki neden böyle bir hata alıyorum? Aslında biz `simpleStringState` fonksiyonunun `initial` parametresine, yani başlangıç değerine `null` değerini verdiğimizde `T` olan tüm type'ları `null` yapmış oluyoruz. Aslında tüm kodumuz şuna benziyor:

```ts
function simpleStringState(initial: null): [() => null, (v: null) => void] {
  let val: null = initial;
  return [
    () => val,
    (v: null) => {
      val = v;
    },
  ];
}
```

Dolayısıyla biz `null` olan yerlere `string` tipinde bir `"hello"` yazamıyoruz.

İşte biz bu tür durumlarda `override` yaparız. Yani, `T` tipinin `null` olarak belirlenmiş olmasını geçersiz kılarız. Bunun için şöyle yapmamız gerekiyor:

```ts
const [getter2, setter2] = simpleStringState<string | null>(null);
```

Bunu yaptığımızda hata gitmiş olacaktır çünkü `T` tipi artık `string | null` olmuş oluyor. Yani, `T` tipi `string` ya da `null` olabilir. Yani, burada `union` bir type kullanıyoruz. Dolayısıyla `setter2` fonksiyonuna `string` bir değer verdiğimizde hata almayacağız.

## Örnek

`ranker` adında bir fonksiyon oluşturalım:

```ts
function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number,
): RankItem[] {
  const ranks = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
}
```

Bu fonksiyon ile ne yapmış olduk? İlk olarak bir generic type belirledik: `RankItem`. Daha sonra bunu `ranker` fonksiyonunun alacağı `items` parametresine array olacak şekilde type olarak verdik. Ardından `ranker` fonksiyonuna `rank` adında bir fonksiyon daha verdik. Bu fonksiyon da `RankItem` tipinde bir değer alıyor ve `number` tipinde bir değer döndürüyor. `ranker` fonksiyonunun `return` tipini de `RankItem` array'i olarak (`RankItem[]`) belirledik.

Ardından bu fonksiyonun içerisinde `ranks` adında bir değişken belirledik ve bu değişkenin değerini de `ranker` fonksiyonun parametre olarak aldığı `items`ları `map` fonksiyonuyla dönerek `item` ve `rank` olarak ikiye ayırdık. `item`'ın değeri `item`'dır, `rank`'ın değeri ise `rank` fonksiyona `item`ın parametre olarak verilmiş hâlidir.

Daha sonrasında `sort` fonksiyonunu kullanarak `ranks`'ı `rank`'a göre sıraladık. Son olarak da `ranks`'ı `map` fonksiyonuyla dönerek `rank`'ın değerini `item`'a eşitledik.

`ranks` değişkeninin üzerine geldiğimizde şöyle bir hint ile karşılaşıyoruz:

```ts
const ranks: {
  item: RankItem;
  rank: number;
}[];
```

Yani, `ranks`'ın tipi `RankItem` ve `number`'dan oluşan bir array. TypeScript bizim için bunu `infer` etti, yani çıkarsadı. Dolayısıyla biz bu çıkarsamayı, yani `inference`ı kullanarak bir `interface` tanımlayabiliriz ve bu `interface`'i `ranks`'ın tipi olarak kullanabiliriz:

```ts
interface Rank {
  item: RankItem;
  rank: number;
}
```

Şimdi bu `interface`'i `ranks`'ın tipi olarak kullanalım:

```ts
function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number,
): RankItem[] {
  interface Rank {
    item: RankItem;
    rank: number;
  }
  const ranks: Rank[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
}
```

Bu şekilde de `ranks`'ın tipini belirlemiş olduk.

Peki biz bu `inteface`i başka bir yerde de kullanmak isteseydik ne yapardık? Meselâ `ranker` fonksiyonunun dışında bir `interface` oluşturalım:

```ts
interface Rank {
  item: RankItem;
  rank: number;
}

function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number,
): RankItem[] {
  const ranks: Rank[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
}
```

Fakat o da ne? Hata alıyoruz:

```ts
Cannot find name 'RankItem'.ts(2304)
```

Eğer ki bir `interface`i generic type'lar ile birlikte kullanmak istersek tıpkı fonksiyonlarda parametreden önce `fonksiyonAdı<T>(parametre: T)` şeklinde olduğu gibi `interface`'i de `interfaceAdı<T>` şeklinde kullanmamız gerekiyor. Yani, tanımladığımız `interface`i aşağıdaki gibi değiştirmemiz gerekiyor:

```ts
interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}
```

Bunu yapar yapmaz yine bir hata alıyoruz. Aşağıdaki kod bize kızıyor:

```ts
const ranks: Rank[];
```

Hata:

```ts
Generic type 'Rank<RankItem>' requires 1 type argument(s).ts(2314)
```

Yani, `Rank`'ın `RankItem` tipinde bir type alması gerekiyor. Dolayısıyla `Rank`'ın tipini `RankItem` ile birlikte kullanmamız gerekiyor:

```ts
const ranks: Rank<RankItem>[];
```

Kodun son hâli ise şöyle oluyor:

```ts
function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number,
): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
}
```

TypeScript bu şekilde fonksiyonları, class'ları, interface'leri ve object'leri generic hâle getirmemize olanak sağlıyor. Bu açıdan TypeScript oldukça kuvvetli.

`Pokemon` adında yeni bir `interface` oluşturalım:

```ts
interface Pokemon {
  name: string;
  hp: number;
}
```

`Pokemon`'un `name` ve `hp`'si olduğunu belirttik. Şimdi ise `pokemon` adında bir array oluşturalım:

```ts
const pokemon: Pokemon[] = [
  {
    name: "Bulbasaur",
    hp: 20,
  },
  {
    name: "Megasaur",
    hp: 5,
  },
];
```

Şimdi ise `ranker` fonksiyonunu oluşturduğumuz bu `pokemon` array'ine uygulayalım:

```ts
const ranks = ranker(pokemon, ({ hp }) => hp);
console.log(ranks);
// [ { name: 'Megasaur', hp: 5 }, { name: 'Bulbasaur', hp: 20 } ]
```

Gördüğünüz üzere fonksiyonumuz çalıştı ve `pokemon` array'ini `hp`'ye göre sıraladı.

---

---
