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

  <Transition>
    <div v-if="error" class="__error" v-html="error"></div>
  </Transition>

  <div class="footerDialog">
    <Button :outlined="true" @click="emitCancel">Cancelar</Button>
    <Button
      textHoverColor="white"
      backgroundColor="var(--user-color)"
      backgroundHoverColor="var(--user-color)"
      @click="handleDelete"
    >
      Confirmar
    </Button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Reqs from '../../../requisitions/loggedUser';

const store = useStore();
const emits = defineEmits(['done']);
const props = defineProps({
  users: { type: Array },
});
const error = ref('');

const usersAmountMessage = computed(() => {
  if (props.users.length > 1)
    return 'Atenção deseja <strong>deletar</strong> os contatos abaixo?';
  else return 'Atenção deseja <strong>deletar</strong> o contato abaixo?';
});

function emitCancel() {
  store.dispatch('closeDialog');
}

async function handleDelete() {
  props.users.forEach(async (user, index) => {
    try {
      store.dispatch('loadingInit');
      const req = await Reqs.deleteContact(user.id);

      if (req.success && index === props.users.length - 1) {
        let msg =
          props.users.length > 1 ? 'Contatos deletados' : 'Contato deletado';

        let info =
          props.users.length > 1
            ? 'Os contatos foram deletados com sucesso!'
            : `O contato <b>${req.removed.name}</b> foi deletado com sucesso!`;

        emitCancel();
        store.dispatch('dialogAlert', {
          open: true,
          success: true,
          message: msg,
          info: info,
        });
        emits('done');
      } else {
        error.value = req.error;
      }
    } catch (e) {
      console.log(e);
    } finally {
      if (index === props.users.length - 1) store.dispatch('loadingDoneMethod');
    }
  });
}
</script>
