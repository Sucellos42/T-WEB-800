<template>
  <div class="sliding-panel" :class="{ 'is-expanded': isExpanded }" @click="handlePanelClick">
    <div class="handle" @click.stop="togglePanel"></div>
    <div class="event-list">
      <!--      <h2>Events</h2>-->
      <EventCard v-for="event in props.events" :key="event.id" :event="event"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EventCard from '~/components/events/EventCard.vue';
import { Event } from '~/types/eventsTypes';

const props = defineProps<{ events: Event[] }>();
console.log('EventList props:', props);

const isExpanded = ref(false);

// Fonction modifiée pour gérer les clics sur le panneau
const handlePanelClick = () => {
  if (!isExpanded.value) {
    togglePanel();
  }
};

const togglePanel = () => {
  isExpanded.value = !isExpanded.value;
};
</script>


<style scoped>
.sliding-panel {
  overflow: scroll;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10%; /* initial height */
  background: white;
  z-index: 1000;
  transition: height 0.6s ease;
  border-top-left-radius: 2.5rem;
  border-top-right-radius: 2.5rem;
}

.sliding-panel:before {
  content: "" !important;
  display: block !important;
  position: absolute !important;
  top: 8px !important;
  left: 50% !important;
  transform: translateX(-20px) !important;
  width: 40px !important;
  height: 4px !important;
  border-radius: 4px !important;
  background-color: rgba(32, 32, 32, 0.2)
}

.sliding-panel.is-expanded {
  height: 85%; /* height when expanded */
}

.handle {
  width: 100%;
  height: 20px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}

.event-list {
  overflow-y: auto;
}

</style>
