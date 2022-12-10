const mongoose = require('mongoose')
const { ServerApiVersion } = require('mongodb')
require('dotenv').config()

mongoose.Promise = global.Promise
let isConnected

export const connectToDatabase = () => {
  if (isConnected) {
    console.log('using existing database connection')
    return Promise.resolve()
  }

  console.log('creating new database connection')

  return mongoose
    .connect(process.env.DB_CONNECTION_STRING, {
      serverApi: ServerApiVersion.v1,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(db => {
      isConnected = db.connections[0].readyState
    })
}
