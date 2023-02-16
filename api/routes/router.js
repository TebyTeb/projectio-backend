const router = require('express').Router()

const authRouter = require('./auth.router')
const usersRouter = require('./users.router')
const projectsRouter = require('./projects.router')
const { authUser } = require('../utils') // Authenticated Route

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/projects', authUser, projectsRouter)

router.get('/profile', authUser, (req, res) => {
  res.json(res.locals.user)
})

module.exports = router
