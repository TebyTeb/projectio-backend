const ProjectModel = require('../models/projects.model')

module.exports = {
  getUserProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProjectById
}

function getUserProjects (req, res) {
  const userId = res.locals.user._id

  ProjectModel
    .find()
    .where('owner')
    .equals(userId)

    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

function getProjectById (req, res) {
  ProjectModel
    .findById(req.params.id)
    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

function createProject (req, res) {
  const userId = res.locals.user._id
  const newProject = { owner: userId, ...req.body }

  ProjectModel
    .create(newProject)

    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

// Async-Await format. Refactor functions?
async function updateProject (req, res) {
  const userId = res.locals.user._id

  try {
    const project = await ProjectModel.findById(req.params.id)

    if (project === null) throw new Error('The project doesn\'t exist')

    if (project.owner.equals(userId)) {
      const updatedProject = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      })
      return res.status(200).json(updatedProject)
    } else throw new Error('Forbidden action')
  } catch (err) {
    console.error(err)
    res.status(403).json(`Error: ${err.message}`)
  }
}

async function deleteProjectById (req, res) {
  const userId = res.locals.user._id

  try {
    const project = await ProjectModel.findById(req.params.id)

    if (project === null) throw new Error('The project doesn\'t exist')

    if (project.owner.equals(userId)) {
      await ProjectModel.findByIdAndDelete(req.params.id)
      return res.status(200).json('success')
    } else throw new Error('Forbidden action')
  } catch (err) {
    console.error(err)
    res.status(403).json(`Error: ${err.message}`)
  }
}
