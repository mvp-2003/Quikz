const { get } = require('mongoose');
const Quiz = require('../models/quiz');
const { StatusCodes } = require('http-status-codes');

const createQuiz = async (req, res) => {
    try {
        const userId = req.user.id;

        const {title, questions} = req.body;

        if(!title || !questions) {
            return res.status(StatusCodes.BAD_REQUEST).send('All fields required!');
        }

        questions.forEach(question => {
            if(!question.options.includes(question.correctOption)) {
                res.status(StatusCodes.BAD_REQUEST).send('Correct option must be presend in options');
            }
        });

        const newQuiz = await Quiz.create({
            title,
            questions,
            author: userId
        });

        res.status(StatusCodes.CREATED).json({
            newQuiz
        });
    }
    catch (err) {
        console.log('Error creating a new quiz: ', err);
        process.exit(1);
    }
};

const updateQuiz = async (req, res) => {
    try {
        const userId = req.user.id;
        const quizId = req.params.id;
        const quiz = await Quiz.findById(quizId);

        if(!quiz) {
            res.status(StatusCodes.BAD_REQUEST).send('Invalid quiz id!');
        }

        if(quiz.author != userId) {
            res.status(StatusCodes.FORBIDDEN).send('You can\'t update this quiz!');
        }
       
        const {title, questions} = req.body;

        questions.forEach(question => {
            if(!question.options.includes(question.correctOption)) {
                res.status(StatusCodes.BAD_REQUEST).send('Correct option must be presend in options');
            }
        });
        
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, { title, questions, updatedAt: Date.now() }, { new: true });
    
        res.status(StatusCodes.OK).json({
            updatedQuiz
        });
    }
    catch (err) {
        console.log('Error updating quiz: ', err);
        process.exit(1);
    }
};

const deleteQuiz = async (req, res) => {
    try {
        const userId = req.user.id;
        const quizId = req.params.id;
        const quiz = await Quiz.findById({_id: quizId});

        if(!quiz) {
            res.status(StatusCodes.BAD_REQUEST).send('Invalid quiz id!');
        }
        
        if(quiz.author != userId) {
            res.status(StatusCodes.FORBIDDEN).send('You can\'t update this quiz!');
        }

        const deleteQuiz = await Quiz.findByIdAndDelete(quizId);

        res.status(StatusCodes.OK).json({deleteQuiz});
    }
    catch (err) {
        console.log('Error deleting quiz: ', err);
        process.exit(1);
    }
};

const getQuiz = async (req, res) => {
    try {
        const quizId = req.params.id;
        const quiz = await Quiz.findById({_id: quizId}).populate('author');

        if(!quiz) {
            res.status(StatusCodes.BAD_REQUEST).send('Invalid quiz id!');
        }
        author = {
            authorId: quiz.author._id,
            name: quiz.author.name,
            email: quiz.author.email
        };
        quiz.author = author;
        res.status(StatusCodes.OK).json({
            quiz
        });
    }
    catch (err) {
        console.log('Error fetching quiz: ', err);
        process.exit(1);
    }
};

module.exports = {createQuiz, updateQuiz, deleteQuiz, getQuiz};