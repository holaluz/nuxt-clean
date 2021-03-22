<template>
  <ma-stack class="container" space="3x-large">
    <ma-stack space="medium">
      <ma-heading size="medium" level="1">Demo for createArticle</ma-heading>
      <add-article-form />
    </ma-stack>

    <ma-stack space="medium">
      <ma-heading size="medium" level="1">
        Demo for getRecentArticles
      </ma-heading>
      <p v-if="error">Error: {{ error }}</p>
      <p v-else-if="loading">Loading…</p>
      <article-list v-else :articles="articles" />
    </ma-stack>
  </ma-stack>
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
  margin: 4rem auto 0;
  max-width: 60ch;
}
</style>
