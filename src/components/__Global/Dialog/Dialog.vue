<template>
  <div ref="dialog" class="backgroundDialog">
    <div class="dialogCard" :style="`width: ${width}`">
      <div v-if="!noHandleClose" class="closeDialog">
        <Button
          :circle="true"
          backgroundColor="transparent"
          textColor="red"
          @click="handleClose"
        >
          <ph-x :size="20" weight="bold" />
        </Button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  width: { type: String, default: '500px' },
  noHandleClose: { type: Boolean, default: false },
});

const emit = defineEmits(['close']);
const dialog = ref(null);

onMounted(() => {
  window.document.body.style.overflowY = 'hidden';
  dialog.value.style.visibility = 'visible';
  dialog.value.style.animation = 'fadeIn 0.5s';
  window.addEventListener('keyup', checkKeyPressed);
});

onUnmounted(() => {
  window.document.body.style.overflowY = 'auto';
  window.removeEventListener('keyup', checkKeyPressed);
});

function handleClose() {
  dialog.value.style.animation = 'fadeOut 0.5s';
  setTimeout(() => {
    dialog.value.style.animation = 'none';
    emit('close');
  }, 450);
}

function checkKeyPressed(e) {
  if (e.defaultPrevented) return;
  if (e.keyCode === 27 || (e.key === 'Escape' && dialog.value)) {
    handleClose();
  }
}

const store = useStore();
const closeDialogVuex = computed(() => store.state.closeDialog);
watch(closeDialogVuex, () => {
  handleClose();
});
</script>

<style src="./Dialog.less" />
