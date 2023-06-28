## Optional Parameters (İsteğe Bağlı Parametreler)

Bir tarifteki malzemeleri yazdıran bir fonksiyon yazdığımızı düşünelim:

```ts

function printIngredient(quantity: string, ingredient: string) {
  console.log(`${quantity} ${ingredient}`);
}

console.log(printIngredient('1C', 'Flour'));
// Output: 1C Flour

```

Diyelim ki bu malzemelere başka bir şey daha eklemek istiyoruz. Ancak bu sefer hata alırız çünkü `printIngredient` fonksiyonu yalnızca iki parametre/argüman almaktadır: `quantity` ve `ingredient`.

```ts

printIngredient("1C", "Flour", "something more");
// ERROR: Expected 2 arguments, but got 3.

```

Bu hatayı almamak için ilk olarak ne yapabiliriz? Elbette `printIgredient` fonksiyonuna başka bir parametre daha eklerdik:

```ts

function printIngredient(quantity: string, ingredient: string, extra: string) {
  console.log(`${quantity} ${ingredient} ${extra}`);
}

console.log(printIngredient('1C', 'Flour', 'something more'));
// Output: 1C Flour something more

```

Ancak bu sefer de `extra` parametresini kullanmak istemediğimiz durumlarda hata alırız:

```ts

console.log(printIngredient('1C', 'Flour'));
// ERROR: Expected 3 arguments, but got 2.

```

İşte tam da bu sorunu çözmek için **isteğe bağlı parametreler** kullanırız. İsteğe bağlı parametreler (_optional parameters_), parametrelerin sonuna soru işareti (`?`) ekleyerek oluşturulur:

```ts

function printIngredient(quantity: string, ingredient: string, extra?: string) {
  console.log(`${quantity} ${ingredient} ${extra ? extra : ''}`);
}

console.log(printIngredient('1C', 'Flour'));
// Output: 1C Flour

console.log(printIngredient('1C', 'Flour', 'something more'));
// Output: 1C Flour something more

```

İşte bu sayede `extra` parametresini kullanmak istemediğimiz durumlarda hata almazken, kullanmak istediğimiz durumlarda da herhangi bir sorun yaşamaksızın bu parametreyi kullanabiliriz.

***

## Optional Fields (İsteğe Bağlı Alanlar)

İsteğe bağlı parametrelerin yanı sıra, isteğe bağlı alanlar (_optional fields_) da tanımlayabiliriz. İsteğe bağlı alanlar, bir nesnenin içindeki alanlardır. Örneğin, bir `User` nesnesi tanımlayalım:

```ts

interface User {
  id: string;
  info?: {
    email?: string;
  }
}

```

Bu `User` nesnesinin içinde `info` adında bir alan bulunmaktadır. Bu alanın içinde de `email` adında bir alan bulunmaktadır. Ancak bu alanların ikisi de isteğe bağlıdır. Yani `User` nesnesinin içinde `info` alanı bulunmayabilir. Ya da `info` alanı bulunsa bile, `email` alanı bulunmayabilir. Yani, bu iki alan da `undefined` olabilir.

Bir e-mail bulma fonksiyonu yazalım:

```ts

function getEmail(user: User): string {
  if (user.info) {
    return user.info.email;
  }

  return '';
}

```

Ancak bu fonksiyonu daha çalıştırmadan bile bir hata alırız:

```ts

Type 'string | undefined' is not assignable to type 'string'.

```

Bu hatanın sebebi, `user.info.email` ifadesinin `string | undefined` tipinde bir değer döndürmesidir. Yani bu ifade, ya bir `string` değer döndürür, ya da `undefined` döndürür. Ancak bizim fonksiyonumuz `string` tipinde bir değer döndürmektedir. Bu yüzden de `user.info.email` ifadesinin `string` tipinde bir değer döndüreceğini TypeScript'ten daha iyi bilerek, `string` tipinde bir değer döndüreceğinden emin olduğumuzu belirtmeliyiz. Bunun için `!` operatörünü kullanırız. Bu operatör, bir değerin `undefined` olmadığını belirtir:

```ts

function getEmail(user: User): string {
  if (user.info) {
    return user.info.email!;
  }

  return '';
}

```

Ancak bu yöntem pek de sağlıklı bir yöntem değildir. Bu hatadan kurtulmanın çok daha kolay bir yolu vardır:

```ts

function getEmail(user: User): string {
  return user?.info?.email ?? 'email is undefined';
}

```

Burada `coalescing` operatörü olan `??` operatörünü kullanıyoruz. Bu operatör, bir değerin `undefined` olup olmadığını kontrol eder. Eğer `undefined` ise, **sağ** tarafındaki değeri döndürür. Eğer `undefined` değilse, **sol** tarafındaki değeri döndürür. Yani, `user?.info?.email` ifadesi `undefined` ise, `email is undefined` değerini döndürür. Eğer `undefined` değilse, `user.info.email` ifadesinin döndürdüğü değeri döndürür.

***

## Optional Callbacks (İsteğe Bağlı Callback Fonksiyonlar)

İsteğe bağlı parametreler ve isteğe bağlı alanlar gibi, isteğe bağlı callback fonksiyonları (_optional callback functions_) da tanımlayabiliriz. Örneğin, bir `addWithCallback` fonksiyonu tanımlayalım:

```ts

function addWithCallback(x: number, y: number, callback?: () => void) {
  console.log(x + y);
  callback?.();
}

```

Bu fonksiyon, `x` ve `y` parametrelerini toplar ve sonucu konsola yazdırır. Eğer `callback` parametresi de verilmişse, o zaman bu fonksiyonu da en son çağırır (_invoke_).