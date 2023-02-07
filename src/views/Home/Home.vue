<template>
  <div class="wrapperLogin">
    <div ref="left" class="leftSide">
      <div ref="cont" class="content">
        <MobilePreviousPage />
        <RouterView v-slot="{ Component }">
          <Transition mode="out-in">
            <Component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
    <div ref="right" class="rightSide">
      <div ref="confirmButton" class="rightSide-1" @click="handleClick">
        <h1>{{ label }}</h1>
      </div>
      <div ref="logo" class="rightSide-2"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUpdated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MobilePreviousPage from '../../components/View_Home/MobilePreviousPage.vue';

const router = useRouter();
const route = useRoute();

const getLabel = route.name === 'Login' ? 'Registre-se!' : 'Login';
const label = ref(getLabel);

const actualRoute = computed(() => route.name);
watch(actualRoute, (page, previousPage) => {
  if (page === 'Login') label.value = 'Registre-se!';
  if (page === 'Register') label.value = 'Login';
  if (page === 'Forgot Password') label.value = 'Login';
  if (page === 'Register' || previousPage === 'Register')
    translateXEffect(route.name);
});

function handleClick() {
  if (route.name === 'Login') router.push({ name: 'Register' });
  if (route.name === 'Register') router.push({ name: 'Login' });
  if (route.name === 'Forgot Password') router.push({ name: 'Login' });
}

/*Referente a animação */
const left = ref(null);
const right = ref(null);
const confirmButton = ref(null);
const logo = ref(null);
const cont = ref(null);

onMounted(() => {
  translateXEffect(route.name);
  window.document.body.classList.add('__addBackground');
});

function translateXEffect(item) {
  const smallDevice = window.innerWidth <= 1366 ? true : false;
  if (item === 'Register') {
    logo.value.style.animation = 'fadeOut 0.25s';
    setTimeout(() => {
      logo.value.classList.add('changeLogo');
      window.document.body.classList.add('changeBackgroundMobileRed');
      window.document.documentElement.style.setProperty(
        '--primary-color',
        'rgba(210,77,92,1)'
      );

      if (!smallDevice) {
        window.document.body.classList.remove('changeBackgroundMobileRed');
        window.document.body.classList.add('changeBackground');
        left.value.style.transform = 'translateX(100%)';
        right.value.style.transform = 'translateX(-100%)';
        confirmButton.value.style.transform = 'translateX(calc(50vw - 365px))';
        logo.value.style.transform = 'translateX(calc(-50vw + 251px))';
        logo.value.style.display = 'none';
      }
    }, 200);
    setTimeout(() => {
      logo.value.style.animation = 'fadeIn 0.7s';
      logo.value.style.display = 'block';
    }, 700);
  } else {
    logo.value.style.animation = 'fadeOut 0.25s';
    setTimeout(() => {
      logo.value.classList.remove('changeLogo');
      window.document.body.classList.remove('changeBackground');
      window.document.body.classList.remove('changeBackgroundMobileRed');
      window.document.documentElement.style.setProperty(
        '--primary-color',
        'rgba(51, 41, 161, 1)'
      );
      left.value.style.transform = 'translateX(0%)';
      right.value.style.transform = 'translateX(0%)';
      confirmButton.value.style.transform = 'translateX(0px)';
      logo.value.style.transform = 'translateX(0px)';
      logo.value.style.display = 'none';
    }, 200);
    setTimeout(() => {
      logo.value.style.animation = 'fadeIn 0.7s';
      logo.value.style.display = 'block';
    }, 700);
  }
}
</script>

<style lang="less" src="./Home.less" />
