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
