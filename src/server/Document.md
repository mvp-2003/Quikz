
# Backend Structure Documentation

## Project Structure

The backend is organized into several key directories, each serving a specific purpose. This modular structure ensures that the application is scalable and easy to maintain as new features are added.

### Directory Overview:

1. **controllers/**
   - This directory contains the logic to handle incoming HTTP requests and return responses. Each controller corresponds to a specific functionality in the app.
   - Example: `userController.js`, `quizController.js`

2. **db/**
   - This folder is responsible for the database connection setup.
   - It contains utilities to connect to MongoDB (or other databases) and configurations needed to maintain the connection.
   - Example: `connection.js`

3. **models/**
   - Contains Mongoose schemas that define the structure of the data in MongoDB.
   - These models map to collections in the database and provide methods for interacting with the data.
   - Example: `User.js`, `Quiz.js`

4. **middlewares**
   - Middleware functions that run before requests reach the controllers. These are used for operations like authentication, validation, or logging.
   - Example: `authMiddleware.js`, `validationMiddleware.js`

5. **routes/**
   - This directory defines all the API endpoints and maps them to the appropriate controller functions.
   - It handles routing for the application and ensures that requests are directed to the correct controllers.
   - Example: `userRoutes.js`, `quizRoutes.js`

6. **public/**
   - The public folder serves static assets like images, CSS, and frontend-related files.
   - This is used for hosting files that do not require backend processing.

### Setting Up the Project

To run the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies:
   - `npm install`
3. Create a `.env` file in the root directory and add the following variables:
   - PORT=5500 
   - MONGO_URI=mongodb://localhost:27017
4. Ensure MongoDB is running locally, or provide a remote URI in the `.env` file.
5. Start the development server:
   - `npm start`

### Next Steps
- Fill in the controllers, models, and middleware logic based on the application’s requirements.
- Expand the `routes/` as new features are developed.
