<template>
  <section class="faq" aria-labelledby="faq-heading">
    <h2 id="faq-heading" class="faq__heading">Questions</h2>

    <div v-for="item in faqs" :key="item.q" class="faq__item">
      <h3 class="faq__q">{{ item.q }}</h3>
      <div class="faq__body">
        <p v-for="(line, i) in item.a" :key="i" :class="['faq__a', { 'faq__a--voiced': line.who }]">
          <strong v-if="line.who" class="faq__who">{{ line.who }}</strong>
          <span class="faq__text">{{ line.text }}</span>
        </p>
      </div>
    </div>

    <p class="faq__footer faq__item">
      More questions? Ask google yourself.
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
      { who: 'Ethan', text: "It's 12.12 go buy yourself something on Shopee." },
    ],
  },
]
</script>

<style scoped lang="scss">
@use 'tokens' as *;

.faq {
  // A left-aligned list; the heading centres itself below.
  @include section(left);
}

.faq__heading {
  margin: 0 0 $space-xl;
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  line-height: 1.1;
  text-align: center;
}

.faq__item {
  // Every item carries its own rule and breathing room, so the rhythm holds
  // however many there are -- no first/last special cases.
  padding: $space-xxl 0;
  border-top: $border-width solid $color-rule;
}

.faq__q {
  margin: 0 0 $space-md;
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  text-wrap: balance;
}

.faq__a {
  margin: 0 0 $space-sm;
  // The parking answer carries a hard newline in its string.
  white-space: pre-line;
  color: $color-muted;

  &:last-child {
    margin-bottom: 0;
  }
}

// Half this section is the two of you answering the same question differently,
// so the answers that have a speaker are set as an exchange: name in the accent
// voice, indented off a rule, rather than a bold run-in on one grey paragraph.
.faq__a--voiced {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0 $space-md;
  align-items: baseline;
  margin-bottom: $space-md;
  padding-left: $space-md;
  border-left: 2px solid $color-rule;
}

.faq__who {
  font-size: $font-size-sm;
  font-weight: $font-weight-bold;
  letter-spacing: 0.56px;
  color: $color-ink-blue;
  // Holds the two names to the same column width so their answers line up.
  // Wide enough for "Ashlyn", the longer of them.
  min-width: 6.5ch;
}

.faq__text {
  color: $color-muted;
}

.faq__footer {
  // No margin of its own -- the last item's bottom padding already sets the
  // gap, and doubling them left a 44px void with no rule to justify it.
  margin: 0;
  font-size: $font-size-sm;
  text-align: center;
  color: $color-muted;
}
</style>
