const Quiz = require('../models/quiz');
const QuizTemplate = require('../models/templates');
const admin = process.env.admin;

const fetchTemplates = async (req, res) => {
  try {
    const { tags } = req.query;
    const filter = tags ? { tags: { $all: tags.split(',') } } : {};
    const templates = await QuizTemplate.find(filter);
    return res.json(templates);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to fetch templates' });
  }
};

const createTemplate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, description, questions, duration, tags } = req.body;

    if (!Array.isArray(tags) || tags.length === 0) {
      return res
        .status(400)
        .json({ error: 'Tags must be provided as a non-empty array' });
    }

    const tagDocs = await Tag.find({ name: { $in: tags } });
    const existingTagNames = tagDocs.map((tag) => tag.name);

    const missingTags = tags.filter((tag) => !existingTagNames.includes(tag));
    if (missingTags.length > 0) {
      return res.status(400).json({
        error: `The following tags do not exist: ${missingTags.join(', ')}`,
      });
    }

    const template = new QuizTemplate({
      name,
      description,
      questions,
      duration,
      tags: existingTagNames,
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
    const { category, useBlankTemplate } = req.body;

    if (useBlankTemplate) {
      const userId = req.user.id;

      const { title, questions } = req.body;

      if (!title || !questions) {
        return res.status(StatusCodes.BAD_REQUEST).send('All fields required!');
      }

      questions.forEach((question) => {
        if (!question.options.includes(question.correctOption)) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .send('Correct option must be present in options');
        }
      });

      const newQuiz = await Quiz.create({
        title,
        questions,
        author: userId,
      });
      return res
        .status(201)
        .json({ message: 'Blank quiz created', quiz: newQuiz });
    }

    const template = await QuizTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    const newQuiz = new Quiz({
      title: template.name,
      questions: template.questions,
      duration: template.duration,
      category,
      author: userId,
    });

    await newQuiz.save();
    return res
      .status(201)
      .json({ message: 'Quiz created from template', quiz: newQuiz });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Failed to create quiz from template' });
  }
};

const updateTemplate = async (req, res) => {
  try {
    const templateId = req.params.id;
    const template = await QuizTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    const { email, name, description, questions, duration, category } =
      req.body;

    if (email != admin)
      return res.status(400).json({
        msg: 'You are Not the admin',
      });

    if (name) template.name = name;
    if (description) template.description = description;
    if (questions) template.questions = questions;
    if (duration) template.duration = duration;
    if (category) template.category = category;

    const updatedTemplate = await template.save();
    res
      .status(200)
      .json({ message: 'Template updated successfully', updatedTemplate });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating the template' });
  }
};

const deleteTemplate = async (req, res) => {
  try {
    const { email } = req.body;
    const templateId = req.params.id;

    console.log('Template ID:', templateId);

    const template = await QuizTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    if (email != admin)
      return res.status(400).json({
        msg: 'You are Not the admin',
      });

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
