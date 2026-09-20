<template>
  <div class="page">
    <HeroSection />
    <MessageSection />
    <DetailsSection />
    <TimelineSection />
    <RsvpForm />
    <FaqSection />

    <footer class="page__footer">Ashlyn &amp; Ethan · 12.12.2026</footer>
  </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import MessageSection from './components/MessageSection.vue'
import DetailsSection from './components/DetailsSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import RsvpForm from './components/RsvpForm.vue'
import FaqSection from './components/FaqSection.vue'
</script>

<style scoped lang="scss">
@use 'tokens' as *;

// The runway: a centre column carrying every section, lifted off the backdrop.
// Below $bp-sm it fills the viewport edge to edge (no backdrop is visible, so
// the shadow costs nothing and the content keeps the full width); past that it
// settles into a centred column with the backdrop showing around it.
.page {
  width: 100%;
  max-width: $content-max-width;
  // Always reaches the bottom of the viewport, so a short page still reads as
  // a full-length runway rather than a floating card.
  min-height: 100vh;
  margin: 0 auto;
  background: $color-runway;
  box-shadow: $shadow-runway;
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
  // Pinned to the foot of the runway when the content doesn't fill it.
  margin-top: auto;
  padding-top: $space-xl;
  border-top: $border-width solid $color-border;
  font-size: $font-size-sm;
  text-align: center;
  color: $color-focus;
}
</style>
