// Optional parameter / primitive type
export default function addNumbers(a: number, b: number): number {
  return a + b;
}

export const addStrings = (str1: string, str2: string): string =>
  `${str1} ${str2}`;

export const addStringsWithDefaultValue = (
  str1: string,
  str2: string = "World",
): string => `${str1} ${str2}`;

// Union type
export const format = (title: string, param: string | number): string =>
  `${title} ${param}`;

export const printFormat = (title: string, param: string | number): void => {
  console.log(format(title, param));
};

// Promise type
export const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`Data from ${url}`);

// Rest parameter
export const introduce = (salutation: string, ...names: string[]): string =>
  `${salutation} ${names.join(" ")}`;

// typing objects

export function getName(user: { first: string; last: string }): string {
  return `${user.first} ${user.last}`;
}
