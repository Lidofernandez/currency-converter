## Getting started

This project is based on React, webpack and a touch of PWA concepts.

How to run a local development server

```
npm run start
```

How to build a production bundle

```
npm run build:prod
```

## Developer tools

This project contains the following tools for ensuring code quality and consistency:

- eslint with airbnb config for react and hooks
- prettier for react
- husky for running hooks in any git stage

## Building tools

This project uses webpack and babel to bundle and serve the assets. It also contains a service worker package to better cache the assets and support offline functionality (PWA).
