<template>
  <div class="btn">
    <button
      ref="btn"
      @mouseenter="checkHover"
      @mouseleave="checkProps"
      @click="removeFocus"
      :disabled="disabled"
    >
      <slot>Botão</slot>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

/* Documentação
Config inicial: ter algum css com a variável global --primary-color configurada com alguma cor;

outlined -> botão será outlined;
outlinedHoverFillColor -> caso o botão seja outlined e quando passar o mouse preencher o fundo dele com alguma cor;
backgroundColor -> cor padrão do fundo do botão;
backgroundHovercolor -> muda a cor do botão ao passar o mouse;
hoverTurnInToOutlined -> transforma o botão com fundo em outlined ao passar o mouse;
textColor -> cor padrão do botão
textHovercolor -> cor do texto ao passar o mouse;
circle -> cria botão circulo
disabled -> botão desabilitado
removeFocus -> removeFocus do botão apos clicar

 */

const props = defineProps({
  backgroundColor: {
    type: String,
    default: () => {
      return window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-color');
    },
  },
  backgroundHoverColor: { type: String },
  outlined: { type: Boolean, default: false },
  outlinedHoverFillColor: { type: String },
  hoverTurnInToOutlined: { type: Boolean },
  textColor: { type: String },
  textHoverColor: { type: String },
  circle: { type: Boolean },
  disabled: { type: Boolean },
  removeFocus: { type: Boolean, default: true },
});

const btn = ref(null);

/* Utilizado para botões diferentes */
function checkProps() {
  const defaultColor = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-color');

  if (props.backgroundColor !== defaultColor) {
    btn.value.style.backgroundColor = props.backgroundColor;
    btn.value.style.borderColor = props.backgroundColor;
  }

  if (props.outlined) {
    btn.value.style.backgroundColor = 'transparent';
    btn.value.style.borderColor = props.backgroundColor;
    btn.value.style.color = props.backgroundColor;
  }

  if (props.textColor) {
    btn.value.style.color = props.textColor;
  }

  if (props.backgroundHoverColor) {
    btn.value.style.backgroundColor = props.backgroundColor;
  }

  if (props.circle) {
    btn.value.style.borderRadius = '50%';
    btn.value.style.padding = '0px';
    btn.value.style.width = '39px';
    btn.value.style.height = '39px';
  }
}

onMounted(() => {
  checkProps();
  setTimeout(() => {
    btn.value.style.transition = 'all 500ms';
  }, 200);
});

function checkHover() {
  if (props.disabled) return;

  if (props.backgroundHoverColor) {
    btn.value.style.backgroundColor = `${props.backgroundHoverColor}`;
    btn.value.style.borderColor = props.backgroundHoverColor;
  }

  if (props.textHoverColor) {
    btn.value.style.color = props.textHoverColor;
  }

  if (props.outlined) {
    btn.value.style.backgroundColor = 'transparent';
    if (props.outlinedHoverFillColor) {
      btn.value.style.backgroundColor = props.outlinedHoverFillColor;
      btn.value.style.borderColor = props.outlinedHoverFillColor;
    }
  }

  if (props.hoverTurnInToOutlined) {
    btn.value.style.backgroundColor = 'transparent';
    btn.value.style.borderColor = props.backgroundHoverColor
      ? props.backgroundHoverColor
      : props.backgroundColor;
  }
}

function removeFocus() {
  if (props.removeFocus) btn.value.blur();
}
</script>

<style src="./Button.less" scoped />
