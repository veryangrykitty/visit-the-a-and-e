<template>
  <section class="rsvp" aria-labelledby="rsvp-heading">
    <p class="rsvp__eyebrow" aria-hidden="true">The important bit</p>
    <h2 id="rsvp-heading" class="rsvp__heading">RSVP</h2>

    <div class="rsvp__card">
      <form v-if="!done" class="rsvp__form" @submit.prevent="submit">
        <!-- Three groups rather than nine stacked fields: the form reads as three
             short questions, and each fieldset gives its controls a real name. -->
        <fieldset class="group">
          <legend class="group__legend">Who's coming</legend>

          <div class="field">
            <label class="field__label" for="name">
              Your name <span class="field__req">required</span>
            </label>
            <input id="name" v-model.trim="name" type="text" autocomplete="name" required />
          </div>

          <div class="field">
            <span class="field__label" id="attending-label">
              Are you attending? <span class="field__req">required</span>
            </span>
            <div class="choice" role="radiogroup" aria-labelledby="attending-label">
              <label class="option">
                <input v-model="rsvp" name="rsvp" type="radio" value="true" required />
                <span>Yes, count me in</span>
              </label>
              <label class="option">
                <input v-model="rsvp" name="rsvp" type="radio" value="false" />
                <span>Sorry, can't make it</span>
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset class="group">
          <legend class="group__legend">How we know you</legend>

          <div class="field">
            <span class="field__label" id="group-label">Whose guest are you?</span>
            <div class="choice" role="radiogroup" aria-labelledby="group-label">
              <label class="option">
                <input v-model="group" name="group" type="radio" value="bride" />
                <span>Ashlyn's</span>
              </label>
              <label class="option">
                <input v-model="group" name="group" type="radio" value="groom" />
                <span>Ethan's</span>
              </label>
            </div>
          </div>

          <div class="field">
            <label class="field__label" for="relation-type">You are a…</label>
            <div class="relation">
              <select id="relation-type" v-model="relationType">
                <option value="" disabled>Select one</option>
                <!-- 'friend' is from the plan; the rest are PLACEHOLDERS. -->
                <option v-for="r in relationOptions" :key="r" :value="r">{{ r }}</option>
              </select>
              <span class="relation__of">of</span>
              <input
                id="relation-of"
                v-model.trim="relationOf"
                type="text"
                aria-label="of whom"
                placeholder="Ashlyn, Ethan, something..."
              />
            </div>
          </div>
        </fieldset>

        <fieldset class="group">
          <legend class="group__legend">Before the day</legend>

          <div class="field">
            <label class="field__label" for="dietary">Dietary requirements</label>
            <input
              id="dietary"
              v-model.trim="dietary"
              type="text"
              placeholder="Allergies, halal, vegetarian, or none"
            />
          </div>

          <div class="field">
            <label class="field__label" for="physical-invite">Would you like a physical invite?</label>
            <select id="physical-invite" v-model="physicalInvite">
              <option value="" disabled>Select one</option>
              <option v-for="o in inviteOptions" :key="o" :value="o">{{ o }}</option>
            </select>
          </div>
        </fieldset>

        <div class="submit">
          <button type="submit" :disabled="sending">
            {{ sending ? 'Sending…' : 'Send RSVP' }}
          </button>
          <p class="submit__hint">We'll follow up directly about anything you've flagged.</p>
        </div>

        <!-- role="alert" so it's announced the moment it appears; without it a
             screen reader user gets no feedback that the submit failed. -->
        <p v-if="error" class="msg msg--err" role="alert">{{ error }}</p>
      </form>

      <!-- The form is replaced outright on success, so focus is moved here or it
           would fall back to <body> with nothing announced. -->
      <p v-else ref="successEl" class="msg msg--ok" role="status" tabindex="-1">
        {{ confirmation }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'

// Injected at build time: from .env locally, from the GAS_URL repo secret in CI.
const GAS_URL = import.meta.env.GAS_URL

const relationOptions = [
  'friend',
  'relative',
  'colleague',
  'ex-colleague',
  'family friend',
  'plus one',
  'baby',
  'owner',
  'pet',
  'manager',
  'acquaintance',
  'acquaintance of an acquaintance',
  'hired clown',
  'ex-partner',
  'ex-friend',
  'ex-aquaintance',
  'ex-neighbour',
  'x-men',
  'fishball',
  'macaroni',
  'pain au chocolat',
  'bankai',
  'placeholder'
]
const inviteOptions = ['For myself', 'For my family', "No thanks, save Ethan's money"]

const name = ref('')
const rsvp = ref('')
const group = ref('')
const relationType = ref('')
const relationOf = ref('')
const dietary = ref('')
const physicalInvite = ref('')

const sending = ref(false)
const done = ref(false)
const error = ref('')
const successEl = ref(null)

// Both answers are a successful submission -- only the wording differs, so this
// stays one element and keeps the single focus target the screen reader needs.
const confirmation = computed(() =>
  rsvp.value === 'false'
    ? `Thank you, ${name.value} — we've got your RSVP. Sorry you can't make it, we'll catch up another time!`
    : `Thank you, ${name.value} — we've got your RSVP. See you on the day.`
)

// The script has a single `relation` column, so the two controls are joined here.
const relation = computed(() => {
  if (!relationType.value) return ''
  return relationOf.value ? `${relationType.value} of ${relationOf.value}` : relationType.value
})

async function submit() {
  sending.value = true
  error.value = ''
  try {
    const params = new URLSearchParams({
      name: name.value,
      rsvp: rsvp.value,
      // The radios start unchecked so the form doesn't answer for the guest,
      // but the sheet wants a side either way -- fall back rather than send ''.
      group: group.value || 'groom',
      relation: relation.value,
      dietary: dietary.value,
      'physical-invite': physicalInvite.value,
    })
    const res = await fetch(`${GAS_URL}?${params}`)
    if (!res.ok) throw new Error(`Server returned ${res.status}`)
    const data = await res.json()
    // The script returns HTTP 200 even on failure, so `status` is the only real signal.
    if (data.status !== 'success') throw new Error(data.message || 'Submission was rejected.')
    done.value = true
    await nextTick()
    successEl.value?.focus()
  } catch (e) {
    // Server messages are raw JS exceptions -- keep them out of a guest's face.
    console.error('RSVP submission failed:', e)
    error.value = 'Sorry, something went wrong sending your RSVP. Please try again, or message us directly.'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped lang="scss">
@use 'tokens' as *;

// On sage, like Location -- see $color-panel. The eyebrow and heading sit on
// the band in their usual colours; the form itself goes in a night card below.
.rsvp {
  // A column of labelled fields, so only the eyebrow and heading are centred.
  @include section(left);
  background: $color-panel;
}

.rsvp__eyebrow {
  @include eyebrow;
  margin: 0 0 $space-xs;
  text-align: center;
}

.rsvp__heading {
  @include heading;
  margin: 0 0 $space-3xl;
  text-align: center;
}

// Everything inside is flipped light for night: mist for text, as in the
// message under the hero, gold for the accent voice, sage for muted. The
// controls sit on sage, so inside them the usual dark-on-light holds.
.rsvp__card {
  // content-box, so $form-max-width is the measure the fields get and the
  // padding goes outside it -- the relation row needs every px of that 416.
  box-sizing: content-box;
  // The form wants a narrower measure than the runway; centring it keeps the
  // controls from stretching to a width no single answer needs.
  max-width: $form-max-width;
  margin-inline: auto;
  padding: $space-xxl $space-xl;
  color: $color-mist;
  background: $color-night;
  border-radius: $radius * 3;
  // Tinted with night rather than black so it reads as the card's own shade on
  // sage; a tight layer seats the edge, the wide one lifts it off the band.
  box-shadow: 0 2px 6px rgba($color-night, 0.3), 0 24px 44px rgba($color-night, 0.8);

  @include desktop {
    // The runway is only $content-max-width, so on desktop the card can take
    // the whole band: 560px, and 496 of it for the fields.
    max-width: none;
    padding: $space-4xl $space-3xl;
  }
}

// ---- Groups ----------------------------------------------------------------
.group {
  margin: 0 0 $space-4xl;
  padding: 0;
  border: 0;
  // A fieldset is a formatting context of its own; this stops its children's
  // margins collapsing out through it.
  display: flow-root;
}

.group__legend {
  // float + clear, because a real <legend> can't be a grid/flex child and
  // ignores width in most engines. This gives it a full-width line to sit on.
  float: left;
  width: 100%;
  margin-bottom: $space-xl;
  padding: 0 0 $space-xs;
  font-size: $font-size-base;
  font-weight: $font-weight-base;
  letter-spacing: 0.56px;
  color: $color-gold;
  border-bottom: $border-width solid rgba($color-mist, 0.2);

  + * {
    clear: both;
  }
}

// ---- Fields ----------------------------------------------------------------
.field {
  margin-bottom: $space-xl;

  &:last-child {
    margin-bottom: 0;
  }
}

.field__label {
  display: block;
  margin-bottom: $space-xs;
  font-size: $font-size-base;
  font-weight: $font-weight-base;
}

// Spelled out rather than marked with an asterisk, which screen readers either
// announce as "star" or skip entirely. The separator is decorative, so it's a
// pseudo-element and stays out of the accessibility tree.
.field__req {
  font-size: $font-size-xs;
  font-weight: $font-weight-base;
  letter-spacing: 0.48px;
  color: $color-sage;

  &::before {
    content: '·  ';
  }
}

input[type='text'],
select {
  width: 100%;
  // 16px font stops iOS Safari zooming the page on focus.
  padding: $space-md $space-lg;
  font: inherit;
  font-size: $font-size-base;
  color: $color-text;
  background: $color-surface;
  border: $border-width solid $color-border;
  border-radius: $radius;
  box-shadow: $shadow-inset;
  transition: border-color 120ms ease, box-shadow 120ms ease;

  &::placeholder {
    color: $color-muted;
    opacity: 1; // Firefox dims placeholders by default, which breaks contrast.
  }

  &:hover {
    border-color: $color-accent-ink;
  }

  // The global ring sits 2px off the element, so on an already-bordered field
  // it reads as a detached second outline. Text fields also match
  // :focus-visible on plain mouse clicks, not just keyboard nav, so it showed
  // on every tap. Draw focus flush to the border instead: one edge, not three.
  &:focus-visible {
    outline: none;
    border-color: $color-accent-ink;
    box-shadow: $shadow-inset, 0 0 0 $focus-width $color-gold;
  }
}

select {
  appearance: none;
  // Two slivers of a chevron. Positioned from the right edge and vertically
  // centred, so the arrow stays put if the padding or font size changes.
  background-image: linear-gradient(45deg, transparent 50%, $color-text 50%),
    linear-gradient(135deg, $color-text 50%, transparent 50%);
  background-position: right 18px center, right 13px center;
  background-size: 5px 5px;
  background-repeat: no-repeat;
  padding-right: $space-4xl;
  cursor: pointer;
}

// ---- Relation pair ---------------------------------------------------------
.relation {
  display: grid;
  // Stacked by default. At 375px the three-column version gives each control
  // ~150px, which truncates most of the options to nothing.
  grid-template-columns: 1fr;
  gap: $space-xs;
  align-items: center;

  @include desktop {
    grid-template-columns: 1fr auto 1fr;
    gap: $space-sm;
  }
}

.relation__of {
  font-size: $font-size-sm;
  font-style: italic;
  color: $color-sage;

  @include desktop {
    text-align: center;
  }
}

// ---- Option cards ----------------------------------------------------------
.choice {
  display: grid;
  gap: $space-sm;

  @include desktop {
    grid-template-columns: 1fr 1fr;
  }
}

.option {
  display: flex;
  align-items: center;
  gap: $space-sm;
  // 44px min keeps these comfortable as touch targets.
  min-height: 44px;
  padding: $space-sm $space-lg;
  font-size: $font-size-base;
  // Set back to dark: the card is white, but .rsvp has made paper the default.
  color: $color-text;
  background: $color-surface;
  border: $border-width solid $color-border;
  border-radius: $radius;
  cursor: pointer;
  transition: border-color 120ms ease, background-color 120ms ease;

  input {
    // Native radio, tinted. Keeping it real means the checked state survives
    // even where :has() below doesn't apply.
    flex: none;
    width: 18px;
    height: 18px;
    margin: 0;
    accent-color: $color-primary;

    // The card below carries the focus treatment; without this the global ring
    // also draws around the 18px dot, giving two rings for one control.
    &:focus-visible {
      outline: none;
    }
  }

  &:hover {
    border-color: $color-accent-ink;
  }

  // The whole card reads as selected, not just the 18px dot.
  &:has(input:checked) {
    background: $color-paper;
    border-color: $color-text;
    font-weight: $font-weight-bold;
  }

  // The ring belongs on the card, since the radio itself is only part of it,
  // and sits flush so it doesn't float off the edge as a second border.
  &:has(input:focus-visible) {
    outline: none;
    border-color: $color-accent-ink;
    box-shadow: 0 0 0 $focus-width $color-gold;
  }
}

// ---- Submit ----------------------------------------------------------------
.submit {
  text-align: center;
}

button {
  width: 100%;
  min-height: 52px;
  padding: $space-md $space-xl;
  font: inherit;
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  letter-spacing: 0.72px;
  // Inverted: $color-primary is night, which would vanish into the band.
  color: $color-night;
  background: $color-paper;
  border: 0;
  border-radius: $radius;
  cursor: pointer;
  transition: background-color 120ms ease, transform 80ms ease;

  &:hover:not(:disabled) {
    background: $color-sage;
  }

  // The global olive ring has no contrast on night.
  &:focus-visible {
    outline-color: $color-gold;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
}

.submit__hint {
  margin: $space-md 0 0;
  font-size: $font-size-xs;
  color: $color-sage;
}

// ---- Messages --------------------------------------------------------------
.msg {
  margin-top: $space-xl;
  font-size: $font-size-sm;
  text-align: center;

  &--ok {
    margin: 0;
    font-size: $font-size-md;
    color: $color-gold;
    // It's focused on success; the global ring would otherwise draw around a
    // full-width paragraph.
    outline: none;
  }

  &--err {
    // $color-error is 2.8:1 on night; lifted toward paper it's 8.7:1.
    color: color-mix(in srgb, $color-error 40%, $color-paper);
  }
}
</style>
