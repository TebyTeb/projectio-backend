const router = require('express').Router()

const {
  getProjectLists,
  getListById,
  createList,
  updateList,
  deleteListById
} = require('../controllers/lists.controller')

router.get('/', getProjectLists)
router.get('/:id', getListById)
router.post('/', createList)
router.put('/:id', updateList)
router.delete('/:id', deleteListById)

module.exports = router
