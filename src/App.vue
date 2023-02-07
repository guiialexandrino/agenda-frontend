<template>
  <DialogAlert />
  <Loading v-if="checkLoading" />
  <RouterView v-slot="{ Component }">
    <Transition mode="out-in">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script setup>
import DialogAlert from './components/__Global/Dialog/DialogAlert.vue';
import Loading from './components/__Global/Loading/Loading.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const checkLoading = computed(() => {
  return store.state.loading;
});
</script>

<style src="./App.less" />
