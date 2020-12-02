import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

import { createPassword } from '@modules/password/domain'
import { ParseError } from '@shared/ParseError'

extend('password', (value: string) => {
  const result = createPassword(value)
  if (result.isOk()) {
    return true
  }

  return JSON.stringify(result.error.map((e: ParseError) => e.message))
})

extend('required', {
  ...required,
  message: 'required',
})

extend('confirmed', {
  params: ['target'],
  validate(baseValue, { target }) {
    return baseValue === target
  },
  message: 'confirmed',
})

// Register it globally
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
