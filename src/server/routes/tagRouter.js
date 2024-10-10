const { Router } = require('express');
const {
  createTag,
  getTags,
  deleteTag,
} = require('../controllers/tagController');
const authenticateUser = require('../middlewares/Auth');

const tagRouter = Router();

tagRouter
  .post('/', authenticateUser, createTag)
  .get('/', getTags)
  .delete('/:id', authenticateUser, deleteTag);

module.exports = tagRouter;
