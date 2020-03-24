import path from 'path'
import { Configuration } from '@nuxt/types'

// const join = (p: string) => path.join(this.options.rootDir, p)

const config: Configuration = {
  mode: 'spa',

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
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  build: {
    extend(config) {
      // @ts-ignore
      const rootDir = this.buildContext.options.rootDir
      const join = (p: string) => path.join(rootDir, 'src', p)
      // @ts-ignore
      config.resolve.alias['@domain'] = join('domain')
      // @ts-ignore
      config.resolve.alias['@application'] = join('application')
      // @ts-ignore
      config.resolve.alias['@infrastructure'] = join('infrastructure')
      // @ts-ignore
      config.resolve.alias['@ui'] = join('ui')
    }
  }
}

export default config
