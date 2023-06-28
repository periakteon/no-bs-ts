## Tuples (Demetler)

`Tuple`ın ne olduğunu anlatabilmek için basit bir örnek verelim. Bir 3 boyutlu koordinat `type`ı yazalım.

```ts

type ThreeDCoordinate = [x: number, y: number, z: number];

```

`Tuple`, görüldüğü üzere esasen bir `array`dir. Bir de bu `ThreeDCoordinate` adını verdiğimiz `type`ı kullanacağımız bir fonksiyon yazalım:

```ts

function add3DCoordinate(c1: ThreeDCoordinate, c2: ThreeDCoordinate): ThreeDCoordinate {
  return [
    c1[0] + c2[0],
    c1[1] + c2[1],
    c1[2] + c2[2]
  ];
}

console.log(add3DCoordinate([0, 100, 0], [10, 20, 30]));
// Output: [10, 120, 30]

```

İlk olarak, `add3DCoordinate` adında bir fonksiyon tanımlanıyor. Bu fonksiyon iki parametre alıyor: `c1` ve `c2`. Hem `c1` hem de `c2` parametreleri `ThreeDCoordinate` tipinde olmalıdır.

Fonksiyonun body'si bir `array`, yani dizi döndürür. Dizinin ilk elemanı `c1`'in ilk elemanı ile `c2`'nin ilk elemanının toplamıdır. İkinci elemanı, `c1`'in ikinci elemanı ile `c2`'nin ikinci elemanının toplamıdır. Üçüncü elemanı ise `c1`'in üçüncü elemanı ile `c2`'nin üçüncü elemanının toplamıdır. Yani, bu kod 3 boyutlu koordinatların `x`, `y` ve `z` bileşenlerini toplar.

Son olarak, `add3DCoordinate` fonksiyonu `[0, 100, 0]` ve `[10, 20, 30]` dizileri ile çağrılır. Bu dizi, her biri 3 boyutlu bir noktanın `x`, `y` ve `z` koordinatlarını temsil eder. Fonksiyon, bu iki noktanın koordinatlarını toplar ve sonucu `console.log` ile konsola yazdırır.

***

## Tuples with Different Types (Farklı Tiplere Sahip Demetler)

Aslında React ile uygulama geliştirirken çok sık kullandığımız bir `tuple` vardır: `useState`. `useState` aslında bir `state` ve `state setter`ı bize `return` eder. `useState` ile benzer bir işlevi yerine kendi `string` tipindeki state'imizi ve `state setter`ımızı döndüren bir `tuple` yazalım:

```ts

function simpleStringState(initial: string): [() => string, (v: string) => void] {
  let str: string = initial;
  return [
    () => str,
    (v: string) => {
      str = v;
    }
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