const express = require('express')
const mongoose = require('mongoose')
// const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')



const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 }).then(()=>{
    logger.info("connected to mongo");
})

app.use(express.json())

app.use("/api/blogs", blogsRouter)

module.exports = app