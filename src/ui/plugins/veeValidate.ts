import Vue from 'vue'
import { ValidationProvider, extend } from 'vee-validate'
import { createPassword } from '@modules/password/domain'
import { ParseError } from '@shared/ParseError'

extend('password', (value: string) => {
  const result = createPassword(value)
  if (result.isOk()) {
    return true
  }

  return JSON.stringify(result.error.map((e: ParseError) => e.message))
})

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
