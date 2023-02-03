<template>
  <div style="padding-bottom: 30px">
    <Table
      :headers="headers"
      :data="contacts"
      :max-per-page="10"
      checked-color="rgba(0,0,0,0.1)"
      check-attribute-name="checked"
    >
      <template v-slot:nav-buttons>
        <div class="navTableStyle">
          <div>
            <h1>Contatos ({{ contacts.length }})</h1>
          </div>
          <div>
            <Button :outlined="true" :disabled="selectedContacts.length === 0">
              <ph-user-minus :size="16" weight="bold" />
              Deletar
            </Button>
            <Button :outlined="true" :disabled="selectedContacts.length !== 1">
              <ph-pencil-simple-line :size="16" weight="bold" />
              Editar
            </Button>
            <Button
              textHoverColor="white"
              backgroundHoverColor="var(--primary-color)"
              @click=""
            >
              <ph-plus :size="16" weight="bold" />
              Add
            </Button>
          </div>
        </div>
      </template>

      <template v-slot:table-title>
        <h1>Contatos</h1>
      </template>

      <template v-slot:checked="{ item }">
        <div class="input-check">
          <input
            type="checkbox"
            :checked="item.checked"
            @click="handleUser(item)"
          />
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Table from '../__Global/Table/Table.vue';

const table = ref(null);

const headers = ref([
  { label: '', value: 'checked', width: '4%' },
  { label: 'Nome', value: 'name', width: '32%', sort: true },
  { label: 'E-mail', value: 'email', width: '32%', sort: true },
  { label: 'Número', value: 'number', width: '32%' },
]);

const contacts = ref([
  {
    id: '1231',
    name: 'Aristeu',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
  {
    id: '2121',
    name: 'AristeuX',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
  {
    id: '2121b',
    name: 'AristeuZ',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
  {
    id: '21212132',
    name: 'AristeuY',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
  {
    id: '2121as27',
    name: 'Aristéia',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
  {
    id: '2121as27S',
    name: 'AristéiaY',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
  {
    id: '2121as27AS',
    name: 'Aristéia Turbo',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
  {
    id: '2121as27898',
    name: 'Aristéia HH Turbo',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
  {
    id: '2121OO',
    name: 'Aristeteia',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
  {
    id: '2121aKLJ',
    name: 'Aristéia OMG',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
  {
    id: '2121aKLJxasa',
    name: 'Aristéia OMG',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
  {
    id: '2121aKLJdafa',
    name: 'Aristéia OMG',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
]);

const selectedContacts = ref([]);

function handleUser(item) {
  const index = contacts.value.findIndex((contact) => contact.id === item.id);
  contacts.value[index].checked = !contacts.value[index].checked;
  selectedContacts.value = contacts.value.filter((contact) => contact.checked);
}
</script>

<style src="../../views/Contacts/Contacts.less" scoped />
