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
