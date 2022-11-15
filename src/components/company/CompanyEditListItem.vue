<template>
  <form
    v-on:submit="updateCompany()"
    class="grid md:grid-cols-2 gap-2"
  >
    <input-field
      label="Name"
      v-model="name"
    />
    <input-field
      label="Website"
      v-model="website"
    />
    <input-field
      label="Description"
      v-model="description"
    />
    <input-field
      label="Address"
      v-model="address"
    />
    <div
      v-if="company.id"
      class="col-span-2 styled-list horizontal gap-3"
    >
      <button
        type="submit"
        class="content-aqua py-2 mt-2 md:mt-6"
      >
        UPDATE
      </button>
      <button
        type="button"
        class="content-candyAppleRed py-2 mt-2 md:mt-6"
        @click="deleteCompany()"
      >
        DELETE
      </button>
    </div>
    <div
      v-else
      class="contents styled-list horizontal"
    >
      <button
        type="button"
        class="content-aqua py-2 mt-2 md:mt-6"
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
import { ref } from 'vue'
import InputField from '../InputField.vue'

const props = defineProps<{
  company: ICompanyModel
}>()

const name = ref(props.company.name)
const website = ref(props.company.website)
const address = ref(props.company.address)
const description = ref(props.company.description)
const companyStore = useCompanyStore()

function createCompany() {
  companyStore.createCompany(name.value, website.value, address.value, description.value)
  companyStore.onCreateCompanyDone(() => {
    name.value = ''
    website.value = ''
    address.value = ''
    description.value = ''
  })
}

function deleteCompany() {
  companyStore.deleteCompany(props.company.id)
}

function updateCompany() {
  companyStore.updateCompany({
    id: props.company.id,
    name: name.value,
    website: website.value,
    address: address.value,
    description: description.value,
  })
}
</script>

<style scoped></style>
