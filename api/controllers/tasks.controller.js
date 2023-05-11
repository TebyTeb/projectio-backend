const listModel = require('../models/lists.model')
const TaskModel = require('../models/tasks.model')

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskById
}

// Auxiliary
// Get project From X
// Check ownership / collaborator

// Endpoints
function getTasks (req, res) {
  var query = {}
  if (req.query.project) {
    query.projectId = req.query.project
  }
  if (req.query.sprint) {
    query.sprintId = req.query.sprint
  }
  TaskModel.find(query)
    .populate('sprintId')

    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

function getTaskById (req, res) {
  TaskModel.findById(req.params.id)

    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

// function createTask (req, res) {
//   TaskModel.create(req.body)

//     .then((response) => res.status(200).json(response))
//     .catch((err) => res.status(400).json(err))
// }

async function createTask (req, res) {
  try {
    const assignedProject = req.body.projectId
    const projectLists = await listModel.find()
      .where('projectId')
      .equals(assignedProject)
    const [todoList] = projectLists.filter((list) => list.name === 'To do')
    console.log(todoList)
    const newTask = {
      ...req.body,
      listId: req.body.listId ? req.body.listId : todoList._id,
      assigned: res.locals.user._id
    }
    const createdTask = await TaskModel.create(newTask)
    return res.status(200).json(createdTask)
  } catch (err) {
    console.error(err)
    res.status(403).json(`Error: ${err.message}`)
  }
}

async function updateTask (req, res) {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
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
