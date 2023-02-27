const router = require('express').Router()

const {
  getUserSprints,
  getSprintById,
  createSprint,
  deleteSprintById,
  updateSprint
} = require('../controllers/sprints.controller')

router.get('/', getUserSprints)
router.get('/:id', getSprintById)
router.post('/', createSprint)
router.put('/:id', updateSprint)
router.delete('/:id', deleteSprintById)

module.exports = router
