<template>
  <div>
    <article v-for="article in articles" :key="article.title">
      <b>{{ article.title }}</b>
      <p>{{ article.body }}</p>
      <br />
    </article>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Article } from '@@/src/modules/article/domain'

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
