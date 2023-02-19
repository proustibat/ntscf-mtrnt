# Performance page challenge

## Prerequisites
Be sure [Node](https://nodejs.org/) and [NPM](https://www.npmjs.com/) are installed.

If you work on multiple projects I recommend to use [NVM](https://github.com/nvm-sh/nvm) to manage different node version.
Since this project has a `.nvmrc` file, you can just run `nvm use` to be sure to use the right version of Node.

## Installation

```$xslt
git clone git@github.com:proustibat/ntscf-mtrnt.git
cd ntscf-mtrnt
npm i
```

## Development

First, run the development server:

```bash
npm run dev
```

## Testing
```bash
npm run test
```
This watches test files, and run Jest on changed files. Note that I used React Testing Library to test React components.

### Coverage
```bash
npm run test:ci
open coverage/index.html
```
This runs the tests, by collecting coverage, so you can open the html reporter to visualize it.

## Linting
I used Prettier in addition to Eslint. You can have a look on configuration files to know more about the applied rules.
```bash
# runs eslint with --fix option and prettier with --write option
npm run lint 
```

## Production

### Build a production version
```bash
npm run build
```
This is what we are supposed to run on a CI/CD pipeline. It builds assets depending on pages (SSG, SSR...)

### Serve the production version
After you built the production version, you can serve it with the following npm script:
```bash
npm run start
```

---

## Learn More

The project uses Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
