<template>
  <section class="details">
    <div class="address">
      Conrad Singapore Marina Bay<br />
      The Pavilion, 4th floor by the pool<br />
      2 Temasek Blvd<br />
      Singapore 038982
    </div>

    <h3>Timeline</h3>
    <h2>For the folks</h2>
    <ol class="timeline">
      <li v-for="item in folksTimeline" :key="item.time">
        <span class="timeline__time">{{ item.time }}</span>
        <span class="timeline__what">{{ item.what }}</span>
      </li>
    </ol>
    <h2>For the normies</h2>
    <ol class="timeline">
      <li v-for="item in normalTimeline" :key="item.time">
        <span class="timeline__time">{{ item.time }}</span>
        <span class="timeline__what">{{ item.what }}</span>
      </li>
    </ol>
  </section>
</template>

<script setup>
const folksTimeline = [
  { time: '10:30 am', what: 'Tea ceremony' },
  { time: '11:00 am', what: 'Solemnisation' },
]
const normalTimeline = [
  { time: '11:30 am', what: 'Canapés and mocktails at the Pavilion Foyer' },
  { time: '12:20 pm', what: 'Lunch is served' }
]
</script>

<style scoped lang="scss">
@use 'tokens' as *;

h2 {
  margin: 0 0 $space-xl;
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
}

h3 {
  margin: $space-xxl 0 $space-md;
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
}

.address {
  text-align: center;
  margin: 0 0 $space-xl;
  font-size: $font-size-md;
  line-height: 1.5;
}

.timeline {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: grid;
    grid-template-columns: 92px 1fr;
    gap: $space-md;
    padding: $space-sm 0;
  }
}

.timeline__time {
  font-weight: $font-weight-bold;
  font-variant-numeric: tabular-nums;
}
</style>
