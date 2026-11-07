<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <a
    class="project-card"
    :class="project.accent"
    :href="project.link"
    target="_blank"
    rel="noreferrer"
  >
    <div class="project-number">0{{ index + 1 }}</div>
    <div class="project-visual">
      <span aria-hidden="true">{{ project.icon }}</span>
      <div class="visual-grid"></div>
    </div>
    <div class="project-details">
      <p class="project-type">{{ project.type }}</p>
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      <div class="tag-list">
        <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
      </div>
    </div>
    <span class="project-arrow" aria-hidden="true">↗</span>
  </a>
</template>
