import path from 'path'
import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  ssr: false,

  rootDir: '.',

  srcDir: 'src/ui',

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  build: {
    extend(config) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore "Property 'buildContext' does not exist on type 'NuxtOptionsBuild'"
      const rootDir = this.buildContext.options.rootDir
      const joinSrc = (p: string) => path.join(rootDir, 'src', p)

      if (!config?.resolve?.alias) {
        throw new Error('webpack config aliases not found!')
      }

      config.resolve.alias['@domain'] = joinSrc('domain')
      config.resolve.alias['@application'] = joinSrc('application')
      config.resolve.alias['@infrastructure'] = joinSrc('infrastructure')
      config.resolve.alias['@ui'] = joinSrc('ui')
    },
  },
}

export default config
