<template>
  <ma-stack space="large">
    <article v-for="article in articles" :key="article.title">
      <ma-stack space="small">
        <ma-heading size="xsmall">{{ article.title }}</ma-heading>
        <ma-text size="small">{{ article.body }}</ma-text>
      </ma-stack>
    </article>
  </ma-stack>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Article } from '@modules/article/domain'

export default Vue.extend({
  name: 'ArticleList',

  props: {
    articles: {
      type: Array,
      required: true,
    } as PropOptions<Article[]>,
  },
})
</script>
