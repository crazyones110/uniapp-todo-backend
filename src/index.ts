import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
// import cookieSession from 'cookie-session'
import './controller/LoginController'
import './controller/RootController'
import { AppRouter } from './AppRouter'
import mongoose from 'mongoose'
import { MONGO_CONF } from './config/db'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
// import './db/mongoose'

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(MONGO_CONF.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.use(morgan('tiny'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// app.use(cookieSession({ keys: ['asdqweqwex'] }))

app.use(AppRouter.instance)

app.listen(5757, '0.0.0.0', () => {
  console.log('listening on port 5757')
})