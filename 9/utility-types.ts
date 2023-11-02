interface MyUser {
  name: string;
  id: string;
  email?: string;
  phone?: string;
}

// interface MyUserOptionals {
//   name?: string;
//   id?: string;
//   email?: string;
// }

type JustEmailAndName = Pick<MyUser, "email" | "name">;
type RequiredMyUser = Required<MyUser>;
type MyUserOptionals = Partial<MyUser>;

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
      email: "email1@email1.com",
    },
    {
      email: "email2@email2.com",
    },
  ),
);

// ----------------------------------------------------- //

interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};

// ----------------------------------------------------- //

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

// ----------------------------------------------------- //

interface MyUser3 {
  id: string;
  name: string;
  email?: string;
}

const mapById2 = (users: MyUser3[]): Record<string, Omit<MyUser3, "id">> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [id]: other,
    };
  }, {});
};

console.log(
  mapById2([
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

// ----------------------------------------------------- //

// "id"yi number'a çevirdik, dikkat.
interface MyUser4 {
  id: number;
  name: string;
  email?: string;
}

type UserWithoutId = Omit<MyUser4, "id">;

const mapById4 = (users: MyUser4[]): Record<MyUser4["id"], UserWithoutId> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [id]: other,
    };
  }, {});
};

console.log(
  mapById4([
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
