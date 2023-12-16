<template>
    <div v-if="open" class="chat_box">
        <a-tabs default-active-key="1" animation type="rounded">
            <a-tab-pane key="1" title="聊天">
                Content of Tab Panel 1
            </a-tab-pane>
            <a-tab-pane key="2" title="用户">
                Content of Tab Panel 2
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<style>
.chat_box{
    float: right;
    position: fixed;
    right: 24px;
    bottom: 100px;
    width: 300px;
    height: 50%;
    background: #FFF;
    border-radius: 15px;
    box-shadow: 0px 0px 15px #f5f5f5;
    padding: 15px;
}
</style>

<script lang="ts" setup>
defineProps(['open'])
</script>