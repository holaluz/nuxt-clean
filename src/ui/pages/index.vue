<template>
  <div class="container">
    <div>
      <h1 class="title">nuxt-clean</h1>
      <p v-if="error">{{ error }}</p>
      <p v-else-if="loading">{{ loading }}</p>
      <add-article-form v-else @submit="handleSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import AddArticleForm from '../components/AddArticleForm.vue'

export default Vue.extend({
  components: {
    AddArticleForm,
  },

  computed: {
    ...mapState('article', ['loading', 'error']),
  },

  methods: {
    ...mapActions('article', ['createArticle']),

    handleSubmit(formValues: unknown) {
      this.createArticle(formValues)
    },
  },
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
