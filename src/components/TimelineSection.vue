<template>
  <section class="timeline">
    <h2 class="timeline__heading">Timeline</h2>

    <div class="timeline__frame">
      <img
        class="timeline__img"
        :src="timelineImage"
        width="864"
        height="1244"
        alt=""
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

.timeline__heading {
  // Visually hidden but still read by screen readers (display: none would hide it from them too).
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.timeline__frame {
  position: relative;
  // Fills the runway on phones, capped at 70% of its widest content width so desktop keeps 70%.
  width: 100%;
  max-width: ($content-max-width - 2 * $page-padding-wide) * 0.7;
  margin: 0 auto;
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
  // Four equal rows (~19.2% pitch) centred on the icons, which sit at 14.1% to 71.8% of the poster's height.
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
  font-variant-numeric: tabular-nums;
}

.timeline__what {
  display: block;
  font-size: $font-size-sm;
  text-wrap: balance;
}
</style>
