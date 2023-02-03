
# ECO MARTS REST API
## About

REST API for an E-Commerce app that is focused on providing sustainable and eco-friendly products.
- Co created by Rumeli Paul and Sarah Kandlin.
- This repo implements the backend REST API (built in Express + MongoDB).
- A repository for with the frontend (React App) can be found here: https://github.com/sarah-rumeli/ecommerce-client

## Instructions
To run in your computer, follow these steps:
- clone 
- install dependencies: `npm install`
- create a `.env` file with the following environment variables
  - ORIGIN, with the location of your frontend app (example, `ORIGIN=https://mycoolapp.netlify.com`)
  - TOKEN_SECRET: used to sign auth tokens (example, `TOKEN_SECRET=ilovemymom`)

-We have used Cloudinary to upload our images. You will need to set up an account with Cloudinary.
- [This is an external link to Cloudinary](https://cloudinary.com/)
- Add the following environment variables to your .env file :

  `CLOUDINARY_NAME`

  `CLOUDINARY_KEY`

  `CLOUDINARY_SECRET`
- run the application: `npm run dev`
## API Endpoints

**Auth endpoints**
| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /auth/signup  | –  | { email: String, password: String }  | Create an account  |
| POST  | auth/login  | –  | { email: String, password: String }  | Login  |
| GET  | /auth/verify  | Authorization: Bearer `<jwt>`  | –  | Verify jwt  |
| GET  | /auth/profile/:profileId  | - | –  |Get details of a specific user profile  |
| PUT  | /auth/profile/:profileId  | - | –  |Edit details of a specific profile  |
| DELETE  | /auth/profile/:profileId  | - | –  |Delete details of a specific profile  |


**Products endpoints**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/products  | Authorization: Bearer `<jwt>`  | { name: String, description: String,price:Number,category:String,img:String,user:Obj Ref }  | Create new product  |
| GET  | /api/products  | –  | –  | Get all projects  |
| GET  | /api/products/:productId  | –  | – | Get product details  |
| PUT  | /api/products/:productId  | Authorization: Bearer `<jwt>`  | { name: String, description: String,price:Number,category:String,img:String,user:Obj Ref }  | Update a product  |
| DELETE  | /api/products/:productId  | Authorization: Bearer `<jwt>`  | – | Delete a product  |

**Orders endpoints**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/orders  | Authorization: Bearer `<jwt>`  | { userId: RefObj, products: Array,totalPrice:Number,notes:String,status:String(enum)}  | Create new order  |
| GET  | /api/orders  | Authorization: Bearer `<jwt>`  | –  | Get all orders  |
| GET  | /api/orders/:ordertId  | Authorization: Bearer `<jwt>`   | – | Get order details  |
| PUT  | /api/orders/:orderId  | Authorization: Bearer `<jwt>`  | { status:String,dispatchDate:Date }  | Edit an order (only for admin) |
| DELETE  | /api/orders/:ordertId  | Authorization: Bearer `<jwt>`  | – | Delete an order(product owner and admin)  |

**Cart endpoints**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/cart  | Authorization: Bearer `<jwt>`  | { userId: RefObj, products: Array} | Create new cart or updates user's cart |
| GET  | /api/cart | Authorization: Bearer `<jwt>`  | –  | Get cart details  |
| DELETE  | /api/cart/:productId  | Authorization: Bearer `<jwt>`  | – | Remove an item from cart |
| DELETE  | /api/cart/remove/:userId  |{userId: Ref Obj}  | – | Remove cart on checkout |


**Comment endpoints**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/products/:productId/comments  | Authorization: Bearer `<jwt>`  | { userId: RefObj, product: Obj Ref,comment:String,rating:Number} | Create new comment |
| GET  | /api/products/:productId/comments | Authorization: Bearer `<jwt>`  | –  | Get all comments  |
|PUT |/api/products/:productId/comments/:commentId  | Authorization: Bearer `<jwt>`  | – | Update comment |
| DELETE  | /api/products/:productId/comments/:commentId  |- | – | Remove comment|

## Demo
A demo of the REST API can be found here: https://ecomarts.adaptable.app/
![Logo](https://res.cloudinary.com/dq4j6xfee/image/upload/v1675413541/ecommerce/gfshw1opf7kvgkc8cjs7.png)

