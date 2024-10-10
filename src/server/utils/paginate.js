const paginate = async (model, query = {}, page = 1, limit = 10, sort = {}) => {
  try {
    const skip = (page - 1) * limit;

    const data = await model.find(query).skip(skip).limit(limit).sort(sort);
    const total = await model.countDocuments(query);

    return {
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
      data: data,
    };
  } catch (err) {
    throw new Error('Error during pagination: ' + err.message);
  }
};

module.exports = paginate;
