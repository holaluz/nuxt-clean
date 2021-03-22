<template>
  <form v-if="!message" @submit.prevent="handleSubmit">
    <ma-layout columns="6 6 - 12" gap="small">
      <input-validation-provider rules="required">
        <ma-text-field label="Title" v-model="form.title" type="text" />
      </input-validation-provider>
      <input-validation-provider rules="required">
        <ma-text-field label="Slug" v-model="form.slug" type="text" />
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
          respondWithSuccess: () => {
            this.message = `Everything went better than expected`
          },
          respondWithClientError: (e) => {
            this.message = `I fucked it up: ${e.message}`
          },
          respondWithServerError: (e) => {
            this.message = `They fucked it up: ${e.message}`
          },
          respondWithGenericError: (e) => {
            this.message = `This is fucked up: ${e.message}`
          },
        }
      )
    },
  },
})
</script>
