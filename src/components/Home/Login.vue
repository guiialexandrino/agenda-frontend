<template>
  <h1>Login</h1>
  <span>Realize o login para acessar os seus contatos.</span>
  <input type="text" placeholder="EMAIL" />
  <input type="password" placeholder="PASSWORD" />
  <a @click="handleForgotPassword">Esqueceu a senha?</a><button>Entrar</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function handleForgotPassword() {
  router.push({ name: 'Forgot Password' });
}
</script>

<style lang="less" scoped />
