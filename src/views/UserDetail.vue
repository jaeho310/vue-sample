<template>
  <v-container fluid style="width: 55%; margin-top: 5%" tag="section">
    <div class="mb-5 black--text">
      <div class="text-h4 ">
        <v-icon
        large
        >
          mdi-account-check
        </v-icon>
        상세정보
      </div>
      <div class="text-caption ml-1 mt-1">
      </div>
    </div>
    <v-text-field
      v-model="id"
      label="번호"
      outlined
      readonly
      color="black"
      background-color="#EFEFEF"
      dense
    ></v-text-field>
    <v-text-field
      v-model="name"
      label="이름"
      outlined
      color="success"
      dense
    ></v-text-field>
    <v-text-field
      v-model="createdAt"
      label="가입일"
      outlined
      readonly
      color="black"
      background-color="#EFEFEF"
      dense
    ></v-text-field>
    <v-text-field
      v-model="updatedAt"
      label="변경일"
      outlined
      readonly
      color="black"
      background-color="#EFEFEF"
      dense
    ></v-text-field>
    <v-text-field
      v-model="cardData"
      label="보유카드(한도)"
      outlined
      readonly
      color="black"
      background-color="#EFEFEF"
      dense
    ></v-text-field>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn
      color="primary"
      @click="updateUser"
      >
        변경
      </v-btn>

      <v-btn class="ml-3 mr-3"
      color="primary"
      @click="$store.commit('dialogManager', {text:'삭제하시겠습니까?', question: true, callback: deleteUser})"
      >
      <!-- @click="dialogManager('삭제하시겠습니까?', true, deleteUser)" -->
        삭제
      </v-btn>
      <v-btn
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
  mounted() {
    this.getUser(this.$route.params.userId)
  },
  data() {
    return {
      id: '',
      oldName: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      cardData: '',
    }
  },
  computed: {
    ...mapState(["dialogInfo"])
  },
  methods: {
    getUser(userId) {
      this.$http.get(`http://localhost:8396/api/users/${userId}`)
      .then(res => {
        console.log(res.data.result)
        this.fillTextAria(res.data.result)
      })
      .catch(err => {
        console.log(err)
      })
    },
    fillTextAria(data) {
      this.id = data.id
      this.oldName = data.name
      this.name = data.name
      this.createdAt = data.createdAt
      this.updatedAt = data.updatedAt
      if (data.cards == null) {
        this.cardData = "없음"
      } else {
        let cardArray = []
        for ( var value of data.cards) {
          cardArray.push(value.name + '(' + String(value.limit) + ')')
        }
        this.cardData = cardArray.join(", ")
      }
    },
    updateUser() {
      if (this.oldName == this.name) {
        this.$store.commit('dialogManager', {text:'변경사항이 없습니다.', delay: 120})
        return
      }
      this.$http.patch(
          `http://localhost:8396/api/users`,
          JSON.stringify({
            id: this.id,
            name: this.name
          }),
          {
            headers: {
            "Content-Type": `application/json`
          }}
        )
        .then(res => {
          this.$store.commit('dialogManager', {text:'변경되었습니다.', callback: this.toUserList, delay: 120})
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteUser() {
      this.$http.delete(
          `http://localhost:8396/api/users/${this.id}`,
          {
            headers: {
            "Content-Type": `application/json`
          }}
        )
        .then(res => {
          this.$store.commit('dialogManager', {text:'삭제되었습니다.', callback: this.toUserList, delay: 120})
        })
        .catch(err => {
          console.log(err)
        })
    },
    toUserList() {
      this.$router.push("/user/list")
    },
  },
}
</script>

<style scoped>

</style>