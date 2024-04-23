<template>
  <div class="event-card">
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img class="rounded-t-lg event-image" :src="photo_url" alt="" />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ label }}</h5>
        </a>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ address }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ city }}</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400" >{{ truncatedDescription }}</p>
        <button @click="" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {{ 'Read more' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { Event } from '~/types/events/events.type';

const props = defineProps<{ event: Event }>();
const event = props.event;
const { label, description, address, photo_url, latitude, longitude, id, city} = event;


const truncatedDescription = description.length > 100 ? description.substring(0, 97) + '...' : description;

</script>
<style scoped>
.event-card {
  bottom: 20px;
  left: 20px;
  z-index: 10;
  background-color: #f9f9f9;
  padding: 10px;
  width: 90%;
  height: fit-content;

  .event-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.5rem 0.5rem 0 0;
  }
}
</style>
