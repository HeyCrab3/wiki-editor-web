<template>
    <a-menu mode="vertical" theme="dark" :default-selected-keys="[router.currentRoute.value.fullPath]">
        <router-link to="/admin/home"><a-menu-item key="/admin/home">管理主页</a-menu-item></router-link>
        <router-link to="/admin/view"><a-menu-item key="/admin/view">审阅</a-menu-item></router-link>
        <router-link to="/admin/user"><a-menu-item key="/admin/user">用户管理</a-menu-item></router-link>
        <router-link to="/admin/download"><a-menu-item key="/admin/download">下载已审阅内容</a-menu-item></router-link>
        <router-link to="/admin/db"><a-menu-item key="/admin/db">数据库</a-menu-item></router-link>
    </a-menu>
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