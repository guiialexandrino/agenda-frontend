<template>
  <div>
    <h1 class="__verticalTop">Recuperar senha</h1>
    <p>Digite o Token que foi enviado ao seu e-mail:</p>
    <InputComponent label="Token" v-model="token" />
    <div class="__alignRight">
      <Button>Enviar</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const token = ref('');
</script>
