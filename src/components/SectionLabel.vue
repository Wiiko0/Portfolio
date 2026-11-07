<script setup>
defineProps({
  number: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="section-label">
    <span>{{ number }}</span>
    <span class="line"></span>
    <span>{{ label }}</span>
  </div>
</template>
