<template>
  <div class="container">
    <form class="form" @submit.prevent="handleSubmit">
      <ValidationProvider v-slot="{ errors }" :bails="false" rules="password">
        <div>
          <label>
            Password
            <input v-model="password" required type="text" />
          </label>
          <template v-if="true">
            <p
              v-for="(error, i) in errors"
              :key="i"
              class="error-msg"
              v-text="error"
            />
          </template>
        </div>
      </ValidationProvider>
      <input type="submit" class="submit" value="Reset Pass" />
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginIndex',

  data() {
    return {
      password: '',
    }
  },

  methods: {
    handleSubmit() {
      console.log('Submit clicked')
    },
  },
})
</script>

<style scoped>
html {
  overflow-y: scroll;
}

.container {
  padding-top: 2rem;
  margin: 0 auto;
  max-width: 60ch;
}

.form {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.submit {
  cursor: pointer;
  font-size: 1rem;
}

.error-msg {
  color: #a71313;
}
</style>
