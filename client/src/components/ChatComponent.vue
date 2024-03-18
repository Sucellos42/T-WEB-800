<script setup lang="ts">
import { useMessagesStore } from '~/stores/messages/messages.store.ts';
import { ref } from 'vue';
import Messages from '~/components/MessagesComponent.vue';
const valueMessage = ref<string>('');

const sendMessage = () => {
  if (valueMessage.value) {
    useMessagesStore().addMessage({
      content: valueMessage.value,
      date: new Date(),
    });
    valueMessage.value = '';
  }
  console.log("valueMessage", valueMessage.value);
};
</script>

<template>
  <div class="flex flex-col-reverse">
    <Messages
      v-for="(message, indexMessage) in useMessagesStore().allMessages"
      :key="indexMessage"
      :message="message"
    />

    <div class="flex fixed inset-x-0 bottom-0">
      <textarea
        class="w-full h-12 p-2 ml-2 border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
        placeholder=" Type your message..."
        v-model="valueMessage"
        @keydown.enter.prevent="sendMessage"
      />
      <button
        class="bg-blue-500 text-white ml-2 mr-2 p-2.5 text-center rounded-md"
        @click="sendMessage"
      >
        envoyer
      </button>
    </div>
  </div>
</template>

<style scoped></style>
