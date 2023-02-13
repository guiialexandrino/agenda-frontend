<template>
  <div>
    <h1 class="__verticalTop">Registrar</h1>
    <p>Por favor preencha os dados abaixo para criar uma nova conta.</p>
    <InputComponent label="Nome" v-model="form.name" />
    <InputComponent label="E-mail" v-model="form.email" />
    <InputComponent label="Senha" v-model="form.password" type="password" />
    <InputComponent
      label="Redigite a senha"
      v-model="form.password2"
      type="password"
    />

    <div class="__alignRight">
      <Button @click="handleRegister">Criar</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Reqs from '../../requisitions/beforeLogin/';

const form = ref({ name: '', email: '', password: '', password2: '' });
const store = useStore();
const router = useRouter();

async function handleRegister() {
  if (form.value.password !== form.value.password2) {
    const info = 'As senhas precisam ser iguais!';
    store.dispatch('dialogAlert', {
      open: true,
      success: false,
      message: 'Erro no cadastro!',
      info: info,
    });
    return;
  }

  try {
    store.dispatch('loadingInit');
    const req = await Reqs.register({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    });

    if (req.success) {
      store.dispatch('dialogAlert', {
        open: true,
        success: true,
        message: 'Cadastro realizado!',
        info: 'Sua conta foi criada com sucesso!',
      });
      form.value = { name: '', email: '', password: '', password2: '' };
      router.push({ name: 'Home' });
    } else {
      store.dispatch('dialogAlert', {
        open: true,
        success: false,
        message: 'Erro no cadastro!',
        info: req.error,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    store.dispatch('loadingDoneMethod');
  }
}
</script>
