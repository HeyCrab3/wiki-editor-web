<template>
  <router-view/>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
  document.body.setAttribute('arco-theme', 'dark')
})
</script>