<template>
  <section class="rsvp">
    <h2>RSVP</h2>

    <form v-if="!done" @submit.prevent="submit">
      <label for="name">Your name</label>
      <input id="name" v-model.trim="name" type="text" required />

      <fieldset>
        <legend>Are you attending?</legend>
        <div class="choice">
          <label><input v-model="rsvp" type="radio" value="true" required /> Yes, count me in</label>
          <label><input v-model="rsvp" type="radio" value="false" /> Sorry, can't make it</label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Whose guest are you?</legend>
        <div class="choice">
          <label><input v-model="group" type="radio" value="bride" /> Ash's</label>
          <label><input v-model="group" type="radio" value="groom" /> Ethan's</label>
        </div>
      </fieldset>

      <label for="relation-type">You are a…</label>
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
          placeholder="Ash, Ethan, the family…"
        />
      </div>

      <label for="dietary">Dietary requirements</label>
      <input id="dietary" v-model.trim="dietary" type="text" placeholder="Allergies, preferences, or none" />

      <label for="physical-invite">Would you like a physical invite?</label>
      <select id="physical-invite" v-model="physicalInvite">
        <option value="" disabled>Select one</option>
        <option v-for="o in inviteOptions" :key="o" :value="o">{{ o }}</option>
      </select>

      <button type="submit" :disabled="sending">
        {{ sending ? 'Sending…' : 'Send RSVP' }}
      </button>

      <p v-if="error" class="msg err">{{ error }}</p>
    </form>

    <p v-else class="msg ok">
      Thank you, {{ name }} — we've got your RSVP. See you on the day.
    </p>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

// Injected at build time: from .env locally, from the GAS_URL repo secret in CI.
const GAS_URL = import.meta.env.GAS_URL

const relationOptions = ['friend', 'cousin', 'colleague', 'neighbour', 'family friend', 'plus one']
const inviteOptions = ['for myself', 'for my family', 'no thanks, save your pennies']

const name = ref('')
const rsvp = ref('')
const group = ref('bride')
const relationType = ref('')
const relationOf = ref('')
const dietary = ref('')
const physicalInvite = ref('')

const sending = ref(false)
const done = ref(false)
const error = ref('')

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
      group: group.value,
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

h2 {
  margin: 0 0 $space-xl;
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
}

label {
  display: block;
  margin-bottom: $space-xs;
  font-size: $font-size-sm;
  font-weight: $font-weight-bold;
}

input[type='text'],
select {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: $space-lg;
  // 16px font stops iOS Safari zooming the page on focus.
  padding: $space-md;
  font: inherit;
  font-size: $font-size-base;
  color: $color-text;
  border: $border-width solid $color-border;
  border-radius: $radius;
  background: $color-surface;

  &:focus {
    outline: $focus-width solid $color-focus;
    outline-offset: -#{$border-width};
  }
}

select {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, $color-text 50%),
    linear-gradient(135deg, $color-text 50%, transparent 50%);
  background-position: calc(100% - 18px) 21px, calc(100% - 13px) 21px;
  background-size: 5px 5px;
  background-repeat: no-repeat;
}

.relation {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  gap: $space-sm;

  select,
  input {
    margin-bottom: $space-lg;
  }
}

.relation__of {
  padding-top: $space-md;
  font-size: $font-size-sm;
  color: $color-focus;
}

fieldset {
  margin: 0 0 $space-xl;
  padding: 0;
  border: 0;
}

legend {
  margin-bottom: $space-xs;
  padding: 0;
  font-size: $font-size-sm;
  font-weight: $font-weight-bold;
}

.choice {
  display: flex;
  flex-direction: column;
  gap: $space-sm;

  label {
    display: flex;
    align-items: center;
    gap: $space-xs;
    // 44px min keeps these comfortable as touch targets.
    min-height: 44px;
    margin: 0;
    font-size: $font-size-base;
    font-weight: 400;
  }

  @media (min-width: $bp-sm) {
    flex-direction: row;
    gap: $space-xl;
  }
}

button {
  width: 100%;
  min-height: 48px;
  margin-top: $space-xs;
  padding: $space-md;
  font: inherit;
  font-weight: $font-weight-bold;
  color: $color-on-primary;
  background: $color-primary;
  border: 0;
  border-radius: $radius;
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
}

.msg {
  margin-top: $space-lg;
  font-size: $font-size-sm;

  &.ok {
    font-size: $font-size-md;
    color: $color-success;
  }

  &.err {
    color: $color-error;
  }
}
</style>
