<script setup>
import { computed, nextTick, watch } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import SectionLabel from './components/SectionLabel.vue'
import Starfield from './components/Starfield.vue'
import { RESUME_FILES } from './constants/app'
import { contact, marqueeItems, projectFilters, projects, skills } from './data/portfolio'
import { useCursor } from './composables/useCursor'
import { useLanguage } from './composables/useLanguage'
import { useProjects } from './composables/useProjects'
import { useTheme } from './composables/useTheme'

const { language, text, localizedProjects, toggleLanguage } = useLanguage()
const { isLightTheme, toggleTheme } = useTheme()
const { position: cursorPosition, isVisible: isCursorVisible, isInteractive: isCursorInteractive } = useCursor()
const { activeFilter, filteredProjects, setFilter, resetFilter } = useProjects(localizedProjects)
const resumeFile = computed(() => RESUME_FILES[language.value])

function scrollToProjects() {
  document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}

async function changeProjectFilter(filter) {
  const scrollPosition = window.scrollY

  setFilter(filter)
  await nextTick()

  requestAnimationFrame(() => {
    window.scrollTo(0, scrollPosition)
  })
}

watch(localizedProjects, () => {
  resetFilter()
})
</script>

<template>
  <div class="site-shell">
    <Starfield />
    <div
      class="cursor-glow"
      :class="{
        visible: isCursorVisible,
        interactive: isCursorInteractive
      }"
      :style="{
        transform: `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0)`
      }"
      aria-hidden="true"
    ><span>✦</span></div>
    <div class="grain" aria-hidden="true"></div>
    <div class="ambient ambient-one" aria-hidden="true"></div>
    <div class="ambient ambient-two" aria-hidden="true"></div>

    <header class="nav-wrap">
      <a class="brand" href="#" :aria-label="`${text.name} home`">
        <span class="brand-mark">fv</span>
        <span>{{ text.name }}</span>
      </a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="#about">{{ text.navigation[0] }}</a>
        <a href="#work">{{ text.navigation[1] }}</a>
        <a href="#resume">{{ text.navigation[2] }}</a>
        <a href="#contact">{{ text.navigation[3] }}</a>
      </nav>
      <div class="nav-controls">
        <button
          class="language-toggle"
          type="button"
          :aria-label="`Switch to ${text.languageName}`"
          @click="toggleLanguage"
        >
          {{ text.languageLabel }}
        </button>
        <button
          class="theme-toggle"
          type="button"
          :aria-label="isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'"
          @click="toggleTheme"
        >
          <span aria-hidden="true">{{ isLightTheme ? '☾' : '☼' }}</span>
        </button>
      </div>
    </header>

    <main>
      <section class="hero section-grid">
        <div class="hero-copy reveal">
          <p class="eyebrow"><span class="spark">✦</span> {{ text.heroEyebrow }}</p>
          <h1>{{ text.heroTitle[0] }}<br /><em>{{ text.heroTitle[1] }}</em></h1>
          <p class="hero-intro">{{ text.heroIntro }}</p>
          <div class="hero-actions">
            <button class="button button-primary" type="button" @click="scrollToProjects">
              {{ text.seeWork }} <span aria-hidden="true">↘</span>
            </button>
            <a class="text-link" href="#contact" @click.prevent="scrollToContact">
              {{ text.letsTalk }} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div class="hero-art reveal delay-one" aria-label="Decorative moon illustration">
          <div class="moon"><span aria-hidden="true">✦</span></div>
          <div class="orbit orbit-one"></div>
          <div class="orbit orbit-two"></div>
        </div>
      </section>

      <div class="marquee" aria-label="Skills">
        <div class="marquee-track">
          <template v-for="(item, index) in marqueeItems" :key="`${item}-${index}`">
            <span>{{ item }}</span>
            <i aria-hidden="true">✦</i>
          </template>
        </div>
      </div>

      <section id="about" class="about section-grid">
        <SectionLabel number="01" :label="text.aboutLabel" />
        <div class="about-content">
          <p class="section-kicker">{{ text.aboutKicker }}</p>
          <h2>{{ text.aboutTitle[0] }}<br /><em>{{ text.aboutTitle[1] }}</em></h2>
          <p class="body-copy">{{ text.aboutBody }}</p>
          <div class="info-row">
            <div><span class="info-label">{{ text.basedIn }}</span><strong>{{ text.location }}</strong></div>
            <div><span class="info-label">{{ text.openTo }}</span><strong>{{ text.collaboration }}</strong></div>
          </div>
        </div>
      </section>

      <section id="work" class="work section-grid">
        <SectionLabel number="02" :label="text.workLabel" />
        <div class="work-content">
          <div class="work-heading">
            <div>
              <p class="section-kicker">{{ text.workKicker }}</p>
              <h2>{{ text.workTitle[0] }} <em>{{ text.workTitle[1] }}</em></h2>
            </div>
            <span class="project-count">{{ filteredProjects.length.toString().padStart(2, '0') }} / {{ projects.length.toString().padStart(2, '0') }}</span>
          </div>
          <div class="filters" aria-label="Filter projects">
            <button
              v-for="(filter, index) in projectFilters"
              :key="filter"
              :class="{ active: activeFilter === filter }"
              type="button"
              @click="changeProjectFilter(filter)"
            >
              {{ text.filters[index] }}
            </button>
          </div>
          <div class="project-list">
            <ProjectCard
              v-for="(project, index) in filteredProjects"
              :key="project.title"
              :project="project"
              :index="index"
            />
          </div>
          <a class="github-link" :href="contact.github" target="_blank" rel="noreferrer">
            {{ text.moreGithub }} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section id="resume" class="resume section-grid">
        <SectionLabel number="03" :label="text.resumeLabel" />
        <div class="resume-content">
          <div class="resume-heading">
            <div>
              <p class="section-kicker">{{ text.resumeKicker }}</p>
              <h2>{{ text.resumeTitle[0] }}<br /><em>{{ text.resumeTitle[1] }}</em></h2>
            </div>
            <a class="button button-primary resume-button" :href="resumeFile" download>
              {{ text.downloadCv }} <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div class="resume-grid">
            <div class="resume-column">
              <p class="resume-label">{{ text.experience }}</p>
              <div class="resume-item">
                <strong>{{ text.genesysRole }}</strong>
                <span>Genesys · {{ text.current }}</span>
                <p>{{ text.genesysDescription }}</p>
              </div>
              <div class="resume-item">
                <strong>{{ text.logiscoolRole }}</strong>
                <span>2023</span>
                <p>{{ text.logiscoolDescription }}</p>
              </div>
            </div>
            <div class="resume-column">
              <p class="resume-label">{{ text.education }}</p>
              <div class="resume-item">
                <strong>{{ text.university }}</strong>
                <span>{{ text.studying }}</span>
                <p>{{ text.educationDescription }}</p>
              </div>
              <p class="resume-label second-label">{{ text.languages }}</p>
              <div class="language-list">
                <span>{{ text.english }}</span>
                <span>{{ text.hungarian }}</span>
              </div>
            </div>
          </div>
          <p class="resume-label skills-label">{{ text.skillsLabel }}</p>
          <div class="skill-cloud">
            <span v-for="skill in skills" :key="skill">{{ skill }}</span>
          </div>
          <p class="resume-note">{{ text.interests }}</p>
        </div>
      </section>

      <section id="contact" class="contact section-grid">
        <SectionLabel number="04" :label="text.contactLabel" />
        <div class="contact-content">
          <p class="section-kicker">{{ text.contactKicker }}</p>
          <h2>{{ text.contactTitle[0] }}<br /><em>{{ text.contactTitle[1] }}</em></h2>
          <a class="email-link" :href="`mailto:${contact.email}`">
            {{ contact.email }} <span aria-hidden="true">↗</span>
          </a>
          <div class="socials">
            <a :href="contact.github" target="_blank" rel="noreferrer">GitHub</a>
            <a :href="contact.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <span>© 2026 {{ text.name }}</span>
      <span>{{ text.footer }} <b aria-hidden="true">✦</b></span>
    </footer>
  </div>
</template>
