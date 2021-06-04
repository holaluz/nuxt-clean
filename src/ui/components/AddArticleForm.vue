<template>
  <form v-if="!message" @submit.prevent="handleSubmit">
    <ma-layout columns="6 6 - 12" gap="small">
      <input-validation-provider rules="required">
        <ma-text-field v-model="form.title" label="Title" type="text" />
      </input-validation-provider>
      <input-validation-provider rules="required">
        <ma-text-field v-model="form.slug" label="Slug" type="text" />
      </input-validation-provider>
      <textarea v-model="form.body" rows="10" />
      <ma-button class="submit">Submit new post</ma-button>
    </ma-layout>
  </form>
  <p v-else>
    {{ message }}
  </p>
</template>

<script lang="ts">
import Vue from 'vue'
import { createArticle } from '@@/src/container'
import { EditingArticle } from '@modules/article/domain'

export default Vue.extend({
  name: 'AddArticleForm',

  data() {
    return {
      message: '',
      form: {
        title: '',
        slug: '',
        body: '',
      } as EditingArticle,
    }
  },

  methods: {
    async handleSubmit() {
      await createArticle.execute(
        {
          editingArticle: this.form,
        },
        {
          onSuccess: () => {
            this.message = `Everything went better than expected`
          },
          onClientError: (e) => {
            this.message = `I fucked it up: ${e.message}`
          },
          onServerError: (e) => {
            this.message = `They fucked it up: ${e.message}`
          },
          onGenericError: (e) => {
            this.message = `This is fucked up: ${e.message}`
          },
        }
      )
    },
  },
})
</script>
