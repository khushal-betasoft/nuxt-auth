<template>
  <v-app>
    <v-container fluid>
      <NavBar />
    </v-container>
    <v-main>
      <nuxt />
    </v-main>
    <v-container fluid>
      <footer-component></footer-component>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    // NavBar: ()=> import("@/components/NavBar.vue")
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
