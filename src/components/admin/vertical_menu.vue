<template>
    <h2 style="margin-left: 10px;">管理员后台</h2>
    <arco-menu mode="vertical" theme="light" :default-selected-keys="[router.currentRoute.value.fullPath]">
        <router-link to="/admin_v2"><arco-menu-item key="/admin_v2">管理主页</arco-menu-item></router-link>
        <router-link to="/admin_v2/view"><arco-menu-item key="/admin_v2/view">审阅</arco-menu-item></router-link>
        <router-link to="/admin_v2/user"><arco-menu-item key="/admin_v2/user">用户管理</arco-menu-item></router-link>
        <router-link to="/admin_v2/download"><arco-menu-item key="/admin_v2/download">下载已审阅内容</arco-menu-item></router-link>
        <router-link to="/admin_v2/db"><arco-menu-item key="/admin_v2/db">数据库</arco-menu-item></router-link>
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