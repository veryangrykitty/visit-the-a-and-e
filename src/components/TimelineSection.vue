<template>
  <section class="timeline" aria-labelledby="timeline-heading">
    <h2 id="timeline-heading" class="timeline__heading">When</h2>

    <div class="timeline__frame">
      <!-- Decorative: every time and label in the poster is already in the list
           overlaid on it, so alt text here would just repeat them. -->
      <img
        class="timeline__img"
        :src="timelineImage"
        width="864"
        height="1244"
        alt=""
        loading="lazy"
        decoding="async"
      />

      <ol class="timeline__list">
        <li v-for="item in schedule" :key="item.time" class="timeline__item">
          <span class="timeline__time">{{ item.time }}</span>
          <span class="timeline__what">{{ item.what }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import timelineImage from '../assets/timeline.png'

const schedule = [
  { time: '10:30 am', what: 'Tea ceremony' },
  { time: '11:00 am', what: 'Solemnisation' },
  { time: '11:30 am', what: 'Canapés and mocktails at the Pavilion Foyer' },
  { time: '12:20 pm', what: 'Lunch is served' },
]
</script>

<style scoped lang="scss">
@use 'tokens' as *;

.timeline {
  text-align: center;
}

.timeline__heading {
  @include eyebrow;
  margin: 0 0 $space-xl;
}

.timeline__frame {
  position: relative;
  // Fills the runway on phones, capped at 70% of its widest content width so desktop keeps 70%.
  width: 100%;
  max-width: ($content-max-width - 2 * $page-padding-wide) * 0.7;
  margin: 0 auto;
  text-align: left;
  // Lets the overlaid type size itself against the poster rather than the
  // viewport -- see .timeline__time.
  container-type: inline-size;
}

.timeline__img {
  display: block;
  width: 100%;
  // Natural aspect ratio (no crop): the list's percentages depend on it.
  height: auto;
}

.timeline__list {
  margin: 0;
  padding: 0;
  list-style: none;
  // Four equal rows centred on the first four icons, which sit at 13.3%, 31.8%,
  // 49.8% and 70.7% of the poster's height -- this lands each within 1.2% of its
  // icon. (The fifth illustration is the "We're married" flourish and has no
  // schedule entry, so the rows stop above it.)
  position: absolute;
  top: 3%;
  left: 0;
  right: 0;
  height: 76.9%;
  display: grid;
  grid-auto-rows: 1fr;
}

.timeline__item {
  align-self: center;
  // The icons end ~47% across; start the text just clear of them.
  margin-left: 56%;
  width: 44%;
  line-height: 1.3;
}

// Sized in cqw -- percentages of the poster's own width -- so the text shrinks
// with the artwork it sits on. Fixed px here would overflow its row as soon as
// the frame narrowed or the font fell back to Georgia, which is wider.
.timeline__time {
  display: block;
  font-size: clamp(11px, 4.2cqw, #{$font-size-base});
  font-weight: $font-weight-bold;
  // Lining so the times read as times; tabular so the four rows line up.
  font-variant-numeric: lining-nums tabular-nums;
}

.timeline__what {
  display: block;
  font-size: clamp(10px, 3.6cqw, #{$font-size-sm});
  color: $color-muted;
  text-wrap: balance;
}
</style>
