<template>
    <a-menu mode="horizontal" theme="dark" :default-selected-keys="[router.currentRoute.value.fullPath]">
        <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div
            :style="{
              height: '30px',
              color: '#ddd'
            }"
          ><span>仙舟通鉴 | Wiki 内容管理器</span></div>
        </a-menu-item>
        <router-link to="/home"><a-menu-item key="/home">主页</a-menu-item></router-link>
        <router-link to="/user"><a-menu-item key="/user">个人中心</a-menu-item></router-link>
        <router-link to="/admin/home" v-if="user.user_data['perm'] >= 1"><a-menu-item key="/admin">内容管理</a-menu-item></router-link>
        <a-dropdown trigger="hover">
            <span style="color: #FFF; float: right; cursor: pointer;">{{ user.user_data['nickName'] }}<icon-down/></span>
            <template #content>
                <router-link to="/"><a-doption>回主页</a-doption></router-link>
                <!-- <router-link to="/"><a-doption>更改昵称</a-doption></router-link>
                <router-link to="/"><a-doption>更改密码</a-doption></router-link> -->
                <a href="/api/v1/logout"><a-doption>退出登录</a-doption></a>
            </template>
        </a-dropdown>
    </a-menu>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Axios from 'axios'
import { Modal, Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user';
const router = useRouter()
const user = useUserStore();
onMounted(() => {
    if (user.user_data.nickName == null){
        user.fetchUserData();
    }
})
</script>

<style scoped>

</style>