# Mini-Commerce

A modern, responsive e-commerce demo built with React, TanStack Router, Zustand, and Tailwind CSS.

## Features

- Product catalogue with filtering and details
- Shopping cart with persistent state
- Checkout flow with order confirmation
- Responsive, accessible UI
- Local product data (no backend required)
- Built with Vite, TypeScript, and Tailwind CSS

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/samzyconcepts/mini-commerce.git
    cd mini-commerce
    ```

2. **Install dependencies**

    ```sh
    npm install
    ```

### Run the Development Server

1. **Start the vite development server**

    ```sh
    npm run start
    ```

    This will start the frontend at [http://localhost:3000](http://localhost:3000).

2. **Start the json server**

    ```sh
    npm run server
    ```

    This will serve `products.json` at [http://localhost:5000/products](http://localhost:5000/products).

### Project Structure

- src/ — Main source code (components, routes, store, API)
- public/ — Static assets and product data (products.json)
- index.html — HTML entry point

### Customization

- Product Data: Edit products.json to change or add products.
- Styling: Modify src/styles.css and tailwind.config.ts for design changes.

---

Enjoy your shopping demo!
