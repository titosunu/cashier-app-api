# EXPRESS SETUP V2

## Official Documentation

Documentation Platform [NodeJs](https://nodejs.org/en/).

Documentation NodeJs Framework [Express](https://expressjs.com/).

Documentation SQL Database Module [Knex](https://knexjs.org/).

Documentation ORM Database Module [Objection.js](https://vincit.github.io/objection.js/guide/installation.html).

## Requirement

#### Install Knex and Knex Command Line Tool

Install `knex` **globally** on your local computer.

> npm install knex -g

This will allow us to use `knex` as a command line tool that helps you create and manage your knex files.

#### Nodemon Global for Development

> npm install nodemon --global

## Installation

#### Execute in your terminal

> npm install

> cp .env.example .env

#### !! Setup your database on .env file !!

Migrate database

> knex migrate:latest

Run Application

> nodemon start

open http://localhost:8080 to make sure it's work

## Features

#### Swagger API Documentations

This project comes with documentation using [Swagger](https://swagger.io/). go here http://localhost:8080/docs to see it

#### Prettier

Run Prettier to tidy up your code

> npm run prettier

#### Schema

-   **Table Name:** `users`
-   **Description:** Stores user information.
-   **Columns:**

    -   `id` (string, primary key): Unique identifier for the user.
    -   `username` (string, unique): Username of the user.
    -   `password` (string): User's password.
    -   `created_at` (timestamp): Timestamp when the user was created.
    -   `updated_at` (timestamp): Timestamp when the user information was last updated.

-   **Table Name:** `transactions`
-   **Description:** Stores transaction records.
-   **Columns:**

    -   `id` (string, primary key): Unique identifier for the transaction.
    -   `user_id` (string, foreign key): Reference to the user who made the transaction.
    -   `total_amount` (decimal): Total amount for the transaction.
    -   `transaction_date` (timestamp): Date and time when the transaction occurred.

-   **Table Name:** `categories`
-   **Description:** Stores product categories.
-   **Columns:**

    -   `id` (string, primary key): Unique identifier for the category.
    -   `name` (string, unique): Name of the category.
    -   `created_at` (timestamp): Timestamp when the category was created.
    -   `updated_at` (timestamp): Timestamp when the category information was last updated.

-   **Table Name:** `products`
-   **Description:** Stores product details.
-   **Columns:**

    -   `id` (string, primary key): Unique identifier for the product.
    -   `name` (string): Name of the product.
    -   `category_id` (string, foreign key): Reference to the product's category.
    -   `price` (decimal): Price of the product.
    -   `stock` (integer): Available stock of the product.
    -   `created_at` (timestamp): Timestamp when the product was created.
    -   `updated_at` (timestamp): Timestamp when the product information was last updated.

-   **Table Name:** `transaction_details`
-   **Description:** Stores details of each transaction.
-   **Columns:**
    -   `id` (string, primary key): Unique identifier for the transaction detail.
    -   `transaction_id` (string, foreign key): Reference to the related transaction.
    -   `product_id` (string, foreign key): Reference to the product involved in the transaction.
    -   `quantity` (integer): Quantity of the product purchased.
    -   `subtotal` (decimal): Subtotal amount for the product.

### Created with ❤️
