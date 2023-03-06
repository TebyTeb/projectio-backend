const ListModel = require('../models/lists.model')

module.exports = {
  getProjectLists,
  getListById,
  createList,
  updateList,
  deleteListById
}

// Auxiliary
// Get project From X
// Check ownership / collaborator

// Endpoints
function getProjectLists (req, res) {
  ListModel
    .find()
    .where('projectId')
    .equals(req.query.project)

    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

function getListById (req, res) {
  ListModel
    .findById(req.params.id)

    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

function createList (req, res) {
  ListModel
    .create(req.body)

    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

async function updateList (req, res) {
  try {
    const updatedList = await ListModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    return res.status(200).json(updatedList)
  } catch (err) {
    console.error(err)
    res.status(403).json(`Error: ${err.message}`)
  }
}

async function deleteListById (req, res) {
  try {
    await ListModel.findByIdAndDelete(req.params.id)

    return res.status(200).json('success')
  } catch (err) {
    console.error(err)
    res.status(403).json(`Error: ${err.message}`)
  }
}
