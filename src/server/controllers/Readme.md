# Controllers Directory

## Overview:
The `controllers` directory is responsible for handling the core business logic of the application. Each controller function processes incoming requests, interacts with models (database), and returns the appropriate response to the client.

Controllers help maintain clean code by separating business logic from route definitions and database models. This structure also makes future feature additions easier and keeps the code more maintainable.

### Structure:
- Each controller file corresponds to a feature or module in the application (e.g., `userController.js` for user authentication).
- Functions in controller files typically correspond to specific routes (e.g., user registration, login, etc.).
- Controllers import models from the `models/` directory to perform CRUD operations.

### Current Example (User Authentication):
In the current implementation, `userController.js` contains functions to handle user registration and login:
1. **registerUser**: Handles new user registration, including password hashing and token generation.
2. **loginUser**: Verifies user credentials, checks hashed passwords, and returns an authentication token.

#### Example Function:
```js
const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).send("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(StatusCodes.CONFLICT).send(`User already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    
    const accessToken = user.generateAccessToken(process.env.SECRET_KEY);
    return res.status(StatusCodes.CREATED).json({ user, accessToken });
};
```

## How to Add a New Controller:

1. **Create a new file** inside the `controllers/` directory.  
   Name the file based on the feature or module (e.g., `quizController.js` for quiz-related logic).

2. **Define functions** inside the controller that handle specific routes or features.  
   These functions will process incoming requests, apply business logic, and interact with models to perform database operations.

3. **Import models** as needed to perform database operations.  
   Use Mongoose models or other data access libraries to interact with the database.

4. **Export the functions** for use in the `routes/` directory.  
   The functions should be exported and then imported in the relevant routes file to handle incoming requests.

### Example Steps:

1. **Create a `quizController.js`** file in the `controllers/` directory.

2. **Define the functions needed** for the quiz feature, such as `createQuiz`, `getQuizzes`, etc.

3. **Import and use the appropriate model(s)** (e.g., `Quiz`) to interact with the database.

4. **Export the controller functions** for use in the route handler.

### Example for Quiz:
```js
const Quiz = require('../models/quiz');
const { StatusCodes } = require('http-status-codes');

const createQuiz = async (req, res) => {
    const { title, questions } = req.body;

    if (!title || !questions) {
        return res.status(StatusCodes.BAD_REQUEST).send("Title and questions are required");
    }

    const quiz = await Quiz.create({ title, questions });
    return res.status(StatusCodes.CREATED).json({ quiz });
};

module.exports = { createQuiz };
```

## Best Practices:

- **Focus on a single feature or module**:  
  Keep each controller focused on a single responsibility to ensure modularity and separation of concerns.

- **Validate incoming data**:  
  Always validate the data coming from the client before performing any operations (e.g., checking for required fields).

- **Gracefully handle errors**:  
  Ensure proper error handling by catching exceptions and sending meaningful error messages back to the client.

- **Use asynchronous operations**:  
  When interacting with the database, always use asynchronous operations (`async/await`) to ensure non-blocking behavior and avoid performance bottlenecks.


## Future Guidance:

- Use this structure as a guideline for implementing **future routes** in the application.
- Follow the pattern of separating **business logic (controllers)** from the **routing logic (routes)** and **database logic (models)**.
- This will enhance the **maintainability** and **scalability** of the application as new features are added.
