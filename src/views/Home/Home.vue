<template>
  <div ref="wrapper" class="wrapperLogin">
    <div ref="left" class="leftSide">
      <div class="content">
        <RouterView />
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
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const initialLabel = route.name === 'Login' ? 'Registre-se!' : 'Login';
const label = ref(initialLabel);

const actualRoute = computed(() => route.name);
watch(actualRoute, (page) => {
  if (page === 'Login') label.value = 'Registre-se!';
  if (page === 'Register') label.value = 'Login';
  if (page === 'Forgot Password') label.value = 'Login';
});

function handleClick() {
  if (route.name === 'Login') router.push({ name: 'Register' });
  if (route.name === 'Register') router.push({ name: 'Login' });
  if (route.name === 'Forgot Password') router.push({ name: 'Login' });
  logo.value.style.animation = 'fadeOut 0.5s';
  translateXEffect(route.name);
}

console.log(window, 'aqui');

/*Referente a animação */
const wrapper = ref(null);
const left = ref(null);
const right = ref(null);
const confirmButton = ref(null);
const logo = ref(null);

function translateXEffect(route) {
  if (route === 'Login') {
    logo.value.style.animation = 'fadeOut 0.5s';
    logo.value.classList.add('changeLogo');
    wrapper.value.classList.add('changeBackground');
    window.document.documentElement.style.setProperty(
      '--primary-color',
      'rgba(210,77,92,1)'
    );
    setTimeout(() => {
      left.value.style.transform = 'translateX(100%)';
      right.value.style.transform = 'translateX(-100%)';
      confirmButton.value.style.transform = 'translateX(calc(50vw - 365px))';
      logo.value.style.transform = 'translateX(calc(-50vw + 251px))';
      logo.value.style.display = 'none';
    }, 500);
    setTimeout(() => {
      logo.value.style.animation = 'fadeIn 1s';
      logo.value.style.display = 'block';
    }, 1000);
  } else {
    logo.value.style.animation = 'fadeOut 0.5s';
    logo.value.classList.remove('changeLogo');
    wrapper.value.classList.remove('changeBackground');
    window.document.documentElement.style.setProperty(
      '--primary-color',
      'rgba(51, 41, 161, 1)'
    );
    setTimeout(() => {
      left.value.style.transform = 'translateX(0%)';
      right.value.style.transform = 'translateX(0%)';
      confirmButton.value.style.transform = 'translateX(0px)';
      logo.value.style.transform = 'translateX(0px)';
      logo.value.style.display = 'none';
    }, 500);
    setTimeout(() => {
      logo.value.style.animation = 'fadeIn 1s';
      logo.value.style.display = 'block';
    }, 1000);
  }
}
</script>

<style lang="less" src="./Home.less" />
