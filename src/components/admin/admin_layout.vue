<template>
    <arco-layout style="height: 100%;">
        <arco-layout>
            <arco-layout-sider style="width: 200px; border-left: 1px solid #f1f1f1;">
                <VMenu/>
            </arco-layout-sider>
            <arco-layout-content style="padding: 10px; margin-left: 10px;">
                <router-view/>
            </arco-layout-content>
        </arco-layout>
    </arco-layout>
</template>

<style>

</style>

<script lang="ts" setup>
import VMenu from './vertical_menu.vue'
</script>