<template>
  <v-container>
    <v-card
      color="indigo lighten-5"
      elevation="3"
      width="400"
      class="ma-auto pa-5"
    >
      <v-card-title>Login Form</v-card-title>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="userData.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="userData.password"
          :rules="passwordRules"
          label="Password"
          required
          type="password"
        ></v-text-field>

        <v-btn color="orange" small class="mr-4" @click="validate">
          Login
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn color="green" small class="mr-4 my-3" @click="locLogin">
          Login with Local API
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn color="primary" small class="mr-4" @click="fbLogin">
          <v-icon class="mr-3">mdi-facebook</v-icon>
          Login with facebook
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn color="grey" small class="mr-4 my-3" @click="gitLogin">
          <v-icon class="mr-3">mdi-github</v-icon>
          Login with Git Hub
        </v-btn>
        <v-btn color=" lighten-1" small class="mr-4" @click="discordLogin">
          <v-img
            scr="https://static.vecteezy.com/system/resources/previews/023/986/880/original/discord-logo-discord-logo-transparent-discord-icon-transparent-free-free-png.png"
          ></v-img>
          Login with Discord
        </v-btn>
        <v-btn small color="red" @click="googleLogin()">
          <v-icon small class="mr-3">mdi-google</v-icon>Login with google
        </v-btn>
        <v-btn small color="yellow" class="mr-4 my-3" @click="customLogin"
          >Custom Login</v-btn
        >
        <v-btn small color="yellow" class="mr-4 my-3" @click="authOLogin"
          >Auth0 Login</v-btn
        >
      </v-form>
    </v-card>
    <OTP_modal
      v-if="showOTP"
      :otp-value="userData.OTP"
      @closeModal="OTP_login"
    ></OTP_modal>
  </v-container>
</template>
<script>
export default {
  name: 'Login',
  auth: 'false',
  components: {
    OTP_modal: () => import('@/modal/OTP_modal.vue')
  },
  data() {
    return {
      showOTP: false,
      userData: {
        name: '',
        password: '',
        email: '',
        cpassword: '',
        OTP: ''
      },
      response: {},
      valid: true,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required !',
        (v) =>
          (v && v.length >= 8) || 'Password should be of minimum 8 characters'
      ]
    }
  },
  methods: {
    async fbLogin() {
      try {
        await this.$auth.loginWith('facebook')
        // User is authenticated, handle it as needed.
      } catch (error) {
        console.error('Facebook login error:', error)
      }
    },
    async gitLogin() {
      try {
        const response = await this.$auth.loginWith('github')
        console.log(response)
        // User is authenticated, handle it as needed.
      } catch (error) {
        console.error('Facebook login error:', error)
      }
    },
    async discordLogin() {
      try {
        const response = await this.$auth.loginWith('discord')
        console.log(response)
        // User is authenticated, handle it as needed.
      } catch (error) {
        console.error('Facebook login error:', error)
      }
    },
    async customLogin() {
      try {
        const response = await this.$auth.loginWith('customStrategy', {
          data: {
            email: this.userData.email,
            password: this.userData.password
          }
        })
        if (response.data.data.is_2FA_enabled) {
          this.showOTP = true
          this.response.base32 = response.data.data.base32
          this.response.session_id = response.data.data.session_id
        }
        console.log(response)
      } catch (err) {
        console.log('Error -> ', err)
      }
    },
    async OTP_login(otp) {
      if (otp) {
        try {
          this.response.code = otp
          console.log('type of Code:', typeof this.response.code)
          console.log(this.response)
          const response = await this.$auth.loginWith('customStrategy', {
            data: this.response
          })
          console.log(response)
          if (response.data.status) {
            this.$swal({
              title: 'Log in Successful',
              toast: true,
              position: 'top-start'
            })
          }
        } catch (err) {
          alert(err)
        }
      } else {
        this.showOTP = false
      }
    },
    async authOLogin() {
      try {
        const response = await this.$auth.loginWith('auth0', {
          data: {
            email: this.userData.email,
            password: this.userData.password
          }
        })
        setTimeout(() => {
          console.log(response)
        }, 2000)
      } catch (err) {
        console.log('Error -> ', err)
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.$auth.login()
      }
    },
    async locLogin() {
      if (this.$refs.form.validate()) {
        try {
          console.log(this.userData)
          const response = await this.$auth.loginWith('local', {
            data: {
              email: this.userData.email,
              password: this.userData.password
            }
          })
          console.log(response)
          this.$router.push({ path: '/' })
        } catch (error) {
          console.log(error)
        }
      }
    },
    async googleLogin() {
      console.log(
        await this.$auth.loginWith('google', {
          params: { prompt: 'select_account' }
        })
      )
    }
  }
}
</script>
