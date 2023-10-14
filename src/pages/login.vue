<template>
    <div style="background: url(https://www.dmoe.cc/random.php) no-repeat; background-size: cover; width: 100%; height: 100%">
        <div class="login">
            <div class="container">
                <h2>欢迎登录</h2>
                <!-- <a-alert style="margin: 30px 0px">由于账号系统的变更，旧版账号将于不久后停止使用，如需迁移数据请点击<a-link href="/login_v1">这里</a-link>登录旧版账户</a-alert> -->
                <a-tabs default-active-key="0">
                    <a-tab-pane key="0" title="扫码登录" style="text-align: center;">
                        <div v-if="status == -2" style="margin: auto; margin-top: 60%; width: 180px; height: 180px;">
                            <p style="font-size: 1.5em;">二维码已失效</p>
                            <a-button type="primary" size="large" @click="refreshQr">点击刷新</a-button>
                        </div>
                        <div v-if="status == 1" style="margin: auto; margin-top: 60%;;">
                            <a-result status="success" title="扫码成功" >
                                <template #subtitle>
                                请在手机上确认登录
                                </template>
                                <template #extra>
                                <a-space>
                                    <a-button type='primary' size="large" shape="round" @click="refreshQr">返回扫码</a-button>
                                </a-space>
                                </template>
                            </a-result>
                        </div>
                        <a-spin :loading="qrloading" style="text-align: center;">
                            <div style="margin: auto; margin-top: 60%; text-align: center;"  v-if="status == 0" id="qrcode"></div>
                            <span v-if="status == 0" style="display: block; margin-top: 20px;">{{ qrText }}</span>
                        </a-spin>
                    </a-tab-pane>
                    <a-tab-pane key="1" title="手机号登录">
                        <a-form
                            ref="formRef"
                            :model="formState2"
                            @submit="onFinish2"
                            layout="vertical" 
                        >
                            <a-form-item
                            field="phone"
                            label="手机号"
                            :rules="[{ required: true, message: '请输入手机号' }]"
                            :validate-trigger="['change','input']"
                            >
                            <a-input :disabled="isLoading" placeholder="手机号" v-model="formState2.phone">
                                <template #prefix>
                                <MobileOutlined class="site-form-item-icon" />
                                </template>
                            </a-input>
                            </a-form-item>

                            <a-form-item
                            field="code"
                            label="验证码"
                            :rules="[{ required: true, message: '请输入验证码' }]"
                            :validate-trigger="['change','input']"
                            >
                            <a-input :disabled="isLoading" placeholder="验证码" v-model="formState2.code">
                                <template #prefix>
                                <CodeOutlined class="site-form-item-icon" />
                                </template>
                                <template #suffix>
                                <a-button @click="click" :disabled="cooldown" :loading="sending" type="primary">{{ button_txt }}</a-button>
                                </template>
                            </a-input>
                            </a-form-item>

                            <a-form-item>
                            <a-button style="width: 100%" :loading="isLoading" :disabled="disabled2" type="primary" html-type="submit" class="login-form-button">
                                登录
                            </a-button>
                            </a-form-item>
                            <a-form-item>
                                <a-link href="/register">现在注册</a-link>
                                <a-link href="/">返回主页</a-link>
                            </a-form-item>
                        </a-form>
                    </a-tab-pane>
                    <a-tab-pane key="2" title="账密登录">
                        <a-form
                            ref="formRef"
                            :model="formState"
                            @submit="onFinish"
                            layout="vertical"
                        >
                            <a-form-item
                            field="phone"
                            label="手机号"
                            :rules="[{ required: true, message: '请输入手机号' }]"
                            :validate-trigger="['change','input']"
                            >
                            <a-input :disabled="isLoading" placeholder="手机号" v-model="formState.phone">
                                <template #prefix>
                                <MobileOutlined class="site-form-item-icon" />
                                </template>
                            </a-input>
                            </a-form-item>

                            <a-form-item
                            field="passWord"
                            label="密码"
                            :rules="[{ required: true, message: '请输入密码' }]"
                            :validate-trigger="['change','input']"
                            >
                            <a-input-password :disabled="isLoading" placeholder="密码" v-model="formState.passWord">
                                <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                                </template>
                            </a-input-password>
                            </a-form-item>

                            <a-form-item>
                            <a-button style="width: 100%" :loading="isLoading" :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                                登录
                            </a-button>
                            </a-form-item>
                            <a-form-item>
                                <a-link href="/register">现在注册</a-link>
                                <a-link href="/">返回主页</a-link>
                            </a-form-item>
                        </a-form>
                    </a-tab-pane>
                </a-tabs>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
.login{
    width: 500px;
    height: 100%;
    border-radius: 10px 0px 0px 10px;
    /* background: #000000b6; */
    background: #FFFFFFb6;
    backdrop-filter: blur(25px);
    /* color: #FFF; */
    float: right;
}
.side_panel, .container{
    display: inline-block;
    height: 92%;
    padding: 24px 18px;
    border-radius: 10px;
}
.container{
    width: 90%
}

</style>

<script lang="ts" setup>
import { reactive, computed, ref, onMounted, toRaw } from 'vue';
import { MobileOutlined, LockOutlined, CodeOutlined } from '@ant-design/icons-vue';
import { Modal, Message } from '@arco-design/web-vue';
import Axios from 'axios'
import { routerKey, useRouter } from 'vue-router';
import { requireQrCode, requireQrStatus } from '../js/require_qr'
import QRCode from 'qrcodejs2-fix'
import { useUserStore } from '../store/user';

const isLoading = ref(false)
const router = useRouter()
const CaptchaObj = ref(null)
const data = ref({})
const a = ref(null)

const user = useUserStore()
// getQr
const qrloading = ref(true)
const qrText = ref('二维码正在获取')
const qrKey = ref(null)
const qrCode = ref(null)
const status = ref(0)

const refreshQr = () => {
    status.value = 0
    getQr()
    console.log(qrCode)
    console.log(a)
    clearInterval(toRaw(a))
}

const getQr = () => {
    if (a.value != null){
        clearInterval(toRaw(a))
    }
    if (status.value != 0){
        status.value = 0
    }
    requireQrCode().then((key) => { 
            qrKey.value = key
            var qr = new QRCode(document.getElementById("qrcode"), {
                text: "loginByQr:" + key,
                width: 180, height: 180
            })
            qrCode.value = qr
            qrloading.value = false;
            status.value = 0
            qrText.value = "请使用最新版仙舟通鉴编辑器App扫描二维码登录"
            var s = setInterval(() => {
                requireQrStatus(key).then((code) => {
                    status.value = code
                    if (code == -2){
                        qr.clear()
                        clearInterval(s)
                    }
                    if (code == 1){
                    }
                    if (code == 2){
                        Axios('/api/v2/user/get_token?qr_key=' + key)
                        .then((r) => {
                            clearInterval(s)
                            if (r['data']['code'] != 0){
                                Message.error('扫码登录失败：' + r['data']['msg'])
                            }else{
                                user.fetchUserData()
                                Message.success('登陆成功')
                                if (router.currentRoute.value.query['redirect_to'] != null){
                                    router.push(router.currentRoute.value.query['redirect_to'])
                                }else{
                                    router.push('/')
                                }
                            }
                        })
                        .catch((e) => {
                            clearInterval(a)
                            Modal.error({
                                title: '二维码获取失败，请稍后再试',
                                content: '请加入官方QQ频道（仙舟通鉴）反馈，并附带以下错误信息：\n' + e,
                                onOk: window.location.reload()
                            });
                        })
                    }
                })
            } , 1000)
            a.value = s
        })
}

onMounted(() => {
    getQr()
})

// send_sms
const button_txt = ref("获取验证码")
const sending = ref(false)
const cooldown = ref(false)
const click = () => { if ( formState2.phone != '' ){toRaw(CaptchaObj.value).showCaptcha()} else{ Message.warning('请填写手机号') } }
const send = () => {
    sending.value = true
    Axios({
        url: '/api/v2/global/send_sms',
        method: 'POST',
        data: {
            phone: formState2.phone,
            catagory: 0,
            lot_number: data.value['lot_number'],
            captcha_output: data.value['captcha_output'],
            pass_token: data.value['pass_token'],
            gen_time: data.value['gen_time'],
        }
    })
    .then(function(r){
        if ( r['data']['code'] != 0 ){
            sending.value = false
            Message.error(r['data']['msg'])
        }else{
            sending.value = false
            Message.success(r['data']['msg'])
            let countdown = 120
            cooldown.value = true
            button_txt.value = "120s 后重发"
            var a = setInterval(function(){
                countdown-=1
                button_txt.value = `${countdown}s 后重发`
                if (countdown <= 0){
                    clearInterval(a)
                    cooldown.value = false
                    button_txt.value = `重发验证码`
                }
            }, 1000)
        }
    })
    .catch(function(e){
        Modal.error({
            title: '错误',
            content: '后端服务器通讯故障\n' + e,
        })
        sending.value = false
    })
}


initGeetest4({
    captchaId: 'e61e058583e790945b982f988b8452a7',
    product: 'bind',
    language: 'zho'
}, function(captchaObj){
    captchaObj.onReady(function(){
        console.log('captcha ok')
        CaptchaObj.value = captchaObj;
    }).onSuccess(function(){
        data.value = captchaObj.getValidate()
        send()
    }).onError(function(){
        Modal.error({
            title: '验证码初始化失败',
            content: '请尝试刷新页面',
            onOk: function(){ window.location.reload() }
        })
    })
});

onMounted(() => { document.title = "登录 | 仙舟通鉴 Wiki 内容管理器" })

Axios('/api/v1/heartbeat')
.then(function(Response){
    if (Response['data']['code'] == 0){ console.log('后端通信成功') }
    else{ console.warn('返回状态码错误：' + Response['data']['code']) }
})
.catch(function(error){
    console.error('通信失败！' + error)
    Modal.error({
        title: '错误',
        content: '后端服务器通讯故障\n' + error,
        onOk: function(){
            window.location.reload()
        }
    })
})

interface FormState {
  phone: string;
  passWord: string;
}

interface FormState2 {
  phone: string;
  code: string;
}
const formState = reactive<FormState>({
  phone: '',
  passWord: '',
});
const formState2 = reactive<FormState2>({
  phone: '',
  code: '',
});
const onFinish = (values: any) => {
    isLoading.value = true;
    Axios({
        url: '/api/v2/user/login',
        data: {
            phone: formState['phone'],
            passWord: formState['passWord'],
        },
        method: 'POST',
        timeout: 30000,
        timeoutErrorMessage: '请求超时'
    })
    .then(function(Response){
        isLoading.value = false
        if (Response['data']['code'] != 0){
            Message.error(Response['data']['msg'])
        }else{
            user.fetchUserData()
            Message.success('登陆成功')
            if (router.currentRoute.value.query['redirect_to'] != null){
                router.push(router.currentRoute.value.query['redirect_to'])
            }else{
                router.push('/')
            }
        }
    })
     .catch(function(error){
        isLoading.value = false
        console.error('通信失败！' + error)
        Modal.error({
            title: '错误',
            content: '后端服务器通讯故障',
        })
    })
};

const onFinish2 = (values: any) => {
    isLoading.value = true;
    Axios({
        url: '/api/v2/user/login_sms',
        data: {
            phone: formState2['phone'],
            code: formState2['code'],
        },
        method: 'POST',
        timeout: 30000,
        timeoutErrorMessage: '请求超时'
    })
    .then(function(Response){
        isLoading.value = false
        if (Response['data']['code'] != 0){
            Message.error(Response['data']['msg'])
        }else{
            user.fetchUserData()
            Message.success('登陆成功')
            if (router.currentRoute.value.query['redirect_to'] != null){
                router.push(router.currentRoute.value.query['redirect_to'])
            }else{
                router.push('/')
            }
        }
    })
     .catch(function(error){
        isLoading.value = false
        console.error('通信失败！' + error)
        Modal.error({
            title: '错误',
            content: '后端服务器通讯故障',
        })
    })
};

const disabled = computed(() => {
  return !(formState.phone && formState.passWord);
});

const disabled2 = computed(() => {
  return !(formState2.phone && formState2.code);
});
</script>