<template>
  <div class="flex flex-col justify-start md:px-11 md:py-11 gap-0">
    <div class="styled-list horizontal bordered grid-cols-3 gap-1">
      <router-link
        to="/admin/skills"
        class="py-2"
        >SKILLS</router-link
      >
      <router-link
        to="/admin/companies"
        class="py-2"
        >COMPANIES</router-link
      >
      <router-link
        to="/admin/experiences"
        class="py-2"
        ><span>EXPERIENCES</span></router-link
      >
    </div>
    <div class="mt-6">
      <router-view></router-view>
    </div>
  </div>
</template>
