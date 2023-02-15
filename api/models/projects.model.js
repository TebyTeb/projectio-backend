const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

const projectModel = mongoose.model('project', projectSchema)
module.exports = projectModel
