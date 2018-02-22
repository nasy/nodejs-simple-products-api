
This is a simple API in Node.js using MongoDB and ExpressJS

This API allows users to do CRUD operations on Products.

The products have the following attributes:

* description: Product description

* cost: How much it costs me to buy the product. In USD.

* price: How much I sell the product for. In USD.

* stock: How many products I have in stock

* total_cost: How much money I paid for all items of any given product.

* total_price: how much money would I get if I sold them all.

CRUD operations:

* POST /products

* GET /products

* GET /products/:id

* PUT /products/:id

* DELETE /products/:id

Pass a ?currency=EUR parameter to get the prices in a different currency

To get the total stock:

GET /stock

* (how much money I have spent for all items in stock and how much would I get if I sold them all)

For the currency conversion I used Fixer, an open-source, simple, and lightweight API for current and historical foreign exchange (forex) rates.

https://api.fixer.io/latest?base=USD

* To execute the tests go into the running docker container and run:
npm test
