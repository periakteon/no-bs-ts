function printIngredient(quantity: string, ingredient: string) {
  console.log(`${quantity} ${ingredient}`);
}

console.log(printIngredient("1C", "Flour"));
// Output: 1C Flour

// ERROR: printIngredient("1C", "Flour", "something more");

/*******************************************************************************************/

function printIngredient2(quantity: string, ingredient: string, extra: string) {
  console.log(`${quantity} ${ingredient} ${extra}`);
}

console.log(printIngredient2("1C", "Flour", "something more"));
// Output: 1C Flour something more

// ERROR: printIngredient2("1C", "Flour");

/*******************************************************************************************/

function printIngredient3(
  quantity: string,
  ingredient: string,
  extra?: string,
) {
  console.log(`${quantity} ${ingredient} ${extra ? extra : ""}`);
}

console.log(printIngredient3("1C", "Flour"));
// Output: 1C Flour

console.log(printIngredient3("1C", "Flour", "something more"));
// Output: 1C Flour something more

// ERROR: printIngredient3("1C", "Flour", "something more", "something else");

/*******************************************************************************************/
/*******************************************************************************************/

interface User {
  id: string;
  info?: {
    email?: string;
  };
}

function getEmail(user: User): string {
  if (user.info) {
    return user.info.email!;
  }

  return "";
}

function getEmailEasy(user: User): string {
  return user?.info?.email ?? "";
}

/*******************************************************************************************/
/*******************************************************************************************/

function addWithCallback(x: number, y: number, callback?: () => void) {
  console.log(x + y);
  callback?.();
}
