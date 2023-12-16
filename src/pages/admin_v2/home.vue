<template>
    <arco-typography-title :heading="4">内容管理</arco-typography-title>
        <div style="margin-top: 25px;">
            <arco-statistic title="CPU 利用率 (%)" :value="system_data['cpu']" animation show-group-separator />
            <arco-statistic style="margin-left: 40px;" title="内存利用率 (%)" :value="system_data['ram']" animation show-group-separator />
            <arco-statistic style="margin-left: 40px;" title="程序PID" :value="system_data['pid']" animation show-group-separator />
            <arco-statistic style="margin-left: 40px;" title="内容总数" :value="platform_data[0]" animation show-group-separator />
            <arco-statistic style="margin-left: 40px;" title="用户数" :value="platform_data[1]" animation show-group-separator />
            <arco-statistic style="margin-left: 40px;" title="消息总数" :value="platform_data[2]" animation show-group-separator />
        </div>
</template>

<style scoped>

</style>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Axios from 'axios'
import { Modal, Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
const system_data = ref({})
const platform_data = ref([])

onMounted(() => {
    document.title = "内容管理 | 仙舟通鉴编辑器"
    Axios('/api/v2/content_manage/zone/1/getSystemInfo')
    .then(function(r){
        if (r['data']['code'] != 0){
            Message.error(r['data']['msg'])
        }else{
            system_data.value = r['data']['data']
        }
    })
    .catch(function(e){
        Modal.error({
            title: '请求错误',
            content: e
        })
    })
    Axios('/api/v2/content_manage/zone/1/getPlatformInfo')
    .then(function(r){
        if (r['data']['code'] != 0){
            Message.error(r['data']['msg'])
        }else{
            platform_data.value = r['data']['data']
        }
    })
    .catch(function(e){
        Modal.error({
            title: '请求错误',
            content: e
        })
    })
})
</script>