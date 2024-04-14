<template>
  <div class="event-card">
    <!-- Contenu de la carte d'événement ici -->
    <h3>{{ event[2] }}</h3>
<!--    <p id="event-card-description">{{ event[3] }}</p>-->
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

// Mettre un watcher pour regarder le changement de valeur du parent pour mettre à jour l'enfant

const selectedEvent = ref<Event | null>(null);

const props = defineProps<{ event: Event }>();
selectedEvent.value = props.event;


console.log('Selected event from child:', selectedEvent.value);
</script>

<style scoped>
/* CSS for the event card */
.event-card {
  position: absolute;
  bottom: 20px;
  z-index: 1;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  width: 90%;
  height: fit-content;
}

#event-card-description {
  max-height: 100px;
  overflow: hidden;
}
</style>
