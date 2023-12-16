<template>
    <arco-modal title="创建短链接" style="padding: none; min-height: 200px;" :footer="false" simple unmount-on-close v-bind:visible="open" @cancel="cancel" width="40%">
        <arco-input v-model:model-value="search" readonly placeholder="正在获取 URL...">
            <template #prefix>
                <icon-cloud/>
            </template>
            <template #suffix>
                <arco-button type="primary" @click="copy" shape="round"><template #icon><icon-copy/></template>复制文案和URL</arco-button>
            </template>
        </arco-input>
    </arco-modal>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, onUnmounted, watch } from 'vue'
import { Message } from '@arco-design/web-vue';
import Axios from 'axios'
import { useUserStore } from '../store/user'

const user = useUserStore()
const prop = defineProps(['open', 'id', 'title'])
const emit = defineEmits(['close'])
const completed = ref(false)
const search = ref(null)
const cancel = () => { 
    search.value = ''
    emit('close') 
}

watch(() => prop.open, (newVal) => {
    if (newVal) {
      generateURL()
    }
})

const generateURL = () => {
    Axios('/api/v2.1/share/getShareLink?share_id=' + prop['id'])
    .then((r) => {
        if (r['data']['code'] != 0) {
            if (r['data']['code'] == 1) {
                Axios('/api/v2.1/share/createShareLink?share_id=' + prop['id'])
                .then((r) => {
                    if (r['data']['code'] != 0) {
                        Message.error(r['data']['msg'])
                    }
                    else {
                        completed.value = true
                        search.value = `https://rlzline.icu/${r['data']['data']['short_url']}`
                    }
                })
            }
            else {
                Message.error(r['data']['msg'])
            }
        }
        else {
            completed.value = true
            search.value = `https://rlzline.icu/${r['data']['data']['short_url']}`
        }
    })
    .catch((e) => {
        Message.error('服务器错误，请稍后再试。' + e)
    })
}

const copy = () => {
    if (completed.value == true){
        const input = document.createElement('input')
        input.setAttribute('readonly', 'readonly')
        input.setAttribute('value',  `${user.user_data.nickName} 邀请您编辑 《${prop.title}》，点击 ${search.value} 立即加入编辑！`)
        document.body.appendChild(input)
        input.select()
        if (document.execCommand('copy')) {
            document.execCommand('copy')
            Message.success('复制成功！')
        }
        document.body.removeChild(input)
    }
    else {
        Message.warning('URL 未生成，请稍后再试。')
    }
}
</script>

<style>
.arco-card-metarco-title{
    display: inline-block;
}
</style>