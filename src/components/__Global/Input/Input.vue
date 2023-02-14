<template>
  <div class="__inputBox" :style="width ? `width: ${width}` : ``">
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keypress="checkKeyPress"
      @keydown="checkKeyUp"
      :maxlength="maxlength"
      required
    />
    <span>{{ label }}</span>
    <hr />
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: 'Default' },
  modelValue: { type: [String, Number] },
  type: { type: String, default: 'text' },
  width: { type: String, default: 'text' },
  validation: { type: String }, // onlyNumbers
  mask: { type: String }, //phone
  maxlength: { type: String },
});

/* Methods */

function checkKeyPress(event) {
  props.validation === 'onlyNumbers' && checkNumber(event);
}

function checkKeyUp(event) {
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
</script>

<style src="./Input.less" scoped />
