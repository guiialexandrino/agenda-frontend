<template>
  <div class="headerDialog">
    <h1>
      <span>
        <ph-user :size="32" weight="bold" />
      </span>
      Editar Perfil
      <br />
    </h1>
  </div>
  <div class="__alignCenter">Nenhum campo é obrigatório ***</div>
  <div class="__flex-verticalCenter __flex-horizontalCenter">
    <div class="contentDialog __dialogOverflow">
      <InputComponent label="Nome" v-model="userData.name" />
      <span style="font-size: 0.92rem">Email atual: {{ actualEmail }}</span>
      <InputComponent label="Novo E-mail" v-model="userData.email" />
      <InputComponent
        label="Nova Senha"
        v-model="userData.password"
        type="password"
      />
      <InputComponent
        label="Repita a Nova Senha"
        v-model="userData.password2"
        type="password"
      />
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
      >Editar</Button
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import Reqs from '../../../requisitions/loggedUser';
import localforage from 'localforage';

const store = useStore();
const emits = defineEmits(['done']);

const actualEmail = ref();
const userData = ref({
  name: '',
  email: '',
  password: '',
  password2: '',
});
const error = ref('');

onMounted(async () => {
  const user = await localforage.getItem('user');
  if (user) {
    userData.value.name = user.name;
    actualEmail.value = user.email;
  }
});

function emitCancel() {
  store.dispatch('closeDialog');
}

async function handleDone() {
  await editProfile();
}

async function editProfile() {
  if (userData.value.password !== userData.value.password2) {
    error.value = 'As senhas tem que ser iguais!';
    return;
  }

  const dataToChange = { ...userData.value };
  delete dataToChange[`password2`];

  for (let i in dataToChange) {
    if (!dataToChange[i]) {
      delete dataToChange[i];
    }
  }

  try {
    store.dispatch('loadingInit');
    const req = await Reqs.editProfile({ ...dataToChange });

    if (req.success) {
      emitCancel();
      store.dispatch('dialogAlert', {
        open: true,
        success: true,
        message: 'Perfil editado',
        info: `Seu perfil foi editado com sucesso!`,
      });
      await localforage.setItem('user', req.data);
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
