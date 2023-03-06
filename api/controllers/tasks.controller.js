const TaskModel = require('../models/tasks.model')

module.exports = {
  getSprintTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskById
}

// Auxiliary
// Get project From X
// Check ownership / collaborator

// Endpoints
function getSprintTasks (req, res) {
  TaskModel
    .find()
    .where('sprintId')
    .equals(req.query.sprint)

    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

function getTaskById (req, res) {
  TaskModel
    .findById(req.params.id)

    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

function createTask (req, res) {
  TaskModel
    .create(req.body)

    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

async function updateTask (req, res) {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    return res.status(200).json(updatedTask)
  } catch (err) {
    console.error(err)
    res.status(403).json(`Error: ${err.message}`)
  }
}

async function deleteTaskById (req, res) {
  try {
    await TaskModel.findByIdAndDelete(req.params.id)

    return res.status(200).json('success')
  } catch (err) {
    console.error(err)
    res.status(403).json(`Error: ${err.message}`)
  }
}
