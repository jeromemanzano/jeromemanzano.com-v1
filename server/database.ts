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
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.1omo63b.mongodb.net/?retryWrites=true&w=majority`,
      {
        serverApi: ServerApiVersion.v1,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )
    .then(db => {
      isConnected = db.connections[0].readyState
    })
}
