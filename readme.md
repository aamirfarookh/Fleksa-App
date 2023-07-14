# Application Documentation

## Introduction

This document provides an overview and detailed documentation of the routes available in the backend Node.js application. The application is designed to handle food-related functionalities such as adding food items, managing a shopping cart, placing orders, and user authentication. It follows a RESTful API design pattern and utilizes middleware for authentication.

## Base URL

The base URL for all API endpoints in this application is `https://elegant-ruby-lab-coat.cyclic.app/`.

## Authentication

Authentication is required for accessing certain routes in the application. The authentication process involves including a valid JSON Web Token (JWT) in the request headers. The JWT can be obtained by logging in to the application using the `/login` route and providing valid credentials. Once authenticated, subsequent requests to routes that require authentication should include the JWT in the `Authorization` header as follows:

```
Authorization: <JWT>
```

## Error Responses

In case of errors or invalid requests, the API will respond with appropriate HTTP status codes and error messages in the response body.

- 400 Bad Request: Indicates that the request was malformed or contained invalid data.
- 401 Unauthorized: Indicates that the request requires authentication or the provided credentials are invalid.
- 403 Forbidden: Indicates that the request is not permitted due to insufficient privileges.
- 404 Not Found: Indicates that the requested resource could not be found.
- 500 Internal Server Error: Indicates an unexpected error occurred on the server.

## User Routes

### Register a new user

**Endpoint:** `POST /user/register`

This route allows users to register a new account by providing the necessary information.

**Request Body:**

```json
{
  "name": "example_user",
  "password": "example_password",
  "email": "user@example.com"
}
```

**Response:**

- 200 OK: Registration successful.
- 400 Bad Request: Invalid request or missing required fields.

### Login a user

**Endpoint:** `POST /user/login`

This route allows users to log in to the application by providing their credentials.

**Request Body:**

```json
{
  "email": "example_user",
  "password": "example_password"
}
```

**Response:**

- 200 OK: Login successful. Returns a JWT to be used for subsequent authenticated requests.
- 400 Bad Request: Invalid request or missing required fields.
- 401 Unauthorized: Invalid credentials.

## Food Routes

### Add a new food item

**Endpoint:** `POST /food/addfood`

This route allows authenticated admin to add a new food item.

**Request Body:**

```json
{
  "name": "Pizza",
  "price": 9.99,
  "description": "Delicious pizza with assorted toppings",
   "image":"link to image"
}
```

**Response:**

- 200 OK: Food item added successfully.
- 400 Bad Request: Invalid request or missing required fields.
- 401 Unauthorized: Authentication required.

### Fetch all food items

**Endpoint:** `GET /food/fetchFood`

This route retrieves all available food items.

**Response:**

- 200 OK: Returns an array of food items.
- 401 Unauthorized: Authentication required.

### Remove an item from the shopping cart

**Endpoint:** `DELETE /food/cart/:id`

This route allows authenticated users to remove a food item from their shopping cart.

**Parameters:**

- `id` (string): The unique identifier of the item to remove from the cart.

**Response:**

- 200 OK: Item removed successfully.
- 400 Bad Request: Invalid request or missing required fields.
- 401 Unauthorized: Authentication required.

### Add an item to the shopping cart

**Endpoint:** `PATCH /food/cart`

This route allows authenticated users to add a food item to their shopping cart.

**Request Body:**

```json
{
  "itemId": "1234567890",
  "quantity": 2
}
```

**Response:**

- 200 OK: Item added to the cart successfully.
- 400 Bad Request: Invalid request or missing required fields.
- 401 Unauthorized: Authentication required.

### Get the shopping cart

**Endpoint:** `GET /food/cart`

This route retrieves the contents of the user's shopping cart.

**Response:**

- 200 OK: Returns the user's shopping cart.
- 401 Unauthorized: Authentication required.

### Update a cart item

**Endpoint:** `PATCH /food/cart/:itemId`

This route allows authenticated users to update the quantity of a specific item in their shopping cart.

**Parameters:**

- `itemId` (string): The unique identifier of the item to update in the cart.

**Request Body:**

```json
{
  "quantity": 3
}
```

**Response:**

- 200 OK: Cart item updated successfully.
- 400 Bad Request: Invalid request or missing required fields.
- 401 Unauthorized: Authentication required.

### Place an order

**Endpoint:** `PATCH /food/placeorder`

This route allows authenticated users to place an order using the items in their shopping cart.

**Response:**

- 200 OK: Order placed successfully.
- 401 Unauthorized: Authentication required.

## Conclusion

This documentation provides an overview and details of the routes available in the backend Node.js application. Use the provided endpoints to register new users, login users, manage food items, handle the shopping cart, and place orders. Make sure to include authentication using JWT for routes that require it.
