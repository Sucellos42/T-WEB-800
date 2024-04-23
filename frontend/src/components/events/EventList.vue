<template>
  <div
    class="sliding-panel h-dvh border-1.5-red"
    :class="{
      'is-expanded': isExpanded && !isDesktop,
    }"
    @click="handlePanelClick"
  >
    <div v-if="!isDesktop" class="handle" @click.stop="togglePanel"></div>
    <div
      v-if="isExpanded && isDesktop"
      class="event-list"
      :class="{ 'overflow-y-auto': isDesktop }"
    >
      <EventCard
        v-for="event in props.events"
        :key="event[0]"
        class="event-card"
        :event="event"
      />
    </div>
    <div v-else-if="isExpanded && !isDesktop">
      <EventCard v-for="event in props.events" :key="event[0]" :event="event" />
    </div>
    <div v-if="!isDesktop && !isExpanded">
      <p class="event-text">
        Découvrez les {{ props.events.length }} évènement dans cette zone
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import EventCard from '~/components/events/EventCard.vue';
import { Event } from '~/types/eventsTypes';

const props = defineProps<{ events: Event[] }>();

const isExpanded = ref(false);
const isDesktop = ref(false);

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  if (isDesktop.value) {
    isExpanded.value = true;
  }
});

const checkScreenSize = () => {
  isDesktop.value = window.innerWidth >= 768;
};

const handlePanelClick = () => {
  if (!isDesktop.value && !isExpanded.value) {
    togglePanel();
  }
};

const togglePanel = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
.sliding-panel {
  background-color: #f9f9f9;
  position: fixed;
  overflow: scroll;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10%;
  z-index: 1000;
  transition: height 0.6s ease;
  border-top-left-radius: 2.5rem;
  border-top-right-radius: 2.5rem;
}

.sliding-panel::before {
  content: '';
  display: block;
  position: absolute;
  top: 8px !important;
  left: 50% !important;
  transform: translateX(-20px);
  width: 40px !important;
  height: 4px !important;
  border-radius: 4px !important;
  background-color: rgba(32, 32, 32, 0.2);
}

.sliding-panel.is-expanded {
  height: 85%;
}

.handle {
  width: 100%;
  height: 20px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}

.event-list {
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .event-card {
    width: 90%;
    max-width: 300px;
    max-height: 400px;
    margin: 0.5rem;
  }
}

.event-text {
  text-align: center;
  padding: 0.5rem;
}

/* Écraser les styles pour la version desktop */
@media (min-width: 768px) {
  .sliding-panel {
    overflow: hidden;
    position: inherit;
    height: auto;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .sliding-panel::before {
    display: none;
  }
}
</style>
