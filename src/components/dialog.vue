<template>
    <div class="cui-dialog" v-if="open">
        <div class="cui-dialog-overlay" style="z-index: 999;">
            <div class="cui-dialog-modal">
                <span class="cui-dialog-title">{{ title }}</span>
                <CloseOutlined style="float: right;" @click="emit('close')"/>
                <p class="cui-dialog-text">{{ content }}</p>
                <arco-button size="large" @click="emit('close')" style="float: right; position: absolute; right: 100px; bottom: 20px; border-radius: 5px;;">取消</arco-button>
                <arco-button class="confirm" v-if="type == 1" type="primary" size="large" @click="emit('ok')" style="border: 0; float: right; position: absolute; right: 20px; bottom: 20px; border-radius: 5px;;">确认</arco-button>
                <arco-button class="confirm" v-else type="primary" size="large" @click="emit('close')" style="border: 0; float: right; position: absolute; right: 20px; bottom: 20px; border-radius: 5px;;">确认</arco-button>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes down {
    0%{
        bottom: 99999
    }   
    100%{
        bottom: 0
    }
}
.cui-dialog{
    transition: 0.5s;
    animation: down 0.5s
}
.confirm{
    background: linear-gradient(45deg, #52f6fc, #8dc8ff);
    transition: 0.5s;
}
.confirm:hover{
    background: linear-gradient(45deg, #52fcb5, #8d98ff);
    transition: 0.5s;
    transform:scale(1.1)
}
.cui-dialog-overlay{
    background: #49494986;
    backdrop-filter: blur(5px);
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    vertical-align: middle;
    transition: 0.5s
}
.cui-dialog-modal{
    background: #FFF;
    width: 50%;
    min-height: 100px;
    margin: auto;
    margin-top: 20%;
    vertical-align: middle;
    position: relative;
    top: 0;
    border-radius: 5px;
    padding: 25px;
}
.cui-dialog-title{
    font-size: 1.25em;
}
</style>

<script lang="ts" setup>
import { CloseOutlined } from '@ant-design/icons-vue';
defineProps(['open', 'title', 'content', 'type'])
const emit = defineEmits(['close', 'ok'])
</script>