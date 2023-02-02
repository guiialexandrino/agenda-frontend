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
              check-attribute-name="checked"
            >
              <template v-slot:nav-buttons>
                <div class="navTableStyle">
                  <Button :outlined="true">Deletar</Button>
                  <Button :outlined="true">Editar</Button>
                  <Button>Adicionar</Button>
                </div>
              </template>

              <template v-slot:checked="{ item }">
                {{ item.checked }}
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
import { reactive, ref } from 'vue';
import Table from '../../components/__Global/Table/Table.vue';

const headers = ref([
  { label: '', value: 'checked', width: '4%' },
  { label: 'Nome', value: 'name', width: '32%', sort: true },
  { label: 'E-mail', value: 'email', width: '32%', sort: true },
  { label: 'Número', value: 'number', width: '32%' },
]);

const contacts = reactive([
  {
    id: '1231',
    name: 'Aristeu',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
  {
    id: '2121',
    name: 'Aristeu',
    email: 'aristeu@gmail.com',
    number: '489800923',
    checked: false,
  },
]);
</script>

<style src="./Contacts.less" scoped />
