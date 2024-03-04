<script setup lang="ts">
// Types ---------------------------------------------------------------------------------------------------------------

import type { ButtonCommonInterface } from "~/interfaces/buttonCommon.interface"

// Props ---------------------------------------------------------------------------------------------------------------
const props = withDefaults(defineProps<ButtonCommonInterface>(), {
  value: "Button",
  size: "md",
  color: "primary",
  type: "button",
  rounded: "md",
  disabled: false,
})
</script>

<template>

</template>

<style scoped>

</style>