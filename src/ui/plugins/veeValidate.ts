import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import { ValidationObserver, extend, configure } from 'vee-validate'
import { required, confirmed } from 'vee-validate/dist/rules'
import VueI18n from 'vue-i18n'

import { createPassword } from '@modules/password/domain'
import { ParseError } from '@@/src/shared/parseError'

const veeValidate: Plugin = ({ app }) => {
  configureVeeValidate(app.i18n)
}

export default veeValidate

export function configureVeeValidate(i18n: VueI18n) {
  configure({
    defaultMessage: (_, values) =>
      i18n.t(`field_errors.${values._rule_}`, values) as string,
  })

  extend('required', required)
  extend('confirmed', confirmed)
  extend('password', password)

  function password(value: string) {
    const result = createPassword(value).mapErr(translateAndStringifyError)

    return result.isOk() || result.error
  }

  function translateAndStringifyError(domainErrors: ParseError[]) {
    const errorMsgs = domainErrors.map((e) =>
      i18n.t(`field_errors.${e.message}`, e.getValues())
    )

    return JSON.stringify({ errors: errorMsgs })
  }
}

// Register it globally
Vue.component('ValidationObserver', ValidationObserver)
