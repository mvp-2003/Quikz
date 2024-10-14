const Quiz = require('../models/quiz');
const QuizTemplate = require('../models/templates');

const fetchTemplates = async (req, res) => {
  try {
    const templates = await QuizTemplate.find();
    return res.json(templates);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to fetch templates' });
  }
};

const createTemplate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, description, questions, duration } = req.body;

    const template = new QuizTemplate({
      name,
      description,
      questions,
      duration,
      createdBy: userId,
    });

    await template.save();
    return res
      .status(201)
      .json({ message: 'Template created successfully', template });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: 'Server error while creating template' });
  }
};

const cloneTemplate = async (req, res) => {
  try {
    const userId = req.user.id;
    const template = await QuizTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    const newQuiz = new Quiz({
      title: template.name,
      questions: template.questions,
      duration: template.duration,
      author: userId,
    });

    await newQuiz.save();
    return res
      .status(201)
      .json({ message: 'Quiz created from template', quiz: newQuiz });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Failed to create quiz from template' });
  }
};

const deleteTemplate = async (req, res) => {
  try {
    const userId = req.user.id;
    const templateId = req.params.id;

    console.log('Template ID:', templateId);

    const template = await QuizTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    if (String(template.createdBy) !== String(userId)) {
      return res.status(403).json({
        error: 'Not authorized to delete this template',
      });
    }

    const result = await QuizTemplate.deleteOne({ _id: templateId });
    if (result.deletedCount === 0) {
      return res.status(400).json({ error: 'Failed to delete template' });
    }

    return res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  fetchTemplates,
  createTemplate,
  cloneTemplate,
  deleteTemplate,
};
