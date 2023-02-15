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
          @click="handleRestorePhoto"
        >
          <ph-eraser :size="18" weight="bold" />
        </Button>
        <div class="background-color"></div>
        <div :style="userAvatar" class="photo"></div>
      </div>
    </div>

    <Dialog v-if="dialogPhoto" @close="dialogPhoto = false" width="800px">
      <ChangePhoto @done="uploadDone" />
    </Dialog>

    <Dialog v-if="dialogProfile" @close="dialogProfile = false">
      <EditProfile @done="uploadDone" />
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
import { upload } from '../../requisitions/base/baseUrl.js';
import Reqs from '../../requisitions/loggedUser';

const router = useRouter();
const store = useStore();

const scroll = ref(null);
const welcome = ref(null);
const logo = ref(null);
const backgroundThemeColor = ref(null);
const dialogPhoto = ref(false);
const dialogProfile = ref(false);
const userName = ref('');
const userAvatar = ref('');

document.title = 'App Agenda | Seus contatos';

onMounted(async () => {
  await uploadDone();
  scroll.value.addEventListener('scroll', () => {
    const scrolled = scroll.value.scrollTop;

    welcome.value.style.bottom = `-${scrolled}px`;
  });

  //check has User Theme
  const theme = await localforage.getItem('theme');
  if (theme) {
    await handleUserTheme(theme);
  }
});

function handleProfile() {
  dialogProfile.value = true;
}

async function handleUserTheme(color) {
  const themeInfo = { ...color };
  await localforage.setItem('theme', themeInfo); // save -> localforage

  window.document.documentElement.style.setProperty(
    '--user-color',
    color.color
  );
  window.document.documentElement.style.setProperty(
    '--primary-color',
    color.color
  );
  window.document.documentElement.style.setProperty(
    '--background-small-devices',
    `url('/src/assets/images/${color.background}')`
  );

  //Remove antes
  logo.value.classList.remove('defaultTheme');
  logo.value.classList.remove('redTheme');
  logo.value.classList.remove('greenTheme');
  logo.value.classList.remove('pinkTheme');
  backgroundThemeColor.value.classList.remove('defaultThemeBackground');
  backgroundThemeColor.value.classList.remove('redThemeBackground');
  backgroundThemeColor.value.classList.remove('greenThemeBackground');
  backgroundThemeColor.value.classList.remove('pinkThemeBackground');

  //Altera cor do logo e fundo
  logo.value.classList.add(color.theme);
  backgroundThemeColor.value.classList.add(`${color.theme}Background`);
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

function handleChangePhoto() {
  dialogPhoto.value = true;
}

async function uploadDone() {
  const user = await localforage.getItem('user');
  userName.value = user.name.split(' ')[0];
  userAvatar.value = user.avatar
    ? `background-image: url(${upload}/${user.avatar})`
    : 'background-image: var(--image)';
}

async function handleRestorePhoto() {
  store.dispatch('loadingInit');
  try {
    const req = await Reqs.restoreAvatar();
    if (req.success) {
      store.dispatch('dialogAlert', {
        open: true,
        success: true,
        message: 'Foto default restaurada!',
        info: `A foto padrão da aplicação foi restaurada!`,
      });
      await localforage.setItem('user', req.data);
      await uploadDone();
    }
  } catch (e) {
    console.log(e);
  } finally {
    store.dispatch('loadingDoneMethod');
  }
}
</script>

<style lang="less" src="./Contacts.less" scoped />
