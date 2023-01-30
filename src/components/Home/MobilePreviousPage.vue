<template>
  <div ref="smallDevicesImg" class="smallDevices">
    <Transition mode="out-in">
      <a v-if="route.name !== 'Login'" @click="previous">Voltar</a>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const checkRoute = computed(() => route.name);

function previous() {
  router.go(-1);
}

const smallDevicesImg = ref(null);

watch(checkRoute, (actualRoute) => {
  smallDevicesImg.value.style.transition = 'all 700ms';
  if (actualRoute === 'Register') {
    smallDevicesImg.value.classList.add('changeLogo');
  } else {
    smallDevicesImg.value.classList.remove('changeLogo');
  }
});
</script>
