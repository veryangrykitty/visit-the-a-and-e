<script setup>
import { ref } from 'vue'

// Injected at build time: from .env locally, from the GAS_URL repo
// secret in CI. Still readable in the shipped bundle -- a static page
// has to hand the address to the visitor's browser.
const GAS_URL = import.meta.env.GAS_URL

const name = ref('')
const rsvp = ref('')
const sending = ref(false)
const done = ref(false)
const error = ref('')

async function submit() {
  sending.value = true
  error.value = ''
  try {
    const url = `${GAS_URL}?name=${encodeURIComponent(name.value)}&rsvp=${rsvp.value}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Server returned ${res.status}`)
    const data = await res.json()
    if (data.status !== 'success') throw new Error(data.message || 'Submission was rejected.')
    done.value = true
  } catch (e) {
    error.value = `Could not send your RSVP (${e.message}). Please try again.`
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <form v-if="!done" @submit.prevent="submit">
    <label for="name">Name</label>
    <input id="name" v-model.trim="name" type="text" placeholder="Your full name" required />

    <fieldset>
      <legend>Will you be attending?</legend>
      <div class="choice">
        <label><input type="radio" v-model="rsvp" value="true" required /> Yes</label>
        <label><input type="radio" v-model="rsvp" value="false" /> No</label>
      </div>
    </fieldset>

    <button type="submit" :disabled="sending">
      {{ sending ? 'Sending…' : 'Send RSVP' }}
    </button>

    <p v-if="error" class="msg err">{{ error }}</p>
  </form>

  <p v-else class="msg ok">Thanks, {{ name }} — your RSVP has been recorded.</p>
</template>

<style scoped>
label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
input[type='text'] {
  width: 100%;
  box-sizing: border-box;
  padding: 0.625rem 0.75rem;
  font: inherit;
  border: 1px solid #d6cfc4;
  border-radius: 6px;
  background: #fff;
}
input[type='text']:focus {
  outline: 2px solid #8a7a63;
  outline-offset: -1px;
}
fieldset {
  border: 0;
  margin: 1.25rem 0;
  padding: 0;
}
legend {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding: 0;
}
.choice {
  display: flex;
  gap: 1.25rem;
}
.choice label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 400;
  margin: 0;
}
button {
  width: 100%;
  padding: 0.75rem;
  font: inherit;
  font-weight: 600;
  color: #fff;
  background: #4a4034;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.msg {
  margin-top: 1rem;
  font-size: 0.875rem;
}
.msg.ok {
  color: #2f6b4f;
}
.msg.err {
  color: #a33a30;
}
</style>
