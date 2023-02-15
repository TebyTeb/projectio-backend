const mongoose = require('mongoose')

const sprintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title']
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true
  },
  startDate: {
    type: Date,
    required: [true, 'please enter a start date'],
    default: Date.now()
  },
  endDate: {
    type: Date,
    required: [true, 'please enter an end date']
  }
})

const sprintModel = mongoose.model('sprint', sprintSchema)
module.exports = sprintModel
