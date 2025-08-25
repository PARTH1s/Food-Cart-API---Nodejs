// Generic CRUD service for Mongoose models

// Create a new document
const create = async (Model, data) => {
  try {
    return await Model.create(data);
  } catch (err) {
    console.error("CRUD -> Create Error:", err);
    throw err;
  }
};

// Delete a document by ID
const destroy = async (Model, id) => {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (err) {
    console.error("CRUD -> Delete Error:", err);
    throw err;
  }
};

// Update a document by ID
const update = async (Model, id, data, options = { new: true, runValidators: true }) => {
  try {
    return await Model.findByIdAndUpdate(id, data, options);
  } catch (err) {
    console.error("CRUD -> Update Error:", err);
    throw err;
  }
};

// Get all documents (with optional filter)
const getAll = async (Model, filter = {}) => {
  try {
    return await Model.find(filter);
  } catch (err) {
    console.error("CRUD -> GetAll Error:", err);
    throw err;
  }
};

// Get a single document by ID
const getById = async (Model, id) => {
  try {
    return await Model.findById(id);
  } catch (err) {
    console.error("CRUD -> GetById Error:", err);
    throw err;
  }
};

module.exports = { create, destroy, update, getAll, getById };
