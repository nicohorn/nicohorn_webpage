//This is a nice way to manage the links shown in the UI to the user. In the layout file we can pass the user role to the links array as a key, like this => links["admin"]. That'll retrieve the routes that the admin is supposed to see. The access to these pages is not managed here, that's managed in the middleware. I like to centralize the accesses, I think of this as the UI centralization and the middleware as the backend centralization. Of ocurse, there'll be some exceptions throughout the app (or not), but I try to generalize the use cases as much as possible.

export interface LinkObjectType {
  title: string;
  link: string;
}

export interface LinksType {
  admin: LinkObjectType[];
  user: LinkObjectType[];
  [key: string]: LinkObjectType[];
}

export const admin_links = [
  { title: "Acerca de mí", link: "/about_me" },
  { title: "Blog", link: "/blog" },
  { title: "Playground", link: "/playground" },
  { title: "Alumnos", link: "/students" },
  { title: "Dashboard", link: "/dashboard" },
  { title: "Portfolio", link: "/portfolio" },
];

const user_links = [
  { title: "Acerca de mí", link: "/about_me" },
  { title: "Blog", link: "/blog" },
  { title: "Playground", link: "/playground" },
  { title: "Alumnos", link: "/students" },
  { title: "Portfolio", link: "/portfolio" },
];

export const guest_links = [
  { title: "Acerca de mí", link: "/about_me" },
  { title: "Blog", link: "/blog" },
  { title: "Playground", link: "/playground" },
  { title: "Portfolio", link: "/portfolio" },
];

export const links: LinksType = {
  admin: admin_links,
  user: user_links,
};

export const dictLinksToEnglish: { [key: string]: string } = {
  Inicio: "Home",
  Blog: "Blog",
  Playground: "Playground",
  Alumnos: "Students",
  Dashboard: "Dashboard",
  "Acerca de mí": "About me",
  Portfolio: "Portfolio",
};
