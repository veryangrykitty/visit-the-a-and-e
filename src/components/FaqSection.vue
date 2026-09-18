<template>
  <section class="faq">
    <h2>Questions</h2>

    <details v-for="item in faqs" :key="item.q" class="faq__item">
      <summary>{{ item.q }}</summary>
      <div class="faq__body">
        <p v-for="(line, i) in item.a" :key="i">
          <strong v-if="line.who">{{ line.who }}:</strong> {{ line.text }}
        </p>
      </div>
    </details>

    <!-- PLACEHOLDER contact numbers -->
    <p class="faq__footer">
      More questions? Ask google.
    </p>
  </section>
</template>

<script setup>
// Copy from .plans/plan.md. Entries marked PLACEHOLDER were blank there.
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
    q: 'Why did we invite you?',
    a: [
      {
        who: 'Ashlyn',
        text: "Your presence will be a gift to us.",
      },
      { who: 'Ethan', text: 'I like my friends close and my enemies closer.' },
    ],
  },
  {
    q: 'What about gifts?',
    a: [
      {
        who: 'Ashlyn',
        text: "We don't need any gifts.",
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
  border-bottom: $border-width solid $color-border;

  &:first-of-type {
    border-top: $border-width solid $color-border;
  }

  summary {
    // Generous vertical padding keeps the tap target comfortably past 44px.
    padding: $space-lg $space-xl $space-lg 0;
    font-weight: $font-weight-bold;
    cursor: pointer;
    list-style: none;
    position: relative;

    &::-webkit-details-marker {
      display: none;
    }

    &::after {
      content: '+';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: $font-size-lg;
      font-weight: 400;
      color: $color-focus;
    }
  }

  &[open] summary::after {
    content: '–';
  }
}

.faq__body {
  padding: 0 0 $space-lg;

  p {
    margin: 0 0 $space-sm;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.faq__footer {
  margin: $space-xl 0 0;
  font-size: $font-size-sm;
  text-align: center;
}
</style>
