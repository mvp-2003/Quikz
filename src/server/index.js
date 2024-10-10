// Import Libraries
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import Modules
const { connectDB, disconnectDB } = require('./db/connect');
const userAuthRouter = require('./routes/userAuthRouters');
const badgeRouter = require('./routes/badgesRouter');
const userBadgeRouter = require('./routes/userBadgesRouter');
const achievementRouter = require('./routes/achievementRouter');
const userAchievementRouter = require('./routes/userAchievementRouter');
const feedbackRouter = require('./routes/feedbackRouter');
const pollRouter = require('./routes/pollRouter');
const quizRouter = require('./routes/quizRouter');
const tagRouter = require('./routes/tagRouter');

// Configure Env Variables.
dotenv.config();
const port = process.env.PORT || 5500;
const mongoURI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Quikz: Hello World!');
});

// Router
app.use('/user/auth', userAuthRouter);
app.use('/user/badges', userBadgeRouter);
app.use('/user/achievements', userAchievementRouter);
app.use('/badges',badgeRouter);
app.use('/achievements',achievementRouter);
app.use('/feedback',feedbackRouter);
app.use('/polls', pollRouter);
app.use('/api/quiz', quizRouter);
app.use('/tags', tagRouter);

const start = async () => {
  try {
    // Check if required environment variables are set

    if (!mongoURI) {
      console.error('MONGO_URI environment variable is not set.');
      process.exit(1);
    }

    await connectDB(mongoURI);
    app.listen(port, () => {
      console.log(`Server is listening to port ${port} happily`);
      console.log(`GO Live: http://localhost:${port}/`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

start();

// ShutDown on SIGINT signal.
process.on('SIGINT', () => {
  console.log('Shutting down gracefully');

  try {
    disconnectDB();
  } catch (err) {
    console.log("Error disconnecting mongoDB", err);
  }

  process.exit(0);
});
