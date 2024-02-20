<script setup lang="ts">
import { messageDTO } from './db/message.schema';

const { data, refresh } = await useFetch('/api/messages')

const formData = reactive({ username: '', content: '' })
const formErrors = reactive({ username: '', content: '' })
function onSubmit() {
  const result = messageDTO.safeParse(formData)
  if (!result.success) {
    const formattedError = result.error.format()
    formErrors.username = formattedError.username?._errors[0] || ''
    formErrors.content = formattedError.content?._errors[0] || ''

    return
  }

  $fetch('/api/messages', {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      formData.username = ''
      formData.content = ''
      refresh()
    }).catch((err) => {
      if (err.data) {
        formErrors.username = err.data.data.username?._errors[0] || ''
        formErrors.content = err.data.data.content?._errors[0] || ''
      }
      else {
        console.error(err)
      }
    })
}
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <input v-model="formData.username" type="text" placeholder="Votre nom" />
        <p>{{ formErrors.username }}</p>
      </div>
      <div>
        <textarea v-model="formData.content" placeholder="Votre message" />
        <p>{{ formErrors.content }}</p>
      </div>
      <button type="submit">Envoyer</button>
    </form>
    <div v-for="message in data.messages">
      <p>{{ message.username }} :<br>{{ message.content }}</p>
    </div>
  </div>
</template>
