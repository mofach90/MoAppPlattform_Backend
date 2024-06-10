# MoAppPlattform_Backend

MoAppPlattform_Backend is a backend service built with Node.js and Express. It provides simple web APIs for demonstration purposes, including a welcome message and a test endpoint.

## Features

- **Welcome Endpoint**: Returns a greeting message.
- **Test Endpoint**: Returns a HTML response indicating successful request handling.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)

```bash
# Check Node.js installation
node --version

# Check npm installation
npm --version
```

### installing

A step by step series of examples that tell you how to get a development environment running:

Clone the repository:

bash

`git clone https://yourrepository.com/moappplattform_backend.git
cd moappplattform_backend`

Install dependencies:

bash

`npm install`

Start the development server:

bash

`npm run dev`

### Running the tests

Explain how to run the automated tests for this system:

bash

`npm run test`

### Welcome Endpoint

**Request**:

http

`GET /`

**Response**:

css

`Welcome to MoAppBackend`

### Test Endpoint

**Request**:

http

`GET /test`

**Response**:

html

`<h1>success status 200</h1>`

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Node.js](https://nodejs.org/) - The runtime environment

## Folder Structure

- i used this structure description : https://medium.com/swlh/how-i-structure-my-node-js-rest-apis-4e8904ccd2fb
- ill add more details to the structure later <!-- todo -->
