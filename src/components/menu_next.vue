<template>
    <a-menu
        :style="{ width: '100%' }"
        breakpoint="xl"
        :default-selected-keys="[router.currentRoute.value.path]"
        class="next_menu"
    >
        <router-link to="/home_v2"><a-menu-item key="/home_v2"><template #icon><HomeOutlined/></template>我的文件</a-menu-item></router-link>
        <router-link to="/share"><a-menu-item key="/share"><template #icon><ShareAltOutlined/></template>我收到的分享</a-menu-item></router-link>
        <router-link to="/admin_v2" v-if="isAdmin"><a-menu-item key="/admin_v2"><template #icon><DashboardOutlined/></template>管理员后台</a-menu-item></router-link>
        <router-link to="/user_v2"><a-menu-item key="/user_v2"><template #icon><UserOutlined/></template>用户中心</a-menu-item></router-link>
        <a-menu-item @click="emit('logout')" style="position: fixed; bottom: 0"><template #icon><LogoutOutlined/></template>退出登录</a-menu-item>
    </a-menu>
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
const emit = defineEmits(['logout'])
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