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