const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please insert a title']
  },
  content: {
    type: String,
    required: false
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  endDate: {
    type: Date,
    required: [true, 'Please insert an end date']
  },
  assigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'list',
    required: true
  },
  sprintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sprint',
    required: true
  }
})

const taskModel = mongoose.model('task', taskSchema)
module.exports = taskModel
