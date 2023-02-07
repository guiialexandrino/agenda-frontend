import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false,
    loadingDone: 0,
    closeDialog: 0,
    dialogAlert: {
      open: false,
      success: false,
      message: 'Msg',
      info: 'Info',
    },
  },

  getters: {},

  mutations: {
    UPDATE_LOADING(state, payload) {
      state.loading = payload;
    },
    UPDATE_LOADINGDONE(state, payload) {
      state.loadingDone = payload;
    },
    UPDATE_CLOSEDIALOG(state, payload) {
      state.closeDialog = payload;
    },
    UPDATE_DIALOGALERT(state, payload) {
      Object.assign(state.dialogAlert, payload);
    },
  },

  actions: {
    loadingInit(context) {
      context.commit('UPDATE_LOADING', true);
    },

    loadingDoneMethod(context) {
      context.commit('UPDATE_LOADINGDONE', context.state.loadingDone + 1);
      setTimeout(() => {
        context.commit('UPDATE_LOADING', false);
      }, 430);
    },

    closeDialog(context) {
      context.commit('UPDATE_CLOSEDIALOG', context.state.closeDialog + 1);
    },

    dialogAlert(context, payload) {
      if (typeof payload !== 'object') throw Error('Não é um tipo válido!');
      context.commit('UPDATE_DIALOGALERT', payload);
    },
  },
  modules: {},
});
