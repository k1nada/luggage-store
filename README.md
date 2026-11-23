# Best Shop

Multi-page online store. Capstone project for EPAM JavaScript Fundamentals.

Built with HTML, SCSS and TypeScript, without frameworks. Product data is loaded from `src/assets/data.json`.

Live demo: https://k1nada.github.io/luggage-store/

## Pages

- Home
- Catalog: filters, sorting, search and pagination
- Product details
- About Us
- Contact Us: form with validation
- Cart: data is stored in LocalStorage

## Prerequisites

- Node.js 20.19+ and npm

## Setup and run

```bash
npm install
npm run dev
```

`npm run dev` compiles SCSS and TypeScript from `src` into the `dist` folder and opens the site in the browser. Styles and scripts are available only after compilation.

## Scripts

- `npm run dev`: compile SCSS and TypeScript and start a local server
- `npm run build`: build the project into `dist` (runs `compile`)
- `npm run compile`: compile SCSS to `dist/main.css` and TypeScript to `dist/js`
- `npm run lint`: check TypeScript files with ESLint and SCSS files with Stylelint

## Project structure

```text
index.html        redirect to the home page
src/
  index.html      home page
  html/           other pages
  scss/           styles: abstracts, base, components, layouts, pages
  ts/             page scripts
  ts/modules/     shared code: cart, forms, product cards, products
  assets/         images, icons and data.json
dist/             compiled CSS and JS
```
