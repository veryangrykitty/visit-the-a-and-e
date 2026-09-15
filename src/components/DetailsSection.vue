<template>
  <section class="details">
    <h2>The day</h2>

    <dl class="details__meta">
      <div>
        <dt>When</dt>
        <!-- PLACEHOLDER date -->
        <dd>Saturday, 12 December 2026</dd>
      </div>
      <div>
        <dt>Where</dt>
        <!-- PLACEHOLDER venue address -->
        <dd>
          Conrad Singapore Marina Bay<br />
          The Pavilion, 4th floor by the pool<br />
          2 Temasek Blvd<br />
          Singapore 038982
        </dd>
      </div>
    </dl>

    <h3>Timeline</h3>
    <ol class="timeline">
      <li v-for="item in timeline" :key="item.time">
        <span class="timeline__time">{{ item.time }}</span>
        <span class="timeline__what">{{ item.what }}</span>
      </li>
    </ol>
  </section>
</template>

<script setup>
// Times are from the FAQ; the 1:00pm entry is a PLACEHOLDER.
const timeline = [
  { time: '11:30 am', what: 'Canapés and mocktails at the Pavilion Foyer' },
  { time: '12:00 pm', what: 'Doors open' },
  { time: '12:20 pm', what: 'Lunch is served' },
  { time: '3:30 pm', what: 'We set you free' },
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

.details__meta {
  margin: 0;

  > div {
    padding: $space-md 0;
    border-bottom: $border-width solid $color-border;

    &:first-child {
      border-top: $border-width solid $color-border;
    }
  }

  dt {
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    color: $color-focus;
  }

  dd {
    margin: $space-xxs 0 0;
  }

  // Side-by-side once there's room; stacked on phones.
  @media (min-width: $bp-sm) {
    > div {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: $space-lg;
    }

    dd {
      margin-top: 0;
    }
  }
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
