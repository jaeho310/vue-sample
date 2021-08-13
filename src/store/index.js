import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        items: [
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
          question: false
        },
        showDialog: false
    },
    mutations: {
      dialogManager: function(state, payload) {
        if (payload.question == null) {
          payload.question = false
        }
        state.dialogInfo = payload
        state.dialogInfo.hideDialog = () => {
          state.showDialog = false
        }
        state.dialogInfo.submitDialog = () => {
          state.showDialog = false
          state.dialogInfo.callback()
        }
        if (payload.delay != null) {
          setTimeout(()=>{state.showDialog=true}, payload.delay)
        } else {
          state.showDialog = true
        }
      },
    },

});