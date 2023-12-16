<template>
    <arco-menu
        :style="{ width: '100%' }"
        breakpoint="xl"
        :default-selected-keys="[router.currentRoute.value.path]"
        class="next_menu"
    >
        <router-link to="/home_v2"><arco-menu-item key="/home_v2"><template #icon><HomeOutlined/></template>我的文件</arco-menu-item></router-link>
        <router-link to="/myshare"><arco-menu-item key="/myshare"><template #icon><ShareAltOutlined/></template>我的分享</arco-menu-item></router-link>
        <router-link to="/admin_v2" v-if="isAdmin"><arco-menu-item key="/admin_v2"><template #icon><DashboardOutlined/></template>管理员后台</arco-menu-item></router-link>
        <router-link to="/user_v2" style="position: fixed; bottom: 0"><arco-menu-item key="/user_v2"><template #icon><UserOutlined/></template>用户中心</arco-menu-item></router-link>
    </arco-menu>
</template>

<style>
</style>

<script setup>
import { ref, onMounted } from 'vue'
import Axios from 'axios'
import { Modal, Message } from '@arco-design/web-vue'
import { DashboardOutlined, UserOutlined, HomeOutlined, ShareAltOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user';
const router = useRouter()
const user = useUserStore();
const isAdmin = ref(false)
onMounted(() => {
    if (user.user_data.nickName == null){
        user.fetchUserData();
    }
    if (user.user_data.perm >= 1){
        isAdmin.value = true
    }
})
</script>