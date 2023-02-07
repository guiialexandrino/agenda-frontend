<template>
  <div class="headerDialog">
    <h1>
      <span>
        <ph-user-minus :size="32" weight="bold" />
      </span>
      Deletar
    </h1>
  </div>
  <div class="__flex-verticalCenter __flex-horizontalCenter">
    <div class="contentAlertDialog __dialogOverflow">
      <span v-html="usersAmountMessage"></span>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.number }}
        </li>
      </ul>
    </div>
  </div>
  <div class="footerDialog">
    <Button :outlined="true" @click="emitCancel">Cancelar</Button>
    <Button
      textHoverColor="white"
      backgroundColor="var(--user-color)"
      backgroundHoverColor="var(--user-color)"
    >
      Confirmar
    </Button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  users: { type: Array },
});

const usersAmountMessage = computed(() => {
  if (props.users.length > 1)
    return 'Atenção deseja <strong>deletar</strong> os contatos abaixo?';
  else return 'Atenção deseja <strong>deletar</strong> o contato abaixo?';
});

function emitCancel() {
  store.dispatch('closeDialog');
}
</script>
