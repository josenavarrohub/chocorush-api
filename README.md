# 🍫 ChocoRush API 🍫

An API for managing a chocolate shop's menu and orders, built with Node.js, Express and TypeScript. It includes endpoints for retrieving menu items, creating orders, and updating order statuses.

## Demo
https://chocorush-api.onrender.com/api/menu

## Prerequisites

You need to have at least [Node.js](https://nodejs.org/en/) v20.15.1 or later installed on your system.

## Installation

To set up the project, follow these steps:

1. Clone the repository:
```
git clone https://github.com/josenavarrohub/chocorush-api.git
```

2. Navigate to the project directory:
```
cd chocorush-api
```

3. Install the dependencies:
```
pnpm install
```

4. Start the application:
```
pnpm run dev
```

The API will be available at `http://localhost:3000`.

## API Endpoints

- GET `/api/menu`: Retrieve the menu items
- GET `/api/order/:id`: Retrieve a specific order
- POST `/api/order`: Create a new order
- PATCH `/api/order/:id`: Update an existing order

## Built with
* [Node.js ](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript

## Author

* **José Navarro** - [View LinkedIn profile](https://www.linkedin.com/in/josenavarroortiz/)
