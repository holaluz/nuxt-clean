import Vue from 'vue'
import { ValidationObserver, extend } from 'vee-validate'
import { required, confirmed } from 'vee-validate/dist/rules'

import { createPassword } from '@modules/password/domain'

extend('password', (value: string) => {
  const result = createPassword(value)
  if (result.isOk()) {
    return true
  }

  return JSON.stringify(result.error.map((e) => e.message))
})

extend('required', {
  ...required,
  message: 'required',
})

extend('confirmed', { ...confirmed, message: 'confirmed' })

// Register it globally
Vue.component('ValidationObserver', ValidationObserver)
