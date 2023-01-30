<template>
  <div :class="css">
    <button><slot>Botão</slot></button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  outlined: { type: Boolean, default: false },
});

const css = computed(() => {
  let cssStyle = 'btn';
  if (props.outlined) cssStyle = `${cssStyle} btn-outlined`;
  return cssStyle;
});
</script>

<style src="./Button.less" scoped />
