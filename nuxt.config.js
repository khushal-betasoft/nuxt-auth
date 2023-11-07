import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt2-project',
    title: 'nuxt2-project',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  router: {
    // middleware: ['auth']
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    [
      'nuxt-sweetalert2',
      {
        confirmButtonColor: '#d1872c'
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://localhost/Training/CRUD_PDO/',
    baseURL: ' https://devapi.spworldwide.co.uk',
  },
  auth: {
    redirect: {
      login: '/loginEmail',
      logout: '/loginEmail',
      home: '/',
      callback: '/loginEmail'
    },
    strategies: {
      local: {
        token: {
          property: 'accessToken',
          required: true,
          global: true,
          type: 'Bearer'

        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          loginDetail: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: false // { url: '/api/auth/user', method: 'get' }
        }
      },
      google: {
        clientId: '694316142059-11vcj3vv3udndihdrn00mpdi9s0fhkh5.apps.googleusercontent.com',
        codeChallengeMethod: '',
        responseType: 'token id_token',
        // grantType: 'authorization_code',
        redirectUri: 'http://localhost:3000'
        // endpoints: {
        //   token: 'http://localhost:8000/user/google/', // your backend url to resolve your auth with google and give you the token back
        //   userInfo: 'http://localhost:8000/auth/user/' // your endpoint to get the user info after you received the token
        // },

      },
      facebook: {
        // scheme: 'oauth2',
        // responseType: 'token id_token',
        // responseType: 'token id',
        endpoints: {
          // authorization: 'https://www.facebook.com/v12.0/dialog/oauth',
          // token: 'https://graph.facebook.com/v12.0/oauth/access_token',
          userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}',
          // },
          // responseType: 'token',
          // redirectUri: 'http://localhost:3000/loginEmail', // Update with your app's URL

        },
        redirectUri: 'http://localhost:3000',
        clientId: '1984890505231649',// Replace with your Facebook App ID
        scope: ['public_profile', 'email']
      },
      github: {
        clientId: '4cefbe4a60f5b8de4625',
        clientSecret: '6d88f1f52d4ee7b63955b0c95fedfa654a6c6d58',
        // responseType: 'token',
        // redirectUri: 'http://localhost:3000/loginEmail',
      },
      discord: {
        clientId: '1171026164182159452',
        scope: ['email', 'identify'],
        redirect_uri: 'http://localhost:3000',
      },
      customStrategy: {
        scheme: '~/schemes/customScheme',
        token: {
          property: 'accessToken',
          required: true,
          global: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          /* ... */
        }
      },
      auth0: {
        domain: 'khushal.us.auth0.com',
        clientId: 'zwNGt7LklfCQVPvYkWtVQmKPkJQRfott',
        audience: 'https://khushal.us.auth0.com/api/v2/',
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' }
        }
      }
    },
    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
      customVariables: ['~/assets/variables.scss'],
      theme: {
        dark: false,
        themes: {
          dark: {
            primary: colors.blue.darken2,
            accent: colors.grey.darken3,
            secondary: colors.amber.darken3,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3,
          },
        },
      },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}

  }
}