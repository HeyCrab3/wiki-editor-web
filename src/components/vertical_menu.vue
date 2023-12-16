<template>
    <arco-menu mode="vertical" theme="dark" :default-selected-keys="[router.currentRoute.value.fullPath]">
        <router-link to="/admin/home"><arco-menu-item key="/admin/home">管理主页</arco-menu-item></router-link>
        <router-link to="/admin/view"><arco-menu-item key="/admin/view">审阅</arco-menu-item></router-link>
        <router-link to="/admin/user"><arco-menu-item key="/admin/user">用户管理</arco-menu-item></router-link>
        <router-link to="/admin/download"><arco-menu-item key="/admin/download">下载已审阅内容</arco-menu-item></router-link>
        <router-link to="/admin/db"><arco-menu-item key="/admin/db">数据库</arco-menu-item></router-link>
    </arco-menu>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Axios from 'axios'
import { Modal, Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<style scoped>

</style>