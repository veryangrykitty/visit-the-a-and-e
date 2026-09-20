<template>
  <section class="message">
    <p>
      We'd love for you to be there when we say our vows. It'll be a short
      ceremony, a long lunch, and the people we like most in one room.
    </p>
    <p>Come hungry. Stay a while.</p>
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
@use 'tokens' as *;

.message {
  text-align: center;
  font-size: $font-size-md;

  p {
    margin: 0 0 $space-lg;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
