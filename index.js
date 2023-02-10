process.stdout.write('\x1B[2J\x1B[0f') // Clear terminal screen
require('dotenv').config()

const express = require('express') // Brings Express Router framework

const cors = require('cors') // Manages cross-origin requests
const mongoose = require('mongoose') // Allows petitions to database
const morgan = require('morgan') // Logger

;(async function () {
  // MONGOOSE
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB || 'test'
    })
    console.log('Database connection successful')
  } catch (err) {
    throw new Error(`Database connection failed: ${err}`)
  }

  try {
    // ADDING MIDDLEWARES & ROUTER
    const app = express()
      .use(cors())
      .use(morgan('combined')) // Show log for every request in "combined" format.
      .use(express.json()) // Parses .json format into js objects
      .use('/api', require('./api/routes')) // If we get a petition with "/api..." in it, it will call "./api/routes" and execute index.js

    // Init server
    const PORT = process.env.PORT || 2222
    app.listen(PORT, (err) => {
      if (err) {
        throw new Error(err)
      }
      console.info('-'.repeat(40))
      console.info('💻  Projectio server running!')
      console.info(`📡  Listening on Port: ${PORT}`)
      console.info('-'.repeat(40) + '\n')
    })
  } catch (error) {
    throw new Error(error)
  }
})()
