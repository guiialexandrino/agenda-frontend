<template>
  <div>
    <h1 class="__verticalTop">Registrar</h1>
    <p>Por favor preencha os dados abaixo para criar uma nova conta.</p>
    <InputComponent label="Nome" v-model="nome" />
    <InputComponent label="E-mail" v-model="email" />
    <InputComponent label="Senha" v-model="senha" type="password" />
    <InputComponent label="Redigite a senha" v-model="senha2" type="password" />

    <div class="__alignRight">
      <Button>Criar</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const nome = ref('');
const email = ref('');
const senha = ref('');
const senha2 = ref('');
</script>
