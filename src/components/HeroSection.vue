<template>
  <header class="hero">
    <!-- The names and date are lettered onto the photograph, so the real
         heading is here for screen readers and search, and the alt text only
         describes the picture rather than reading the lettering out twice. -->
    <h1 class="visually-hidden">Ashlyn &amp; Ethan · 12 December 2026</h1>
    <img
      class="hero__img"
      :src="heroImage"
      width="1080"
      height="1500"
      fetchpriority="high"
      alt="Ashlyn, in a long veil, walking hand in hand with Ethan across a lawn beside a mountain lake."
    />
  </header>
</template>

<script setup>
import heroImage from '../assets/hero.webp'
</script>

<style scoped lang="scss">
@use 'tokens' as *;

.hero {
  position: relative;
  background: $color-night;

  // The photograph ends on grass; the mock melts that last strip into the
  // night band below instead of cutting to it.
  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 6%;
    // background: linear-gradient(to bottom, rgba($color-night, 0), $color-night);
    pointer-events: none;
  }
}

.hero__img {
  display: block;
  width: 100%;
  // Height follows the artwork's proportions -- nothing is cut off.
  height: auto;
}
</style>
