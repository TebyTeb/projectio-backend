const router = require('express').Router()

const {
  getProjectSprints,
  getSprintById,
  createSprint,
  updateSprint,
  deleteSprintById
} = require('../controllers/sprints.controller')

router.get('/', getProjectSprints)
router.get('/:id', getSprintById)
router.post('/', createSprint)
router.put('/:id', updateSprint)
router.delete('/:id', deleteSprintById)

module.exports = router
