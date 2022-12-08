import { type User, getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const auth = getAuth()
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => user.value)

  getAuth().onAuthStateChanged(currentUser => {
    console.log('onAuthStateChanged')
    user.value = currentUser
  })

  async function login() {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  async function logout() {
    await signOut(auth)
  }

  return { user, isLoggedIn, login, logout }
})
