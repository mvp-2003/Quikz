const { Router } = require('express');
const {
  createTag,
  getTags,
  deleteTag,
} = require('../controllers/tagController');

const tagRouter = Router();

tagRouter.post('/', createTag).get('/', getTags).delete('/:id', deleteTag);

module.exports = tagRouter;
