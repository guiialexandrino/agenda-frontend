<template>
  <Dialog
    v-if="alert.open"
    @close="closeAlert"
    :noHandleClose="true"
    width="450px"
  >
    <div class="headerDialog">
      <h1 v-if="alert.success"><ph-check-circle :size="62" weight="bold" /></h1>
      <h1 v-else><ph-x-circle :size="62" weight="bold" /></h1>
    </div>
    <div class="__flex-verticalCenter __flex-horizontalCenter">
      <div class="contentAlertDialog __dialogOverflow">
        <h3 v-html="alert.message"></h3>
        <span v-html="alert.info"></span>
      </div>
    </div>
    <div class="footerDialog">
      <Button
        :outlined="true"
        backgroundColor="var(--primary-color)"
        outlinedHoverFillColor="var(--primary-color)"
        textHoverColor="white"
        @click="emitCancel()"
        >Ok, entendi!</Button
      >
    </div>
  </Dialog>
</template>

<!-- 
Chamar ele via VUEX 
store.dispatch("dialogAlert", {open: false, sucess: false, message: 'Msg', info: "Info"}) 
-->

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const alert = computed(() => {
  return store.state.dialogAlert;
});

function emitCancel() {
  store.dispatch('closeDialog');
}

function closeAlert() {
  store.dispatch('dialogAlert', { open: false });
}
</script>
