import { defineStore } from 'pinia'

// TODO: Move this to backend?
export const useProfileStore = defineStore('profile', () => {
  const githubUrl = 'https://github.com/jeromemanzano'
  const linkedInUrl = 'https://www.linkedin.com/in/jeromemanzano/'
  const emailUrl = 'mailto:jeromemanzano@gmail.com'

  return {
    githubUrl,
    linkedInUrl,
    emailUrl,
  }
})
