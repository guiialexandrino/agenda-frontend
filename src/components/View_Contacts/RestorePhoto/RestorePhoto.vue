<template>
  <div class="headerDialog">
    <h1>
      <span>
        <ph-eraser :size="32" weight="bold" />
      </span>
      Restaurar
      <br />
    </h1>
  </div>
  <div class="__flex-verticalCenter __flex-horizontalCenter">
    Deseja restaurar a foto padrão da aplicação?
  </div>

  <div class="footerDialog">
    <Button :outlined="true" @click="emitCancel">Cancelar</Button>
    <Button
      textHoverColor="white"
      backgroundColor="var(--user-color)"
      backgroundHoverColor="var(--user-color)"
      @click="handleDone"
      >Sim, desejo!</Button
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Reqs from '../../../requisitions/loggedUser';
import localforage from 'localforage';

const store = useStore();
const emits = defineEmits(['done']);

function emitCancel() {
  store.dispatch('closeDialog');
}

async function handleDone() {
  await restorePhoto();
}

async function restorePhoto() {
  store.dispatch('loadingInit');
  try {
    const req = await Reqs.restoreAvatar();
    if (req.success) {
      emitCancel();
      store.dispatch('dialogAlert', {
        open: true,
        success: true,
        message: 'Foto default restaurada!',
        info: `A foto padrão da aplicação foi restaurada!`,
      });
      await localforage.setItem('user', req.data);
      emits('done');
    }
  } catch (e) {
    console.log(e);
  } finally {
    store.dispatch('loadingDoneMethod');
  }
}
</script>
