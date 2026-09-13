<script setup>
import RsvpForm from './components/RsvpForm.vue'
</script>

<template>
  <main class="card">
    <h1>Wedding RSVP</h1>
    <RsvpForm />
  </main>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 26rem;
}
h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem;
}
</style>
