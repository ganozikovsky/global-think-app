# Global Think

## Description

This server is made for Global Think technical test. It is a REST API that allows to manage users.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- Node.js
- npm

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Test

```bash
# unit tests
$ npm run test
```

## Folder Structure

```js
+-- dist // Source build
+-- src
|   +-- common // Global Nest Module
|   |   +-- constants // Constant value and Enum
|   |   +-- filters // Nest Filters
|   |   +-- utils // Utility functions
|   +-- * // Other Nest Modules, non-global, same as common structure above
+-- test // Jest testing
```

## API Documentation

Once running the app, you can access the API documentation

```
http://localhost:3000/docs
```



