const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  surname: {
    type: String,
    required: [true, 'Surname is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator (value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
      }
    },
    unique: [true, 'Este correo electrónico ya está registrado']
  },
  password: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Number,
    default: Date.now() // Get a timestamp :)
  }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel
