<template>
  <section class="faq">
    <h2>FAQ</h2>

    <div v-for="item in faqs" :key="item.q" class="faq__item">
      <h3 class="faq__q">{{ item.q }}</h3>
      <div class="faq__body">
        <p v-for="(line, i) in item.a" :key="i">
          <strong v-if="line.who">{{ line.who }}:</strong> {{ line.text }}
        </p>
      </div>
    </div>

    <p class="faq__footer faq__item">
      More questions? Ask google.
    </p>
  </section>
</template>

<script setup>
const faqs = [
  {
    q: 'When should I arrive?',
    a: [
      {
        who: '',
        text: 'Come by at 11:30am for canapés and mocktails at the Pavilion Foyer. Doors open at 12:00pm.',
      },
    ],
  },
  {
    q: 'Is there parking?',
    a: [
      {
        who: '',
        text: "Yes, there are complimentary coupons at the reception table while they last.\nIf you're planning to drink with us, a friendly-neighbourhood-private-hire-driver would love to get you home safely.",
      },
    ],
  },
  {
    q: 'What should I wear?',
    a: [
      { who: 'Ashlyn', text: "Surprise us. Just don't come naked." },
      { who: 'Ethan', text: 'Delight us. Come naked.' },
    ],
  },
  {
    q: 'I have a dietary requirement.',
    a: [
      {
        who: '',
        text: "Let us know in the RSVP form and we'll follow up with you directly.",
      },
    ],
  },
  {
    q: 'What about gifts?',
    a: [
      {
        who: 'Ashlyn',
        text: "Just come, eat well, and enjoy the day with us.",
      },
      { who: 'Ethan', text: 'Could use a lamborghini.' },
    ],
  },
  {
    q: 'When does it end?',
    a: [
      { who: 'Ashlyn', text: "We'll set you free by 3:30 pm." },
      { who: 'Ethan', text: "When I get my lamborghini." },
    ],
  },
  {
    q: 'What if I get bored?',
    a: [
      { who: 'Ethan', text: "It's 12.12 — go buy yourself something on Shopee." },
    ],
  },
]
</script>

<style scoped lang="scss">
@use 'tokens' as *;

h2 {
  margin: 0 0 $space-lg;
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
}

.faq__item {
  // Every item carries its own rule and breathing room, so the rhythm holds
  // however many there are -- no first/last special cases.
  padding: $space-xxl 0;
  border-top: $border-width solid $color-border;
}

.faq__q {
  margin: 0 0 $space-sm;
  font-size: $font-size-base;
  font-weight: $font-weight-bold;
}

.faq__body {
  p {
    margin: 0 0 $space-sm;
    white-space: pre-line;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.faq__footer {
  // No margin of its own -- the last item's bottom padding already sets the
  // gap, and doubling them left a 44px void with no rule to justify it.
  margin: 0;
  font-size: $font-size-sm;
  text-align: center;
}
</style>
