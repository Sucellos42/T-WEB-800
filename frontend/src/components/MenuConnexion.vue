<script setup lang="ts">
import { computed, ref, ComputedRef, defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CardCommon from '~/components/common/CardCommon.vue';
import InputCommon from '~/components/common/InputCommon.vue';
import { useConnexionStore } from '~/stores/connexion/connexion.store.ts';

const isSelected = ref(false);
const token: string | null = localStorage.getItem('token') ?? null;
const connexionStore = useConnexionStore();

const initialName: ComputedRef<string> = computed(() => {
  if (!connexionStore.getFirstName) return '';
  return connexionStore.getFirstName.charAt(0).toUpperCase() || '';
});

const props = defineProps<{
  isResponsive: boolean;
}>();

function reset(): void {
  isSelected.value = false;
}
</script>

<template>
  <div
    class="flex relative justify-end w-screen"
    :class="{
      'flex justify-center w-screen items-center mt-4': props.isResponsive,
    }"
  >
    <font-awesome-icon
      v-if="props.isResponsive"
      v-click-outside="reset"
      :icon="['fas', 'list']"
      class="text-gray-500 mr-4 p-2 border-1.5 border-gray-500 rounded-full"
    />
    <InputCommon
      v-if="props.isResponsive"
      v-click-outside="reset"
      :is-responsive="props.isResponsive"
    />
    <div
      v-if="!props.isResponsive"
      v-click-outside="reset"
      class="inline-flex mt-4 mr-4 ml-4 p-3 items-center rounded-full border-1.5 bg-white cursor-pointer hover:shadow-custom-bottom"
      :class="{
        'shadow-custom-bottom': isSelected,
        'col-span-1': isResponsive,
      }"
      @click="isSelected = !isSelected"
    >
      <font-awesome-icon :icon="['fas', 'bars']" class="text-gray-500 mr-4" />
      <font-awesome-icon
        v-if="!token"
        :icon="['fas', 'user']"
        class="p-2 text-white bg-gray-500 rounded-full"
      />
      <span
        v-else
        class="flex p-2 text-white bg-gray-500 rounded-full w-8 h-8 items-center justify-center"
      >
        {{ initialName }}
      </span>
    </div>
    <div
      v-if="isSelected && !props.isResponsive"
      class="flex absolute top-20 mr-4 shadow-custom-all"
    >
      <CardCommon :type="'connexion'" />
    </div>
  </div>
</template>

<style scoped></style>
