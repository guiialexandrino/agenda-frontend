<template>
  <Dialog v-if="dialogC" @close="dialogC = false" />
  <RouterView v-slot="{ Component }">
    <Transition mode="out-in">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script setup>
import { ref } from 'vue';

const dialogC = ref(true);
</script>

<style src="./App.less" />
