import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false,
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
    UPDATE_CLOSEDIALOG(state, payload) {
      state.closeDialog = payload;
    },
    UPDATE_DIALOGALERT(state, payload) {
      Object.assign(state.dialogAlert, payload);
    },
  },

  actions: {
    loadingChange(context, payload) {
      context.commit('UPDATE_LOADING', payload);
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
