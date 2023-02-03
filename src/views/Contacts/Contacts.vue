<template>
  <section>
    <div class="wrapper-content">
      <!-- NormalScreen -->
      <div ref="scroll" class="contacts">
        <div class="contacts-content-header">
          <div class="maxWidth flex-verticalCenter flex-spaceBetween">
            <div class="logo"></div>
            <div class="menu">Menu</div>
          </div>
        </div>
        <div class="contacts-content-table">
          <div class="maxWidth">
            <Content />
          </div>
        </div>
        <div ref="welcome" class="contacts-msg"><h1>Olá, Fulana</h1></div>
      </div>
      <!-- Show Profile Picture  -->
      <div class="container-photo">
        <div class="background-color"></div>
        <div class="photo"></div>
      </div>

      <!-- SmallDevices  -->
      <div class="smallDevicesHeader">LogoSmall</div>
      <div class="smallDevicesContent">
        <Content />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Content from '../../components/Contacts/Content.vue';

const scroll = ref(null);
const welcome = ref(null);

onMounted(() => {
  scroll.value.addEventListener('scroll', () => {
    const scrolled = scroll.value.scrollTop;

    welcome.value.style.bottom = `-${scrolled}px`;
  });
});
</script>

<style src="./Contacts.less" scoped />
