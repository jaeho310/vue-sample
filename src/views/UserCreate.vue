<template>
  <v-container fluid style="width: 35%; margin-top: 10%" tag="section">
    <div class="black--text head">
      <div class="text-h4">
        <v-icon
        large
        >
          mdi-account
        </v-icon>
        회원등록
      </div>
    </div>
    <div class="inputUsername mt-4">
      <v-text-field
      label="Insert Username"
      style="display: inline"
      v-model="name" />
      <v-btn
      color="primary"
      @click="createUser()"
      >
          등록
      </v-btn>
    </div>
    <v-dialog
      max-width="400"
      v-model="$store.state.showDialog"
    >
      <custom-dialog
        :text="dialogInfo.text"
        :question="dialogInfo.question"
        @hide="dialogInfo.hideDialog"
        @submit="dialogInfo.submitDialog"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    data() {
      return {
        name: ""
      }
    },
    computed: {
      ...mapState(["dialogInfo"])
    },
    methods: {
      createUser() {
        this.$http.post(
          'http://localhost:8396/api/users',
          JSON.stringify({
            'name': this.name
          }),
          {
            headers: {
            "Content-Type": `application/json`
          }}
        )
        .then(res => {
          this.$store.commit("dialogManager",{text: '등록완료', question: false, callback: ()=>{this.name=''}})
          // this.name = ''
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>

<style scoped>

</style>