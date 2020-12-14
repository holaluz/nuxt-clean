import { render as VTLrender } from '@testing-library/vue'

import VueI18n from 'vue-i18n'
import { configureVeeValidate } from '@ui/plugins/veeValidate'

import locales from '@ui/locales/en.json'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

/**
 * This is our default render() method. It is build on top of Vue Testing Library
 * render. It adds the required mocks and stubs
 */
const render: typeof VTLrender = (
  component,
  options = {},
  callbackFn = noop
) => {
  return VTLrender(
    component,
    {
      ...options,
      mocks: { ...options.mocks },
      stubs: {
        'nuxt-link': {
          template: `<a><slot /></a>`,
        },
        'nuxt-child': {
          template: `<div><slot /></div>`,
        },
        transition: {
          template: `<div><slot /></div>`,
        },
      },
    },
    (localVue, ...args) => {
      localVue.use(VueI18n)

      const i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: 'en',
        messages: { en: locales },
      })

      configureVeeValidate(i18n)
      callbackFn(localVue, ...args)

      return { i18n }
    }
  )
}

// Export all packages from Vue Testing Library, and override the render method
// with our own implementation
export * from '@testing-library/vue'
export { render }
