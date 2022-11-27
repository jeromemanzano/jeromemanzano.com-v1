import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import apolloClient from './graphql'

import './style.css'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import firebaseApp from './firebase'

library.add(faEnvelope, faLinkedinIn, faGithub, faArrowRight)
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')
