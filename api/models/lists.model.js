const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please insert a title']
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project'
  }
})

const listModel = mongoose.model('list', listSchema)
module.exports = listModel
