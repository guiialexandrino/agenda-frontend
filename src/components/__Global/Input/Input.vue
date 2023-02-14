<template>
  <div class="__inputBox" :style="width ? `width: ${width}` : ``">
    <input
      ref="inputComponent"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keypress="checkKeyPress"
      @keydown="checkKeyDown"
      @keyup.enter="removeFocus"
      :maxlength="maxlength"
      required
    />
    <span>{{ label }}</span>
    <hr />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: { type: String, default: 'Default' },
  modelValue: { type: [String, Number] },
  type: { type: String, default: 'text' },
  width: { type: String, default: 'text' },
  validation: { type: String }, // onlyNumbers
  mask: { type: String }, //phone
  maxlength: { type: String },
});

const inputComponent = ref(null);

/* Methods */

function checkKeyPress(event) {
  props.validation === 'onlyNumbers' && checkNumber(event);
}

function checkKeyDown(event) {
  props.mask === 'phone' && phoneNumber(event);
}

// Validations methods
function checkNumber(event) {
  if (event.keyCode < 48 || event.keyCode > 57) {
    event.preventDefault();
  }
}

// Masks methods
function phoneNumber(event) {
  let field = event.target.value;
  if (field.length === 1 && event.keyCode !== 8)
    event.target.value = `+${event.target.value}`;

  if (field.length === 3 && event.keyCode !== 8) event.target.value += ' ';
}

function removeFocus() {
  inputComponent.value.blur();
}
</script>

<style src="./Input.less" scoped />
