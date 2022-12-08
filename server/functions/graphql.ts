import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import serverlessExpress from '@vendia/serverless-express'
import express from 'express'
import { json } from 'body-parser'

import { typeDefs, resolvers } from '../schema'
import { connectToDatabase } from '../database'
import { getAuth } from 'firebase-admin/auth'
import { initializeApp } from 'firebase-admin/app'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}
initializeApp(firebaseConfig)
connectToDatabase()
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests()
const app = express()
app.use(
  json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const jwt = req?.headers?.authorization
      const token = jwt?.split(' ')[1]

      let admin = process.env.NODE_ENV !== 'prod'

      if (token) {
        try {
          const claims = await getAuth().verifyIdToken(token)
          admin = admin || claims.admin
        } catch (error) {
          console.error(error)
        }
      }
      return {
        admin,
        req,
        res,
      }
    },
  })
)

exports.handler = (event, context) => {
  const graphqlHandler = serverlessExpress({ app })
  if (!event.requestContext) {
    event.requestContext = context
  }
  return graphqlHandler(event, context)
}
