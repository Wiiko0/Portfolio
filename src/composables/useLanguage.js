import { computed, onMounted, ref } from 'vue'
import { DEFAULT_LANGUAGE, LANGUAGES } from '../constants/app'
import { projectFilters, projects } from '../data/portfolio'
import { projectTranslations, translations } from '../locales'

export function useLanguage() {
  const language = ref(DEFAULT_LANGUAGE)
  const text = computed(() => translations[language.value])
  const localizedProjects = computed(() => projects.map((project) => ({
    ...project,
    ...projectTranslations[language.value][project.title]
  })))

  function toggleLanguage() {
    language.value = language.value === LANGUAGES.ENGLISH
      ? LANGUAGES.HUNGARIAN
      : LANGUAGES.ENGLISH
    document.documentElement.lang = language.value
  }

  onMounted(() => {
    document.documentElement.lang = language.value
  })

  return { language, text, localizedProjects, toggleLanguage }
}
