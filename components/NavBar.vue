<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar-title>Shopsy</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="orange" small light @click="shift('')"> Home </v-btn>

      <v-btn
        color="orange"
        small
        light
        class="mx-3"
        @click="shift('aboutPage')"
      >
        About
      </v-btn>

      <nuxt-link to="/profilePage">
        <v-avatar
          v-show="$auth.loggedIn"
          light
          size="30"
          color="orange"
          class="mr-3"
        >
          <v-img
            v-if="$auth.loggedIn && $auth.user.profile_picture != ''"
            :src="$auth.user.profile_picture"
          ></v-img>
          <v-icon v-else class="black--text">mdi-account</v-icon>
        </v-avatar>
      </nuxt-link>

      <v-btn
        v-show="!$auth.loggedIn"
        color="success"
        small
        light
        @click="shift('loginEmail')"
      >
        Login
      </v-btn>

      <v-btn
        v-show="!$auth.loggedIn"
        color="success"
        small
        light
        class="mx-3"
        @click="shift('register')"
      >
        Register
      </v-btn>

      <v-btn
        v-show="$auth.loggedIn"
        color="red"
        small
        rounded
        light
        @click="shift('logout')"
      >
        Log Out
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      login: this.$store.state.isLogin
    }
  },
  methods: {
    ...mapMutations({ changeState: 'changeState' }),
    shift(page) {
      if (page === 'logout') {
        this.$auth.logout()
      } else {
        this.$router.push(`/${page}`)
      }
    }
  }
}
</script>
