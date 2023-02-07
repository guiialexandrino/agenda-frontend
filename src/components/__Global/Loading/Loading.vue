<template>
  <div ref="loading" class="backgroundDialog">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<!-- 
How use?

1) store.dispatch('loadingInit');
2) store.dispatch('loadingDone');
 -->

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';

const loading = ref(null);
const store = useStore();

onMounted(() => {
  window.document.body.style.overflowY = 'hidden';
  loading.value.style.visibility = 'visible';
  loading.value.style.animation = 'fadeIn 0.5s';
});

const isLoading = computed(() => {
  return store.state.loadingDone;
});

watch(isLoading, () => {
  loading.value.style.animation = 'none';
  loading.value.style.animation = 'fadeOut 0.5s';
  window.document.body.style.overflowY = 'auto';
});
</script>

<style lang="less" scoped src="./Loading.less" />
