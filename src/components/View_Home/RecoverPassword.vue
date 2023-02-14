<template>
  <div>
    <h1 class="__verticalTop">Recuperar senha</h1>
    <div v-if="!correctToken">
      <p>Digite o Token que foi enviado ao seu e-mail:</p>
      <InputComponent
        label="Token"
        v-model="token"
        validation="onlyNumbers"
        maxlength="6"
      />
      <div class="__alignRight">
        <Button @click="validateToken">Checar</Button>
      </div>
    </div>

    <Transition mode="out-in">
      <div v-if="correctToken">
        <p>Digite a sua nova senha:</p>
        <InputComponent label="Nova senha" v-model="password" type="password" />
        <InputComponent
          label="Repita a Nova senha"
          v-model="password2"
          type="password"
        />
        <div class="__alignRight">
          <Button @click="newPassword">Confirmar</Button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Reqs from '../../requisitions/beforeLogin';

const store = useStore();
const route = useRoute();
const router = useRouter();

//Data
const token = ref('');
const correctToken = ref(false);
const password = ref('');
const password2 = ref('');

// Hookies
onBeforeMount(async () => {
  await checkHasSecret();
});

// Methods
async function checkHasSecret() {
  try {
    store.dispatch('loadingInit');
    const req = await Reqs.checkSecret(route.params.id);
    if (!req.secretKey) {
      router.push({ name: 'Home' });
    }
  } catch (e) {
    console.log(e);
  } finally {
    store.dispatch('loadingDoneMethod');
  }
}

async function validateToken() {
  try {
    store.dispatch('loadingInit');
    const req = await Reqs.validateToken(route.params.id, token.value);
    if (req.success) {
      correctToken.value = true;
    } else {
      correctToken.value = false;
      store.dispatch('dialogAlert', {
        open: true,
        success: false,
        message: 'Erro!',
        info: req.error,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    store.dispatch('loadingDoneMethod');
  }
}

async function newPassword() {
  if (password.value !== password2.value) {
    store.dispatch('dialogAlert', {
      open: true,
      success: false,
      message: 'Senhas diferentes',
      info: 'Atenção, as senhas precisam ser <b>iguais.</b>',
    });
    return;
  }

  try {
    store.dispatch('loadingInit');
    const req = await Reqs.newPassword(
      route.params.id,
      token.value,
      password.value
    );
    if (req.success) {
      store.dispatch('dialogAlert', {
        open: true,
        success: true,
        message: 'Senha alterada!',
        info: req.message,
      });
      router.push({ name: 'Home' });
    } else {
      store.dispatch('dialogAlert', {
        open: true,
        success: false,
        message: 'Senha não foi alterada!',
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
