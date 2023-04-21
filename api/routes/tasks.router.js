const router = require('express').Router()

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskById
} = require('../controllers/tasks.controller')

router.get('/', getTasks)
router.get('/:id', getTaskById)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTaskById)

module.exports = router
