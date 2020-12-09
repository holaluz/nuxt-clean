import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, confirmed } from 'vee-validate/dist/rules'

import { createPassword } from '@modules/password/domain'

extend('password', (value: string) => {
  const result = createPassword(value)
  if (result.isOk()) {
    return true
  }

  console.log('this --> ', this)

  return JSON.stringify(result.error.map((e) => e.message))
})

extend('required', {
  ...required,
  message: 'required',
})

extend('confirmed', { ...confirmed, message: 'confirmed' })

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
