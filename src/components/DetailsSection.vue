<template>
  <section class="details" aria-labelledby="details-heading">
    <img class="details__icon" :src="walkIcon" width="202" height="112" alt="" />
    <h2 id="details-heading" class="details__heading">Location</h2>

    <p class="details__venue">Conrad Singapore<br />Marina Bay</p>

    <address class="details__address">
      The Pavilion, 4th floor<br />
      2 Temasek Blvd<br />
      Singapore 038982
    </address>

    <!-- Canonical Maps search URL: works on desktop and hands off to the native
         app on both mobile platforms. -->
    <a
      class="details__map"
      href="https://www.google.com/maps/search/?api=1&query=Conrad%20Singapore%20Marina%20Bay%2C%202%20Temasek%20Blvd%2C%20Singapore%20038982"
      target="_blank"
      rel="noopener noreferrer"
    >
      Open in Maps
      <span class="visually-hidden">(opens in a new tab)</span>
    </a>
  </section>
</template>

<script setup>
import walkIcon from '../assets/walk-icon.webp'
</script>

<style scoped lang="scss">
@use 'tokens' as *;

.details {
  @include section;
  // The photo above already hangs 17% of itself into this band, so the top
  // edge here only needs to clear the tail of its lettering.
  padding-top: 24px;
  padding-bottom: 60px;
  background: $color-sage;
}

.details__icon {
  display: block;
  width: 60px;
  height: auto;
  margin: 0 auto $space-xs;
}

.details__heading {
  @include eyebrow;
  margin: 0 0 $space-xxl;
}

// The one line most likely to be screenshotted and shown to a driver, so it
// carries the most weight in the block.
.details__venue {
  @include heading;
  margin: 0 0 $space-xl;
}

.details__address {
  // <address> is italic by default in every browser.
  font-style: normal;
  font-size: $font-size-base;
  line-height: 1.6;
  color: $color-text;
}

.details__map {
  display: inline-flex;
  align-items: center;
  // 44px so it's a comfortable touch target, not just a link.
  min-height: 44px;
  margin-top: $space-xxl;
  padding: 0 $space-3xl;
  font-size: $font-size-md;
  text-decoration: none;
  // Gold on night, like the lettering on the photos.
  color: $color-gold;
  background: $color-primary;
  border-radius: $radius;
  transition: background-color 120ms ease;

  &:hover {
    background: color-mix(in srgb, $color-primary 80%, $color-sage);
  }
}
</style>
