
import { Feed } from "feed"
import fs from "fs";

const generateRssFeed = async () => {

    //This console log will appear in the console at build time.
    console.log("Creating RSS feed");
    const postsFetch = await fetch(`https://nicohorn.com/api/blog_entry`, {
        method: "GET",
    });
    const posts = await postsFetch.json();
    const siteURL = "https://nicohorn.com";
    const date = new Date();
    const author = {
        name: "Nico Horn",
        email: "contact@nicohorn.com",
        link: "https://nicohorn.com"
    }

    const feed = new Feed({
        title: "Nico Horn's blog",
        description: "Welcome to my blog! Here I post my own thoughts and views about tech, philosophy and pretty much anything that comes to my mind.",
        id: siteURL,
        link: siteURL,
        image: `https://nicohorn.com/ms-icon-144x144.png`,
        copyright: `All rights reserved ${date.getFullYear()}, Nico Horn`,
        updated: date,
        generator: "Feed for Node.js",
        feedLinks: {
            rss2: `${siteURL}/rss/feed.xml`,
            json: `${siteURL}/rss/feed.json`,
            atom: `${siteURL}/rss/atom.xml`
        },
        author
    })

    posts?.forEach((post) => {
        const entryURL = `${siteURL}/en-US/blog/${post.id}`

        feed.addItem({
            title: post.title,
            id: entryURL,
            link: entryURL,
            description: post.description,
            content: post.content,
            image: post.cover_image,
            author: [author],
            contributor: [author],
            date: new Date(post.created_at),
        })
    })

    fs.mkdirSync("./public/rss", { recursive: true });
    fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
    fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
    fs.writeFileSync("./public/rss/feed.json", feed.json1());

}

// const generateRssFeed_es = async () => {

//     //This console log will appear in the console at build time.
//     console.log("Creating RSS feed");
//     const postsFetch = await fetch(`https://nicohorn.com/api/blog_entry`, {
//         method: "GET",
//         body: JSON.stringify({ lang: "es" })
//     });
//     const posts = await postsFetch.json();
//     const siteURL = "https://nicohorn.com";
//     const date = new Date();
//     const author = {
//         name: "Nico Horn",
//         email: "contact@nicohorn.com",
//         link: "https://nicohorn.com"
//     }

//     const feed = new Feed({
//         title: "Blog de Nico Horn",
//         description: "¡Bienvenido a mi blog! Acá comparto mis opiniones sobre tecnología, política y a veces filosofía.",
//         id: siteURL,
//         link: siteURL,
//         image: `https://nicohorn.com/ms-icon-144x144.png`,
//         copyright: `Todos los derechos reservados ${date.getFullYear()}, Nico Horn`,
//         updated: date,
//         generator: "Feed for Node.js",
//         feedLinks: {
//             rss2: `${siteURL}/rss/feed_es.xml`,
//             json: `${siteURL}/rss/feed_es.json`,
//             atom: `${siteURL}/rss/atom_es.xml`
//         },
//         author
//     })

//     posts?.forEach((post) => {
//         const entryURL = `${siteURL}/es-AR/blog/${post.id}`

//         feed.addItem({
//             title: post.title,
//             id: entryURL,
//             link: entryURL,
//             description: post.description,
//             content: post.content,
//             image: post.cover_image,
//             author: [author],
//             contributor: [author],
//             date: new Date(post.created_at),
//         })
//     })

//     fs.mkdirSync("./public/rss", { recursive: true });
//     fs.writeFileSync("./public/rss/feed_es.xml", feed.rss2());
//     fs.writeFileSync("./public/rss/atom_es.xml", feed.atom1());
//     fs.writeFileSync("./public/rss/feed_es.json", feed.json1());

// }

//This one I use it on the endpoint that the cron job runs.
export { generateRssFeed }
//It's exported like this, executed, because it'll be caled directly by a Node command in the CLI.
export default generateRssFeed();

