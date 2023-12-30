<template>
    <Drawer :bodyStyle="{ padding: '0px' }" @close="$emit('close')" :footer="null" v-bind:open="show" size="large" title="更新个人简介">
        <template #extra>
            <Button @click="save" type="primary" :loading="loading">提交</Button>
        </template>
        <p style="margin: 0; margin-bottom: 5px; padding: 15px">支持使用 Markdown 语法</p>
        <Spin style="height: 100%" :spinning="loading"><v-md-editor :disabled="true" height="90%" :disabled-menus="[]" @upload-image="handleUploadImage" @save="$message.info('请点击窗口右上角的“提交”保存更改')" v-model="value"/></Spin>
    </Drawer>
</template>

<style>

</style>

<script lang="ts" setup>
import { message as Message, Drawer, Button, Modal, Spin } from 'ant-design-vue';
import { ref, watch } from 'vue';
import Axios from 'axios'
const prop = defineProps(['content', 'show'])
const emit = defineEmits(['close'])
const value = ref(prop.content)
const loading = ref(false)

watch(prop.content, (n, o) => {
    console.log(n,o)
    value.value = n
})

const handleUploadImage = (event: any, insertImage: Function, files: Array<File>) => {
    console.log(files)
    for (var i = 0; i < files.length; i++){
        if (files[i].size > 10000000){
            Message.error(`上传图片 ${files[0]['name']} 时发生错误 图片大小过大，需在 10MB 以内`)    
        }else{
            const formData = new FormData();
            formData.append('file', files[i]);
            Axios({
                url: '/api/v2/content/uploadImage',
                method: 'POST',
                data: formData
            })
            .then(function(r){
                if (r.data['code'] != 0){
                    Message.error(`上传图片 ${files[0]['name']} 时发生错误 ${r['data']['msg']}`)    
                }else{
                    console.log(r['data']['url'])
                    insertImage({
                        url: r['data']['url'],
                        desc: files[0]['name']
                    })
                }
            })
            .catch(function(e){
                Message.error(`上传图片 ${files[0]['name']} 时发生错误 ${e.msg}`)
            })
        }
    }
}

const save = () => {
    loading.value = true
    Axios.post('/api/v2/user/changedetail', { detail: value.value })
    .then((r) => {
        loading.value = false
        if (r['data']['code'] != 0){
            Message.error('个人资料更新失败 ' + r['data']['msg'])
        }else{
            Message.success('个人资料已更新，刷新后生效')
            emit('close')
        }
    })
    .catch((e) => {
        loading.value = false
        Modal.error({
            title: '网络错误',
            content: '请重试 ' + e
        })
    })
}
</script>