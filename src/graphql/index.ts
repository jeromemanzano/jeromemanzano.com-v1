import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { getToken } from '../firebase'

async function getHeaders() {
  const headers: { Authorization?: string; 'Content-Type'?: string } = {}
  const token = await getToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  headers['Content-Type'] = 'application/json'
  return headers
}

const httpLink = createHttpLink({
  uri: '/api/graphql',
  fetch: async (uri: RequestInfo, options: RequestInit) => {
    options.headers = await getHeaders()
    return fetch(uri, options)
  },
})

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export default apolloClient
