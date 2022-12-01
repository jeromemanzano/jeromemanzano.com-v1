import { defineStore } from 'pinia'
import type { IExperienceModel } from './experience-model'
import { EXPERIENCES_QUERY } from '@/graphql/queries'
import { CREATE_EXPERIENCE_MUTATION, UPDATE_EXPERIENCE_MUTATION, DELETE_EXPERIENCE_MUTATION } from '@/graphql/mutations'
import { useQuery, useMutation } from '@vue/apollo-composable'

//TODO: handle errors
export const useExperienceStore = defineStore('experience', () => {
  const { result: experiences, loading: queryLoading, error } = useQuery(EXPERIENCES_QUERY)
  const { mutate: updateExperienceMutation, loading: updateLoading } = useMutation(UPDATE_EXPERIENCE_MUTATION)

  // cache needs to be updated after deleting based here https://v4.apollo.vuejs.org/guide-composable/mutation.html#making-all-other-cache-updates
  const refetchOption = {
    refetchQueries: [{ query: EXPERIENCES_QUERY }],
    awaitRefetchQueries: true,
  }

  const {
    mutate: createExperienceMutation,
    loading: createLoading,
    onDone: onCreateExperienceDone,
  } = useMutation(CREATE_EXPERIENCE_MUTATION, refetchOption)

  //TODO: fix the refetchQuery issue where last item is always removed.
  const { mutate: deleteExperienceMutation, loading: deleteLoading } = useMutation(
    DELETE_EXPERIENCE_MUTATION,
    refetchOption
  )

  const loading = queryLoading || updateLoading || createLoading || deleteLoading

  function createExperience(
    position: string,
    roles: string[],
    startDate: string,
    endDate: string,
    companyId: string,
    skillIds: string[]
  ) {
    createExperienceMutation({
      experience: {
        position,
        roles,
        startDate,
        endDate,
        companyId,
        skillIds,
      },
    })
  }

  function updateExperience(experience: IExperienceModel) {
    updateExperienceMutation({
      id: experience.id,
      experience: {
        position: experience.position,
        roles: experience.roles,
        startDate: experience.startDate,
        endDate: experience.endDate,
        companyId: experience.company.id,
        skillIds: experience.skills.map(skill => skill.id),
      },
    })
  }

  function deleteExperience(id: string) {
    deleteExperienceMutation({ id })
  }

  return {
    queryLoading,
    loading,
    error,
    experiences,
    createExperience,
    updateExperience,
    deleteExperience,
    onCreateExperienceDone,
  }
})
