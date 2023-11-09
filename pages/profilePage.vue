<template>
  <v-container v-if="!openModal">
    <v-card elevation="7" width="700" class="mx-auto">
      <v-app-bar dark color="red" class="mx-auto text-h5">Profile</v-app-bar>
      <div class="text-center my-4">
        <v-badge
          bordered
          bottom
          color="deep-purple accent-4"
          icon="mdi-update"
          offset-x="20"
          offset-y="20"
          size="20"
        >
          <v-avatar color="red" size="100" class="mx-auto" @click="show">
            <span
              v-if="userData.profile_picture == ''"
              class="white--text text-h5"
              >{{ initiator }}</span
            >
            <v-img v-else cover :src="$auth.user.profile_picture"></v-img>
          </v-avatar>
        </v-badge>
        <v-divider></v-divider>
        <v-btn>Change Profile Picture</v-btn>
      </div>

      <v-list width="600" class="mx-auto">
        <v-list-item>
          <v-list-item-title>Full Name:</v-list-item-title>

          <v-list-item-subtitle class="text-right" align-center>
            {{ userData.full_name }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Email:</v-list-item-title>

          <v-list-item-subtitle class="text-right">
            {{ userData.email }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Phone Number:</v-list-item-title>
          <v-list-item-subtitle class="text-right">
            +{{ userData.country_code }}
            {{ userData.phone }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Gender:</v-list-item-title>
          <v-list-item-subtitle class="text-right">
            {{ userData.profile.gender }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Date of Birth:</v-list-item-title>
          <v-list-item-subtitle class="text-right">
            {{ userData.profile.dob }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Address:</v-list-item-title>
          <v-list-item-subtitle class="text-right" align-center>
            {{ userData.userAddress.full_address }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small color="orange" @click="toggleOpen">Update Profile</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  <profileModal v-else @closeModal="toggleOpen"></profileModal>
</template>
<script>
export default {
  components: {
    profileModal: () => import('@/modal/profileModal.vue')
  },
  data() {
    return {
      userData: this.$auth.user,
      openModal: false,
      initiator: this.$auth.user.full_name[0]
    }
  },
  mounted() {
    console.log(this.$auth.user)
    if (this.$auth.user.full_name.includes(' ')) {
      this.initiator =
        this.$auth.user.full_name.slice(0, 1) +
        this.$auth.user.full_name.split(' ')[1].slice(0, 1)
      this.$auth.user.init = this.initiator
    }
  },
  methods: {
    toggleOpen() {
      this.openModal = !this.openModal
    },
    show() {
      alert('showed')
    }
  }
}
</script>
