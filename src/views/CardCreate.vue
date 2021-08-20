<template>
  <v-container fluid style="width: 55%; margin-top: 5%" tag="section">
        <div class="mb-5 black--text">
          <div class="text-h4 ">
            <v-icon
            large
            >
              mdi-cards
            </v-icon>
            카드등록
          </div>
          <div class="text-caption ml-1 mt-1">
          </div>
        </div>
        <v-select
          v-model="selectedUserId"
          :items="userList"
          item-text="name"
          item-value="id"
          label="사용자를 선택해주세요"
          outlined
          dense
        ></v-select>
        <v-text-field
          v-model="cardName"
          label="카드명"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="limit"
          label="한도"
          outlined
          dense
        ></v-text-field>
      <v-row>
          <v-spacer></v-spacer>
          <v-btn
          color="primary"
          @click="createCard"
          >
            등록
          </v-btn>
          <v-btn class="ml-3 mr-3"
          color="primary"
          @click="toUserList"
          >
            목록
          </v-btn>
      </v-row>
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
  computed: {
    ...mapState(["dialogInfo"])
  },
  data() {
    return {
      userList: [],
      cardName: '',
      limit: '',
      selectedUserId: '',
    }
  },
  methods: {
    getUserList() {
      this.$http.get('http://localhost:8396/api/users')
      .then(res => {
        // console.log(res)
        for (var value of res.data.result) {
          this.userList.push(value)
        }
      })
      .catch(err => {
        console.log(err.response)
        // alert(err.response.data)
      })
    },
    createCard() {
      if (this.selectedUser=='') {
        this.$store.commit('dialogManager', {text: '사용자를 선택해주세요'})
        return
      }
      if (this.cardName == "" || this.limit == "") {
        this.$store.commit('dialogManager', {text: '빈칸을 모두 입력해주세요'})
        return
      }
      this.$http.post(
          'http://localhost:8396/api/cards',
          JSON.stringify({
            'name': this.cardName,
            'limit': Number(this.limit),
            'userId': Number(this.selectedUserId)
          }),
          {
            headers: {
            "Content-Type": `application/json`
          }}
        )
        .then(res => {
          this.$store.commit("dialogManager",{text: '등록완료', question: false, callback: this.toUserList, delay: 120})
        })
        .catch(err => {
          console.log(err)
        })
    },
    toUserList() {
      this.$router.push("/user/list")
    }
  },
  mounted() {
    this.getUserList()
  },
}
</script>
<style scoped>

</style>