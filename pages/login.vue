<template>
  <v-card width="400" class="ma-auto pa-5">
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

      <v-btn :disabled="!valid" color="orange" class="mr-4" @click="validate">
        Login
      </v-btn>
      <v-card-subtitle>
    </v-card-subtitle>
    <v-btn color="" id="googlegoogle-signin-button" @click="googleLogin">
    <v-img width="100" contain src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button.png"></v-img>
     </v-btn>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: 'Login',
  auth: 'false',
  // middleware: ['guest'],
  data() {
    return {
      userData: {
        name: '',
        password: '',
        email: '',
        cpassword: ''
      },
      valid: true,
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required !',
        (v) =>
          (v && v.length >= 8) || 'Password should be of minimum 8 characters'
      ],
      cpasswordRules: [
        (v) => !!v || 'Confirm Password is required !'
        // function (v) {
        //     console.log(this.userData);
        //     return true;
        // }
      ]
    }
  },

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        try {
          delete this.userData.cpassword
          this.userData.action = 'insertUser'
          const { data } = await this.$axios.post('index.php', this.userData)
          if (data.status) {
            this.$swal({
              position: 'top',
              icon: 'success',
              title: 'User added successfully',
              showConfirmButton: false,
              toast: true,
              timer: 2500
            }).then(() => {
              this.$store.state.isLogin = true
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    async googleLogin() {
      await this.$auth.loginWith('google', {
        params: { prompt: 'select_account' }
      })
      console.log(this.$auth.user)
    }
  }
}
</script>
