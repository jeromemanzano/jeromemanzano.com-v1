<template>
  <form
    v-on:submit="updateCompany()"
    class="grid sm:grid-cols-2 gap-2"
  >
    <input-field
      label="Name"
      v-model="company.name"
    />
    <input-field
      label="Website"
      v-model="company.website"
    />
    <input-field
      label="Description"
      v-model="company.description"
    />
    <input-field
      label="Address"
      v-model="company.address"
    />
    <div
      v-if="company.id"
      class="contents"
    >
      <button
        type="submit"
        class="fill-hover mt-2 sm:mt-6"
      >
        UPDATE
      </button>
      <button
        type="button"
        class="fill-hover mt-2 sm:mt-6"
        @click="deleteCompany()"
      >
        DELETE
      </button>
    </div>
    <div
      v-else
      class="contents"
    >
      <button
        type="button"
        class="fill-hover mt-2 sm:mt-6"
        @click="createCompany()"
      >
        CREATE
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { ICompanyModel } from '@/stores/company/company-model'
import { useCompanyStore } from '@/stores/company/company-store'
import { reactive } from 'vue'
import InputField from '../InputField.vue'

const props = defineProps<{
  company: ICompanyModel
}>()

const company = reactive(Object.assign({}, props.company))
const companyStore = useCompanyStore()

function createCompany() {
  companyStore.onCreateCompanyDone(() => {
    company.name = ''
    company.website = ''
    company.address = ''
    company.description = ''
  })
  companyStore.createCompany(company)
}

function deleteCompany() {
  companyStore.deleteCompany(props.company.id)
}

function updateCompany() {
  companyStore.updateCompany(company)
}
</script>

<style scoped></style>
