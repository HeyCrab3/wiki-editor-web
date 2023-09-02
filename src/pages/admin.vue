<template>
    <Menu/>
    <div style="width: 100%; height: 100%">
        <a-layout style="height: 100%">
            <a-layout>
                <a-layout-sider theme="dark">
                    <VerticalMenu/>
                </a-layout-sider>
                <a-layout-content>
                    <div style="padding: 16px 20px; height: 100%">
                        <router-view></router-view>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>
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