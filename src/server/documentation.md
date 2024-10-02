# Quiz Application API Documentation

## Description
In this Pull Request, I defined the API routes required for the Quiz application, focusing on user management, authentication functionalities, quiz operations, and result generation.

## Routes Added

### User Management Routes

#### Register User
- **POST /api/users/register**
  - **Description:** Register a new user.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Responses:**
    - `201`: User Registered Successfully
    - `400`: All fields are required.
    - `409`: Email already exists.
    - `500`: Registration failed. Please try again.

#### Login User
- **POST /api/users/login**
  - **Description:** Authenticate a user and return a token.
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Responses:**
    - `200`: User Logged In
    - `400`: Email and password are required.
    - `401`: Invalid credentials.
    - `500`: Login failed. Please try again.

#### Logout User
- **POST /api/users/logout**
  - **Description:** Log out a user.
  - **Responses:**
    - `200`: User Logged Out Successfully
    - `500`: Logout failed. Please try again.

### Quiz Routes

#### Add Quiz
- **POST /api/quizzes/addquiz**
  - **Description:** Create a new quiz.
  - **Authorization Required**

#### List All Quizzes
- **GET /api/quizzes/listquiz**
  - **Description:** Retrieve all quizzes.
  - **Authorization Required**

#### Get Quiz by ID
- **GET /api/quizzes/getquizbyid/:id**
  - **Description:** Retrieve quiz details by ID.
  - **Authorization Required**

#### Edit Quiz
- **PUT /api/quizzes/editQuiz/:id**
  - **Description:** Update quiz details by ID.
  - **Authorization Required**

#### Delete Quiz
- **DELETE /api/quizzes/deleteQuiz/:id**
  - **Description:** Delete quiz by ID.
  - **Authorization Required**

#### Add Question to Quiz
- **POST /api/quizzes/addQuestionToQuiz/:id**
  - **Description:** Add a question to a quiz.
  - **Authorization Required**

#### Delete Question from Quiz
- **DELETE /api/quizzes/deleteQuestionFromQuiz/:id**
  - **Description:** Delete a question from a quiz.
  - **Authorization Required**

#### Edit Question in Quiz
- **PUT /api/quizzes/editQuestionInQuiz/:id**
  - **Description:** Update a question in a quiz.
  - **Authorization Required**

### Quiz Category Routes

#### List All Categories
- **GET /api/categories/listAll**
  - **Description:** Retrieve all quiz categories.

#### Add Category
- **POST /api/categories/add**
  - **Description:** Create a new quiz category.

#### Delete Category
- **DELETE /api/categories/delete/:id**
  - **Description:** Delete a quiz category.

### Report Card Routes

#### Add Report
- **POST /api/reports/addReport**
  - **Description:** Create a new report.
  - **Authorization Required**

#### Get All Attempts
- **POST /api/reports/getAllAttempts**
  - **Description:** Retrieve all attempts.
  - **Authorization Required**

#### Get All Attempts by User
- **GET /api/reports/getAllAttemptsByUser**
  - **Description:** Retrieve all attempts by a specific user.
  - **Authorization Required**

## Testing
### Postman API Testing
All API routes were tested using Postman to ensure they function as expected. Below are the details of the tests conducted:

- **User Management Endpoints**
  - Test cases for registering, logging in, and logging out users.

- **Quiz Endpoints**
  - Test cases for creating, retrieving, editing, and deleting quizzes.

- **Quiz Category Endpoints**
  - Test cases for managing quiz categories.

- **Report Card Endpoints**
  - Test cases for generating and retrieving reports.


