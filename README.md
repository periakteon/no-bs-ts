# No BullShit TypeScript Notes

Jack Herrington's No BS TS Notes

https://www.youtube.com/playlist?list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n

***

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

***
***

# Functions


## Primitive Types

Bir fonksiyona type vermek:

```ts
export default function addNumbers(a: number, b: number): number {
  return a + b
}
```

Burada `a` ve `b` parametrelerine `number` type'ı vermiş olduk. Ayrıca fonksiyonun dönüş değerinin de `number` olacağını belirttik.

Peki `arrow function`lar nasıl yazılır?

```ts
export const addStrings = (str1: string, str2: string): string => `${str1} ${str2}`

export const addStringsWithDefaultValue = (str1: string, str2: string = 'World'): string => `${str1} ${str2}`
```

Burada `addStrings` fonksiyonu `str1` ve `str2` parametrelerini alıyor ve dönüş değeri olarak `string` döndürüyor. `addStringsWithDefaultValue` fonksiyonu ise `str2` parametresine `default` bir değer veriyor.

## Union Type

Bir fonksiyonun parametrelerine birden fazla type vermek için `union` kullanabiliriz.

```ts
export const format = (title: string, param: string | number): string => `${title} ${param}`
```

Burada `param` parametresine `string` veya `number` type'ı vermiş olduk. Yani, `format` fonksiyonu `title` parametresine `string` ve `param` parametresine ise `string` veya `number` type'ı alabilir. Ayrıca bu fonksiyonun dönüş type'ı da `string` olacaktır.

## Void Functions

Peki hiçbir şey `return` etmeyen, yani `void` fonksiyonlara nasıl type veririz?

```ts
export const printFormat = (title: string, param: string | number): void => {
  console.log(format(title, param))
}
```

Burada `printFormat` fonksiyonu `format` fonksiyonunu çağırıyor ve `console.log` ile ekrana yazdırıyor. Bu fonksiyonun, yani `printFormat` fonksiyonunun dönüş değeri ise `void`tir. Yani, bize hiçbir şey `return` etmez.

## Promise Functions

Bir fonksiyonun `Promise` döndürmesi için `Promise` type'ını kullanabiliriz.

```ts
export const fetchData = (url: string): Promise<string> => Promise.resolve(`Data from ${url}`)
```

Burada `fetchData` fonksiyonu `url` parametresine `string` alıyor ve dönüş değeri olarak `Promise<string>` döndürüyor. Yani, bu fonksiyon bize bir `Promise` döndürüyor ve bu `Promise`'in dönüş değeri `string` oluyor.

##  Rest Parameters

Bir fonksiyona `rest` parametreleri vermek için `...` kullanabiliriz.

```ts
export const introduce = (salutation: string, ...names: string[]): string => `${salutation} ${names.join(' ')}`
```

Burada `introduce` fonksiyonu `salutation` parametresine `string` alıyor ve `names` parametresi ise `...` ile `rest` parametrelerini alıyor. Bu fonksiyonun dönüş değeri ise `string` oluyor. Örneğin, `introduce('Hello', 'John', 'Doe')` şeklinde kullanabiliriz. Bu fonksiyon bize `Hello John Doe` döndürecektir. Buradaki `Hello` ifadesi `salutation` parametresine, `John` ve `Doe` ise `names` parametresine denk düşmektedir.

## Object Types

Bir fonksiyonun parametresine `object` vermek için aşağıdaki gibi bir şey yapabiliriz:

```ts
export function getName(user: { first: string; last: string }): string {
  return `${user.first} ${user.last}`
}
```

Burada `getName` fonksiyonu bir parametre olarak `user`i alıyor ve bu `user` de esasen bir `object`tir. Dönüş değeri olarak `string` döndürüyor. Bu fonksiyonu aşağıdaki gibi kullanabiliriz:

```ts
getName({ first: 'John', last: 'Doe' })
// John Doe
```

***
***

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
Hi, there!
Callback
```

***

## Function With Params

Parametre olarak `number[]` (sayı dizisi) alan bir `array mutation function` oluşturalım.

```ts

export function arrayMutate(
  numbers: number[],
  mutate: (v: number) => number
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
  mutate: MutationFunction
): number[] {
  return numbers.map(mutate);
}

```

Bu şekilde daha okunabilir bir hale geldi.

***

Ayrıca `arrow function` oluşturduğumuzda da bu `type`ı aşağıdaki gibi kullanabiliriz:

```ts

export const myNewMutation: MutationFunction = (v) => v * 100;
console.log(myNewMutation(3));
// Output: 300

```

`arrow function` oluştururken `type`ı parametreleri yazarken de belirtebiliriz ancak bu okunuşu zaman zaman zorlaştırabilir. Örneğin:

```ts

const mutationArrowFunction = (n: number[], mutate: (v: number) => number): number[] => {
  return n.map(mutate);
}

console.log(mutationArrowFunction([1, 2, 3], (v) => v * 10));
// Output: [10, 20, 30]

```

Aynı fonksiyonu yeni bir `type` oluşturarak yazalım:

```ts

type ArrowFunctionMutation = (numbers: number[], mutate: (v: number) => number) => number[];

const mutationArrowFunctionButMoreReadable: ArrowFunctionMutation = (n, mutate) => {
  return n.map(mutate);
}

console.log(mutationArrowFunctionButMoreReadable([1, 2, 3], (v) => v * 10));
// Output: [10, 20, 30]

```

Bu şekilde daha okunabilir bir hale geldiğini söyleyebiliriz.

***

İşleri biraz daha karmaşıklaştırıp `arrow function`ın `type`ını tanımlarken bir `object` olarak da `type` verebiliriz. Örneğin:

```ts

type ArrowFunctionMutationButAsObject = {
  numbers: number[];
  mutate: (v: number) => number;
};

export const arrowFunctionMutationButObject = (data: ArrowFunctionMutationButAsObject): number[] => {
  return data.numbers.map(data.mutate);
}
console.log(arrowFunctionMutationButObject({ numbers: [1, 2, 3], mutate: (v) => v * 10 }));
// Output: [10, 20, 30]

```

Gördüğünüz üzere, bu sefer `arrowFunctionMutationButObject` adındaki fonksiyona parametre olarak bir `object` verdik. Bu `object`in içerisinde `numbers` ve `mutate` adında iki adet `property` var. `numbers` adındaki `property` bir `number[]` alıyor ve `mutate` adındaki `property` bir `(v: number) => number` alıyor. Bu `object`i fonksiyonumuza parametre olarak verdiğimizde de `numbers` ve `mutate` adındaki `property`leri `map` fonksiyonuna parametre olarak veriyoruz. Bu fonksiyon da bize sonuç olarak bir sayı dizisi (**number[]**) döndürüyor.

***

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

***

Eğer bu fonksiyonun okunuşu biraz zor geliyorsa, `type`ını bir değişkene atayabiliriz:

```ts

type AdderFunction = (val: number) => number;

export function createAdderButMoreReadable(num: number): AdderFunction {
  return (val: number) => num + val;
}

```

Bu şekilde daha okunabilir bir hale geldiğini söyleyebiliriz.

***
***