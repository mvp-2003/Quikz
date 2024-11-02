const express = require('express');
const authenticate = require('../middlewares/Auth');
const router = express.Router();

const {
  fetchTemplates,
  createTemplate,
  cloneTemplate,
  updateTemplate,
  deleteTemplate,
} = require('./../controllers/templateController');

router.get('/', authenticate, fetchTemplates);
router.post('/create', authenticate, createTemplate);
router.post('/clone/:id/', authenticate, cloneTemplate);
router.put('/update/:id/', authenticate, updateTemplate);
router.post('/delete/:id/', authenticate, deleteTemplate);

module.exports = router;
