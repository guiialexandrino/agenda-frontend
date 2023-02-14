<template>
  <div class="menu-burger" tabindex="0" @focusout="handleFocusOut">
    <Button
      :circle="true"
      backgroundColor="transparent"
      :textColor="color"
      :removeFocus="false"
      @click="handleMenu"
    >
      <ph-list :size="20" weight="bold" />
    </Button>

    <Transition name="menu">
      <div v-if="menuState" class="menu-options">
        <ul>
          <li @click="handleProfile">Meu Perfil</li>
          <li>
            Tema
            <div class="selectThemes">
              <div
                v-for="(color, index) in colorThemes"
                :key="index"
                :style="`background-color: ${color.color}`"
                @click="handleUserTheme(color)"
              ></div>
            </div>
          </li>
          <li @click.self="handleLogout">Logout</li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  color: { type: String, default: 'var(--primary-color)' },
});

const menuState = ref(false);
const colorThemes = ref([
  {
    theme: 'defaultTheme',
    color: 'rgba(51, 41, 161, 1)',
    background: 'Background.png',
  },
  {
    theme: 'redTheme',
    color: 'rgba(210,77,92,1)',
    background: 'Background2.png',
  },
]);

function handleMenu() {
  menuState.value = !menuState.value;
}

function handleFocusOut() {
  setTimeout(() => {
    menuState.value = false;
  }, 100);
}

const emit = defineEmits(['handleProfile', 'handleUserTheme', 'handleLogout']);

function handleProfile() {
  emit('handleProfile');
}

function handleUserTheme(color) {
  emit('handleUserTheme', color);
}

function handleLogout() {
  emit('handleLogout');
}
</script>

<style src="./Menu.less" scoped />
