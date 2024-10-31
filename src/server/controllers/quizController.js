const { get } = require('mongoose');
const Quiz = require('../models/quiz');
const { StatusCodes } = require('http-status-codes');
const paginate = require('../utils/paginate');
const mongoose = require('mongoose');

const createQuiz = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title, questions } = req.body;

    if (!title || !questions) {
      return res.status(StatusCodes.BAD_REQUEST).send('All fields required!');
    }

    questions.forEach((question) => {
      if (!question.options.includes(question.correctOption)) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send('Correct option must be presend in options');
      }
    });

    const newQuiz = await Quiz.create({
      title,
      questions,
      author: userId,
    });

    res.status(StatusCodes.CREATED).json({
      newQuiz,
    });
  } catch (err) {
    console.log('Error creating a new quiz: ', err);
    process.exit(1);
  }
};

const updateQuiz = async (req, res) => {
  try {
    const userId = req.user.id;
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      res.status(StatusCodes.BAD_REQUEST).send('Invalid quiz id!');
    }

    if (quiz.author != userId) {
      res.status(StatusCodes.FORBIDDEN).send("You can't update this quiz!");
    }

    const { title, questions, tags } = req.body;

    questions &&
      questions?.forEach((question) => {
        if (!question.options.includes(question.correctOption)) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .send('Correct option must be presend in options');
        }
      });

    if (tags && !Array.isArray(tags)) {
      return res.status(StatusCodes.BAD_REQUEST).send('Tags must be an array.');
    }

    if (tags && tags.some((tag) => !mongoose.Types.ObjectId.isValid(tag))) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send('All tags must have valid Ids.');
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { title, questions, tags: tags, updatedAt: Date.now() },
      { new: true }
    );

    res.status(StatusCodes.OK).json({
      updatedQuiz,
    });
  } catch (err) {
    console.log('Error updating quiz: ', err);
    process.exit(1);
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const userId = req.user.id;
    const quizId = req.params.id;
    const quiz = await Quiz.findById({ _id: quizId });

    if (!quiz) {
      res.status(StatusCodes.BAD_REQUEST).send('Invalid quiz id!');
    }

    if (quiz.author != userId) {
      res.status(StatusCodes.FORBIDDEN).send("You can't update this quiz!");
    }

    const deleteQuiz = await Quiz.findByIdAndDelete(quizId);

    res.status(StatusCodes.OK).json({ deleteQuiz });
  } catch (err) {
    console.log('Error deleting quiz: ', err);
    process.exit(1);
  }
};

const getQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById({ _id: quizId }).populate('author');

    if (!quiz) {
      res.status(StatusCodes.BAD_REQUEST).send('Invalid quiz id!');
    }
    author = {
      authorId: quiz.author._id,
      name: quiz.author.name,
      email: quiz.author.email,
    };
    quiz.author = author;
    res.status(StatusCodes.OK).json({
      quiz,
    });
  } catch (err) {
    console.log('Error fetching quiz: ', err);
    process.exit(1);
  }
};

const getQuizzes = async (req, res) => {
  try {
    const { tags, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : [tags];
      const invalidTags = tagsArray.filter(
        (tag) => !mongoose.Types.ObjectId.isValid(tag)
      );

      if (invalidTags.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          message: 'Invalid tags',
        });
      }

      const objectIdTagsArray = tagsArray.map(
        (tag) => new mongoose.Types.ObjectId(tag)
      );

      filter.tags = { $in: objectIdTagsArray };
    }

    const quizzes = await Quiz.find(filter).populate('author');

    if (!quizzes || quizzes.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'No quizzes found!',
      });
    }

    quizzes.forEach((quiz) => {
      const author = {
        authorId: quiz.author._id,
        name: quiz.author.name,
        email: quiz.author.email,
      };
      quiz.author = author;
    });

    const paginatedQuizzes = await paginate(
      Quiz,
      filter,
      parseInt(page),
      parseInt(limit)
    );

    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Quizzes fetched successfully',
      ...paginatedQuizzes,
    });
  } catch (err) {
    console.log('Error fetching quizzes: ', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching quizzes',
    });
  }
};

module.exports = { createQuiz, updateQuiz, deleteQuiz, getQuiz, getQuizzes };
