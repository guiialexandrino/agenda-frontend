<template>
  <div style="padding-bottom: 0px">
    <Table
      :headers="headers"
      :data="contacts"
      :max-per-page="10"
      checked-color="rgba(0,0,0,0.1)"
      check-attribute-name="checked"
    >
      <template v-slot:nav-buttons="{ item }">
        <div class="navTableStyle">
          <div>
            <h1>Contatos ({{ contacts.length }})</h1>
          </div>
          <div>
            <Button
              :outlined="true"
              :disabled="selectedContacts.length === 0"
              backgroundColor="var(--user-color)"
              @click="handleDeleteUser"
            >
              <ph-user-minus :size="16" weight="bold" />
              Deletar
            </Button>

            <Button
              :outlined="true"
              :disabled="selectedContacts.length !== 1"
              backgroundColor="var(--user-color)"
              @click="handleEditUser"
            >
              <ph-pencil-simple-line :size="16" weight="bold" />
              Editar
            </Button>
            <Button
              textHoverColor="white"
              backgroundColor="var(--user-color)"
              backgroundHoverColor="var(--user-color)"
              @click="handleAddUser"
            >
              <ph-user-plus :size="16" weight="bold" />
              Add
            </Button>
          </div>
        </div>
      </template>

      <template v-slot:checked="{ item }">
        <div class="input-check">
          <input
            type="checkbox"
            :checked="item.checked"
            @click="handleSelectUser(item)"
          />
        </div>
      </template>
    </Table>

    <!-- Dialogs -->
    <Dialog v-if="dialogAddEdit" @close="dialogAddEdit = false">
      <AddEditUser :tipo="addOrEdit" :user="selectedContacts" @done="refresh" />
    </Dialog>

    <Dialog v-if="dialogDelete" @close="dialogDelete = false">
      <DeleteUser :users="selectedContacts" @done="refresh" />
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import Table from '../__Global/Table/Table.vue';
import AddEditUser from './AddEditUser/AddEditUser.vue';
import DeleteUser from './DeleteUser/DeleteUser.vue';
import Reqs from '../../requisitions/loggedUser';

const table = ref(null);
const contacts = ref([]);
const selectedContacts = ref([]);
const addOrEdit = ref(null);
const dialogAddEdit = ref(false);
const dialogDelete = ref(false);
const store = useStore();

const headers = ref([
  { label: '', value: 'checked', width: '4%' },
  { label: 'Nome', value: 'name', width: '32%', sort: true },
  { label: 'E-mail', value: 'email', width: '32%', sort: true },
  { label: 'Número', value: 'number', width: '32%' },
]);

onBeforeMount(async () => {
  await loadContacts();
});

async function loadContacts() {
  try {
    store.dispatch('loadingInit');
    let req = await Reqs.viewContacts();
    req.data.forEach((contact) => {
      contact.checked = false;
    });
    contacts.value = req.data;
  } catch (e) {
    console.log(e);
  } finally {
    store.dispatch('loadingDoneMethod');
  }
}

async function refresh() {
  selectedContacts.value = [];
  await loadContacts();
}

function handleSelectUser(item) {
  const index = contacts.value.findIndex((contact) => contact.id === item.id);
  contacts.value[index].checked = !contacts.value[index].checked;
  selectedContacts.value = contacts.value.filter((contact) => contact.checked);
}

function handleAddUser() {
  dialogAddEdit.value = true;
  addOrEdit.value = 'add';
}

function handleEditUser() {
  dialogAddEdit.value = true;
  addOrEdit.value = 'edit';
}

function handleDeleteUser() {
  dialogDelete.value = true;
}
</script>

<style src="../../views/Contacts/Contacts.less" scoped />
