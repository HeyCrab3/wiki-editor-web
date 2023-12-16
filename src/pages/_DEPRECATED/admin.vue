<template>
    <Menu/>
    <div style="width: 100%; height: 100%">
        <arco-layout style="height: 100%">
            <arco-layout>
                <arco-layout-sider theme="dark">
                    <VerticalMenu/>
                </arco-layout-sider>
                <arco-layout-content>
                    <div style="padding: 16px 20px; height: 100%">
                        <router-view></router-view>
                    </div>
                </arco-layout-content>
            </arco-layout>
        </arco-layout>
  </div>
</template>

<style scoped>

</style>

<script lang="ts" setup>
import Menu from '../components/menu.vue'
import VerticalMenu from '../components/vertical_menu.vue'
import { useRouter } from 'vue-router';
const router = useRouter();
if (router.currentRoute.value.fullPath == "/admin"){
    router.push('/admin/home')
}
</script>