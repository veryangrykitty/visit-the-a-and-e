<template>
  <div class="page">
    <HeroSection />
    <MessageSection />
    <DetailsSection />
    <RsvpForm />
    <FaqSection />

    <footer class="page__footer">Ash &amp; Ethan · 12.12.2026</footer>
  </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import MessageSection from './components/MessageSection.vue'
import DetailsSection from './components/DetailsSection.vue'
import RsvpForm from './components/RsvpForm.vue'
import FaqSection from './components/FaqSection.vue'
</script>

<style scoped lang="scss">
@use 'tokens' as *;

.page {
  width: 100%;
  max-width: $content-max-width;
  margin: 0 auto;
  // Single side gutter for the whole page, widened once there's room.
  padding: $space-xxl $page-padding;
  display: flex;
  flex-direction: column;
  gap: $section-gap;

  @media (min-width: $bp-sm) {
    padding: $section-gap $page-padding-wide;
    gap: $section-gap-wide;
  }
}

.page__footer {
  padding-top: $space-xl;
  border-top: $border-width solid $color-border;
  font-size: $font-size-sm;
  text-align: center;
  color: $color-focus;
}
</style>
