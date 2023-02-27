const router = require('express').Router()

const {
  getUserProjects,
  getProjectById,
  createProject,
  deleteProjectById,
  updateProject
} = require('../controllers/projects.controller')

router.get('/', getUserProjects)
router.get('/:id', getProjectById)
router.post('/', createProject)
router.put('/:id', updateProject)
router.delete('/:id', deleteProjectById)

module.exports = router
