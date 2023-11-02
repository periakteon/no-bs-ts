// Wrong way
const beforeLoad = "beforeLoad";
const loading = "loading";
const loaded = "loaded";

const isLoading = (state: string) => state === loading;
isLoading("dog");

// ---------------------------------------------------------------

// Correct way
enum LoadingState {
  beforeLoad = "beforeLoad",
  loading = "loading",
  loaded = "loaded",
}

const isLoading2 = (state: LoadingState) => state === LoadingState.loading;
isLoading2(LoadingState.loading);
// true

// ---------------------------------------------------------------

enum LoadingState2 {
  beforeLoad = "beforeLoad",
  loading = "loading",
  loaded = "loaded",
}

const englishLoadingState2 = {
  [LoadingState2.beforeLoad]: "Before Load",
  [LoadingState2.loading]: "Loading",
  [LoadingState2.loaded]: "Loaded",
};

console.log(englishLoadingState2[LoadingState.beforeLoad]);
// Before Load

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// # Literal Types

function rollDice(dice: number): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip;
}

console.log(rollDice(4));
// Output: 12

// --------------------------------------------------------------- //

function rollDice2(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip;
}

console.log(rollDice2(4));
// Argument of type '4' is not assignable to parameter of type '1 | 2 | 3'.

console.log(rollDice2(3));
// Output: 9

// --------------------------------------------------------------- //

function sendEvent(name: "addToCart", data: { productId: number }): void;
function sendEvent(name: "checkout", data: { cartCount: number }): void;
function sendEvent(name: string, data: unknown): void {
  console.log(`${name}: ${JSON.stringify(data)}`);
}

sendEvent("addToCart", { productId: 123 });
// Output: addToCart: {"productId":123}

sendEvent("checkout", { cartCount: 2 });
// Output: checkout: {"cartCount":2}
