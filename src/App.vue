<template>
  <DialogAlert />
  <RouterView v-slot="{ Component }">
    <Transition mode="out-in">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script setup>
import DialogAlert from './components/__Global/Dialog/DialogAlert.vue';
</script>

<style src="./App.less" />
