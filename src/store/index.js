import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false,
    closeDialog: 0,
  },
  getters: {},
  mutations: {
    UPDATE_LOADING(state, payload) {
      state.loading = payload;
    },
    UPDATE_CLOSEDIALOG(state, payload) {
      state.closeDialog = payload;
    },
  },
  actions: {
    loadingChange(context, payload) {
      context.commit('UPDATE_LOADING', payload);
    },

    closeDialog(context) {
      context.commit('UPDATE_CLOSEDIALOG', context.state.closeDialog + 1);
    },
  },
  modules: {},
});
