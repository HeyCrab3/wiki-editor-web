<template>
    <Menu/>
    <div style="width: 100%; height: 100%">
        <arco-spin style="width: 100%; height: 100%" :size="32" :loading="loading" tip="正在获取消息中心数据">
        <div style="padding: 16px 20px;">
            <arco-typography-title :heading="4">个人中心</arco-typography-title>
            <arco-avatar :style="{ backgroundColor: '#00d0b6' }" :size="40">{{user.user_data['nickName']}}</arco-avatar>
            <arco-typography-title style="display: inline; margin-left: 15px;" :heading="4">{{user.user_data['nickName']}}</arco-typography-title>
            <div style="margin-top: 25px;">
                <arco-statistic title="创建的内容数" :value="edit_count" animation show-group-separator />
                <arco-statistic style="margin-left: 40px;" title="消息数" :value="msg_count" animation show-group-separator />
            </div>
            <div style="margin-top: 50px;">
                <arco-typography-title :heading="4">消息中心</arco-typography-title>
                <arco-collapse>
                    <template v-for="item in msg">
                        <arco-collapse-item :header="item['title']">
                            <template #extra>
                                <arco-tag :color="item['type'] == 1 ? 'red' : item['type'] == 2 ? 'orange' : 'blue'">{{item['type'] == 1 ? '重要公告' : item['type'] == 2 ? '审核通知' : '公告'}}</arco-tag>
                            </template>
                            <div>时间：{{ new Date(item['timestamp'] * 1000).toLocaleString() }}</div>
                            <div>{{ item['content'] }}</div>
                        </arco-collapse-item>
                    </template>
                        
                </arco-collapse>
            </div>
        </div>
    </arco-spin>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Axios from 'axios'
import { Modal, Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import Menu from '../components/menu.vue'
import { useUserStore } from '../store/user'
  
const user = useUserStore();
onMounted(() => {
    if (user.user_data.nickName == null){
        user.fetchUserData();
    }
})

const router = useRouter()
const loading = ref(true)
const edit_count = ref(0)
const msg_count = ref(0)
const msg = ref({})
  
onMounted(() => {
    document.title = "个人中心 | 仙舟通鉴编辑器"
    Axios('/api/v2/content/count')
    .then(function(r){ 
        if (r['data']['code'] != 0){
            Message.error(r['data']['msg'])
        }else{
            edit_count.value = r['data']['count']
        }
    })
    .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
    Axios('/api/v2/message/count')
    .then(function(r){ 
        if (r['data']['code'] != 0){
            Message.error(r['data']['msg'])
        }else{
            msg_count.value = r['data']['count']
            loading.value = false;
        }
    })
    .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
    Axios('/api/v2/message/list')
    .then(function(r){ 
        if (r['data']['code'] != 0){
            Message.error(r['data']['msg'])
        }else{
            msg.value = r['data']['data']
            loading.value = false;
        }
    })
    .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
})
  
</script>
  
<style scoped>
  
</style>
    