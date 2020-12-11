import Vue from 'vue'
import { ValidationObserver, extend } from 'vee-validate'
import { required, confirmed } from 'vee-validate/dist/rules'

import { createPassword } from '@modules/password/domain'
import { ParseError } from '@@/src/shared/parseError'

function _parseDomainErrors(domainErrors: ParseError[]) {
  const errorMsgs = domainErrors.map((e) => e.message)
  return JSON.stringify({ errors: errorMsgs })
}

extend('password', (value: string) => {
  const result = createPassword(value)
  if (result.isOk()) {
    return true
  }

  return _parseDomainErrors(result.error)
})

extend('required', {
  ...required,
  message: 'required',
})

extend('confirmed', { ...confirmed, message: 'confirmed' })

// Register it globally
Vue.component('ValidationObserver', ValidationObserver)
