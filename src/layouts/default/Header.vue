<template>
  <div>
    <v-app-bar
      color="blue lighten-2"
      dense
      dark
    >
      <!-- <v-btn icon>
        <v-icon>mdi-badge-account-horizontal-outline</v-icon>
      </v-btn> -->

      <v-menu
        right
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(n,idx) in $store.state.items"
            :key="idx"
            :to="n.to"
          >
            <v-list-item-title> {{ n.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-title>Vue sample</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
  }
</script>