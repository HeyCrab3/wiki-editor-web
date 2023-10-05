<template>
    <a-layout style="height: 100%;">
        <a-layout>
            <a-layout-sider style="width: 200px; border-left: 1px solid #f1f1f1;">
                <VMenu style="height: 100%"/>
            </a-layout-sider>
            <a-layout-content style="padding: 10px; margin-left: 10px;">
                <router-view/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<style>

</style>

<script lang="ts" setup>
import VMenu from './vertical_menu.vue'
</script>