import * as englishLocale from './en'
import * as hungarianLocale from './hu'

const {
  projectContent: englishProjects,
  ...english
} = englishLocale

const {
  projectContent: hungarianProjects,
  ...hungarian
} = hungarianLocale

export const translations = {
  en: english,
  hu: { ...english, ...hungarian }
}

export const projectTranslations = {
  en: englishProjects,
  hu: {
    ...englishProjects,
    ...hungarianProjects
  }
}
