<template>
  <v-footer
    color="transparent"
    absolute
    app
    inset
  >
    <v-spacer />
    <div class="text-body-1 font-weight-light pt-6 pt-md-0 text-center">
        &copy; {{ (new Date()).getFullYear() }}, Made by <v-icon>mdi-vuetify</v-icon>
        <a
        href="https://b-iris.mobigen.com"
        class="text-decoration-none"
        >jaeho</a>
    </div>
  </v-footer>
</template>

<script>
  export default {
    name: 'DefaultFooter',
  }
</script>
