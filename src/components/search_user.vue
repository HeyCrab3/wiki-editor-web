<template>
    <arco-modal title="添加用户" style="padding: none; min-height: 200px;" :footer="false" simple unmount-on-close v-bind:visible="open" @cancel="cancel" width="40%">
        <arco-input @input="searchF" v-model:model-value="search" placeholder="输入用户名">
            <template #prefix>
                <icon-search/>
            </template>
        </arco-input>
        <arco-spin :loading="loading" style="width: 100%; margin-top: 30px">
            <div>
                <arco-empty v-if="searchResult.length == 0 && completed == true"/>
                <arco-result status="500" subtitle="服务器错误，请稍后再试。" v-if="error"></arco-result>
                <div v-for="item in searchResult" style="height: 30px; line-height: 30px; margin: 10px;">
                    <arco-avatar :size="24" :style="{ backgroundColor: '#3370ff' }"><IconUser /></arco-avatar>
                    <span style="margin-left: 10px;">{{ item['nickName'] }} ({{ item['userName'] }})</span>
                    <div style="float: right">
                        <arco-button v-if="item['userName'] != user.user_data.userName" type="primary" shape="round" @click="add(item)"><template #icon><icon-plus/></template>添加</arco-button>
                        <span v-else style="color: #a3a1a1">不能将自己添加为协作者</span>
                    </div>
                </div>
            </div>
        </arco-spin>
    </arco-modal>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, onUnmounted, watch } from 'vue'
import { Message } from '@arco-design/web-vue';
import Axios from 'axios'
import { useUserStore } from '../store/user'

const user = useUserStore()
const prop = defineProps(['open'])
const emit = defineEmits(['close', 'add_user'])
const loading = ref(false)
const search = ref('')
const searchResult = ref([])
const completed = ref(false)
const error = ref(false)

const add = (user: Object) => {
    search.value = ''
    searchResult.value = []
    completed.value = false
    error.value = false
    emit('add_user', user)
}

const cancel = () => { 
    search.value = ''
    searchResult.value = []
    completed.value = false
    error.value = false
    emit('close') 
}
const searchF = () => {
    if (search.value == ''){
        searchResult.value = []
        completed.value = false
        error.value = false
    }else{
        loading.value = true
        Axios.post('/api/v2.1/share/searchUser', { name: search.value } ).then(res => {
            loading.value = false
            if (res.data.code === 0) {
                completed.value = true
                searchResult.value = res.data.data
                console.log(res.data.data)
            } else {
                Message.error(res.data.msg)
                error.value = true
            }
        }).catch(err => {
            loading.value = false
            Message.error('网络错误')
            error.value = true
        })
    }
}
</script>

<style>
.arco-card-metarco-title{
    display: inline-block;
}
</style>