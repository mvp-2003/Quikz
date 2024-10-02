# Middleware Directory

## Overview:
The `middleware` directory contains all middleware functions used in the application. Middleware functions are functions that have access to the request, response, and the next middleware function in the application’s request-response cycle. They are essential for handling requests, performing validations, authentication, error handling, and more.

### Structure:
- Each middleware function should be organized into separate files based on its functionality (e.g., `authMiddleware.js` for authentication logic).
- This modular structure enhances maintainability and allows for easier testing and debugging.

### Current Example (authMiddleware.js):
In the current implementation, `authMiddleware.js` is responsible for verifying user authentication tokens.

#### Example of authMiddleware.js:
```js
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Access denied. No token provided.");
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(StatusCodes.FORBIDDEN).send("Invalid token.");
        }
        req.user = decoded;
        next();
    });
};

module.exports = authenticateUser;
```

## How to Add a New Middleware:

1. **Create a new file** in the `middleware/` directory, naming it according to its functionality (e.g., `loggingMiddleware.js` for logging requests).

2. **Define the middleware function** in the file, implementing the desired logic (e.g., authentication, logging, error handling).  
   Ensure that the function adheres to the standard middleware pattern, taking `(req, res, next)` as parameters.

3. **Export the middleware function** for use in the routes or other parts of the application.  
   This allows you to import and utilize the middleware wherever needed.

---

### Example Steps:

1. **Create a `loggingMiddleware.js`** file in the `middleware/` directory to log incoming requests.

2. **Define the logging logic** to capture request details, such as method, URL, and timestamp.  
   This can be done using `console.log` or a logging library for better management.

3. **Export the logging function** to be used in the route handlers.  
   This enables you to attach the logging middleware to your routes easily.

#### Example for Logging Middleware:
```js
const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}' at ${new Date().toISOString()}`);
    next(); // Call the next middleware in the stack
};

module.exports = loggingMiddleware;
```

## Best Practices:

- **Single Responsibility**:  
  Keep each middleware function focused on a single responsibility to enhance modularity and maintainability. This makes it easier to test and debug individual pieces of logic.

- **Error Handling**:  
  Always handle errors gracefully. Provide meaningful error messages to the client to aid in understanding what went wrong. This can improve user experience and facilitate debugging.

- **Documentation**:  
  Document the purpose and usage of each middleware function clearly. This will help other developers understand the intent behind the middleware and how to use it effectively.


## Future Guidance:

- **Follow this structure**:  
  Use this structure as a guideline for implementing future middleware functions. Consistency in organization helps improve code readability and collaboration.

- **Maintain clear documentation**:  
  Ensure that all middleware functions are well-documented. This facilitates collaboration and allows other developers to quickly grasp the middleware logic and its application in the project.
