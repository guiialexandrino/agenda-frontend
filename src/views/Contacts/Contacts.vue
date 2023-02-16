<template>
  <section ref="backgroundThemeColor">
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
        <div
          ref="backgroundSmallThemeColor"
          class="backgroundSmallDevices"
        ></div>
        <div class="contacts-msg-small">
          <h1>Olá, {{ userName }}</h1>
        </div>
        <Content />
      </div>

      <!-- NormalScreen -->
      <div ref="scroll" class="contacts">
        <!-- Header for NormalScreen -->
        <div class="contacts-content-header">
          <div class="maxWidth __flex-verticalCenter __flex-spaceBetween">
            <div ref="logo" class="logo"></div>
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
        <div ref="welcome" class="contacts-msg">
          <h1>Olá, {{ userName }}</h1>
        </div>
      </div>

      <!-- Show Profile Picture for All Screens -->
      <div :style="userAvatar" class="container-photo">
        <Button
          id="btn"
          backgroundColor="white"
          backgroundHoverColor="var(--user-color)"
          textColor="var(--user-color)"
          textHoverColor="white"
          @click="handleChangePhoto"
        >
          <ph-user-focus :size="16" weight="bold" />
          Alterar Foto
        </Button>
        <Button
          id="restore-btn"
          :circle="true"
          backgroundColor="white"
          backgroundHoverColor="var(--user-color)"
          textColor="var(--user-color)"
          textHoverColor="white"
          :disabled="
            userAvatar === `background-image: var(--image)` ? true : false
          "
          @click="askWannaRestorePhoto"
        >
          <ph-eraser :size="18" weight="bold" />
        </Button>
        <div class="background-color"></div>
        <div :style="userAvatar" class="photo"></div>
      </div>
    </div>

    <Dialog v-if="dialogPhoto" @close="dialogPhoto = false" width="800px">
      <ChangePhoto @done="loadInfoUser" />
    </Dialog>

    <Dialog v-if="dialogProfile" @close="dialogProfile = false">
      <EditProfile @done="loadInfoUser" />
    </Dialog>

    <Dialog v-if="dialogRestorePhoto" @close="dialogRestorePhoto = false">
      <RestorePhoto @done="loadInfoUser" />
    </Dialog>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import localforage from 'localforage';
import Content from '../../components/View_Contacts/Content.vue';
import Menu from '../../components/View_Contacts/Menu/Menu.vue';
import EditProfile from '../../components/View_Contacts/EditProfile/EditProfile.vue';
import ChangePhoto from '../../components/View_Contacts/ChangePhoto/ChangePhoto.vue';
import RestorePhoto from '../../components/View_Contacts/RestorePhoto/RestorePhoto.vue';
import { upload } from '../../requisitions/base/baseUrl.js';

const router = useRouter();
const store = useStore();

const scroll = ref(null);
const welcome = ref(null);
const logo = ref(null);
const backgroundThemeColor = ref(null);
const backgroundSmallThemeColor = ref(null);
const dialogPhoto = ref(false);
const dialogProfile = ref(false);
const dialogRestorePhoto = ref(false);
const userName = ref('');
const userAvatar = ref('');

document.title = 'App Agenda | Seus contatos';

onMounted(async () => {
  await loadInfoUser();
  scroll.value.addEventListener('scroll', () => {
    const scrolled = scroll.value.scrollTop;

    welcome.value.style.bottom = `-${scrolled}px`;
  });

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

function handleProfile() {
  dialogProfile.value = true;
}

function handleChangePhoto() {
  dialogPhoto.value = true;
}

function askWannaRestorePhoto() {
  dialogRestorePhoto.value = true;
}

async function loadInfoUser() {
  const user = await localforage.getItem('user');
  userName.value = user.name.split(' ')[0];
  userAvatar.value = user.avatar
    ? `background-image: url(${upload}/${user.avatar})`
    : 'background-image: var(--image)';
}

async function handleUserTheme(color) {
  const themeInfo = { ...color };
  const user = await localforage.getItem('user'); // carrega usuario
  const loadTheme = await localforage.getItem('theme'); // tenta carregar

  if (!loadTheme) {
    const theme = [{ user: user.id, ...themeInfo }];
    await localforage.setItem('theme', theme); // save -> localforage
  } else {
    const results = loadTheme.filter((users) => {
      return users.user !== user.id;
    });
    results.push({ user: user.id, ...themeInfo });
    await localforage.setItem('theme', results);
  }

  window.document.documentElement.style.setProperty(
    '--user-color',
    color.color
  );
  window.document.documentElement.style.setProperty(
    '--primary-color',
    color.color
  );

  //Remove antes
  const themes = ['defaultTheme', 'redTheme', 'greenTheme', 'pinkTheme'];
  themes.forEach((theme) => {
    logo.value.classList.remove(theme);
    backgroundThemeColor.value.classList.remove(`${theme}Background`);
    backgroundSmallThemeColor.value.classList.remove(`${theme}Background`);
  });

  //Altera cor do logo e fundo
  logo.value.classList.add(color.theme);
  backgroundThemeColor.value.classList.add(`${color.theme}Background`);
  backgroundSmallThemeColor.value.classList.add(`${color.theme}Background`);
}

async function handleLogout() {
  router.push({ name: 'Home' });
  window.document.documentElement.style.setProperty(
    '--user-color',
    'rgba(51, 41, 161, 1)'
  );
  window.document.documentElement.style.setProperty(
    '--primary-color',
    'rgba(51, 41, 161, 1)'
  );
  await localforage.removeItem('user');
}
</script>

<style lang="less" src="./Contacts.less" scoped />
