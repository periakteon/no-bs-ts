## Generics with keyof in TypeScript

Bir önceki derste TypeScript'teki `generic` type'ların ne olduğunu ve nasıl kullanıldığını öğrenmiştik. Bu derste ise `generic`lerin `keyof` ile birlikte nasıl kullanıldığını öğreneceğiz.

`keyof` ile birlikte `generic` kullanmak, `generic`'in `keyof` ile belirtilen nesnenin (_object_) `key`'lerinden birini alacağını belirtir.

İlk olarak `pluck` adında bir fonksiyon oluşturalım:

```typescript
function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType,
): DataType[KeyType][] {}
```

Bu fonksiyonun ilk parametresi `DataType` tipinde bir dizi, ikinci parametresi ise `KeyType` tipinde bir `key` alıyor. Fonksiyonun dönüş tipi ise `unknown` olarak belirlenmiş. Yalnız dikkat etmemiz gereken bir şey daha var: `extends`. Buradaki `extends` anahtar kelimesi, `generic`'in `keyof` ile belirtilen nesnenin `key`'lerinden birini alabileceğini belirtir. Yani `KeyType` tipi, sadece `DataType` tipinin `key`'lerinden birini alabilir. Meselâ `DataType`ın `key`'lerinin şöyle olduğunu düşünelim:

```typescript
type User = {
  id: number;
  name: string;
  email: string;
};
```

Bu durumda `DataType`ın `key`'leri `id`, `name` ve `email` olacaktır. `KeyType` tipi ise bu `key`'lerden birini alabilir. Yani `KeyType` tipi `id`, `name` veya `email` olabilir. Ama `KeyType` tipi `age` olamaz. Çünkü `age` `DataType`'ın `key`'lerinden biri değildir.

Kaldığımız yerden devam edelim. Yazdığımız fonksiyonu yeniden hatırlatalım:

```typescript
function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType,
): DataType[KeyType][] {}
```

Bu fonksiyonun `return` tipi ise `DataType[KeyType][]` olarak belirlenmiş. Bu ifadeyi açıklayalım:

`DataType`'ın `key`'lerinden birini alacağımızı biliyoruz. Bu `key`'in değerini ise `DataType[KeyType]` ile alıyoruz. Yani `DataType`'ın `KeyType` tipindeki `key`'inin değerini alıyoruz. Bu değer ise `DataType`'ın `key`'lerinden biri olacağı için `DataType[KeyType]` ifadesi `DataType`'ın `key`'lerinden birini alacaktır. Bu ifadeyi `[]` ile birlikte kullanıyoruz. Çünkü `DataType`'ın `key`'lerinden birini alacağız. Yani `DataType`'ın `key`'lerinden biri bir dizi olacak. Bu dizi ise `DataType[KeyType][]` ifadesi ile belirtiliyor.

Evet kulağa epey karmaşık geliyor. Ama örnekle açıklayalım. Örneğin `User` tipinde bir dizi oluşturalım:

```typescript
interface Car {
  make: string;
  model: string;
  year: number;
}

const cars: Car[] = [
  { make: "Toyota", model: "Camry", year: 2020 },
  { make: "Honda", model: "Civic", year: 2021 },
];

const models: string[] = pluck(cars, "model");
console.log(models); // ['Camry', 'Civic']
```

Henüz `pluck` fonksiyonunu tamamen yazmadık ancak bu örnek ile ne yapmak istediğimizi anlayabiliriz. `pluck` fonksiyonu `cars` dizisini ve `model` `key`'ini parametre olarak alıyor. `pluck` fonksiyonunun dönüş tipi ise `DataType[KeyType][]` olarak belirlenmişti. Dolayısıyla bize dönen değer `string[]` olacaktır çünkü `Car` tipinin `model` adındaki `key`'i `string` tipindedir.

Şimdi `pluck` fonksiyonunu tamamlayalım:

```typescript
function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType,
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}
```

Şimdi, tamamladığımız bu fonksiyonu bir örnek ile kullanalım.

```typescript
function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType,
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: "Mimi", age: 12 },
  { name: "LG", age: 13 },
];

console.log(pluck(dogs, "age"));
// [12, 13]
```

Buradaki "cool" olan kısım ise şurası: En son satırda konsola yazdıracağımız kısımda `pluck` fonksiyonuna ikinci parametreyi, yani `age` parametresini verirken hint alabiliyor olmamız! Yani, hata yapma şansımız azalıyor. Çünkü `age` parametresini verirken `name` veya `age` dışında bir şey veremiyoruz. Çünkü `dogs` dizisinin `key`'leri `name` ve `age`'den başka bir şey değil.

Başka bir örnek daha yapalım.

### Event Map

Önce bir `interface` tanımlayalım:

```typescript
interface BaseEvent {
  time: number;
  user: string;
}
```

Bu `interface`'in `time` ve `user` adında iki `key`'i var. Şimdi bu `interface`'i genişletelim:

```typescript
interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string };
  checkout: BaseEvent;
}
```

Bu `interface`'in `addToCart` ve `checkout` adında iki `key`'i var. `addToCart`'ın değeri `BaseEvent`'in `&` ile genişletilmiş hali. `checkout`'ın değeri ise `BaseEvent`'in kendisi.

Şimdi de bu `interface`'leri kullanabileceğimiz bir fonksiyon yazalım:

```typescript
function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name],
): void {
  console.log([name, data]);
}
```

Tüm bunları bir araya getirelim:

```typescript
interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string };
  checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name],
): void {
  console.log([name, data]);
}
```

Yapılan işlemleri adım adım açıklayalım:

- `baseEvent` adında bir `interface` oluşturduk. Bu `interface`'in `time` ve `user` adında iki `key`'i var.
- `EventMap` adında bir `interface` oluşturduk. Bu `interface`'in `addToCart` ve `checkout` adında iki `key`'i var. `addToCart`'ın değeri `BaseEvent`'in `&` ile genişletilmiş hali. `checkout`'ın değeri ise `BaseEvent`'in kendisi.
- `sendEvent` adında bir fonksiyon oluşturduk. Bu fonksiyonun ilk parametresi `generic` bir tip, yani `Name` tipinde bir `key` alıyor. İkinci parametresi ise `EventMap`'in `Name` tipindeki `key`'inin değerini alıyor. Fonksiyonun dönüş tipi de `void` şeklindedir.

İşte `cool` kısım burada başlıyor. `sendEvent` yazıp ilk parametreyi verdiğimizde, ikinci parametreyi verirken `addToCart` veya `checkout` dışında bir şey veremiyoruz. Çünkü `EventMap`'in `key`'leri `addToCart` ve `checkout`'dan başka bir şey değil:

![keyof](https://i.hizliresim.com/7sj3zpx.png)

`addToCart` key'ine tıkladığımızda ise `quantity` ve `productID`'nin de `key`'ler olduğunu görüyoruz:

![keyof](https://i.hizliresim.com/t11d88p.png)

Aynı şekilde `checkout` key'ine tıkladığımızda ise `time` ve `user` dışında bir `key` olmadığını görüyoruz:

![keyof](https://i.hizliresim.com/ht6lh6h.png)

Bu şekilde `generic`'lerin `keyof` ile birlikte kullanımını öğrenmiş ve type safety'yi arttırmış olduk.
