import {
  type User,
  type UserCredential,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const auth = getAuth()
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => user.value)

  async function init() {
    if (!user.value) user.value = await getCurrentUser()
  }

  const getCurrentUser = () => {
    return new Promise<User | null>((resolve, reject) => {
      const removeListener = onAuthStateChanged(
        getAuth(),
        (user: User | null) => {
          removeListener()
          resolve(user)
        },
        reject
      )
    })
  }

  async function login(): Promise<UserCredential | undefined> {
    const provider = new GoogleAuthProvider()
    try {
      return await signInWithPopup(auth, provider)
    } catch (error) {
      //TODO: handle error
    }
  }

  async function logout() {
    try {
      await signOut(auth)
      user.value = null
    } catch (error) {
      //TODO: handle error
    }
  }

  return { user, isLoggedIn, init, login, logout }
})
