import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false,
  },
  getters: {},
  mutations: {
    UPDATE_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    loadingChange(context, payload) {
      context.commit('UPDATE_LOADING', payload);
    },
  },
  modules: {},
});
