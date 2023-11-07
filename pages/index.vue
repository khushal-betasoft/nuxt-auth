<template>
  <v-container fluid>
    <v-container>
      <v-img width="50" rounded :src="img"></v-img>
    </v-container>
    <!-- <v-card-text>{{ $auth.user.name }}</v-card-text> -->

    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-img>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      img: ''
    }
  }
}
</script>
