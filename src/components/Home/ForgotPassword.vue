<template>
  <h1>Esqueceu a senha?</h1>
  <p>Digite seu e-mail para receber uma nova senha:</p>
  <InputComponent label="E-mail" v-model="email" />
  <button>Enviar</button>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
</script>

<style lang="less" scoped />
