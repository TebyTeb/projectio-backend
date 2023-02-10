const router = require('express').Router()

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
} = require('../controllers/users.controller')

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUserById)

module.exports = router
