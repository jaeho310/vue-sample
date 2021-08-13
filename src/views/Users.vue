<template>
  <v-container fluid style="width: 60%; margin-top: 5%" tag="section">
    <div class="pa-5 black--text">
      <div class="text-h4 ">
        <v-icon
        large
        >
          mdi-account
        </v-icon>
        회원목록
      </div>
      <div class="text-caption ml-1 mt-1">
      </div>
    </div>
    <v-col>
      <!-- <v-card -->
      <!-- class="rounded-card" -->
      <!-- color="#EEF4ED" /> -->
      <v-data-table
        :headers="getTableHeaders()"
        :items="users"
        :items-per-page="5"
        :search="search"
        @click:row="clickItem"
      />
    </v-col>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      users: [],
      search: '',
    }
  },
  methods: {
    getTableHeaders() {
      return [
        {
          sortable: false,
          text: "번호",
          value: 'id',
          class: 'blue lighten-5',
          align: 'center'
        },
        {
          sortable: false,
          text: "이름",
          value: 'name',
          class: 'blue lighten-5',
          align: 'center'
        }
      ]
    },
    getTableItems() {
      this.$http.get('http://localhost:8396/api/users')
      .then(res => {
        console.log(res)
        for (var value of res.data.result) {
          this.users.push({id: value.id, name: value.name})
        }
      })
      .catch(err => {
        console.log(err.response)
        // alert(err.response.data)
      })
    },
    clickItem(row) {
      this.$router.push(`/user/detail/${row.id}`)
    }
  },
  mounted() {
    this.getTableItems()
  },
}
</script>
<style scoped>

</style>