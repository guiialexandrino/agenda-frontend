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
      :disabled="!canUpload"
      textHoverColor="white"
      backgroundColor="var(--user-color)"
      backgroundHoverColor="var(--user-color)"
      @click="handleConfirm"
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
let reader = null;
let crop = '';
let imgType = '';
let minSize = ref(true);
let allowedFormat = ref(true);
let canUpload = ref(false);

function emitCancel() {
  store.dispatch('closeDialog');
}

function selectImg(event) {
  minSize.value = true;
  allowedFormat.value = true;
  canUpload.value = false;

  if (event.target.files.length) {
    const validFormats = ['png', 'jpg', 'jpeg'];
    imgType = event.target.files[0].type;
    const check = event.target.files[0].type.split('/');

    if (!validFormats.includes(check[check.length - 1])) {
      allowedFormat.value = false;
      return;
    }

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
            aspectRatio: 1 / 1.45,
            background: false,
            zoomable: false,
            zoomOnWheel: false,
            zoomOnTouch: false,
            minCropBoxWidth: 660,
          });
          canUpload.value = true;
        };
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}

function handleConfirm() {
  // crop
  //   .getCroppedCanvas({
  //     width: 660,
  //   })
  //   .toBlob((blob) => {
  //     const formData = new FormData();
  //     formData.append('croppedImage', blob);
  //   });

  //Código de Download é Temporário
  const format = imgType.split('/');
  let imgSrc = crop
    .getCroppedCanvas({
      width: 660,
    })
    .toDataURL(imgType);
  const link = document.createElement('a');
  link.href = imgSrc;
  link.setAttribute('download', `Teste.${format[format.length - 1]}`);
  document.body.appendChild(link);
  link.click();
}
</script>

<style lang="less" src="./ChangePhoto.less" />
