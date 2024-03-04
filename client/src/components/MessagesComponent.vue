<script setup lang="ts">
import { defineProps } from 'vue';

import { ZodMessage } from '~/types/messages.type.ts';
defineProps<{ message: ZodMessage }>();
</script>

<template>
  <div class="flex flex-col items-end">
    <div
      class="break-words bg-green-500 text-white text-sm p-3 rounded-lg rounded-br-none ml-auto my-2 mr-4 w-auto max-w-md"
    >
      {{ message.content }}
      <div class="text-right text-xs mt-1">
        {{ message.date.getHours() }}:{{ message.date.getMinutes() }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
