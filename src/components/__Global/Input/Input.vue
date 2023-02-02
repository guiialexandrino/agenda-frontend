<template>
  <div class="__inputBox" :style="width ? `width: ${width}` : ``">
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
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
});
</script>

<style src="./Input.less" scoped />
