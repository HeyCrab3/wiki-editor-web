<!-- TODO -->
<!-- 这东西太tm复杂了 改不过来啊 -->
<template>
    <CUiDialog @ok="logout" @close="close" :type="1" :open="exit" title="退出登录" content="真的要这么做吗？"/>
    <arco-layout style="height: 100%;">
        <arco-layout>
            <arco-layout-sider collapsible :collapsed="collapsed" hide-trigger>
                <div style="padding: 10px 7px;">
                    <img style="width: 32px" src="/light.png" alt="logo"/>
                    <h2 v-if="!collapsed" style="display: inline-block; position: relative; bottom: 10px; left: 6px; font-size: 1rem;">仙舟通鉴编辑器</h2>
                </div>
                <MenuNext/>
            </arco-layout-sider>
            <arco-layout>
                <arco-layout-header  style="padding: 20px; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08); line-height: 24px;">
                    <arco-tooltip content="折叠菜单" v-if="!collapsed"><icon-menu-fold @click="collapsed = true" style="cursor: pointer"/></arco-tooltip>
                    <arco-tooltip content="展开菜单" v-else><icon-menu-unfold @click="collapsed = false" style="cursor: pointer"/></arco-tooltip>
                    <arco-dropdown trigger="hover">
                        <div style="float: right">
                            <arco-avatar :image-url="user.user_data.d.avatar" :size="24"/>
                            <span style="margin: 0px 10px">{{ user.user_data.nickName }}</span>
                            <IconDown/>
                        </div>
                        <template #content>
                            <arco-doption @click="router.push('/')">返回主页</arco-doption>
                            <arco-doption @click="b">返回仙舟通鉴</arco-doption>
                            <arco-doption @click="router.push('/user_v2')">用户中心</arco-doption>
                            <arco-doption @click="exit = true">退出登录</arco-doption>
                        </template>
                    </arco-dropdown>
                </arco-layout-header>
                <arco-layout-content v-if="!isAdmin" style="padding: 10px">
                    <slot></slot>
                    <FeedBack/>
                </arco-layout-content>
                <arco-layout-content v-else>
                    <slot></slot>
                </arco-layout-content>
            </arco-layout>
        </arco-layout>
    </arco-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import CUiDialog from './dialog.vue'
import MenuNext from './menu_next.vue'
import FeedBack from './feedback.vue'
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = useUserStore()
const collapsed = ref(false)
const exit = ref(false)
const close = () => {
    exit.value = false
}
const isAdmin = ref(router.currentRoute.value.path.indexOf('/admin_v2') > -1)
const logout = () => { window.location = '/api/v1/logout' }
const b = () => { window.open('https://seelevollerei.online?utm_source=editor&utm_medium=editor&utm_campaign=editor', '_blank') }
onMounted(() => {
    if (document.body.clientWidth < 768) {
        collapsed.value = true
    }
})
</script>