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
      <p class="page__monogram" aria-hidden="true">A <span>&amp;</span> E</p>
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
// Below $bp-sm it fills the viewport edge to edge (no backdrop is visible, so
// the shadow costs nothing and the content keeps the full width); past that it
// settles into a centred column with the backdrop showing around it.
.page {
  width: 100%;
  max-width: $content-max-width;
  // Always reaches the bottom of the viewport, so a short page still reads as
  // a full-length runway rather than a floating card.
  min-height: 100dvh;
  margin: 0 auto;
  background: $color-runway;
  box-shadow: $shadow-runway;
  // Single side gutter for the whole page, widened once there's room.
  padding: $space-xxl $page-padding;
  display: flex;
  flex-direction: column;

  @include desktop {
    padding: $section-gap $page-padding-wide;
  }
}

.page__main {
  display: flex;
  flex-direction: column;
  gap: $section-gap;

  @include desktop {
    gap: $section-gap-wide;
  }
}

.page__footer {
  // Pinned to the foot of the runway when the content doesn't fill it.
  margin-top: auto;
  padding-top: $section-gap;
  text-align: center;
}

// The names reduced to their initials -- a close on the page that echoes the
// hero's ampersand without repeating the whole title a third time.
.page__monogram {
  margin: 0 0 $space-sm;
  font-size: $font-size-lg;
  line-height: 1;
  color: $color-text;

  span {
    color: $color-ink-blue;
  }
}

.page__footer-line {
  margin: 0;
  font-size: $font-size-sm;
  letter-spacing: 1.12px;
  color: $color-muted;
}
</style>
