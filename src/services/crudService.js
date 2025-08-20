// Generic CRUD service for Mongoose models

const create = async (Model, data) => {
  try {
    // Save a new document
    return await new Model(data).save();
  } catch (err) {
    console.error("Create Error:", err);
    throw err;
  }
};

const destroy = async (Model, id) => {
  try {
    // Delete document by ID
    return await Model.findByIdAndDelete(id);
  } catch (err) {
    console.error("Delete Error:", err);
    throw err;
  }
};

const update = async (Model, id, data, options = { new: true }) => {
  try {
    // Update document by ID (returns updated doc by default)
    return await Model.findByIdAndUpdate(id, data, options);
  } catch (err) {
    console.error("Update Error:", err);
    throw err;
  }
};

const getAll = async (Model, filter = {}) => {
  try {
    // Fetch all documents (with optional filter)
    return await Model.find(filter);
  } catch (err) {
    console.error("GetAll Error:", err);
    throw err;
  }
};

const getById = async (Model, id) => {
  try {
    // Fetch a single document by ID
    return await Model.findById(id);
  } catch (err) {
    console.error("GetById Error:", err);
    throw err;
  }
};

module.exports = { create, destroy, update, getAll, getById };
