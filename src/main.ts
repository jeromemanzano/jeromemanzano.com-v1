import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import apolloClient from './graphql'

import './style.css'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {} from './firebase'

library.add(faLinkedinIn, faGithub, faUser)
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')
