<template>
    <div style="height: 100%; text-align: center; vertical-align: middle; text-align: center; justify-content: center; flex-direction: column; display: flex; background: url(https://t.mwm.moe/fj/) no-repeat; background-size: cover;">
        <div style="padding: 45px; background: #FFF; width:200px; margin: auto; border-radius: 15px">
            <a-spin :size="32"/>
            <h2>{{ title }}</h2>
            <h3>稍作等待，马上就好</h3>
        </div>
    </div>
</template>

<style>

</style>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useUserStore } from '../../store/user';
import Axios from 'axios'
import { Message, Modal } from '@arco-design/web-vue';
import { ref } from 'vue';

const user = useUserStore()
const router = useRouter()
const title = ref('第三方登录进行中')

onMounted(() => {
    document.title = "第三方登录进行中 | 仙舟通鉴编辑器"
})

Axios('/api/v2/getOauthToken')
.then((r) => {
    if(r['data']['code'] != 0){
        Message.warning(r['data']['msg'])
        router.push('/login?redirect_to=' +  router.currentRoute.value.fullPath)
    }else{
        console.log(r['data']['token'])
        console.log(router.currentRoute.value.query.callback)
        title.value = '正在重定向，请稍等'
        setInterval(() => { window.location = `${router.currentRoute.value.query.callback}?code=` + r['data']['token'] }, 3000)
    }
})
.catch((e) => {
    Modal.error({
        title: 'Token 获取失败',
        content: '请加入官方QQ频道（仙舟通鉴）反馈，并附带以下错误信息：\n' + e,
        onOk: window.location.reload()
    });
})
</script>