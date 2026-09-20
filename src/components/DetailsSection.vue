<template>
  <section class="details" aria-labelledby="details-heading">
    <h2 id="details-heading" class="details__heading">Where</h2>

    <p class="details__venue">Conrad Singapore Marina Bay</p>

    <address class="details__address">
      The Pavilion, 4th floor by the pool<br />
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
      <span class="details__map-hint">(opens in a new tab)</span>
    </a>
  </section>
</template>

<style scoped lang="scss">
@use 'tokens' as *;

.details {
  text-align: center;
  // Hairlines rather than a filled card: the venue is something you read, and
  // the RSVP panel below is the only block on the page that should look
  // interactive.
  padding: $space-3xl 0;
  border-top: $border-width solid $color-rule;
  border-bottom: $border-width solid $color-rule;
}

.details__heading {
  @include eyebrow;
  margin: 0 0 $space-lg;
}

// The one line most likely to be screenshotted and shown to a driver, so it
// carries the most weight in the block.
.details__venue {
  margin: 0 0 $space-sm;
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  line-height: 1.2;
  text-wrap: balance;
}

.details__address {
  // <address> is italic by default in every browser, and no italic face is
  // loaded -- left alone it would render as a synthesised oblique.
  font-style: normal;
  font-size: $font-size-md;
  line-height: 1.6;
  color: $color-muted;
}

.details__map {
  display: inline-flex;
  align-items: center;
  // 44px so it's a comfortable touch target, not just a link.
  min-height: 44px;
  margin-top: $space-xl;
  padding: 0 $space-xl;
  font-size: $font-size-sm;
  font-weight: $font-weight-bold;
  letter-spacing: 0.84px;
  text-transform: uppercase;
  text-decoration: none;
  color: $color-ink-blue;
  border: $border-width solid $color-border;
  border-radius: $radius;
  transition: background-color 120ms ease, border-color 120ms ease;

  &:hover {
    background: $color-panel;
    border-color: $color-ink-blue;
  }
}

// Warns screen reader users about the new tab without cluttering the button.
.details__map-hint {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
