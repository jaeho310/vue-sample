<template>
  <v-app>
      <default-header />
      <default-view />
      <default-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',

    components: {
      // 헤더
      DefaultHeader: () => import(
        './Header'
      ),
      // 바디
      DefaultView: () => import(
        './View'
      ),
      // 푸터
      DefaultFooter: () => import(
        './Footer'
      ),
    },
  }
</script>
