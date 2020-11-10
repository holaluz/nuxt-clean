<template>
  <form v-if="!message" class="form" @submit.prevent="handleSubmit">
    <label>
      Title
      <input v-model="form.title" type="text" />
    </label>
    <label>
      Slug
      <input v-model="form.slug" type="text" />
    </label>
    <textarea v-model="form.body" rows="10"></textarea>
    <input type="submit" class="submit" value="Submit new post" />
  </form>
  <p v-else>{{ message }}</p>
</template>

<script lang="ts">
import { createArticle } from '@@/src/container'
import { EditingArticle } from '@@/src/domain/Article'
import Vue from 'vue'

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

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.submit {
  cursor: pointer;
  font-size: 1rem;
}
</style>
