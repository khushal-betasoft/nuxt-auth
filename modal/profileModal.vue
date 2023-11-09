<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title fixed>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col cols="12">
              <v-text-field
                v-model="newData.email"
                label="Email*"
                disabled
              ></v-text-field>
            </v-col>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="fname" label="Name:*"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="newData.phone"
                  label="Phone Number*"
                  type="number"
                ></v-text-field>
              </v-col>

              <v-file-input
                ref="fileInput"
                v-model="files"
                color="deep-purple accent-4"
                counter
                label="File input"
                multiple
                placeholder="Select your files"
                prepend-icon="mdi-paperclip"
                outlined
                :show-size="1000"
              >
                <template #selection="{ index, text }">
                  <v-chip
                    v-if="index < 2"
                    color="deep-purple accent-4"
                    dark
                    label
                    small
                  >
                    {{ text }}
                  </v-chip>

                  <span
                    v-else-if="index === 2"
                    class="text-overline grey--text text--darken-3 mx-2"
                  >
                    +{{ files.length - 2 }} File(s)
                  </span>
                </template>
              </v-file-input>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="temp"> Save </v-btn>
          <v-btn color="blue darken-1" text @click="$emit('closeModal')">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    dialog: true,
    newData: {},
    fname: '',
    files: ''
  }),
  mounted() {
    this.newData.full_name = this.$auth.user.full_name
    this.newData.email = this.$auth.user.email
    if (this.$auth.user.phone.includes(' ')) {
      this.newData.phone =
        this.$auth.user.phone.split(' ')[0] +
        this.$auth.user.phone.split(' ')[1]
    } else {
      this.newData.phone = this.$auth.user.phone
    }
    this.newData.currentPassword = ''
    this.newData.newPassword = ''
    console.log(this.newData)
    this.fname = this.newData.full_name
  },
  methods: {
    async UpdateData() {
      this.newData.full_name = this.fname
      this.newData.id = this.$auth.user.id
      this.newData.phone =
        this.newData.phone.slice(0, 5) + ' ' + this.newData.phone.slice(5, 10)
      try {
        const { data } = await this.$axios.post(
          '/api/user/update',
          this.newData
        )
        console.log(data)
        if (data.success) {
          this.$swal({
            title: 'Data updated successfully',
            toast: true,
            timer: true
          }).then(() => {
            this.$auth.fetchUser()
            this.$emit('closeModal')
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    temp() {
      console.log(this.files)
      // const fileInput = this.$refs.fileInput
      const formData = new FormData() // Append the file to the FormData object
      formData.append('image', this.files[0])
      formData.append('folderName', 'images')
      // formData.image = this.files[0] // files--> v-model
      console.log(formData)
      this.$axios.post('/api/upload-file', formData).then((response) => {
        console.log(response)
        this.$auth.fetchUser()
      })
      // console.log(fileInput)
    }
  }
}
</script>
