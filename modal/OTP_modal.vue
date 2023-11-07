<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template #activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"> Enter the OTP </v-card-title>
        <v-card-text>
          <v-otp-input v-model="otpValue" variant="filled"></v-otp-input>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="submitOTP(true)">
            Submit
          </v-btn>
          <v-btn color="green darken-1" text @click="submitOTP(false)">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      otpValue: null
    }
  },
  methods: {
    submitOTP(decision) {
      const otp = this.otpValue
      if (decision) {
        this.$emit('closeModal', otp)
      } else {
        this.$emit('closeModal')
      }
    }
  }
}
</script>
