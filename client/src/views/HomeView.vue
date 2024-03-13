<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Input from "~/components/common/InputCommon.vue"
import MenuConnexion from "~/components/MenuConnexion.vue";
import { useConnexionStore } from '~/stores/connexion/connexion.store.ts'
import router from "~/router";

const route = useRoute()
const connexionStore = useConnexionStore()

onMounted(() => {
  if (!localStorage.getItem('token') && route.query.token) {
    localStorage.setItem('token', <string>route.query.token)
    localStorage.setItem('firstName', <string>route.query.firstName)
    connexionStore.setFirstName(<string>localStorage.getItem('firstName'))
    router.push('/')
  }
  if(localStorage.getItem('token')) {
    connexionStore.setFirstName(<string>localStorage.getItem('firstName'))
  }
})

</script>

<template>
  <div class="h-screen w-screen" >
    <div>
      <MenuConnexion/>
    </div>
    <div class="flex justify-center mt-10 w-screen">
      <Input/>
    </div>

  </div>
</template>

<style scoped></style>
