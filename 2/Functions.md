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
