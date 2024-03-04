<script setup lang="ts">
// Imports -------------------------------------------------------------------------------------------------------------
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useStudyStore } from "~/stores/study.store"

// Types ---------------------------------------------------------------------------------------------------------------
import type { StudiesTableInterface } from "~/interfaces/studiesTable.interface"
import type { ListStudiesQuery } from "~/types/listStudiesQuery.type"

// Props ---------------------------------------------------------------------------------------------------------------
const props = defineProps<StudiesTableInterface>()

// Datas ---------------------------------------------------------------------------------------------------------------
const router = useRouter()
const studyStore = useStudyStore()
const loading = ref(false)

// Computeds -----------------------------------------------------------------------------------------------------------
const query = computed<ListStudiesQuery>(() => {
  const query: ListStudiesQuery = {}
  const keysToCheck = [
    "localisation",
    "specialite",
    "organe",
    "situation",
  ] as const
  keysToCheck.forEach((key) => {
    const value = props.value[key]
    if (value) query[key] = value.$id
  })
  if (
    query.localisation &&
    !query.specialite &&
    !query.organe &&
    !query.situation
  ) {
    query.specialite = "all"
    query.organe = "all"
    query.situation = "all"
  }
  return query
})
const titles = computed<string[]>(() => {
  if (!studyStore.studiesTable[0]) return []
  return Object.keys(studyStore.studiesTable[0])
    .filter((key) => key !== "$id")
    .map((key) => {
      return key.replace(/_/g, " ")
    })
})

// Watchers ------------------------------------------------------------------------------------------------------------

// Functions -----------------------------------------------------------------------------------------------------------
const selectStudy = (id: string) => {
  studyStore.selectStudy(id)
  router.push({ name: "StudyView", params: { id } })
}
const formateValues = (key: string, value: string) => {
  if (key === "statut" || key === "investigateur_principal")
    return value.replace(/_/g, " ")
  else return value
}

// Lifecycles ----------------------------------------------------------------------------------------------------------
onMounted(async () => {
  loading.value = true
  await studyStore.listStudies(query.value)
  loading.value = false
})

// Events --------------------------------------------------------------------------------------------------------------
</script>

<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div
          class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
        >
          <table
            v-if="titles.length && !loading"
            class="min-w-full divide-y divide-gray-200"
          >
            <thead class="bg-background-primary">
              <tr>
                <th
                  v-for="(title, titleIndex) in titles"
                  :key="titleIndex"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {{ title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(study, studyIndex) in studyStore.studiesTable"
                :key="studyIndex"
                :class="
                  studyIndex % 2 === 0
                    ? [
                        'bg-background-primary hover:bg-background-primary-hover',
                      ]
                    : [
                        'bg-background-secondary hover:bg-background-secondary-hover',
                      ]
                "
                @click="selectStudy(study.$id)"
              >
                <template
                  v-for="(value, key, fieldIndex) in study"
                  :key="fieldIndex"
                >
                  <td
                    v-if="key !== '$id'"
                    class="px-6 py-4 text-xs lg:text-base"
                    :class="
                      fieldIndex === 0
                        ? ['font-medium text-gray-900']
                        : ['text-sm text-gray-500']
                    "
                  >
                    {{ formateValues(key, value ?? "N/A") }}
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
          <div v-else class="my-10 flex items-center justify-center">
            <LoadingCommon v-if="loading" />
            <span v-else class="text-secondary"
              >Aucune étude ne correspond à votre recherche.</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
