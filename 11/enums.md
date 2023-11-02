## Enums

Loading state'ler ile ilgili üç adet `const` oluşturalım. Ardından **boolean** dönen bir fonksiyon yazalım.

```typescript
const beforeLoad = "beforeLoad";
const loading = "loading";
const loaded = "loaded";

const isLoading = (state: string) => state === loading;
isLoading("dog");
```

Görüleceği üzere bu fonksiyona yanlış bir değer gönderdiğimizde, hata almayız. Çünkü fonksiyonumuzun parametresi `string` tipinde. Bu durumu engellemek için `enum` kullanabiliriz.

```typescript
enum LoadingState {
  beforeLoad = "beforeLoad",
  loading = "loading",
  loaded = "loaded",
}

const isLoading = (state: LoadingState) => state === LoadingState.loading;
isLoading("dog");
// Argument of type 'dog' is not assignable to parameter of type 'LoadingState'.

isLoading(LoadingState.loading);
// true
```

Başka bir senaryoya bakalım. `Enum`dakilere İngilizce karşılıklar veren bir **map** oluşturalım.

```typescript
enum LoadingState {
  beforeLoad = "beforeLoad",
  loading = "loading",
  loaded = "loaded",
}

const englishLoadingStates = {
  [LoadingState.beforeLoad]: "Before Load",
  [LoadingState.loading]: "Loading",
  [LoadingState.loaded]: "Loaded",
};

console.log(englishLoadingStates[LoadingState.beforeLoad]);
// Output: Before Load
```

Peki bunu nerelerde kullanırız? Yani `englishLoadingStates` adlı objeyi nerelerde kullanırız? Örneğin bir **React** uygulamasında, `LoadingState`'e göre farklı bir **component** render edebiliriz.

```typescript
import React from "react";

interface LoadingProps {
  isLoading: LoadingState;
}

const LoadingComponent: React.FC<LoadingProps> = ({ isLoading }) => {
  return <div>{englishLoadingStates[isLoading]}</div>;
};
```

## Literal Types

`enum`'un bir başka kullanımı da `Literal Types`'dır. Örneğin bir **function** yazalım.

```typescript
function rollDice(dice: number): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip;
}

console.log(rollDice(4));
// Output: 12
```

Peki ya sayıyı **constraint**'lemek istersek? Örneğin sadece 1 ile 3 arasındaki sayıları kabul etmek istiyoruz. Bunun için `Literal Types` kullanabiliriz.

```typescript
function rollDice(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip;
}

console.log(rollDice(4));
// Argument of type '4' is not assignable to parameter of type '1 | 2 | 3'.

console.log(rollDice(3));
// Output: 9
```

Bunu kullanarak **functional overloading** yapabiliriz.

```typescript
function sendEvent(name: "addToCart", data: { productId: number }): void;
function sendEvent(name: "checkout", data: { cartCount: number }): void;
function sendEvent(name: string, data: unknown): void {
  console.log(`${name}: ${JSON.stringify(data)}`);
}

sendEvent("addToCart", { productId: 123 });
// Output: addToCart: {"productId":123}

sendEvent("checkout", { cartCount: 2 });
// Output: checkout: {"cartCount":2}
```
