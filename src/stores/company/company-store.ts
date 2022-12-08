import { defineStore } from 'pinia'
import type { ICompanyModel } from './company-model'
import { COMPANIES_QUERY } from '@/graphql/queries'
import { CREATE_COMPANY_MUTATION, UPDATE_COMPANY_MUTATION, DELETE_COMPANY_MUTATION } from '@/graphql/mutations'
import { useQuery, useMutation } from '@vue/apollo-composable'

export const useCompanyStore = defineStore('company', () => {
  const { result: companies, loading: queryLoading, error } = useQuery(COMPANIES_QUERY)
  const { mutate: updateCompanyMutation, loading: updateLoading } = useMutation(UPDATE_COMPANY_MUTATION)

  // cache needs to be updated after deleting based here https://v4.apollo.vuejs.org/guide-composable/mutation.html#making-all-other-cache-updates
  const refetchOption = {
    refetchQueries: [{ query: COMPANIES_QUERY }],
    awaitRefetchQueries: true,
  }

  const {
    mutate: createCompanyMutation,
    loading: createLoading,
    onDone: onCreateCompanyDone,
  } = useMutation(CREATE_COMPANY_MUTATION, refetchOption)

  //TODO: fix the refetchQuery issue where last item is always removed.
  const { mutate: deleteCompanyMutation, loading: deleteLoading } = useMutation(DELETE_COMPANY_MUTATION, refetchOption)

  const loading = queryLoading || updateLoading || createLoading || deleteLoading

  function createCompany(company: ICompanyModel) {
    createCompanyMutation({
      company: {
        name: company.name,
        website: company.website,
        address: company.address,
        description: company.description,
      },
    })
  }

  function updateCompany(company: ICompanyModel) {
    updateCompanyMutation({
      id: company.id,
      company: {
        name: company.name,
        website: company.website,
        address: company.address,
        description: company.description,
      },
    })
  }

  function deleteCompany(id: string) {
    deleteCompanyMutation({ id })
  }

  return {
    queryLoading,
    loading,
    error,
    companies,
    createCompany,
    updateCompany,
    deleteCompany,
    onCreateCompanyDone,
  }
})
