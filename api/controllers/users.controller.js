const bcrypt = require('bcrypt')
const UserModel = require('../models/users.model')

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
}

function getAllUsers (req, res) {
  UserModel
    .find()
    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

function getUserById (req, res) {
  UserModel
    .findById(req.params.id)
    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}

function deleteUserById (req, res) {
  UserModel
    .remove({ _id: req.params.id })
    .then(response => res.status(200).json(response))
    .catch(err => res.status(400).json(err))
}

function updateUser (req, res) {
  if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10)
  UserModel
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.status(200).json(response))
    .catch((err) => res.status(400).json(err))
}
