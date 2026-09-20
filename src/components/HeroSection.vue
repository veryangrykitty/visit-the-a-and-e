<template>
  <header class="hero">
    <div class="hero__caption">
      <p class="hero__eyebrow">We're getting married</p>
      <h1 class="hero__title">Ashlyn <span>&amp;</span> Ethan</h1>
      <p class="hero__date">Saturday, 12 December 2026</p>
    </div>

    <img class="hero__img" :src="heroImage" alt="" />
  </header>
</template>

<script setup>
import heroImage from '../assets/creation_of_a&e.jpg'
</script>

<style scoped lang="scss">
@use 'tokens' as *;

.hero {
  text-align: center;
}

.hero__img {
  display: block;
  // Sits inside the runway's gutter, so it lines up with the caption below it.
  width: 100%;
  height: auto;
  // Fixed ratio keeps the runway from reflowing as the image decodes; the crop
  // goes taller on phones where there's height to spare and width is scarce.
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
