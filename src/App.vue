<template>
  <router-view/>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router';
const router = useRoute();
const isShow = ref(true)
watchEffect(() => {
  if (router.path == '/' || router.path == '/app' || router.path == '/login' || router.path == '/register'){
    document.body.removeAttribute('arco-theme')
    document.body.removeAttribute('style')
  }else{
    document.body.setAttribute('arco-theme', 'dark')
    document.body.setAttribute('style', 'background-color: #3b3b3b;')
  }
})
</script>