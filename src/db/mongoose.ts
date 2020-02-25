import mongoose from 'mongoose'
import { MONGO_CONF } from '../config/db'

mongoose.Promise = global.Promise
mongoose.connect(MONGO_CONF.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})