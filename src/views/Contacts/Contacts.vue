<template>
  <section>
    <div class="wrapper-content">
      <!-- Header for SmallScreen  -->
      <div class="smallDevicesHeader">
        <div class="logo"></div>
        <div class="menu">
          <Menu
            color="white"
            @handleProfile="handleProfile"
            @handleUserTheme="handleUserTheme"
            @handleLogout="handleLogout"
          />
        </div>
      </div>

      <!-- Content for SmallScreen  -->
      <div class="smallDevicesContent">
        <div class="contacts-msg-small"><h1>Olá, Fulana</h1></div>
        <Content />
      </div>

      <!-- NormalScreen -->
      <div ref="scroll" class="contacts">
        <!-- Header for NormalScreen -->
        <div class="contacts-content-header">
          <div class="maxWidth flex-verticalCenter flex-spaceBetween">
            <div class="logo"></div>
            <div class="menu">
              <Menu
                @handleProfile="handleProfile"
                @handleUserTheme="handleUserTheme"
                @handleLogout="handleLogout"
              />
            </div>
          </div>
        </div>

        <!-- Content for NormalScreen  -->
        <div class="contacts-content-table">
          <div class="maxWidth">
            <Content />
          </div>
        </div>
        <div ref="welcome" class="contacts-msg"><h1>Olá, Fulana</h1></div>
      </div>

      <!-- Show Profile Picture for All Screens -->
      <div class="container-photo">
        <div class="background-color"></div>
        <div class="photo"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Content from '../../components/View_Contacts/Content.vue';
import Menu from '../../components/View_Contacts/Menu/Menu.vue';

const router = useRouter();

const scroll = ref(null);
const welcome = ref(null);

onMounted(() => {
  scroll.value.addEventListener('scroll', () => {
    const scrolled = scroll.value.scrollTop;

    welcome.value.style.bottom = `-${scrolled}px`;
  });
});

function handleProfile() {
  console.log('alterar perfil');
}

function handleUserTheme(color) {
  console.log('alterar tema', color);
}

function handleLogout() {
  router.push({ name: 'Home' });
}
</script>

<style src="./Contacts.less" scoped />
