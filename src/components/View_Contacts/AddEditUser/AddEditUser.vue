<template>
  <div class="headerDialog">
    <h1>
      <span v-if="tipo === 'add'">
        <ph-user-plus :size="32" weight="bold" />
      </span>
      <span v-else>
        <ph-pencil-simple-line :size="32" weight="bold" />
      </span>
      {{ tipo === 'add' ? 'Adicionar Contato' : 'Editar Contato' }}
    </h1>
  </div>
  <div class="__flex-verticalCenter __flex-horizontalCenter">
    <div class="contentDialog">
      <InputComponent label="Nome" v-model="userData.name" />
      <InputComponent label="E-mail" v-model="userData.email" />
      <InputComponent label="Número" v-model="userData.number" />
    </div>
  </div>
  <div class="footerDialog">
    <Button :outlined="true" @click="emitCancel">Cancelar</Button>
    <Button
      textHoverColor="white"
      backgroundColor="var(--user-color)"
      backgroundHoverColor="var(--user-color)"
      >{{ tipo === 'add' ? 'Adicionar' : 'Editar' }}</Button
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  tipo: { type: String, default: 'add' }, // add or edit
  user: { type: Array, default: () => [] },
});

const userData = ref({ name: '', email: '', number: '' });

function loadEditDataUser() {
  if (props.tipo === 'edit') userData.value = { ...props.user[0] };
}

loadEditDataUser();

function emitCancel() {
  store.dispatch('closeDialog');
}
</script>

<style src="./AddEditUser.less" scoped />