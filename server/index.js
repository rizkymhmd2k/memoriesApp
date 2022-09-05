import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose";
import express from "express";
import cors from 'cors';

import postRoutes from './routes/posts.js'
const app = express();

//midlleware
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//path
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//route
app.use('/posts', postRoutes)

const PORT = process.env.PORT|| 2002;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('connected to db & listening on port', PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })