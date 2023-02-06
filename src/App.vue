<template>
  <!-- <RouterView /> -->
  <RouterView v-slot="{ Component }">
    <Transition mode="out-in">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style src="./App.less" />
