<template>
  <transition name="fade">
    <div
      v-if="event"
      class="fixed inset-0 flex items-center justify-center p-3 min-h-full"
    >
      <div
        class="absolute bg-black opacity-70 inset-0 z-10"
        @click="emitClose"
      ></div>
      <div
        class="relative z-20 w-full max-w-lg p-3 mx-auto my-auto rounded-xl shadow-lg bg-white"
      >
        <div class="text-center p-3 flex-auto justify-center leading-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 flex items-center text-purple-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <!-- SVG content -->
          </svg>
          <h2 class="text-2xl font-bold py-4">Nancy</h2>
          <p class="text-md text-gray-500 px-8">Descriu</p>
          <!-- Other event details -->
        </div>
        <div class="p-3 mt-2 text-center space-x-4 md:block">
          <button
            class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
          >
            Save
          </button>
          <button
            class="mb-2 md:mb-0 bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
            @click="emitClose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
// import { defineProps, defineEmits } from 'vue';
import { Event } from '~/types/events/events.type';

const props = defineProps<{ event: Event | null }>();
const emit = defineEmits(['update:event']);

console.log('EventModal props:', props.event);

const emitClose = () => {
  emit('update:event', null);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
