const Poll = require('../models/poll.js');
const { StatusCodes } = require('http-status-codes');

const createPoll = async (req, res) => {
  /*
        {
    "title": "Favorite Programming Language",
    "description": "Vote for your favorite programming language.",
    "questions": [
        {
            "question": "Which programming language do you prefer?",
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
            "question": "Which backend framework do you prefer?",
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
     */
  try {
    const { title, description, questions } = req.body;
    const poll = await Poll.create({
      title,
      description,
      questions,
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      poll,
    });
  } catch (error) {
    // console.log('Error while creating the poll', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error while creating the poll',
    });
    process.exit(1);
  }
};

const retrievePolls = async (req, res) => {
  try {
    const polls = await Poll.find({});
    res.status(StatusCodes.OK).json({
      success: true,
      polls,
    });
  } catch (error) {
    // console.log('Error while retrieving the polls', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error while retrieving the polls',
    });
    process.exit(1);
  }
};

const retrievePollById = async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await Poll.findById(id);
    if (!poll) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Poll not found',
      });
    }
    res.status(StatusCodes.OK).json(poll);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error while retrieving the poll',
    });
    process.exit(1);
  }
};

const updatePollById = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const poll = await Poll.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!poll) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Poll not found',
      });
    }
    res.status(StatusCodes.OK).json(poll);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error while updating the poll',
    });
    process.exit(1);
  }
};

const deletePollById = async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await Poll.findByIdAndDelete(id);
    if (!poll) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Poll not found',
      });
    }
    res.status(StatusCodes.OK).json({
      message: 'Poll deleted successfully',
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error while deleting the poll',
    });
    process.exit(1);
  }
};

const castVote = async (req, res) => {
  /*
        {
    "userId": "60d0fe4f5311236168a109ca",
    "answers": [
            {
                "questionId": "60d0fe4f5311236168a109cb",
                "answer": "JavaScript"
            },
            {
                "questionId": "60d0fe4f5311236168a109cc",
                "answer": "Python"
            }
        ]
    }
    */
  const { id } = req.params;
  const { answers, userId } = req.body;
  try {
    const poll = await Poll.findById(id);
    if (!poll) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Poll not found',
      });
    }
    answers.forEach(({ questionId, optionId }) => {
      const question = poll.questions.id(questionId);

      // Check if the question exists or not
      if (!question) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `Question with id ${questionId} not found`,
        });
      }

      // Check if the option exists or not
      const option = question.options.id(optionId);
      if (!option) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `Option with id ${optionId} not found`,
        });
      }

      // Check if the user has already voted
      if (question.voters.includes(userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'You have already voted for this question',
        });
      }

      // Increase the vote count
      option.votes += 1;
      question.voters.push(userId);
    });
    await poll.save();
    res.status(StatusCodes.OK).json({
      success: true,
      poll,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error while casting the vote',
    });
    process.exit(1);
  }
};

const retrieveLivePollResults = async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await Poll.findById(id);
    if (!poll) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Poll not found',
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      poll,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error while retrieving the live poll results',
    });
    process.exit(1);
  }
};

module.exports = {
  createPoll,
  retrievePolls,
  retrievePollById,
  updatePollById,
  deletePollById,
  castVote,
  retrieveLivePollResults,
};
