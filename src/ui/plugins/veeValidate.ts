import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import { ValidationObserver, extend, configure } from 'vee-validate'
import { required, confirmed } from 'vee-validate/dist/rules'

import { createPassword } from '@modules/password/domain'
import { ParseError } from '@@/src/shared/parseError'

const veeValidate: Plugin = ({ app }) => {
  configure({
    defaultMessage: (field, values) => {
      values._field_ = app.i18n.t(`${field}`)
      return app.i18n.t(`field_errors.${values._rule_}`, values) as string
    },
  })

  function _parseDomainErrors(domainErrors: ParseError[]) {
    const errorMsgs = domainErrors.map((e) =>
      app.i18n.t(`field_errors.${e.message}`, e.getValues())
    )
    return JSON.stringify({ errors: errorMsgs })
  }

  extend('password', (value: string) => {
    const result = createPassword(value)

    return result.isOk() ? true : _parseDomainErrors(result.error)
  })

  extend('required', required)

  extend('confirmed', confirmed)
}

export default veeValidate

// Register it globally
Vue.component('ValidationObserver', ValidationObserver)
