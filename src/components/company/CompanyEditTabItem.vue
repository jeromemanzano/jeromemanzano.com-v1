<template>
  <!-- TODO: implement loading and error -->
  <div v-if="companyStore.loading"></div>
  <div v-else-if="companyStore.error"></div>
  <div
    v-else-if="companyStore.companies"
    class="grid gap-6 md:gap-4"
  >
    <CompanyEditListItem :company="newCompany" />
    <CompanyEditListItem
      v-for="(company, index) in companyStore.companies.getAllCompanies"
      :company="company"
      :key="index"
    />
  </div>
</template>

<script setup lang="ts">
import type { ICompanyModel } from '@/stores/company/company-model'
import CompanyEditListItem from './CompanyEditListItem.vue'
import { useCompanyStore } from '@/stores/company/company-store'

const newCompany = {} as ICompanyModel
const companyStore = useCompanyStore()
</script>

<style scoped></style>
