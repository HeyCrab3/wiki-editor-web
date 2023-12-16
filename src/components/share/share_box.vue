<template>
    <div class="share_box">
        <p style="font-size: 96px; user-select: none; margin: 0; margin-top: 30px;">🗺️</p>
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
        <div style="margin-top: 30px">
            <arco-skeleton :animation="true" :loading="loading" v-if="loading">
                <arco-space direction="vertical" :style="{width:'90%'}" size="large">
                    <arco-skeleton-line :rows="5" />
                </arco-space>
            </arco-skeleton>
            <div v-else>
                <div v-if="isCodeRequired">
                    <div style="padding: 20px 25px; width: 70%; margin: auto">
                        <p>这个分享需要提取码才能访问，请输入提取码</p>
                        <arco-input v-model:model-value="code" :disabled="jumping" placeholder="输入提取码" size="large" style="border-radius: 114514px;">
                            <template #prefix><icon-lock/></template>
                        </arco-input>
                    </div>
                    <arco-button @click="go2" :loading="jumping" style="padding: 20px 25px; width: 70%" type="primary" size="large" shape="round"><icon-arrow-right style="width: 18px; height: 18px; margin-right: 10px;"/>进入编辑器</arco-button>
                </div>
                <div v-else>
                    <arco-button @click="go" :loading="jumping" style="padding: 20px 25px; width: 70%" type="primary" size="large" shape="round"><icon-arrow-right style="width: 18px; height: 18px; margin-right: 10px;"/>进入编辑器</arco-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.share_box{
    width: 40%;
    height: 60%;
    justify-content: center;
    margin: auto;
    align-items: center;
    box-shadow: 0px 0px 6px #EDEDED;
}
</style>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';
import { Modal, Message } from '@arco-design/web-vue';

const title = ref("收到了一个分享")
const subtitle = ref("看来有些好东西！")
const loading = ref(true)
const code = ref(null)
const isCodeRequired = ref(false)
const router = useRouter();
const share_data = ref({})
const share_id = router.currentRoute.value.params.id
const jumping = ref(false)

onMounted(() => {
    axios.get('/api/v2.1/share/getShareInfo?share_id=' + share_id)
    .then((res) => {
        if (res.data.code == 0){
            title.value = `收到了一个分享：${res.data.data.title}`
            subtitle.value = `这个文章是由 @${res.data.data.creator.nickName} 分享给你的`
            share_data.value = res.data.data
        }else{
            Message.error(res.data.msg)
        }
    })
    .catch((err) => {
        Modal.error({
            title: '错误',
            content: '网络错误，请稍后再试！'
        })
    })
    axios.get('/api/v2.1/share/getCodeInfo?share_id=' + share_id)
    .then((res) => {
        if (res.data.code == 0){
            if (res.data.data.has_password == true) isCodeRequired.value = true
            loading.value = false
        }else{
            Message.error(res.data.msg)
        }
    })
    .catch((err) => {
        Modal.error({
            title: '错误',
            content: '网络错误，请稍后再试！'
        })
    })
})

const go = () => {
    jumping.value = true
    const url = ref(`/editor_v3/${share_data.value.content_id}?share=1&utm_source=share_link&utm_medium=share_link&utm_campaign=share_link&share_id=${share_id}`)
    axios('/api/v2.1/share/getChannelAccessToken?share_id=' + share_id)
    .then((res) => {
        if (res.data.code == 0){
            url.value = url.value + `&channel_access_token=${res.data.data.channel_access_token}&expires_at=${res.data.data.expires_at}`
            axios.get('/api/v2.1/share/getUpyunAuth?share_id=' +share_id)
            .then((res) => {
                if (res.data.code == 0){
                    url.value = url.value + `&upyun_auth_token=${res.data.data.auth}`
                    router.push(url.value)
                }
                else if (res.data.code == 403){
                    url.value = url.value + `&upyun_auth_token=undefined`
                    router.push(url.value)
                }
                else{
                    jumping.value = false
                    Message.error(res.data.msg)
                }
            })
            .catch((err) => {
                Modal.error({
                    title: '网络错误',
                    content: '请稍后再试。'
                })
                jumping.value = false
            })
        }else{
            jumping.value = false
            Message.error(res.data.msg)
        }
    })
    .catch((err) => {
        Modal.error({
            title: '网络错误',
            content: '请稍后再试。'
        })
        jumping.value = false
    })
}

const go2 = () => {
    jumping.value = true
    const url = ref(`/editor_v3/${share_data.value.content_id}?share=1&utm_source=share_link&utm_medium=share_link&utm_campaign=share_link&share_id=${share_id}`)
    axios('/api/v2.1/share/getChannelAccessToken?share_id=' + share_id + '&code=' + code.value)
    .then((res) => {
        if (res.data.code == 0){
            url.value = url.value + `&channel_access_token=${res.data.data.channel_access_token}&expires_at=${res.data.data.expires_at}`
            axios.get('/api/v2.1/share/getUpyunAuth?share_id=' + share_id + '&code=' + code.value)
            .then((res) => {
                if (res.data.code == 0){
                    url.value = url.value + `&upyun_auth_token=${res.data.data.auth}`
                    router.push(url.value)
                }
                else if (res.data.code == 403){
                    url.value = url.value + `&upyun_auth_token=undefined`
                    router.push(url.value)
                }
                else{
                    jumping.value = false
                    Message.error(res.data.msg)
                }
            })
            .catch((err) => {
                Modal.error({
                    title: '网络错误',
                    content: '请稍后再试。'
                })
                jumping.value = false
            })
        }else{
            jumping.value = false
            Message.error(res.data.msg)
        }
    })
    .catch((err) => {
        Modal.error({
            title: '网络错误',
            content: '请稍后再试。'
        })
        jumping.value = false
    })
}
</script>