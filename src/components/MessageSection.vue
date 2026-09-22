<template>
  <!-- A plain div, not a <section>: it has no heading, and an unnamed section
       just announces as an anonymous region to a screen reader. -->
  <div class="message">
    <p class="message__lead">
      We the A&E, but there ain't no emergency.<br />
      So E took his time — call it complacency.<br />
      Now RSVP's late, gonna need some of that urgency.<br />
      So here's the diagnosis, straight from triage.<br />
      <br />
      We are getting married.<br />
      And you gonna get <strong><i>invited.</i></strong>
    </p>

    <div class="message__photo">
      <img
        :src="photo"
        width="1080"
        height="1223"
        loading="lazy"
        decoding="async"
        alt="Ethan, down on one knee, reaching for Ashlyn's hand on a hillside above a lake and snow-capped mountains. Lettering on the photograph reads: We are getting married."
      />
    </div>
  </div>
</template>

<script setup>
import photo from '../assets/photo2.webp'
</script>

<style scoped lang="scss">
@use 'tokens' as *;

.message {
  // Not @mixin section: the photo runs to the runway's edges, so only the line
  // of text above it takes a gutter.
  padding-top: $space-4xl;
  text-align: center;
  background: $color-night;
  // A soft pale green, sampled off the mock, so the one bold word below --
  // the only pure white in the band -- is what the eye lands on.
  color: $color-mist;
}

.message__lead {
  margin: 0 $page-padding $space-3xl;
  font-size: $font-size-base;
  line-height: 1.6;

  strong {
    font-weight: $font-weight-bold;
    color: #fff;
  }
}

.message__photo {
  position: relative;
  // Keeps the sage underlay's z-index: -1 inside this box, above .message's
  // own night background rather than behind it.
  isolation: isolate;

  // The Location band starts partway up the photo, so the torn bottom edge and
  // the tail of the lettering hang over the join between night and sage. 17%
  // of the image's height, measured off the mock.
  &::before {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 17%;
    background: $color-sage;
    z-index: -1;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
