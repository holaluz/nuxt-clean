<template>
  <div class="container">
    <validation-observer v-slot="{ valid, handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <ma-stack space="medium">
          <input-validation-provider
            :bails="false"
            rules="required"
            vid="basePassword"
          >
            <ma-text-field
              v-model="password"
              :label="$t('password')"
              type="text"
            />
          </input-validation-provider>
          <input-validation-provider
            :bails="false"
            rules="required|confirmed:basePassword"
          >
            <ma-text-field
              v-model="repeatedPassword"
              :label="$t('repeatPassword')"
              type="text"
            />
          </input-validation-provider>
          <!--
          TODO: How can we improve form state handling? This looks verbose and
                prone to errors. Also, the UX is not super great because you need
                to feel both fields before getting "local" errors in any of them.
          -->
          <ma-alert
            v-if="passwordError && valid"
            :text="passwordError"
            type="error"
            title="Error"
          />
          <ma-button :disabled="!!passwordError || !valid">
            Reset Password
          </ma-button>
        </ma-stack>
      </form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationObserver } from 'vee-validate'
import {
  createPassword,
  passwordMinLength,
} from '@@/src/modules/password/domain'

export default Vue.extend({
  name: 'ResetPassword',

  components: { ValidationObserver },

  data() {
    return {
      password: '',
      repeatedPassword: '',
    }
  },

  computed: {
    passwordError(): null | string {
      if (!this.password) return null

      const result = createPassword(this.password).mapErr((parseError) =>
        parseError
          .getErrors()
          .map((error) => this.$t(`fieldErrors.${error.message}`))
          .join(',')
      )

      return result.isErr() ? result.error : null
    },
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
</style>
