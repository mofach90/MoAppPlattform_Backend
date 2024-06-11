# MoAppPlattform_Backend

MoAppPlattform_Backend is a backend service built with Node.js and Express. It provides simple web APIs for a web app plattform.


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

`git clone https://github.com/mofach90/MoAppPlattform_Backend.git
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


### Built With

- [Express](https://expressjs.com/) - The web framework used
- [Node.js](https://nodejs.org/) - The runtime environment

### Folder Structure

├── README.md
├── jest.config.js
├── package-lock.json
├── package.json
├── src
│   ├── api
│   │   ├── components
│   │   │   ├── Auth
│   │   │   │   ├── controllers.ts
│   │   │   │   └── routes.ts
│   │   │   └── index.ts
│   │   ├── middleware
│   │   │   └── index.ts
│   │   ├── routes.ts
│   │   └── server.ts
│   ├── app.ts
│   ├── config
│   │   └── logger.ts
│   ├── services
│   │   ├── auth
│   │   │   ├── basicauth.ts
│   │   │   ├── formBasedAuthentication.ts
│   │   │   ├── verifyJwtFromCookie.ts
│   │   │   └── verifyJwtFromLocalStorage.ts
│   │   ├── basic
│   │   │   ├── bodyParser.ts
│   │   │   ├── cors.ts
│   │   │   ├── sanitize.ts
│   │   │   └── sessionFactory.ts
│   │   └── utilities
│   │       ├── assignPort.ts
│   │       ├── checkSessionSecretKey.ts
│   │       ├── generateHashPass.ts
│   │       └── generateToken.ts
│   ├── test
│   │   └── app.test.ts
│   └── types
│       └── express-session.d.ts
└── tsconfig.json

## Api Directory

# Directory: src/api/components

Here we have the heart of our component based Node API. Each component has its own routes, controller

- controller.ts

The controller class handles incoming requests and sends the response data back to the client.
Request validation happens via middleware few steps before

- routes.ts

Here we define the API endpoints for the corresponding component and assign the controller methods to them.

# Directory: src/api/middleware/

This folder includes all the API’s global middlewares like cors, sanitizer, sesion factory etc.

# File: src/api/routes.ts

Here we register all component and middleware routes.

# File: src/api/server.ts

Here we declare everything required for our express server
error handling

# Directory: src/config

This directory includes configuration files. This could be for example:

- global variables
- logger config

# Directory: src/services/

This directory contains global services we need for verifing Json Web Token or authorization methods for example.

# Directory: src/test/

This directory includes a test factory for running the component tests. <!-- Test Factory todo -->

# Directory: src/test/

This directory includes all custom manuel added types needed in the project.

# File: src/app.ts

This is the startup file of our application. It starts the express server.

* To get more understanding of the Structure check this article : https://medium.com/swlh/how-i-structure-my-node-js-rest-apis-4e8904ccd2fb
