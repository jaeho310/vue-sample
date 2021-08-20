import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    items: [
      {
        title: "홈",
        to: '/'
      },
      {
        title: '회원목록',
        to : '/user/list'
      },
      {
        title: '회원등록',
        to : '/user/create'
      },
      {
        title: '카드등록',
        to : '/card/create'
      },
      {
        title: '카드삭제',
        to : '/card/delete'
      },
    ],
    dialogInfo: {
      text: "Dialog 메시지를 입력하세요",
      question: false,
      hideDialog: null,
      submitDialog: null,
    },
    showDialog: false,
    dialogCallback: ()=>{alert("dialog 콜백을 확인해주세요")}
  },
  mutations: {
    dialogManager: function(state, payload) {
      if (payload.question) {
        state.dialogInfo.question = payload.question
      } else if (payload.question == null) {
        state.dialogInfo.question = false
      }

      if (payload.text) {
        state.dialogInfo.text = payload.text
      } else {
        state.dialogInfo.text = "Dialog 메시지를 입력하세요"
      }
      console.log(payload)
      console.log(payload.callback)
      if (payload.callback != null) {
        console.log("suc")
        state.dialogCallback = payload.callback
      } else {
        console.log("fail")
        state.dialogCallback = null
      }

      state.dialogInfo.hideDialog = () => {
        state.showDialog = false
      }
      state.dialogInfo.submitDialog = () => {
        state.showDialog = false
        if (state.dialogCallback) {
          state.dialogCallback()
        }
      }

      if (payload.delay != null) {
        setTimeout(()=>{state.showDialog=true}, payload.delay)
      } else {
        state.showDialog = true
      }
    },
  },
});