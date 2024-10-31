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

### Badges Route

#### List All Badges

- **GET /badges**
  - **Description:** Retrieve all badges.

#### Details of a Specific Badge

- **GET /badges/:badgeId**
  - **Description:** Retrieve details of a specific badge.

#### Create Badge [admin]

- **POST /badges**
  - **Description:** Create a badge.

#### Delete Badge [admin]

- **DELETE /badges/:badgeId**
  - **Description:** Create a badge.

### User Badges Route

#### List All Badges

- **GET /user/badges/:userId**
  - **Description:** Retrieve all badges of a user.

#### Post a badge to a user

- **POST /user/badges/:userId/:badgeId**
  - **Description:** Award user a Badge.

#### Delete Badge [admin]

- **DELETE /user/badges/:userId/:badgeId**
  - **Description:** Delete a badge.

### Achievements Route

#### List All Achievements

- **GET /achievements**
  - **Description:** Retrieve all achievements.

#### Details of a Specific Achievement

- **GET /achievements/:achievementId**
  - **Description:** Retrieve details of a specific achievement.

#### Create Achievement [admin]

- **POST /achievements**
  - **Description:** Create an achievement.

#### Delete Achievement [admin]

- **DELETE /achievements/:achievementId**
  - **Description:** Create an achievement.

### User Achievements Route

#### List All Achievements

- **GET /user/achievements/:userId**
  - **Description:** Retrieve all achievements of a user.

#### Post an achievement to a user

- **POST /user/achievements/:userId/:achievementId**
  - **Description:** Award user an achievement.

#### Delete achievement [admin]

- **DELETE /user/achievements/:userId/:achievementId**
  - **Description:** Delete an achievement.

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

## Templates Routes

### Get All templates

- **GET /api/templates/**
  - **Description:** Retrieve all templates.
  - **Authorization Required**

### Get All templates

- **POST /api/templates/create**
  - **Description:** Create templates.
  - **Authorization Required**

### Get All templates

- **POST /api/templates/clone/:id**
  - **Description:** Clone templates.
  - **Authorization Required**

### Get All templates

- **POST /api/templates/delete/:id**
  - **Description:** Delete templates.
  - **Authorization Required**

### Polls Routes

#### Retrieve Polls

- **Get /polls**
  - **Description:** Retrieve all polls
  - **Response:**
    ```json
    {
      "success": true,
      "polls": [
        {
          "_id": "67056a57ff6a9876d6a04452",
          "title": "Updated Favorite Programming Language",
          "description": "Vote for your updated favorite programming language.",
          "questions": [
            {
              "question": "Which programming language do you prefer now?",
              "options": [
                {
                  "option": "JavaScript",
                  "votes": 0,
                  "_id": "67056a57ff6a9876d6a04454"
                },
                {
                  "option": "Python",
                  "votes": 0,
                  "_id": "67056a57ff6a9876d6a04455"
                },
                {
                  "option": "Java",
                  "votes": 0,
                  "_id": "67056a57ff6a9876d6a04456"
                },
                {
                  "option": "C++",
                  "votes": 0,
                  "_id": "67056a57ff6a9876d6a04457"
                }
              ],
              "voters": [],
              "_id": "67056a57ff6a9876d6a04453"
            },
            {
              "question": "Which backend framework do you prefer now?",
              "options": [
                {
                  "option": "Express",
                  "votes": 0,
                  "_id": "67056a57ff6a9876d6a04459"
                },
                {
                  "option": "Django",
                  "votes": 0,
                  "_id": "67056a57ff6a9876d6a0445a"
                },
                {
                  "option": "Spring",
                  "votes": 0,
                  "_id": "67056a57ff6a9876d6a0445b"
                },
                {
                  "option": "Flask",
                  "votes": 0,
                  "_id": "67056a57ff6a9876d6a0445c"
                }
              ],
              "voters": [],
              "_id": "67056a57ff6a9876d6a04458"
            }
          ],
          "created_at": "2024-10-08T17:22:31.555Z",
          "updated_at": "2024-10-08T17:22:31.555Z",
          "__v": 0
        }
      ]
    }
    ```

### Create Poll

- **POST /polls**
  - **Description:** create a poll.
  - **Authorization Required**
  - **Request Body:**
    `json
      {
    "title": "Updated Favorite Programming Language",
    "description": "Vote for your updated favorite programming language.",
    "questions": [
        {
            "question": "Which programming language do you prefer now?",
            "options": [
                {
                    "option": "JavaScript",
                    "votes": 0
                },
                {
                    "option": "Python",
                    "votes": 0
                },
                {
                    "option": "Java",
                    "votes": 0
                },
                {
                    "option": "C++",
                    "votes": 0
                }
            ]
        },
        {
            "question": "Which backend framework do you prefer now?",
            "options": [
                {
                    "option": "Express",
                    "votes": 0
                },
                {
                    "option": "Django",
                    "votes": 0
                },
                {
                    "option": "Spring",
                    "votes": 0
                },
                {
                    "option": "Flask",
                    "votes": 0
                }
            ]
        }
    ]
}
    `

#### Retrieve Poll by ID

- **GET /polls/:id**
  - **Description:** Retrieve a poll by its ID.
  - **Response:**
    ```json
    {
      "_id": "67056a57ff6a9876d6a04452",
      "title": "Updated Favorite Programming Language",
      "description": "Vote for your updated favorite programming language.",
      "questions": [
        {
          "question": "Which programming language do you prefer now?",
          "options": [
            {
              "option": "JavaScript",
              "votes": 0,
              "_id": "67056a57ff6a9876d6a04454"
            },
            {
              "option": "Python",
              "votes": 0,
              "_id": "67056a57ff6a9876d6a04455"
            },
            { "option": "Java", "votes": 0, "_id": "67056a57ff6a9876d6a04456" },
            { "option": "C++", "votes": 0, "_id": "67056a57ff6a9876d6a04457" }
          ],
          "voters": [],
          "_id": "67056a57ff6a9876d6a04453"
        },
        {
          "question": "Which backend framework do you prefer now?",
          "options": [
            {
              "option": "Express",
              "votes": 0,
              "_id": "67056a57ff6a9876d6a04459"
            },
            {
              "option": "Django",
              "votes": 0,
              "_id": "67056a57ff6a9876d6a0445a"
            },
            {
              "option": "Spring",
              "votes": 0,
              "_id": "67056a57ff6a9876d6a0445b"
            },
            { "option": "Flask", "votes": 0, "_id": "67056a57ff6a9876d6a0445c" }
          ],
          "voters": [],
          "_id": "67056a57ff6a9876d6a04458"
        }
      ],
      "created_at": "2024-10-08T17:22:31.555Z",
      "updated_at": "2024-10-08T17:22:31.555Z",
      "__v": 0
    }
    ```

#### Update Poll by ID

- **PUT /polls/:id**
  - **Description:** Update a poll by its ID.
  - **Authorization Required**
  - **Request Body:**
    ```json
    {
      "title": "Updated Favorite Programming Language",
      "description": "Vote for your updated favorite programming language.",
      "questions": [
        {
          "question": "Which programming language do you prefer now?",
          "options": [
            { "option": "JavaScript", "votes": 0 },
            { "option": "Python", "votes": 0 },
            { "option": "Java", "votes": 0 },
            { "option": "C++", "votes": 0 }
          ]
        },
        {
          "question": "Which backend framework do you prefer now?",
          "options": [
            { "option": "Express", "votes": 0 },
            { "option": "Django", "votes": 0 },
            { "option": "Spring", "votes": 0 },
            { "option": "Flask", "votes": 0 }
          ]
        }
      ]
    }
    ```

#### Delete Poll by ID

- **DELETE /api/polls/:id**
  - **Description:** Delete a poll by its ID.
  - **Authorization Required**

#### Cast Vote

- **POST /polls/:id/votes**
  - **Description:** Cast a vote for a poll.
  - **Authorization Required**
  - **Request Body:**
    ```json
    {
      "userId": "60d0fe4f5311236168a109ca",
      "answers": [
        {
          "questionId": "67056a57ff6a9876d6a04453",
          "optionId": "67056a57ff6a9876d6a04454"
        },
        {
          "questionId": "67056a57ff6a9876d6a04458",
          "optionId": "67056a57ff6a9876d6a04459"
        }
      ]
    }
    ```

#### Retrieve Live Poll Results

- **GET /polls/:id/results**
  - **Description:** Retrieve live results of a poll by its ID.
  - **Response:**
    ```json
    {
      "_id": "67056a57ff6a9876d6a04452",
      "title": "Updated Favorite Programming Language",
      "description": "Vote for your updated favorite programming language.",
      "questions": [
        {
          "question": "Which programming language do you prefer now?",
          "options": [
            {
              "option": "JavaScript",
              "votes": 10,
              "_id": "67056a57ff6a9876d6a04454"
            },
            {
              "option": "Python",
              "votes": 20,
              "_id": "67056a57ff6a9876d6a04455"
            },
            { "option": "Java", "votes": 5, "_id": "67056a57ff6a9876d6a04456" },
            { "option": "C++", "votes": 2, "_id": "67056a57ff6a9876d6a04457" }
          ],
          "voters": ["60d0fe4f5311236168a109ca", "60d0fe4f5311236168a109cb"],
          "_id": "67056a57ff6a9876d6a04453"
        },
        {
          "question": "Which backend framework do you prefer now?",
          "options": [
            {
              "option": "Express",
              "votes": 15,
              "_id": "67056a57ff6a9876d6a04459"
            },
            {
              "option": "Django",
              "votes": 10,
              "_id": "67056a57ff6a9876d6a0445a"
            },
            {
              "option": "Spring",
              "votes": 8,
              "_id": "67056a57ff6a9876d6a0445b"
            },
            { "option": "Flask", "votes": 3, "_id": "67056a57ff6a9876d6a0445c" }
          ],
          "voters": ["60d0fe4f5311236168a109ca", "60d0fe4f5311236168a109cb"],
          "_id": "67056a57ff6a9876d6a04458"
        }
      ],
      "created_at": "2024-10-08T17:22:31.555Z",
      "updated_at": "2024-10-08T17:22:31.555Z",
      "__v": 0
    }
    ```

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

---

# Frontend Design Inspo

## https://www.figma.com/design/s0eI8YDamF3Gqh3Bt5et99/asmbDev?node-id=116-4&t=n0JzcDKEmnMHk0kg-1

### This url is the inspiration for Quikz's UI. Make sure to follow this as a base for the UI and make additional changes to improve the UX/UI. (use free icons libraries and animation libraries for making the UI & UX for user friendly).

---

---

# Frontend Routes Documentation

## Landing page('/')

### Tailwind setup is done for dark mode, react router dom setup is also done, the routes are managed in main.jsx itself.
