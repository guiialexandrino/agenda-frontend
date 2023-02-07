<template>
  <div>
    <h1 class="__verticalTop">Esqueceu a senha?</h1>
    <p>Digite seu e-mail para receber uma nova senha:</p>
    <InputComponent label="E-mail" v-model="email" />
    <div class="__alignRight">
      <Button>Enviar</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
</script>

<style lang="less" scoped />
