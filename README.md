## Getting Started

## Table of contents

- [Getting Started](#getting-started)
- [Folder structure](#folder-structure)
- [How to create a new Page](#how-to-create-a-new-page)
  - [3. Creating a new PR in Github](#3-creating-a-new-pr-in-github)
- [Basic recommended configurations](#basic-recommended-configurations)
  - [Extensions](#extensions)
- [Relevant links](#relevant-links)
- [Running backend locally](#running-backend-locally)
- [Seeding The Data](#seeding-the-data)
- [Setting Up The Frontend](#setting-up-the-frontend)

## Folder structure

Our app follows the basic structure:
Note: CamelCase convention must be used for directory names as components, pages, layout, providers

```
/your/app/root/
`-- src
    |-- app
        |-- [lang]
            |-- home/
            |-- about/
            |-- contact/
   |-- components/
        |-- Footer/
        |-- Navbar/
   |-- utils
        |-- hooks/
        |-- constants/
        |-- function/
        |-- typing/
    |-- Layouts/
```

## How to create a new Page

`Index routes`
The router will automatically route files named index to the root of the directory.

[index] app/pages.js → /
[some_url] page/blog/page.js → /blog

`App with Dynamic Routes`
Next.js supports pages with dynamic routes. For example, if you create a file called pages/posts/[id].js, then it will be accessible at posts/1, posts/2, etc.
This is a next project please consider it will need a server running to be able

Next Doc (https://nextjs.org/docs/app/building-your-application/routing/defining-routes)

### 3. Creating a new PR in Github

When developing one good practice is to start by opening a draft PR so the team can keep up with what you're doing from the start, but that's not strictly necessary.

When opening a PR you should name it following the template

> `[ANW30-XXX]: <ticket description>`

And do not ignore the PR description template, please fill it out as better as you can, this helps everyone who's reviewing and can help you remember things you're leaving behind. Also, assign the PR to yourself so we can easily track it.

When you're finished, open the PR for review. This does not mean the PR is ready to merge, only that you feel like you're done, so do not fret about only opening the PR when you think it's a masterpiece

**Please, auto review your own PR before opening it up!**

## Basic recommended configurations

This configuration assumes that you're using Chrome, if not just change the `type` property to whichever you like.

### Extensions

This is a list of recommend extensions and some VSCode configs to help ease the Developer Experience. Some of these we recommend more fiercely because you'll be using them very frequently. These will be suffixed with `*`.

- Prettier - Code formatter \*
- ESLint \*
- Live Share (this is nice to have if you're working more commonly in pair programming)
- Auto Rename Tag
- Toggle Quotes
- ES7 + React/Redux/React-Native snippets

## Relevant links

- Tailwind (https://tailwindui.com/documentation)
- MUI (https://mui.com/)
- NextJS (https://nextjs.org/docs)
- Strapi (https://docs.strapi.io/dev-docs/intro)

## Running backend locally

1. Clone the backend repository locally:

```bash
  git clone https://github.com/a1repo/a1_web_3.0_strapi_cms.git
```

2. Next, Set up your `.env` file. You can use the `.env.example` file as reference:

```bash
HOST=localhost
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
```

3. Start the backend project by running the following command:

```bash
  npm run build
  npm run develop
```

You will be prompted to create your first admin user.

![admin-user](https://user-images.githubusercontent.com/6153188/231865420-5f03a90f-b893-4057-9634-9632920a7d97.gif)

Great. You now have your project running. Let's add some data.

## Seeding The Data

We are going to use our DEITS feature which will alow to easily import data into your project.

You can learn more about it in our documentation [here](https://docs.strapi.io/dev-docs/data-management).

In the root of our project we have our `seed-data.tar.gz` file. We will use it to seed our data.

1. Open up your terminal and make in the `backend` folder.

2. Run the following command to seed your data:

```bash
  npm run strapi import -f ./seed-data.tar.gz
```

![after-import](https://user-images.githubusercontent.com/6153188/231865491-05cb5818-a0d0-49ce-807e-a879f7e3070c.gif)

This will import your data locally. Log back into your admin panel to see the newly imported data.

Here is a quick video covering initial setup and data seeding.

https://github.com/strapi/nextjs-corporate-starter/assets/6153188/80f00bf5-d17b-449d-8a0d-7f0d9614f40b

## Setting Up The Frontend

Next we need to create our `.env` file and paste in the following.

```bash
NEXT_PUBLIC_STRAPI_API_TOKEN=your-api-token
NEXT_PUBLIC_PAGE_LIMIT=6
NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN=your-form-submission-token
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337

```
