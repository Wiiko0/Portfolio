import { THEMES } from './app'

// Main dark page background.
export const NIGHT = '#171319'

// Dark card and control surfaces.
export const NIGHT_SURFACE = '#221b24'

// Light text used on the dark theme.
export const CLOUD = '#f2e9ed'

// Secondary text and inactive interface elements.
export const ASH = '#a89ba6'

// Borders, dividers, and orbital lines.
export const PLUM_LINE = '#403542'

// Dark-theme accent used for highlights, links, and decorative details.
export const DUSTY_ROSE = '#d8a1bd'

// Green accent used for status indicators and interactive cursor states.
export const SAGE = '#a7b88c'

// Purple accent used for project cards and ambient background light.
export const MAUVE = '#b68aaa'

// Light page background.
export const PORCELAIN = '#f4efe9'

// Light card and control surfaces.
export const IVORY = '#fffaf6'

// Dark text used on the light theme.
export const INK = '#2c2029'

// Secondary text and inactive interface elements in light mode.
export const SLATE = '#746873'

// Light-theme borders and dividers.
export const BLUSH_LINE = '#ded3d9'

// Light-theme accent used for highlights, links, and decorative details.
export const ROSE = '#a65d80'

// Light-theme green accent used for status indicators and cursor states.
export const OLIVE = '#61734b'

// Light-theme purple accent used for project cards and ambient light.
export const HEATHER = '#94618d'

// Light cursor color.
export const LIGHT_CURSOR = '#70415f'

// Light-theme interactive cursor color.
export const LIGHT_INTERACTIVE = '#43552f'

// Moon gradient start and end colors.
export const MOON_START = '#d9aec5'
export const MOON_END = '#ae789e'

// Project preview backgrounds.
export const PROJECT_VISUAL = '#392b3b'
export const PROJECT_MOSS_VISUAL = '#344034'

// Shared project hover shadow.
export const PROJECT_SHADOW = 'rgb(0 0 0 / 15%)'

// Theme glow colors.
export const DARK_GLOW = 'rgb(216 161 189 / 18%)'
export const LIGHT_GLOW = 'rgb(166 93 128 / 14%)'

// Cursor glow colors and shadows.
export const DARK_CURSOR_SHADOW = `0 0 8px ${DUSTY_ROSE}, 0 0 18px ${DUSTY_ROSE}`
export const DARK_INTERACTIVE_SHADOW = `0 0 8px ${SAGE}, 0 0 18px ${SAGE}`
export const LIGHT_CURSOR_SHADOW = '0 0 6px rgb(112 65 95 / 75%), 0 0 14px rgb(112 65 95 / 55%)'
export const LIGHT_INTERACTIVE_SHADOW = '0 0 6px rgb(67 85 47 / 75%), 0 0 14px rgb(67 85 47 / 55%)'

// Starfield colors are stored as RGB channels for canvas rgba values.
export const DARK_STAR = '216, 161, 189'
export const LIGHT_STAR = '116, 77, 103'

export const THEME_COLORS = {
  [THEMES.DARK]: {
    bg: NIGHT,
    surface: NIGHT_SURFACE,
    text: CLOUD,
    muted: ASH,
    line: PLUM_LINE,
    accent: DUSTY_ROSE,
    moss: SAGE,
    plum: MAUVE,
    glow: DARK_GLOW,
    cursor: DUSTY_ROSE,
    interactive: SAGE,
    shadow: PROJECT_SHADOW,
    cursorShadow: DARK_CURSOR_SHADOW,
    interactiveShadow: DARK_INTERACTIVE_SHADOW,
    moonStart: MOON_START,
    moonEnd: MOON_END,
    projectVisual: PROJECT_VISUAL,
    projectMossVisual: PROJECT_MOSS_VISUAL,
    star: DARK_STAR
  },
  [THEMES.LIGHT]: {
    bg: PORCELAIN,
    surface: IVORY,
    text: INK,
    muted: SLATE,
    line: BLUSH_LINE,
    accent: ROSE,
    moss: OLIVE,
    plum: HEATHER,
    glow: LIGHT_GLOW,
    cursor: LIGHT_CURSOR,
    interactive: LIGHT_INTERACTIVE,
    shadow: PROJECT_SHADOW,
    cursorShadow: LIGHT_CURSOR_SHADOW,
    interactiveShadow: LIGHT_INTERACTIVE_SHADOW,
    moonStart: MOON_START,
    moonEnd: MOON_END,
    projectVisual: PROJECT_VISUAL,
    projectMossVisual: PROJECT_MOSS_VISUAL,
    star: LIGHT_STAR
  }
}

export const THEME_CSS_VARIABLES = {
  bg: '--bg',
  surface: '--surface',
  text: '--text',
  muted: '--muted',
  line: '--line',
  accent: '--accent',
  moss: '--moss',
  plum: '--plum',
  glow: '--glow',
  cursor: '--cursor',
  interactive: '--interactive',
  shadow: '--shadow',
  cursorShadow: '--cursor-shadow',
  interactiveShadow: '--interactive-shadow',
  moonStart: '--moon-start',
  moonEnd: '--moon-end',
  projectVisual: '--project-visual',
  projectMossVisual: '--project-moss-visual'
}
