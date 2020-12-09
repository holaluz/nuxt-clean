<template>
  <div class="container">
    <validation-observer v-slot="{ invalid, handleSubmit }">
      <form class="form" @submit.prevent="handleSubmit(onSubmit)">
        <validation-provider
          v-slot="{ errors }"
          :bails="false"
          name="basePassword"
          rules="password|required"
        >
          <div>
            <label>
              Password
              <input v-model="password" type="text" />
            </label>
            <p
              v-for="(error, i) in errors"
              :key="i"
              class="error-msg"
              v-text="error"
            />
          </div>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          :bails="false"
          rules="password|required|confirmed:@basePassword"
        >
          <div>
            <label>
              Repeat password
              <input v-model="repeatedPassword" type="text" />
            </label>
            <p
              v-for="(error, i) in errors"
              :key="i"
              class="error-msg"
              v-text="error"
            />
          </div>
        </validation-provider>
        <input
          type="submit"
          class="submit"
          value="Reset Pass"
          :disabled="invalid"
        />
      </form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ResetPassword',

  data() {
    return {
      password: '',
      repeatedPassword: '',
    }
  },

  methods: {
    async onSubmit() {
      await this.$store.dispatch('auth/resetPassword', this.password)
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
