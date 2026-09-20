<template>
  <section class="timeline">
    <!-- The poster carries its own title, so the heading is for the document
         outline and screen readers only. -->
    <h2 class="timeline__heading">Timeline</h2>

    <img
      class="timeline__img"
      :src="timelineImage"
      width="1024"
      height="1536"
      :alt="alt"
    />
  </section>
</template>

<script setup>
import timelineImage from '../assets/timeline.png'

// The poster's schedule is baked into the artwork, so the alt text has to
// carry it in full -- keep this in step with the image if it's ever redrawn.
const alt =
  'Illustrated schedule for Saturday 12 December 2026 at Conrad Singapore ' +
  'Marina Bay. 10:30 am, tea ceremony. 11:00 am, solemnisation. 11:30 am, ' +
  'canapés and mocktails at the Pavilion Foyer. 12:00 pm, doors open.'
</script>

<style scoped lang="scss">
@use 'tokens' as *;

.timeline__heading {
  // Off-screen rather than `display: none`, which would hide it from screen
  // readers too.
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.timeline__img {
  display: block;
  width: 100%;
  // No fixed aspect-ratio or object-fit: the poster is type, and any crop or
  // squash would eat the times. The width/height attrs reserve the space.
  height: auto;
  border-radius: $radius;
}
</style>
