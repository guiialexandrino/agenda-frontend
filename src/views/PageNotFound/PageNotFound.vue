<template>
  <div class="containerNotFound">
    <div ref="backgroundThemeColor" class="background"></div>
    <!-- <div class="logo"></div> -->
    <h1>Erro - 404</h1>
    <h2><ph-warning :size="80" weight="bold" /></h2>
    <h2>Página não encontrada!</h2>
    <Button
      textHoverColor="white"
      backgroundColor="var(--user-color)"
      backgroundHoverColor="var(--user-color)"
      @click="backward"
      >Voltar</Button
    >
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import localforage from 'localforage';
import { ref, onMounted } from 'vue';

document.title = 'App Agenda | Página não encontrada';

const router = useRouter();
const backgroundThemeColor = ref(null);

onMounted(async () => {
  //check User Theme
  const user = await localforage.getItem('user');
  const loadTheme = await localforage.getItem('theme');

  if (loadTheme) {
    const resultForUser = loadTheme.find((users) => {
      return users.user === user.id;
    });
    if (resultForUser) await handleUserTheme(resultForUser);
  }
});

async function handleUserTheme(color) {
  window.document.documentElement.style.setProperty(
    '--user-color',
    color.color
  );
  window.document.documentElement.style.setProperty(
    '--primary-color',
    color.color
  );

  //Remove antes

  backgroundThemeColor.value.classList.remove('defaultThemeBackground');
  backgroundThemeColor.value.classList.remove('redThemeBackground');
  backgroundThemeColor.value.classList.remove('greenThemeBackground');
  backgroundThemeColor.value.classList.remove('pinkThemeBackground');

  //Altera cor do logo e fundo
  backgroundThemeColor.value.classList.add(`${color.theme}Background`);
}

function backward() {
  router.push({ name: 'Login' });
}
</script>

<style src="./PageNotFound.less" />
