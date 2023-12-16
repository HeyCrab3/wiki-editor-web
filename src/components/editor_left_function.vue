<template>
    <arco-tabs class="function_bar" type="rounded" position="left" :default-active-key="'1'">
                <arco-tab-pane key="1">
                    <template #title style="text-align: center;"><icon-clock-circle/>常用</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(0) > -1" @click="emit('clickEvent', item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                    <arco-alert type="info">如需使用图片上传功能，请使用顶部菜单栏图片图标中的上传本地图片或直接拖拽图片进编辑器</arco-alert>
                </arco-tab-pane>
                <arco-tab-pane key="2">
                    <template #title style="text-align: center;"><icon-h1/>段落</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(1) > -1" @click="emit('clickEvent', item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                </arco-tab-pane>
                <arco-tab-pane key="3">
                    <template #title style="text-align: center;"><icon-bold/>内容</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(2) > -1" @click="emit('clickEvent', item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                </arco-tab-pane>
                <arco-tab-pane key="4">
                    <template #title style="text-align: center;"><icon-link/>交互</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(3) > -1" @click="emit('clickEvent', item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                </arco-tab-pane>
                <arco-tab-pane key="5">
                    <template #title style="text-align: center;"><icon-live-broadcast/>展示</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(4) > -1" @click="emit('clickEvent', item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                    <arco-alert type="info">如需使用图片上传功能，请使用顶部菜单栏图片图标中的上传本地图片或直接拖拽图片进编辑器</arco-alert>
                </arco-tab-pane>
                <arco-tab-pane key="6">
                    <template #title style="text-align: center;"><icon-more/>其他</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(5) > -1" @click="emit('clickEvent', item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                </arco-tab-pane>
            </arco-tabs>
</template>

<style>
.arco-tabs-tab-title .arco-icon{
    margin-right: 10px;
}
</style>

<script setup>
import Icon from './icons.vue'
import { btnList } from '../js/btnList'
const emit = defineEmits(['clickEvent'])
</script>