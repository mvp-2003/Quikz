# Quikz
_**Quikz**_ is an open-source quiz platform designed for hosting quizzes efficiently, especially in live events where time is crucial. This platform aims to simplify the process of organizing and conducting quizzes, with key features such as authentication, verification, timed submissions, question randomization, auto-grading, custom scoring, detailed analytics, and multi-language support.

## Features
- **Simple Quiz Creation**: Easily create and manage quizzes with an intuitive interface.
- **Authentication & Verification**: Ensure that only authorized participants can join your quiz sessions.
- **Timed Submissions**: Set strict time limits for quiz submissions to maintain fairness and challenge participants.
- **Real-Time Leaderboard**: Track participant progress and display a live leaderboard during events.
- **Multi-Device Support**: Responsive design ensures that Qwikz works seamlessly across desktops, tablets, and smartphones.

## Why Quikz?
During live events, managing quizzes can often be chaotic, especially with time constraints. Qwikz was developed with these challenges in mind, providing:

1. _Fast Setup_: Get your quiz up and running in minutes.
2. _Secure Participation_: With user authentication and verification, only authorized users can take part.
3. _Time-Sensitive Controls_: Control the flow of the quiz and ensure participants stick to the allotted time.

## Getting Started
### Prerequisites
Please go through [CONTRIBUTING guideline](https://github.com/mvp-2003/Quikz/blob/main/CONTRIBUTING.md)\
To get _Qwikz_ running locally, ensure you have the following installed:

- Node.js (v22.x or higher)
- npm or yarn
- **Fork** the repository to create a copy in your _GitHub_ account.

### Installation
1. Clone the repository:
```
git clone https://github.com/your-username/quikz.git
cd qwikz
```

2. Install dependencies:
```npm install```

3. Start the application:
```npm start```
-> Open your browser and go to http://localhost:3000 to see Qwikz in action.

4. Usage:
- Create a new quiz by filling in quiz details such as title, description, and questions.
- Share the quiz link with participants.
- Track their progress and submissions in real-time.

### Hosting a Live Quiz
- Use the timer function to control submission deadlines.
- Monitor real-time results with the built-in leaderboard.

## Running with Docker

Alternatively, you can run Quikz using Docker. Follow these steps:

### Prerequisites
Ensure you have Docker installed on your machine. You can download it from the official [Docker website](https://www.docker.com/get-started).

### Steps to Run with Docker

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/quikz.git
    cd qwikz
    ```

2. Build the Docker image:
    ```bash
    docker build -t quikz-app .
    ```

3. Run the Docker container:
    ```bash
    docker run -p 5500:5500 quikz-app
    ```

4. Open your browser and go to [http://localhost:5500](http://localhost:5500) to see Quikz in action.

With Docker, you can quickly deploy Quikz without manually managing dependencies or configurations. It's an ideal solution if you're looking for a containerized, portable version of the app for different environments.

