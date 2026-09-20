<template>
  <header class="hero">
    <div class="hero__caption">
      <p class="hero__eyebrow">We're getting married</p>
      <h1 class="hero__title">Ashlyn <span class="hero__amp">&amp;</span> Ethan</h1>
      <p class="hero__date"><span>Saturday, 12 December 2026</span></p>
    </div>

    <!-- Intrinsic size given so the runway doesn't reflow as it decodes. The
         artwork carries its own lettering, so the alt text quotes it. -->
    <img
      class="hero__img"
      :src="heroImage"
      width="2016"
      height="1314"
      alt="Ethan reaching out to touch Ashlyn's hand across a hillside above a lake, posed after Michelangelo's Creation of Adam. Lettering on the photograph reads: Save the date — Ethan, 2026.12.12, Ashlyn."
    />
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

.hero__caption {
  // The caption leads; the artwork follows it.
  margin-bottom: $space-3xl;
}

.hero__eyebrow {
  margin: 0 0 $space-lg;
  font-size: $font-size-xs;
  letter-spacing: $tracking-eyebrow;
  // Tracked uppercase needs the indent back or it reads off-centre.
  text-indent: $tracking-eyebrow;
  text-transform: uppercase;
  color: $color-ink-blue;
}

.hero__title {
  margin: 0;
  font-size: $font-size-display;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
  letter-spacing: $tracking-display;
  // Keeps "Ashlyn & Ethan" from ever splitting one name across two lines.
  text-wrap: balance;
}

// Set loose and light against the bold names, the way an engraved invitation
// treats the ampersand -- a joining mark, not a third word.
.hero__amp {
  display: inline-block;
  padding: 0 0.08em;
  font-size: 0.78em;
  font-weight: $font-weight-base;
  color: $color-ink-blue;
}

// Hairline rules flanking the date. They're drawn as flex children so they take
// whatever width is left over and the date stays centred at any viewport.
.hero__date {
  display: flex;
  align-items: center;
  gap: $space-lg;
  margin: $space-xl 0 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: $border-width;
    background: $color-rule;
  }

  span {
    flex: 0 1 auto;
    font-size: $font-size-sm;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    // Cormorant defaults to oldstyle figures, where 0 and 2 drop below the
    // baseline. Next to capitals they read as a mistake, so this asks for the
    // lining set instead.
    font-variant-numeric: lining-nums;
    color: $color-muted;
  }
}

.hero__img {
  display: block;
  // Sits inside the runway's gutter, so it lines up with the caption above it.
  width: 100%;
  // Natural ratio, no crop. A fixed `aspect-ratio` + `object-fit: cover` cut the
  // photograph's own "Save the date" lettering off both edges on phones -- this
  // artwork was composed with text in it and can't be re-cropped.
  height: auto;
  border-radius: $radius-lg;
}
</style>
