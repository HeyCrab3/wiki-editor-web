<template>
    <div style="margin: auto; text-align: center; position: relative; top: 40%"><arco-spin dot style="margin: auto;"/></div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Axios from 'axios'
import { onMounted, ref } from 'vue'
import { Message, Modal } from '@arco-design/web-vue';

const router = useRouter()
const redirect_uri = ref(null)

onMounted(() => {
    const router_data = router.currentRoute.value
    if (router_data.query.login_platform == undefined) Message.error("缺少登录平台参数")
    else if (router_data.query.code == undefined) Message.error('缺少code参数')
    else{
        if (router.currentRoute.value.query['redirect_to'] != null){
            redirect_uri.value = `${window.location.protocol}//${window.location.host + "/login_callback?login_platform=huawei&redirect_to=${router.currentRoute.value.query['redirect_to']}"}`
        }else{
            redirect_uri.value = `${window.location.protocol}//${window.location.host + "/login_callback?login_platform=huawei"}`
        }
        Axios({
            url: '/api/v2/user/login_thirdparty',
            method: 'POST',
            timeout: 30000,
            timeoutErrorMessage: '请求超时',
            data: {
                login_platform: router_data.query.login_platform,
                code: router_data.query.code,
                redirect_uri: redirect_uri.value
            }
        })
        .then((r) => {
            if (r['data']['code'] != 0){
                Message.error(r['data']['msg'])
            }
            else{
                Message.success("登陆成功")
                if (router.currentRoute.value.query['redirect_to'] != null){
                    router.push(router.currentRoute.value.query['redirect_to'])
                }else{
                    router.push('/')
                }
            }
        })
        .catch((e) => {
            Modal.error({
                title: '内部错误',
                content: '请加入QQ频道：仙舟通鉴 和我们联系，当然也可能是您的网络原因\n' + e,
                onOk: () => {window.location.reload()}
            })
        })
    }
})
</script>