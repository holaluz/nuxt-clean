<template>
  <div class="container">
    <validation-observer v-slot="{ invalid, handleSubmit }">
      <form class="form" @submit.prevent="handleSubmit(onSubmit)">
        <text-input
          id="basePassword"
          v-model="password"
          rules="required|password"
          :label="$t('password')"
          :bails="false"
          type="text"
        />
        <text-input
          v-model="repeatedPassword"
          rules="required|password|confirmed:basePassword"
          :label="$t('repeat_password')"
          :bails="false"
          type="text"
        />
        <ma-button class="submit" :disabled="invalid">
          Reset Password
        </ma-button>
      </form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TextInput from '@ui/components/TextInput'
import { ValidationObserver } from 'vee-validate'

export default Vue.extend({
  name: 'ResetPassword',

  components: { TextInput, ValidationObserver },

  data() {
    return {
      password: '',
      repeatedPassword: '',
    }
  },

  methods: {
    async onSubmit() {
      await this.$store.dispatch('auth/resetPassword', this.password)
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
</style>
