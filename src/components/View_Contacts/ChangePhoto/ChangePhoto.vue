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
        @click="handleUpload.click()"
      >
        <ph-upload-simple :size="16" weight="bold" />Carregar Foto
      </Button>

      <p>
        <b>Atenção</b>, sua foto deve ter ao menos 1000px de largura por 1000px
        de altura.
      </p>

      <Transition mode="in-out">
        <span v-if="!minSize" style="color: var(--primary-color)">
          <ph-warning :size="15" weight="bold" /> Tamanho inválido.
        </span>
      </Transition>

      <Transition mode="in-out">
        <span v-if="!allowedFormat" style="color: var(--primary-color)">
          <ph-warning :size="15" weight="bold" /> Formato do arquivo é inválido.
        </span>
      </Transition>

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
import Cropper from 'cropperjs';

const store = useStore();
const handleUpload = ref(null);
const loadImg = ref(null);
let crop = '';
let reader = null;
let minSize = ref(true);
let allowedFormat = ref(true);

function emitCancel() {
  store.dispatch('closeDialog');
}

function selectImg(event) {
  minSize.value = true;
  allowedFormat.value = true;

  const validFormats = ['png', 'jpg', 'jpeg'];
  const check = event.target.files[0].type.split('/');

  if (!validFormats.includes(check[check.length - 1])) {
    allowedFormat.value = false;
    return;
  }

  if (event.target.files.length) {
    // start file reader
    reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target.result) {
        // create new image
        let img = window.document.createElement('img');
        img.id = 'image';
        img.src = e.target.result;

        img.onload = () => {
          // check min dimensions
          if ((img.naturalWidth < 999) & (img.naturalHeight < 999)) {
            minSize.value = false;
            loadImg.value.innerHTML = '<br/>';
            return;
          }

          // clean result before
          loadImg.value.innerHTML = '<br/>';

          // append new image
          loadImg.value.appendChild(img);

          // init cropper
          crop = new Cropper(img, {
            viewMode: 3,
            aspectRatio: 1 / 1.85,
            background: false,
            zoomable: false,
            zoomOnTouch: false,
          });
        };
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
</script>

<style lang="less" src="./ChangePhoto.less" />
