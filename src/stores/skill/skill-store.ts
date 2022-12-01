import { defineStore } from 'pinia'
import type { ISkillModel } from './skill-model'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { SKILLS_QUERY } from '../../graphql/queries'
import { CREATE_SKILL_MUTATION, DELETE_SKILL_MUTATION, UPDATE_SKILL_MUTATION } from '../../graphql/mutations'

//TODO: handle errors
export const useSkillStore = defineStore('skill', () => {
  const { result: skills, loading: queryLoading, error } = useQuery(SKILLS_QUERY)
  const { mutate: updateSkillMutation, loading: updateLoading } = useMutation(UPDATE_SKILL_MUTATION)

  // cache needs to be updated after deleting based here https://v4.apollo.vuejs.org/guide-composable/mutation.html#making-all-other-cache-updates
  const refetchOption = {
    refetchQueries: [{ query: SKILLS_QUERY }],
    awaitRefetchQueries: true,
  }

  const {
    mutate: createSkillMutation,
    loading: createLoading,
    onDone: onCreateSkillDone,
  } = useMutation(CREATE_SKILL_MUTATION, refetchOption)

  //TODO: fix the refetchQuery issue where last item is always removed.
  const { mutate: deleteSkillMutation, loading: deleteLoading } = useMutation(DELETE_SKILL_MUTATION, refetchOption)

  const loading = queryLoading || updateLoading || createLoading || deleteLoading

  function createSkill(name: string, category: string, iconUrl: string) {
    createSkillMutation({
      skill: {
        name,
        iconUrl,
        category,
      },
    })
  }

  function updateSkill(skill: ISkillModel) {
    updateSkillMutation({
      id: skill.id,
      skill: {
        name: skill.name,
        iconUrl: skill.iconUrl,
        category: skill.category,
      },
    })
  }

  function deleteSkill(id: String) {
    deleteSkillMutation({ id })
  }

  return {
    queryLoading,
    loading,
    error,
    skills,
    createSkill,
    updateSkill,
    deleteSkill,
    onCreateSkillDone,
  }
})
