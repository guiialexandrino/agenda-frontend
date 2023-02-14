<template>
  <div class="containerNotFound">
    <div class="background"></div>
    <!-- <div class="logo"></div> -->
    <h1>Erro - 404</h1>
    <h2><ph-warning :size="80" weight="bold" /></h2>
    <h2>Página não encontrada!</h2>
    <Button @click="backward">Voltar</Button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

document.title = 'App Agenda | Página não encontrada';

function backward() {
  router.push({ name: 'Login' });
}
</script>

<style src="./PageNotFound.less" />
