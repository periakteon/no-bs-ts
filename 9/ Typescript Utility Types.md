## Utility Types

TypeScript'te yer alan **Utility Type**'ların tam listesine aşağıdaki linkten ulaşabilirsiniz:

[Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

Tüm type'ları ele almamız mümkün değil. Bu sebeple, en çok kullanılanları ele alacağız.

### Partial<Type>

TypeScript'te yer alan **Partial<Type>** type'ı, bir type'ın tüm property'lerini optional hale getirir.

Bunu daha iyi anlamak için aşağıdaki örneğe bakalım:

```typescript
interface MyUser {
  name: string;
  id: string;
  email?: string;
}

interface MyUserOptionals {
  name?: string;
  id?: string;
  email?: string;
}

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  merge(
    {
      name: "Jack",
      id: "foo",
      email: "email",
    },
    {
      email: "email2",
    },
  ),
);

// Output:
// { name: 'Jack', id: 'foo', email: 'email2@email2.com' }
```

Yukarıdaki örnekte ilk olarak **MyUser** interface'ini tanımladık. Bu interface'in property'leri **name**, **id** ve **email**'den oluşuyor. **email** property'sini ise optional olarak tanımladık. Ardından **MyUserOptionals** interface'ini tanımladık. Bu interface'in property'leri ise **name**, **id** ve **email**'den oluşuyor. Bu property'lerin hepsini optional olarak tanımladık. Son olarak **merge** fonksiyonunu tanımladık. Bu fonksiyon, **MyUser** ve **MyUserOptionals** interface'lerini parametre olarak alıyor ve **MyUser** tipinde bir şey döndürüyor. **Spread operatörü (...)** kullanmamızın sebebi, **MyUser** ve **MyUserOptionals** interface'lerinin property'lerini tek bir obje içerisinde birleştirmek. Bu sayede, **merge** fonksiyonu, **MyUser** ve **MyUserOptionals** interface'lerinin property'lerini tek bir obje içerisinde birleştiriyor ve bu objeyi döndürüyor.

Ancak böyle bir yaklaşım **DRY** ilkesine, yani **Don't Repeat Yourself** ilkesine aykırı. Çünkü **MyUser** interface'ine yeni bir property eklediğimizde, **MyUserOptionals** interface'ini de güncellememiz gerekiyor. Ve bu da en nihayetinde kopyala yapıştıra, yani tekrara (**repeat**) yol açıyor. Böyle bir şeyle uğraşmamak için **Partial<Type>** type'ını kullanabiliriz.

**Partial** type'ı bir type'ın tüm property'lerini optional hale getirir. Bu sayede, **MyUser** interface'ine yeni bir property eklediğimizde, **MyUserOptionals** interface'ini güncellememize gerek kalmaz. Çünkü **Partial** type'ı, **MyUser** interface'indeki tüm property'leri optional hale getirir.

```typescript
interface MyUser {
  name: string;
  id: string;
  email?: string;
  phone?: string;
}

type MyUserOptionals = Partial<MyUser>;
```

**MyUserOptionals** type'ının üzerine geldiğimizde aşağıdaki görseldeki gibi bir _hint_ alırız:

![Partial Type](https://i.hizliresim.com/es0db17.png)

**MyUser** interface'ine yeni property eklemek istediğimizde artık **MyUserOptionals** interface'ini güncellememize gerek kalmamaktadır. Çünkü **Partial** type'ı, **MyUser** interface'indeki tüm property'leri optional hale getirir.

### Required<Type>

TypeScript'te yer alan **Required<Type>** type'ı, bir type'ın tüm property'lerini **required**, yani **zorunlu** olarak doldurulması gereken bir hale getirir.

Bunu daha iyi anlamak için aşağıdaki örneğe bakalım:

```typescript
interface MyUser {
  name: string;
  id: string;
  email?: string;
  phone?: string;
}

type RequiredMyUser = Required<MyUser>;
```

Aşağıdaki görselede de görebileceğiniz gibi, **Required** type'ı, **MyUser** interface'indeki tüm property'leri **required**, yani **zorunlu** olarak doldurulması gereken bir hale getirdi.

![Required Type](https://i.hizliresim.com/lutotws.png)

### Pick<Type, Keys>

TypeScript'te yer alan **Pick<Type, Keys>** type'ı, bir type'ın belirli property'lerini seçmemizi sağlar.

Bunu daha iyi anlamak için aşağıdaki örneğe bakalım:

```typescript
interface MyUser {
  name: string;
  id: string;
  email?: string;
  phone?: string;
}

type JustEmailAndName = Pick<MyUser, "email" | "name">;
```

Aşağıdaki görselende de görebileceğiniz gibi, **Pick** type'ı, **MyUser** interface'indeki **email** ve **name** property'lerini seçmemizi sağladı.

![Pick Type](https://i.hizliresim.com/5i08f15.png)

### Record<Keys, Type>

TypeScript'te yer alan **Record<Keys, Type>** type'ı, bir type'ın belirli property'lerini seçmemizi sağlar.

Bunu daha iyi anlamak için aşağıdaki örneğe bakalım:

```typescript
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
```

**Record** type'ı, **Page** type'ının property'lerini **key** olarak, **PageInfo** type'ını ise **value** olarak kullanmamızı sağladı.

Başka bir örnek daha yapalım:

```typescript
interface MyUser2 {
  id: string;
  name: string;
  email?: string;
}

const mapById = (users: MyUser2[]): Record<string, MyUser2> => {
  return users.reduce((a, v) => {
    return {
      ...a,
      [v.id]: v,
    };
  }, {});
};

console.log(
  mapById([
    {
      id: "foo",
      name: "Mr. Foo",
    },
    {
      id: "bar",
      name: "Mr. Bar",
    },
  ]),
);

// Output:
/*
{
  "foo": {
    "id": "foo",
    "name": "Mr. Foo"
  },
  "bar": {
    "id": "bar",
    "name": "Mr. Bar"
  }
} 
*/
```

Peki biz bu output'ta "id" kısmını atmak istersek ne yapmalıyız? Çünkü "id" kısmı gereksiz bir şekilde tekrar ediyor. Bunun için **Omit** type'ını kullanabiliriz.

### Omit<Type, Keys>

TypeScript'te yer alan **Omit<Type, Keys>** type'ı, bir type'ın belirli property'lerini dinamik olarak çıkarmamızı sağlar. Fark edileceği üzere **Omit** type'ı, **Pick** type'ının tam tersidir. Yani, **Pick** type'ı, bir type'ın belirli property'lerini seçmemizi sağlarken, **Omit** type'ı, bir type'ın belirli property'lerini dinamik olarak çıkarmamızı (atmamızı) sağlar.

Yukarıdaki örneğin aynısını **Omit** type'ı ile yapalım:

```typescript
interface MyUser2 {
  id: string;
  name: string;
  email?: string;
}

const mapById = (users: MyUser2[]): Record<string, Omit<MyUser2, "id">> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [id]: other,
    };
  }, {});
};

console.log(
  mapById([
    {
      id: "foo",
      name: "Mr. Foo",
    },
    {
      id: "bar",
      name: "Mr. Bar",
    },
  ]),
);

// Output:
/*
{
  "foo": {
    "name": "Mr. Foo"
  },
  "bar": {
    "name": "Mr. Bar"
  }
} 
*/
```

**Not:** Daha temiz bir kod olacağını ve başka yerlerde de kullanabileceğimizi düşünüyorsak **Omit** type'ını ayrı bir type olarak tanımlayabiliriz:

```typescript
interface MyUser2 {
  id: string;
  name: string;
  email?: string;
}

type UserWithoutId = Omit<MyUser2, "id">;

const mapById = (users: MyUser2[]): Record<string, UserWithoutId> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [id]: other,
    };
  }, {});
};
```

Ayrıca field'lardan bir type da seçebiliriz.

```typescript
// "id"yi number'a çevirdik, dikkat.
interface MyUser2 {
  id: number;
  name: string;
  email?: string;
}

type UserWithoutId = Omit<MyUser2, "id">;

const mapById = (users: MyUser2[]): Record<MyUser2["id"], UserWithoutId> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [id]: other,
    };
  }, {});
};

console.log(
  mapById([
    {
      id: 1,
      name: "Mr. Foo",
    },
    {
      id: 2,
      name: "Mr. Bar",
    },
  ]),
);

// Output:
/*
{
  "1": {
    "name": "Mr. Foo"
  },
  "2": {
    "name": "Mr. Bar"
  }
} 
*/
```
