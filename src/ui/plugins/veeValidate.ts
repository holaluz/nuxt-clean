import { Plugin } from '@nuxt/types'
import { extend, configure } from 'vee-validate'
import { required, confirmed } from 'vee-validate/dist/rules'
import VueI18n from 'vue-i18n'

const veeValidate: Plugin = ({ app }) => {
  configureVeeValidate(app.i18n)
}

export default veeValidate

export function configureVeeValidate(i18n: VueI18n) {
  configure({
    defaultMessage: (_, values) =>
      i18n.t(`fieldErrors.${values._rule_}`, values) as string,
  })

  extend('required', required)
  extend('confirmed', confirmed)
}
