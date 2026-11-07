import { computed, ref } from 'vue'
import { projectFilters } from '../data/portfolio'

export function useProjects(localizedProjects) {
  const activeFilter = ref(projectFilters[0])

  const filteredProjects = computed(() => {
    if (activeFilter.value === projectFilters[0]) {
      return localizedProjects.value
    }

    const filter = activeFilter.value.toLowerCase()
    return localizedProjects.value.filter((project) =>
      project.tags.some((tag) => tag.toLowerCase() === filter)
    )
  })

  function setFilter(filter) {
    activeFilter.value = filter
  }

  function resetFilter() {
    activeFilter.value = projectFilters[0]
  }

  return { activeFilter, filteredProjects, setFilter, resetFilter }
}
