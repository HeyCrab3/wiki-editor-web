<template>
    <arco-menu mode="horizontal" theme="dark" :default-selected-keys="[router.currentRoute.value.fullPath]">
        <arco-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div
            :style="{
              height: '30px',
              color: '#ddd'
            }"
          ><span>仙舟通鉴 | Wiki 内容管理器</span></div>
        </arco-menu-item>
        <router-link to="/home"><arco-menu-item key="/home">主页</arco-menu-item></router-link>
        <router-link to="/user"><arco-menu-item key="/user">个人中心</arco-menu-item></router-link>
        <router-link to="/admin/home" v-if="user.user_data['perm'] >= 1"><arco-menu-item key="/admin">内容管理</arco-menu-item></router-link>
        <arco-dropdown trigger="hover">
            <span style="color: #FFF; float: right; cursor: pointer;">{{ user.user_data['nickName'] }}<icon-down/></span>
            <template #content>
                <router-link to="/"><arco-doption>回主页</arco-doption></router-link>
                <!-- <router-link to="/"><arco-doption>更改昵称</arco-doption></router-link>
                <router-link to="/"><arco-doption>更改密码</arco-doption></router-link> -->
                <a href="/api/v1/logout"><arco-doption>退出登录</arco-doption></a>
            </template>
        </arco-dropdown>
    </arco-menu>
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