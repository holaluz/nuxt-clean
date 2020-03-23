<template>
  <form class="form" @submit.prevent="handleSubmit">
    <label>
      Title
      <input v-model="form.title" type="text" />
    </label>
    <label>
      Description
      <input v-model="form.description" type="text" />
    </label>
    <label>
      Slug
      <input v-model="form.slug" type="text" />
    </label>
    <textarea v-model="form.body" rows="10"></textarea>
    <label>
      Date of creation
      <input v-model="form.createdAt" type="date" />
    </label>
    <input type="submit" class="submit" value="Submit new post" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AddArticleForm',

  data() {
    return {
      form: {
        title: null,
        description: null,
        slug: null,
        body: null,
        createdAt: null
      }
    }
  },

  methods: {
    handleSubmit() {
      this.$emit('submit', this.form)
    }
  }
})
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.submit {
  border: 3px solid transparent;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 1rem;
}

.submit:hover {
  border: 3px solid #333;
}
</style>
