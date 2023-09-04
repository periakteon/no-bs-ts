export function printToFile(text: string, callback: () => void): void {
  console.log(text);
  callback();
}

// Example 1

printToFile("Hello, world", () => console.log("Callback"));
// Output:
// Hello, world
// Callback

/*******************************************************************************************/

export function arrayMutate(
  numbers: number[],
  mutate: (v: number) => number,
): number[] {
  return numbers.map(mutate);
}

// Example 2

console.log(arrayMutate([1, 2, 3], (v) => v * 10));
// Output: [10, 20, 30]

/*******************************************************************************************/

type MutationFunction = (v: number) => number;

export function arrayMutateButMoreReadable(
  numbers: number[],
  mutate: MutationFunction,
): number[] {
  return numbers.map(mutate);
}

export const myNewMutation: MutationFunction = (v) => v * 100;
console.log(myNewMutation(3));
// Output: 300

/*******************************************************************************************/

const mutationArrowFunction = (
  n: number[],
  mutate: (v: number) => number,
): number[] => {
  return n.map(mutate);
};

console.log(mutationArrowFunction([1, 2, 3], (v) => v * 10));
// Output: [10, 20, 30]

/*******************************************************************************************/

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

/*******************************************************************************************/

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

/*******************************************************************************************/

export function createAdder(num: number) {
  return (val: number) => num + val;
}

const addOne = createAdder(1);
console.log(addOne(55));
// Output: 56

/*******************************************************************************************/

type AdderFunction = (val: number) => number;

export function createAdderButMoreReadable(num: number): AdderFunction {
  return (val: number) => num + val;
}

const addOneButMoreReadable = createAdderButMoreReadable(1);
console.log(addOneButMoreReadable(55));
// Output: 56
