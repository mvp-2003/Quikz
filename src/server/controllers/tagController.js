const { StatusCodes } = require('http-status-codes');
const Tag = require('../models/tag');
const paginate = require('../utils/paginate');

const createTag = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).send('Tag Name Required');
    }

    const tag = await Tag.create({ name, description });

    const tagObject = tag.toObject();
    delete tagObject.__v;

    return res.status(StatusCodes.CREATED).send({
      status: 'Success',
      tag: tagObject,
    });
  } catch (err) {
    console.log('Error creating a new Tag', err);
    process.exit(1);
  }
};

const getTags = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;

    const query = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive regex search
    }

    const result = await paginate(Tag, query, parseInt(page), parseInt(limit));

    return res.status(StatusCodes.OK).send({
      status: 'success',
      message: 'Tags fetched successfully',
      ...result,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Error',
      message: 'Error fetching Tags',
    });
  }
};

const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).send('Tag Name Required');
    }

    const tag = await Tag.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!tag) {
      return res.status(StatusCodes.NOT_FOUND).send('Tag not found');
    }

    return res.status(StatusCodes.OK).send({
      status: 'Success',
      tag,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Error',
      message: 'Error updating Tag',
    });
  }
};

const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByIdAndDelete(id);

    if (!tag) {
      return res.status(StatusCodes.NOT_FOUND).send('Tag not found');
    }

    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Tag Deleted Successfully',
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Error',
      message: 'Error deleting Tag',
    });
  }
};

module.exports = { createTag, getTags, updateTag, deleteTag };
