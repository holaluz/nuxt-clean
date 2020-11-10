<template>
  <div class="container">
    <h3 style="margin: 3rem 0 1rem">Demo for createArticle</h3>
    <add-article-form />

    <h3 style="margin: 4rem 0 1rem">Demo for getRecentArticles</h3>
    <p v-if="error">Error: {{ error }}</p>
    <p v-else-if="loading">Loading…</p>
    <article-list v-else :articles="articles" />
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import Vue from 'vue'
import AddArticleForm from '../components/AddArticleForm.vue'
import ArticleList from '../components/ArticleList.vue'

export default Vue.extend({
  components: {
    AddArticleForm,
    ArticleList,
  },

  computed: mapState('article', ['loading', 'error', 'articles']),

  async mounted() {
    await this.$store.dispatch('article/getRecentArticles')
  },
})
</script>

<style>
html {
  overflow-y: scroll;
}

.container {
  margin: 0 auto;
  max-width: 60ch;
}
</style>
