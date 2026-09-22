<template>
  <section class="timeline" aria-labelledby="timeline-heading">
    <!-- Decorative flourishes throughout: none of them carries information
         the text doesn't already. -->
    <img
      class="timeline__flowers"
      :src="flowersImage"
      width="1024"
      height="281"
      alt=""
      loading="lazy"
      decoding="async"
    />

    <img class="timeline__icon" :src="clockIcon" width="102" height="103" alt="" />
    <h2 id="timeline-heading" class="timeline__heading">Timeline</h2>

    <div class="timeline__frame">
      <img
        class="timeline__img"
        :src="timelineImage"
        width="482"
        height="1342"
        alt=""
        loading="lazy"
        decoding="async"
      />

      <ol class="timeline__list">
        <li v-for="item in schedule" :key="item.time" class="timeline__item">
          <span class="timeline__time">{{ item.time }}</span>
          <span class="timeline__what">{{ item.what }}</span>
          <span v-if="item.loc" class="timeline__loc">{{ item.loc }}</span>
        </li>
      </ol>
    </div>

    <img
      class="timeline__married"
      :src="marriedImage"
      width="365"
      height="246"
      alt=""
      loading="lazy"
      decoding="async"
    />

    <img
      class="timeline__flowers timeline__flowers--bottom"
      :src="flowersImage"
      width="1024"
      height="281"
      alt=""
      loading="lazy"
      decoding="async"
    />
  </section>
</template>

<script setup>
import flowersImage from '../assets/flower-top.webp'
import clockIcon from '../assets/clock.webp'
import timelineImage from '../assets/timeline2.webp'
import marriedImage from '../assets/married.webp'

const schedule = [
  { time: '10:30 am', what: 'Tea ceremony', loc: 'Lvl 2 Salon room' },
  { time: '11:00 am', what: 'Solemnisation', loc: 'Lvl 2 Salon room' },
  { time: '11:30 am', what: 'Canapés and mocktails', loc: 'Lvl 4 Pavilion Foyer' },
  { time: '12:00 pm', what: 'Doors open', loc: 'Lvl 4 Pavilion Foyer' },
  { time: '12:30 pm', what: 'Lunch is served' },
]
</script>

<style scoped lang="scss">
@use 'tokens' as *;

// The space either side of the dashed line: artwork to line, line to text.
$timeline-gap: $space-lg;

.timeline {
  @include section;
  position: relative;
  background: $color-paper;
  // Crops the sprays where they run past the sides. `clip`, not `hidden`:
  // hidden on one axis forces the other to scroll, which would also cut off
  // the blossoms spilling into the bands above and below.
  overflow-x: clip;
}

// Two corner sprays across the top of the band. Lifted 20% of their own height
// so the blossoms spill over the edge into the sage above, as in the mock, and
// widened past the band so the sides crop their outer edges.
.timeline__flowers {
  position: absolute;
  top: 0;
  left: -4%;
  width: 108%;
  // The global `img { max-width: 100% }` would cap this back at the band's
  // width, and the -8% would then crop only the left side.
  max-width: none;
  height: auto;
  transform: translateY(-20%);
  pointer-events: none;
  // drop-shadow, not box-shadow: it follows the petals through the webp's
  // alpha instead of boxing the whole image. Light and night-tinted, just
  // enough to lift the sprays off the band.
  filter: drop-shadow(0 3px 5px rgba($color-night, 0.4));

  // The same sprays mirrored top-to-bottom for the lower corners, spilling
  // down into the RSVP band by the same 20%.
  &--bottom {
    top: auto;
    bottom: 0;
    transform: translateY(20%) scaleY(-1);
    // The filter is drawn before the flip, so a downward shadow would end up
    // pointing up. Cast it up here and the flip puts it back underneath.
    filter: drop-shadow(0 -3px 5px rgba($color-night, 0.2));
  }
}

.timeline__icon {
  // Above the sprays' transparent middle, which would otherwise sit over it.
  position: relative;
  display: block;
  width: 28px;
  height: auto;
  margin: $space-xs auto $space-xs;
}

.timeline__heading {
  @include eyebrow;
  position: relative;
  margin: 0 0 $space-xxl;
}

.timeline__frame {
  position: relative;
  max-width: 420px;
  margin: 0 auto;
  text-align: left;
}

.timeline__img {
  display: block;
  width: 44%;
  margin-left: 4%;
  // Natural aspect ratio (no crop): the list's rows depend on it.
  height: auto;
}

.timeline__list {
  margin: 0;
  padding: 0;
  list-style: none;
  // Five equal rows laid over the illustrations. Their centres sit at roughly
  // 11%, 30%, 48%, 67% and 88% of the artwork's height -- evenly spaced about
  // 19% apart -- so rows starting 1.6% down and spanning 96% land on each one.
  position: absolute;
  top: 1.6%;
  height: 96%;
  // Starts where the illustrations visibly end. The image box runs to 48%,
  // but the drawings stop ~93% of the way across the file (only faint buds go
  // further), which lands at 4% + 44% x 0.93 = ~45% of the frame. The line
  // then sits $timeline-gap in from here, and the text the same again past it.
  left: 45%;
  right: 0;
  display: grid;
  grid-template-rows: repeat(5, 1fr);

  // The dashed line, running from the first dot to the last. Five equal rows,
  // so the first and last row centres sit 10% in from each end. A gradient
  // rather than a dashed border, so the dash and gap lengths are set here
  // instead of left to the browser.
  &::before {
    content: '';
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: $timeline-gap;
    width: 1px;
    transform: translateX(-50%);
    background: repeating-linear-gradient(
      to bottom,
      rgba($color-olive, 0.5) 0 4px,
      transparent 4px 8px
    );
  }
}

.timeline__item {
  position: relative;
  align-self: center;
  padding-left: calc(2 * #{$timeline-gap} + $space-xs);
  line-height: 1.3;

  // One dot per point, centred on the row (and so on its illustration). The
  // paper ring cuts the dashes either side, so the dot sits on the line
  // rather than having it run through it.
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: $timeline-gap;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: $color-olive;
    box-shadow: 0 0 0 3px $color-paper;
    transform: translate(-50%, -50%);
  }
}

.timeline__time {
  display: block;
  font-size: $font-size-base;
  font-weight: $font-weight-bold;
  // Lining so the times read as times; tabular so the rows line up.
  font-variant-numeric: lining-nums tabular-nums;
  color: $color-accent-ink;
}

.timeline__what {
  display: block;
  font-size: $font-size-base;
  font-weight: $font-weight-bold;
  color: $color-text;
  text-wrap: balance;
}

.timeline__loc {
  display: block;
  font-size: $font-size-sm;
  font-style: italic;
  color: $color-muted;
  text-wrap: balance;
}

.timeline__married {
  display: block;
  width: 32%;
  max-width: 200px;
  height: auto;
  margin: $space-xxl auto 0;
}
</style>
