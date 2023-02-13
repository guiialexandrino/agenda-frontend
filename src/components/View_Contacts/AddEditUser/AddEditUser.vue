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
    <div class="contentDialog __dialogOverflow">
      <InputComponent label="Nome" v-model="userData.name" />
      <InputComponent label="E-mail" v-model="userData.email" />
      <InputComponent label="Número" v-model="userData.number" />
    </div>
  </div>

  <Transition>
    <div v-if="error" class="__error" v-html="error"></div>
  </Transition>

  <div class="footerDialog">
    <Button :outlined="true" @click="emitCancel">Cancelar</Button>
    <Button
      textHoverColor="white"
      backgroundColor="var(--user-color)"
      backgroundHoverColor="var(--user-color)"
      @click="handleDone"
      >{{ tipo === 'add' ? 'Adicionar' : 'Editar' }}</Button
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Reqs from '../../../requisitions/loggedUser/';

const store = useStore();
const props = defineProps({
  tipo: { type: String, default: 'add' }, // add or edit
  user: { type: Array, default: () => [] },
});
const emits = defineEmits(['done']);

const userData = ref({ name: '', email: '', number: '' });
const error = ref('');

function loadEditDataUser() {
  if (props.tipo === 'edit') userData.value = { ...props.user[0] };
}

loadEditDataUser();

function emitCancel() {
  store.dispatch('closeDialog');
}

async function handleDone() {
  if (props.tipo === 'edit') {
    await editUser();
  } else {
    await addUser();
  }
}

async function addUser() {
  try {
    store.dispatch('loadingInit');
    const req = await Reqs.addContact(
      userData.value.name,
      userData.value.email,
      userData.value.number
    );

    if (req.success) {
      emitCancel();
      store.dispatch('dialogAlert', {
        open: true,
        success: true,
        message: 'Contato adicionado!',
        info: `O contato <b>${req.data.name}</b> foi adicionado`,
      });
      emits('done');
    } else {
      error.value = req.error;
    }
  } catch (e) {
    console.log(e);
  } finally {
    store.dispatch('loadingDoneMethod');
  }
}

async function editUser() {
  try {
    store.dispatch('loadingInit');
    const req = await Reqs.editContact(
      props.user[0].id,
      userData.value.name,
      userData.value.email,
      userData.value.number
    );

    if (req.success) {
      emitCancel();
      store.dispatch('dialogAlert', {
        open: true,
        success: true,
        message: 'Contato editado',
        info: `O contato <b>${req.data.name}</b> foi editado com sucesso!`,
      });
      emits('done');
    } else {
      error.value = req.error;
    }
  } catch (e) {
    console.log(e);
  } finally {
    store.dispatch('loadingDoneMethod');
  }
}
</script>
