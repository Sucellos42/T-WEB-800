<script setup lang="ts">
import Input from "~/components/common/InputCommon.vue"
import MenuConnexion from "~/components/MenuConnexion.vue";
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
