# Performance page challenge

[![Demo](https://img.shields.io/badge/deployed-demo-2fa4cf.svg)](https://antescofo-metronaut.vercel.app/)
[![Coverage](https://img.shields.io/badge/coverage%20-report-facd07.svg)](https://coverage-antescofo-metronaut.surge.sh/)
[![Health pipeline](https://github.com/proustibat/ntscf-mtrnt/actions/workflows/health.yml/badge.svg)](https://github.com/proustibat/ntscf-mtrnt/actions/workflows/health.yml)

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

A Github action also runs the linter at each push on main branch.

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

## Deployment

### Project

The project is deployed at this url: [https://antescofo-metronaut.vercel.app/](https://antescofo-metronaut.vercel.app/).
I used the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) for that.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Coverage

The coverage report is deployed at this url: [http://coverage-antescofo-metronaut.surge.sh](http://coverage-antescofo-metronaut.surge.sh).
I used a Github action to run the tests and deploy the coverage report for each push on main branch.

---

## Learn More

The project uses Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
