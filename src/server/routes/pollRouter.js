const express = require('express');
const router=express.Router();

const authenticateUser=require('../middlewares/Auth.js');

/*
POST /polls: create a new poll
GET /polls: retrieve a list of all polls
GET /polls/:id: retrieve a specific poll by ID
PUT /polls/:id: update a specific poll by ID
DELETE /polls/:id: delete a specific poll by ID
POST /polls/:id/votes: cast a vote for a specific poll option
GET /polls/:id/results: retrieve the live poll results
*/ 

const { createPoll,
    retrievePolls,
    retrievePollById,
    updatePollById,
    deletePollById,
    castVote,
    retrieveLivePollResults
} = require('../controllers/pollController.js');

router.route('/')
    .get(retrievePolls)
    .post(authenticateUser,createPoll);

router.route('/:id')
    .get(retrievePollById)
    .put(authenticateUser,updatePollById)
    .delete(authenticateUser,deletePollById);

router.route('/:id/votes')
    .post(authenticateUser,castVote);

router.route('/:id/results')
    .get(retrieveLivePollResults);


module.exports = router;
