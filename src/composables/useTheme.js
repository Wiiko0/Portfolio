import { onMounted, ref } from 'vue'
import { THEMES } from '../constants/app'
import { THEME_COLORS, THEME_CSS_VARIABLES } from '../constants/theme'

export function useTheme() {
  const isLightTheme = ref(false)

  function applyTheme() {
    const themeName = isLightTheme.value ? THEMES.LIGHT : THEMES.DARK
    const root = document.documentElement
    const colors = THEME_COLORS[themeName]

    root.dataset.theme = themeName

    Object.entries(THEME_CSS_VARIABLES).forEach(([colorName, cssVariable]) => {
      root.style.setProperty(cssVariable, colors[colorName])
    })
  }

  function toggleTheme() {
    isLightTheme.value = !isLightTheme.value
    applyTheme()
  }

  onMounted(applyTheme)

  return { isLightTheme, toggleTheme }
}
