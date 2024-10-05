/**
 * Paginates the results from a MongoDB model.
 *
 * @param {Object} model - The Mongoose model to query.
 * @param {Object} [query={}] - The query object to filter results.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {number} [limit=10] - The number of documents per page.
 * @param {Object} [sort={}] - The sort object to order results.
 * @returns {Promise<Object>} The paginated results including total count, pagination info, and data.
 * @throws {Error} If an error occurs during pagination.
 */
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
