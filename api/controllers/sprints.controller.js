const SprintModel = require('../models/sprints.model')

module.exports = {
  getProjectSprints,
  getSprintById,
  createSprint,
  updateSprint,
  deleteSprintById
}

function getProjectSprints (req, res) {
  SprintModel
    .find()
    .where('projectId')
    .equals(req.query.project)

    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

function getSprintById (req, res) {
  SprintModel
    .findById(req.params.id)

    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

function createSprint (req, res) {
  SprintModel
    .create(req.body)

    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

async function updateSprint (req, res) {
  try {
    const updatedSprint = await SprintModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    return res.status(200).json(updatedSprint)
  } catch (err) {
    console.error(err)
    res.status(403).json(`Error: ${err.message}`)
  }
}

async function deleteSprintById (req, res) {
  try {
    await SprintModel.findByIdAndDelete(req.params.id)

    return res.status(200).json('success')
  } catch (err) {
    console.error(err)
    res.status(403).json(`Error: ${err.message}`)
  }
}
