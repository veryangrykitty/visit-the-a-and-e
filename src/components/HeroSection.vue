<template>
  <header class="hero">
    <!-- Swap this import for your own photo; layout is unchanged. -->
    <img class="hero__img" :src="heroImage" alt="" />

    <div class="hero__caption">
      <p class="hero__eyebrow">We're getting married</p>
      <h1 class="hero__title">Ashlyn <span>&amp;</span> Ethan</h1>
      <!-- PLACEHOLDER date -- "12.12" inferred from the FAQ. -->
      <p class="hero__date">Saturday, 12 December 2026</p>
    </div>
  </header>
</template>

<script setup>
import heroImage from '../assets/hero-placeholder.svg'
</script>

<style scoped lang="scss">
@use 'tokens' as *;

.hero {
  text-align: center;
}

.hero__img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: $radius;

  @media (min-width: $bp-sm) {
    aspect-ratio: 3 / 2;
  }
}

.hero__caption {
  margin-top: $space-xl;
}

.hero__eyebrow {
  margin: 0 0 $space-xs;
  font-size: $font-size-sm;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: $color-focus;
}

.hero__title {
  margin: 0;
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  line-height: 1.15;

  span {
    font-weight: 400;
    color: $color-focus;
  }

  @media (min-width: $bp-sm) {
    font-size: $font-size-xxl;
  }
}

.hero__date {
  margin: $space-sm 0 0;
  font-size: $font-size-md;
}
</style>
