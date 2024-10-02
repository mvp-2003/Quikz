# Routes Directory

## Overview:
The `routes` directory contains all the route definitions for the application. This is where you define how incoming requests are handled and which controller functions are invoked for specific endpoints. Organizing routes in this manner enhances the clarity and maintainability of the application.

### Structure:
- Each route file should correspond to a specific feature or resource (e.g., `userRoutes.js` for user-related endpoints).
- This modular structure allows for easy navigation and future scalability as the application grows.

### Current Example:
The `routes` directory may currently contain the following files:
- **userRoutes.js**: Handles all user-related routes such as registration and authentication.
- **quizRoutes.js**: Manages routes related to quizzes, including creating and retrieving quizzes.

### How to Add New Routes:
1. **Create a new file** in the `routes/` directory, naming it based on the feature it corresponds to (e.g., `productRoutes.js` for product-related endpoints).

2. **Import Express Router** and define the necessary routes in the file, associating them with the appropriate controller functions.

3. **Export the router** so that it can be used in the main application file (usually `server.js` or `app.js`).

---

### Example Steps:
1. **To add new product routes**, create a file named `productRoutes.js` in the `routes/` directory.

2. **Define the routes** within `productRoutes.js`:
```js
const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getProducts);

module.exports = router;
```

2. **Import the new routes** in the main application file and use them:
```js
const productRoutes = require('./routes/productRoutes');

app.use('/api', productRoutes);
```

### Best Practices:

- **Group Related Routes**:  
  Keep related routes grouped within the same file to enhance readability and organization.

- **Use RESTful Naming Conventions**:  
  Follow RESTful naming conventions for routes to improve clarity and consistency in your API design.

- **Document Routes**:  
  Clearly document the purpose and usage of each route. This helps other developers understand how to interact with the API.

### Future Guidance:

- **Follow this structure**:  
  Use this structure as a guideline for organizing and adding new routes to the application. Consistency is key to maintaining an easily navigable codebase.

- **Maintain clear documentation**:  
  Ensure that any new routes are well-documented to facilitate collaboration and make it easier for other developers to understand the routing logic in the application.
