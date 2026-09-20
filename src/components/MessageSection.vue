<template>
  <!-- A plain div, not a <section>: it has no heading, and an unnamed section
       just announces as an anonymous region to a screen reader. -->
  <div class="message">
    <p class="message__lead">
      We'd love for you to be there when we say our vows. It'll be a short
      ceremony, a long lunch, and the people we like most in one room.
    </p>
    <p class="message__close">Come hungry. Stay a while.</p>
  </div>
</template>

<style scoped lang="scss">
@use 'tokens' as *;

.message {
  @include section;
  // ~46 characters a line. Centred text gets hard to track back from much past
  // this, and the runway is wider than the prose wants to be.
  max-width: 34ch;
  margin-inline: auto;
}

.message__lead {
  margin: 0;
  font-size: $font-size-md;
  line-height: 1.65;
  text-wrap: pretty;
}

// The sign-off, set apart and in the accent voice so the block has a close
// rather than just stopping.
.message__close {
  margin: $space-xl 0 0;
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $color-ink-blue;
}
</style>
