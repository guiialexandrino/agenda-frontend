<template>
  <div class="headerDialog">
    <h1>
      <span>
        <ph-user-focus :size="32" weight="bold" />
      </span>
      Alterar Foto
    </h1>
  </div>
  <div class="__flex-verticalCenter __flex-horizontalCenter">
    <div class="contentAlertDialog __dialogOverflow">
      <input
        type="file"
        ref="handleUpload"
        :style="'display: none'"
        @change="selectImg"
      />
      <Button
        class="rectangular"
        :outlined="true"
        @click="$refs.handleUpload.click()"
      >
        <ph-upload-simple :size="16" weight="bold" />Carregar Foto
      </Button>
      <div class="img-upload" ref="loadImg"></div>
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
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const handleUpload = ref(null);
const loadImg = ref(null);

function emitCancel() {
  store.dispatch('closeDialog');
}

function selectImg(event) {
  if (event.target.files.length) {
    // start file reader
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target.result) {
        // create new image
        let img = window.document.createElement('img');
        img.id = 'image';
        img.src = e.target.result;

        // clean result before
        loadImg.value.innerHTML = '<br/>';

        // append new image
        loadImg.value.appendChild(img);

        // init cropper
        // cropper = new Cropper(img);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
</script>

<style lang="less" src="./ChangePhoto.less" />
