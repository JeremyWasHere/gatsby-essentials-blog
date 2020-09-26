## Gatsby Essentials Blog

This project was inspired/started by the [Gatsby Starter Blog](https://github.com/gatsbyjs/gatsby-starter-blog) project. There's a lot of tutorials available for getting started with that project. 

These features are great, for getting started, but you’ll quickly notice that they are limited and don’t cover the needs of most blogs. Maybe you could get by with them for a little while, but you will quickly find that you need more. There are other, essential, features that the Starter blog leaves out.

That's where this project comes in. We started with the Gatsby Starter Blog, but then added other essential things that almost every blog needs. The project is still simple and easy to follow, ie. a good starting place, but it's a little more robust and practical.

Here is the official [DEMO SITE](https://gatsby-essentials-blog.netlify.app/). I also use a variation on [my own blog](https://jeremyparnell.com)!

Let's look at some of the changes/additions.

### A real home page

The home page of the Gatsby Starter Blog is a list of blog posts. This is traditionally what you get with a fresh install of a blogging system, but you're going to want some sort of landing page eventually.

So the first thing we did was move the list of blog posts from pages/index.js to templates/blog-list.js and refactored gatsby-node.js to use the new template. We also gave the list the new route of /blog/ and individual posts the route of (ex.) /blog/hello-world.

This frees up our home page to be whatever we want it to be (in this project, we have a nice welcome image along with recent posts).

### Better lists of content

Looking at the list of content in the Gatsby Starter Blog, it leaves a lot to be desired. We made several improvements.

#### Thumbnail images

It's not very common for a blog post to be just text. Thumbnail images are essential. Those are provided through the frontmatter *thumbnail* in our Markdown files. These are optimized when building the Gatsby project.

Also, a key piece of social sharing was missing in the Starter blog. While Twitter and Facebook meta tags are included in the `<head>` of the page, no image is supplied. With our new thumbnail support, we have images to provide there, so we do.

#### Pagination

You're going to write a lot of blog posts (hopefully). The original Starter blog would list all of those on a single page. Scrolling forever isn't the best experience, so we've added pagination to the /blog/ list. Pagination is an essential feature. We left the number of posts to display as 1 in the project code for demonstration purposes, but you can set that to whatever you'd like in gatsby-config.js

#### Grouping of posts by topic

Categories, tags, topics or otherwise grouping of related posts together is very common in blogs. We've added that to this project with an array of *topics* in the frontmatter of the Markdown files, and filtering in gatsby-node-config.js. Each blog post displays links to pages of other posts on the same topic.

### Standalone content pages

Let's face it, not everything you write should flow through the blogging system. Even personal blogs would have a standalone "About Me" page. It'd be weird to have that About Me page appear in a list of blog posts that are largely chronological in context.

Pages that are like blog posts, but don't flow through lists, are essential. We achieve that by adding a *pageType* to the frontmatter of our Markdown files, and filtering the two different types of content ("blog" and "page") in gatsby-node.js. Content pages have a separate template so they can even be styled differently or have different components in them.

### Additional improvements

#### Read more cards

A common feature of blogs is to suggest additional posts to read, to keep visitors engaged in your site. We've added that essential feature to this project as well. At the end of every blog post are (randomly selected) suggestions of other posts to read. We also use this component on the home page, sorting by most recent instead of random.

#### Social share links

These often appear on blogs as icons. We went with text links in a call to action statement. However, you can modify that on your own if you'd like to supply [Font Awesome](https://fontawesome.com/) icons instead, following examples of where we do use those icons in other places (like the footer).

#### Site map for search engine optimization

A site map is essential for Google Search Console and SEO so we added the gatsby-plugin-sitemap and added the reference to Helmet. The Starter project has RSS feeds in it, so the lack of a Site Map was a strange omission.

### Just the essentials

We hope that you find the Gatsby Essentials Blog project helpful in getting you up and running with your own GatsbyJS blog, and that you find these additional features as essential as we do.