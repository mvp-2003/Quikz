# Models Directory

## Overview:

The `models` directory contains the data models for the application, typically using Mongoose for MongoDB interactions. Models define the structure of the data, including the fields, types, validation rules, and any associated methods. This directory acts as an interface between the application and the database.

### Structure:

- Each model file corresponds to a specific entity or resource in the application (e.g., `User`, `Quiz`, etc.).
- Models define the schema for the data, which outlines the fields and their types, as well as any validation rules.
- This directory also includes any static methods or instance methods that are relevant to the model.

### Current Example (User Model):

In the current implementation, `user.js` defines the schema and model for user data, including fields like `name`, `email`, and `password`.

#### Example of User Model:

```js
const mongoose = require('mongoose');

// User Schema Definition
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Instance method to generate access token
userSchema.methods.generateAccessToken = function (secretKey) {
  return jwt.sign({ id: this._id }, secretKey, { expiresIn: '1h' });
};

// Exporting User model
const User = mongoose.model('User', userSchema);
module.exports = User;
```

## How to Add a New Model:

1. **Create a new file** in the `models/` directory, naming it according to the entity it represents (e.g., `quiz.js` for quiz-related data).

2. **Define the schema** using Mongoose, outlining the necessary fields, types, and validation rules.  
   Ensure that the schema accurately reflects the data structure you want to implement.

3. **Include any instance or static methods** that should be associated with the model.  
   These methods can encapsulate related functionality, making it easier to manage operations related to the model.

4. **Export the model** for use in controllers or other parts of the application.  
   This allows you to import and utilize the model wherever necessary in your application.

---

### Example Steps:

1. **Create a `quiz.js`** file in the `models/` directory.

2. **Define the quiz schema**:

   - Include fields such as `title`, `questions`, and any necessary validation rules.

3. **Export the model** for use in the relevant controllers.

### Example for Quiz Model:

```js
const mongoose = require('mongoose');

// Quiz Schema Definition
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          optionText: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
});

// Exporting Quiz model
const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
```

## Best Practices:

- **Focus on a single entity**:  
  Ensure that each model file is dedicated to a single entity to maintain clarity and separation of concerns.

- **Use validation rules**:  
  Implement validation rules to enforce data integrity, ensuring that the data stored in the database meets the required standards.

- **Encapsulate related functionality**:  
  Include instance or static methods in models when it makes sense to encapsulate related functionality within the model itself. This promotes better organization and reuse of code.

## Future Guidance:

- **Use this structure as a guideline**:  
  Follow this model structure as a guideline for creating new models in the application.

- **Maintain organization**:  
  Keep the models organized and ensure that they accurately represent the data and its relationships to facilitate maintainability and scalability in the application.
