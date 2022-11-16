import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import apolloClient from './graphql'

import './style.css'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { DefaultApolloClient } from '@vue/apollo-composable'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import firebaseApp from './firebase'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')
