const router = require('express').Router()

const {
  getSprintTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskById
} = require('../controllers/tasks.controller')

router.get('/', getSprintTasks)
router.get('/:id', getTaskById)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTaskById)

module.exports = router
