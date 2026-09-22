<template>
  <div class="page">
    <main class="page__main">
      <HeroSection />
      <MessageSection />
      <DetailsSection />
      <TimelineSection />
      <RsvpForm />
      <FaqSection />
    </main>

    <footer class="page__footer">
      <p class="page__monogram" aria-hidden="true">A&amp;E</p>
      <p class="page__footer-line">Ashlyn &amp; Ethan · 12 December 2026</p>
    </footer>
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
// Below $bp-sm it fills the viewport edge to edge; past that it settles into a
// centred column with the backdrop showing around it. No padding of its own:
// every section is a band of colour that runs to the edges, and carries its
// own gutter through @mixin section.
.page {
  width: 100%;
  max-width: $content-max-width;
  // Always reaches the bottom of the viewport, so a short page still reads as
  // a full-length runway rather than a floating card.
  min-height: 100dvh;
  margin: 0 auto;
  background: $color-runway;
  box-shadow: $shadow-runway;
  display: flex;
  flex-direction: column;
}

.page__main {
  display: flex;
  flex-direction: column;
  // No gap: the bands butt up against each other.
}

// Back to night at the foot, so the page closes on the colour it opened with.
.page__footer {
  // Pinned to the foot of the runway when the content doesn't fill it.
  margin-top: auto;
  padding: $space-4xl $page-padding;
  text-align: center;
  background: $color-night;
  color: $color-paper;
}

// The names reduced to their initials, in the gold of the hero's lettering.
.page__monogram {
  margin: 0 0 $space-sm;
  font-size: $font-size-lg;
  line-height: 1;
  color: $color-gold;
}

.page__footer-line {
  margin: 0;
  font-size: $font-size-sm;
  letter-spacing: 1.12px;
  opacity: 0.8;
}
</style>
