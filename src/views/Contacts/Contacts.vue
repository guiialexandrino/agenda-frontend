<template>
  <section>
    <div class="wrapper-content">
      <!-- NormalScreen -->
      <div class="contacts">
        <div class="contacts-content-header">
          <div class="maxWidth flex-verticalCenter flex-spaceBetween">
            <div class="logo"></div>
            <div class="menu">Menu</div>
          </div>
        </div>
        <div class="contacts-content-table">
          <div class="maxWidth">
            <Table
              :headers="headers"
              :data="contacts"
              :max-per-page="5"
              checked-color="rgba(0,0,0,0.1)"
              check-attribute-name="checked"
            >
              <template v-slot:nav-buttons>
                <div class="navTableStyle">
                  <Button :outlined="true">
                    <ph-user-minus :size="16" weight="bold" />
                    Deletar
                  </Button>
                  <Button
                    :outlined="true"
                    :disabled="selectedContacts.length !== 1"
                  >
                    <ph-pencil-simple-line :size="16" weight="bold" />
                    Editar
                  </Button>
                  <Button
                    textHoverColor="white"
                    backgroundHoverColor="var(--primary-color)"
                  >
                    <ph-plus :size="16" weight="bold" />
                    Adicionar
                  </Button>
                </div>
              </template>

              <template v-slot:checked="{ item }">
                <div class="input-check">
                  <input type="checkbox" @click="handleUser(item)" />
                </div>
                <!-- {{ item.checked }} -->
              </template>
            </Table>
          </div>
        </div>
        <div class="contacts-msg"><h1>Olá, Fulana</h1></div>
      </div>
      <!-- Show Profile Picture  -->
      <div class="container-photo">
        <div class="background-color"></div>
        <div class="photo"></div>
      </div>

      <!-- SmallDevices  -->
      <div class="smallDevicesHeader">LogoSmall</div>
      <div class="smallDevicesContent">
        <h1>Content Small Device</h1>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import Table from '../../components/__Global/Table/Table.vue';

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

<style src="./Contacts.less" scoped />
