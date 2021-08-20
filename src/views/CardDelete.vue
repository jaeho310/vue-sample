<template>
  <v-container fluid style="width: 55%; margin-top: 5%" tag="section">
    <div class="mb-5 black--text">
      <div class="text-h4 ">
        <v-icon
        large
        >
          mdi-delete
        </v-icon>
        카드삭제
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
      v-on:change="changeCard"
    ></v-select>
    <v-select
      v-model="selectedCardId"
      :items="cardList"
      item-text="name"
      item-value="id"
      label="카드를 선택해주세요"
      outlined
      dense
    ></v-select>
    <v-row>
        <v-spacer></v-spacer>
        <v-btn
        color="primary"
        @click="deleteCard"
        >
          삭제
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
      selectedUserId: "",
      userList: [],
      selectedCardId: "",
      cardList: [],
      userObject: {},
    }
  },
  methods: {
    getUserList() {
      this.$http.get('http://localhost:8396/api/users')
      .then(res => {
        for (var value of res.data.result) {
          this.userList.push(value)
          this.userObject[value.id] = value
        }
      })
      .catch(err => {
        console.log(err.response)
        // alert(err.response.data)
      })
    },
    changeCard(e) {
      console.log(this.userObject)
      this.cardList = (this.userObject[e].cards)
    },
    toUserList() {
      this.$router.push("/user/list")
    },
    deleteCard() {
      let params = new URLSearchParams({
        userId: this.selectedUserId,
        cardId: this.selectedCardId
      }).toString();
      this.$http.delete(
        `http://localhost:8396/api/cards?${params}`
      )
      .then(res => {
        this.$store.commit('dialogManager', {text:'삭제되었습니다.', callback: this.toUserList, delay: 120})
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.getUserList()
  },
}
</script>
<style lang="">

</style>