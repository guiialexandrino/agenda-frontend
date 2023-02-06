<template>
  <div ref="dialog" class="backgroundDialog">
    <div class="dialogCard" :style="`width: ${width}`">
      <div class="closeDialog">
        <Button
          :circle="true"
          backgroundColor="transparent"
          textColor="red"
          @click="handleClose"
        >
          <ph-x :size="20" weight="bold" />
        </Button>
      </div>
      <slot name="header"></slot>
      <div class="dialogContent">
        <slot name="content"></slot>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  width: { type: String, default: '800px' },
});

const emit = defineEmits(['close']);

const dialog = ref(null);

onMounted(() => {
  dialog.value.focus();
  window.document.body.style.overflowY = 'hidden';
  dialog.value.style.visibility = 'visible';
  dialog.value.style.animation = 'fadeIn 0.5s';
  window.addEventListener('keyup', handleClose);
});

onUnmounted(() => {
  window.document.body.style.overflowY = 'auto';
  window.removeEventListener('keyup', handleClose);
});

function handleClose() {
  dialog.value.style.animation = 'fadeOut 0.5s';
  setTimeout(() => {
    dialog.value.style.animation = 'none';
    emit('close');
  }, 500);
}
</script>

<style scoped src="./Dialog.less" />
