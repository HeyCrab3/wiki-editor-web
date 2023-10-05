<template>
    <a-layout style="height: 100%;">
      <a-layout>
        <a-layout-sider style="width: 270px">
            <div style="padding: 10px;">
                <img style="width: 32px" src="/light.png" alt="logo"/>
                <h2 style="display: inline-block; position: relative; bottom: 10px; left: 6px; font-size: 1rem;">仙舟通鉴 | Wiki 内容编辑器</h2>
            </div>
            <MenuNext/>
        </a-layout-sider>
        <a-layout-content style="padding: 10px">
            <h2 style="margin-left: 10px;">用户中心</h2>
            <a-avatar :style="{ backgroundColor: '#00d0b6' }" :size="40" style="margin-left: 10px;">{{user.user_data['nickName']}}</a-avatar>
            <a-typography-title style="display: inline; margin-left: 15px;" :heading="4">{{user.user_data['nickName']}}</a-typography-title>
            <div style="margin-top: 25px; margin-left: 10px;">
                <a-statistic title="创建的内容数" :value="edit_count" animation show-group-separator />
                <a-statistic style="margin-left: 40px;" title="消息数" :value="msg_count" animation show-group-separator />
            </div>
            <div style="margin-top: 50px; margin-left: 10px;">
                <a-typography-title :heading="4">消息中心</a-typography-title>
                <a-collapse>
                    <template v-for="item in msg">
                        <a-collapse-item :header="item['title']">
                            <template #extra>
                                <a-tag :color="item['type'] == 1 ? 'red' : item['type'] == 2 ? 'orange' : 'blue'">{{item['type'] == 1 ? '重要公告' : item['type'] == 2 ? '审核通知' : '公告'}}</a-tag>
                            </template>
                            <div>消息发送时间：{{ new Date(item['timestamp'] * 1000).toLocaleString() }}</div>
                            <div>{{ item['content'] }}</div>
                        </a-collapse-item>
                    </template>
                        
                </a-collapse>
            </div>
            <FeedBack/>
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>

<style>

</style>

<script lang="ts" setup>
import MenuNext from '../components/menu_next.vue'
import FeedBack from '../components/feedback.vue'
import { ref } from 'vue'
import { Message, Modal } from '@arco-design/web-vue'
import Axios from 'axios'
import { useUserStore } from '../store/user'

const loading = ref(true)
const edit_count = ref(0)
const msg_count = ref(0)
const msg = ref({})
const user = useUserStore();

document.title = '用户中心 | 仙舟通鉴编辑器'

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
</script>