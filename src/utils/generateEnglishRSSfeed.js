
import { Feed } from "feed"
import fs from "fs";

const generateRssFeed = async () => {


    console.log("Creating RSS feed");

    const postsFetch = await fetch(`http://localhost:3000/api/blog_entry`, {
        method: "GET",
    });
    const posts = await postsFetch.json();
    console.log(posts)
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
        image: `${siteURL}/ms-icon-144x144.png`,
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
            author: [author],
            contributor: [author],
            date: new Date(post.created_at)
        })
    })

    fs.mkdirSync("./public/rss", { recursive: true });
    fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
    fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
    fs.writeFileSync("./public/rss/feed.json", feed.json1());

}

export { generateRssFeed }
export default generateRssFeed();

