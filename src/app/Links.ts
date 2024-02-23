
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
    { title: "Inicio", link: "/about_me" },
    { title: "Blog", link: "/blog" },
    { title: "Playground", link: "/" },
    { title: "Alumnos", link: "/about_me" },
    { title: "Dashboard", link: "/dashboard" },

];

const user_links = [
    { title: "Inicio", link: "/about_me" },
    { title: "Blog", link: "/blog" },
    { title: "Playground", link: "/about_me" },
    { title: "Alumnos", link: "/about_me" },

];

export const guest_links = [
    { title: "Inicio", link: "/about_me" },
    { title: "Blog", link: "/blog" },
    { title: "Playground", link: "/about_me" },
];


export const links: LinksType = {
    admin: admin_links,
    user: user_links,
};