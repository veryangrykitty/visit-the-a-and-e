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
          <span class="timeline__loc">{{ item.loc }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import timelineImage from '../assets/timeline.jpg'

const schedule = [
  { time: '10:30 am', what: 'Tea ceremony', loc: 'Lvl 2 Salon room' },
  { time: '11:00 am', what: 'Solemnisation', loc: 'Lvl 2 Salon room' },
  { time: '11:30 am', what: 'Canapés and mocktails', loc: 'Lvl 4 Pavilion Foyer' },
  { time: '12:00 pm', what: 'Doors open', loc: 'Lvl 4 Pavilion Foyer' }
]
</script>

<style scoped lang="scss">
@use 'tokens' as *;

.timeline {
  @include section;
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

.timeline__time {
  display: block;
  font-size: $font-size-base;
  font-weight: $font-weight-bold;
  // Lining so the times read as times; tabular so the four rows line up.
  font-variant-numeric: lining-nums tabular-nums;
}

.timeline__what {
  display: block;
  font-size: $font-size-base;
  color: $color-text;
  text-wrap: balance;
}

// Third line, under what it belongs to. Smaller, italic and muted against the
// full-strength event line above it, so the row reads as a hierarchy rather
// than a list. $color-muted is the floor here -- this sits over artwork, so
// anything lighter loses the contrast the poster background already eats into.
.timeline__loc {
  display: block;
  font-size: $font-size-sm;
  font-style: italic;
  color: $color-muted;
  text-wrap: balance;
}
</style>
