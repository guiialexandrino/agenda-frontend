<template>
  <div></div>
  <h1>DELETE</h1>
  {{ users }}
</template>

<script setup>
const props = defineProps({
  users: { type: Array },
});
</script>
