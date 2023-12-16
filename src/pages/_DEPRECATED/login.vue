<template>
    <div style="background: url(https://www.dmoe.cc/random.php) no-repeat; background-size: cover; width: 100%; height: 100%">
        <div class="login">
            <div class="container">
                <h2>欢迎登录</h2>
                <p style="text-align: center;">使用第三方账号登录</p>
                <div style="text-align: center; padding: 10px; margin-bottom: 10px;">
                    <arco-button @click="huawei_login" shape="circle"><svg t="1699707834839" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1773" width="24" height="24"><path d="M446.50124 183.429683s-71.363328-3.247974-116.870777 55.568596c-45.528939 58.814524-11.337209 148.651598 10.248411 194.994066 21.584598 46.341445 135.480624 228.190119 139.664923 232.190223 4.151553 4.010337 9.154497 2.322905 9.42772-1.276063 0.275269-3.569292 13.010315-264.227893 2.76088-328.498686-10.248412-64.272839-40.591487-145.927557-45.231157-152.978136zM199.86091 304.604486c-8.156774 0.87288-66.697051 59.253522-71.973218 116.331495-5.301749 57.07388 19.128663 95.057983 87.341231 140.499941 68.664869 48.689932 231.852532 138.264017 234.849796 130.547265 3.001357-7.696286-63.235207-125.387755-117.44076-210.986295-54.201459-85.596494-124.656091-177.262216-132.777049-176.392406z m21.946848 526.487969c49.38578 22.079878 126.322034-27.508517 147.604756-41.930994 19.792788-15.121396 56.353472-42.919509 56.353473-42.919509l-279.836383 7.489578s26.491351 55.276954 75.878154 77.360925z m7.030114-226.13532c-50.083675-25.069979-153.122423-82.662675-157.154249-81.560574-4.030803 1.100054-19.553335 72.743768 12.670577 126.742613 32.223912 53.998845 94.978165 70.511937 123.777071 74.924433 32.379455 4.613064 222.75841 2.551102 221.482347-1.277086-1.122567-3.341095-150.662395-93.782943-200.775746-118.829386z m464.281185-365.957833c-45.503357-58.81657-116.869754-55.568596-116.869754-55.568596-4.63353 7.048533-34.983769 88.703251-45.231157 152.978137-10.249435 64.271816 2.517333 324.928371 2.789532 328.500732 0.275269 3.595898 5.244444 5.281283 9.423627 1.27504 4.1536-4.002151 118.081349-185.850825 139.667993-232.19227 21.553898-46.342468 55.748698-136.177496 10.219759-194.993043zM951.064874 523.395538c-4.02978-1.103124-107.068528 56.492642-157.151179 81.560574-50.083675 25.045419-199.652156 115.488291-200.748117 118.829385-1.302669 3.827165 189.076286 5.891174 221.455741 1.277087 28.79686-4.412496 91.551112-20.925588 123.777071-74.924434 32.253588-53.997821 16.697287-125.643582 12.666484-126.742612zM653.344169 789.161461c21.278629 14.421454 98.245581 64.010873 147.634432 41.930994 49.384757-22.086018 75.881225-77.360925 75.881224-77.360925l-279.837406-7.489578c-0.002047 0 36.556591 27.802206 56.32175 42.919509z m241.551428-368.226503c-5.304819-57.07695-63.84305-115.457592-71.970148-116.331495-8.151657-0.86981-78.608336 90.795912-132.809795 176.393429-54.207599 85.59854-120.439046 203.293079-117.438713 210.986295 3.000334 7.715729 166.212556-81.857333 234.851842-130.547265 68.208475-45.442982 92.672656-83.426061 87.366814-140.500964z" fill="#272536" p-id="1774"></path></svg></arco-button>
                </div>
                <!-- <arco-alert style="margin: 30px 0px">由于账号系统的变更，旧版账号将于不久后停止使用，如需迁移数据请点击<arco-link href="/login_v1">这里</arco-link>登录旧版账户</arco-alert> -->
                <arco-tabs default-active-key="0" type="rounded">
                    <arco-tab-pane key="0" title="扫码登录" style="text-align: center;">
                        <div v-if="status == -2" style="margin: auto; margin-top: 60%; width: 180px; height: 180px;">
                            <p style="font-size: 1.5em;">二维码已失效</p>
                            <arco-button type="primary" size="large" @click="refreshQr">点击刷新</arco-button>
                        </div>
                        <div v-if="status == 1" style="margin: auto; margin-top: 60%;;">
                            <arco-result status="success" title="扫码成功" >
                                <template #subtitle>
                                请在手机上确认登录
                                </template>
                                <template #extra>
                                <arco-space>
                                    <arco-button type='primary' size="large" shape="round" @click="refreshQr">返回扫码</arco-button>
                                </arco-space>
                                </template>
                            </arco-result>
                        </div>
                        <arco-spin :loading="qrloading" style="text-align: center;">
                            <div style="margin: auto; margin-top: 60%; text-align: center;"  v-if="status == 0" id="qrcode"></div>
                            <span v-if="status == 0" style="display: block; margin-top: 20px;">{{ qrText }}</span>
                        </arco-spin>
                    </arco-tab-pane>
                    <arco-tab-pane key="1" title="手机号登录">
                        <arco-form
                            ref="formRef"
                            :model="formState2"
                            @submit="onFinish2"
                            layout="vertical" 
                        >
                            <arco-form-item
                            field="phone"
                            label="手机号"
                            :rules="[{ required: true, message: '请输入手机号' }]"
                            :validate-trigger="['change','input']"
                            >
                            <arco-input :disabled="isLoading" placeholder="手机号" v-model="formState2.phone">
                                <template #prefix>
                                <MobileOutlined class="site-form-item-icon" />
                                </template>
                            </arco-input>
                            </arco-form-item>

                            <arco-form-item
                            field="code"
                            label="验证码"
                            :rules="[{ required: true, message: '请输入验证码' }]"
                            :validate-trigger="['change','input']"
                            >
                            <arco-input :disabled="isLoading" placeholder="验证码" v-model="formState2.code">
                                <template #prefix>
                                <CodeOutlined class="site-form-item-icon" />
                                </template>
                                <template #suffix>
                                <arco-button @click="click" :disabled="cooldown" :loading="sending" type="primary">{{ button_txt }}</arco-button>
                                </template>
                            </arco-input>
                            </arco-form-item>

                            <arco-form-item>
                            <arco-button style="width: 100%" :loading="isLoading" :disabled="disabled2" type="primary" html-type="submit" class="login-form-button">
                                登录
                            </arco-button>
                            </arco-form-item>
                            <arco-form-item>
                                <arco-link href="/register">现在注册</arco-link>
                                <arco-link href="/">返回主页</arco-link>
                            </arco-form-item>
                        </arco-form>
                    </arco-tab-pane>
                    <arco-tab-pane key="2" title="账密登录">
                        <arco-form
                            ref="formRef"
                            :model="formState"
                            @submit="onFinish"
                            layout="vertical"
                        >
                            <arco-form-item
                            field="phone"
                            label="手机号"
                            :rules="[{ required: true, message: '请输入手机号' }]"
                            :validate-trigger="['change','input']"
                            >
                            <arco-input :disabled="isLoading" placeholder="手机号" v-model="formState.phone">
                                <template #prefix>
                                <MobileOutlined class="site-form-item-icon" />
                                </template>
                            </arco-input>
                            </arco-form-item>

                            <arco-form-item
                            field="passWord"
                            label="密码"
                            :rules="[{ required: true, message: '请输入密码' }]"
                            :validate-trigger="['change','input']"
                            >
                            <arco-input-password :disabled="isLoading" placeholder="密码" v-model="formState.passWord">
                                <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                                </template>
                            </arco-input-password>
                            </arco-form-item>

                            <arco-form-item>
                            <arco-button style="width: 100%" :loading="isLoading" :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                                登录
                            </arco-button>
                            </arco-form-item>
                            <arco-form-item>
                                <arco-link href="/register">现在注册</arco-link>
                                <arco-link href="/">返回主页</arco-link>
                            </arco-form-item>
                        </arco-form>
                    </arco-tab-pane>
                </arco-tabs>
                
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

onMounted(() => { document.title = "登录 | 仙舟通鉴编辑器" })

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
            clearInterval(toRaw(a))
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
            clearInterval(toRaw(a))
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

const huawei_login = () => {
    Modal.info({
        title: '请稍等',
        content: '正在跳转登录'
    })
    if (router.currentRoute.value.query['redirect_to'] != null){
        const redirect_uri = `${window.location.protocol}//${window.location.host + "/login_callback?login_platform=huawei&redirect_to=${router.currentRoute.value.query['redirect_to']}"}`
        const base_url : string = `https://oauth-login.cloud.huawei.com/oauth2/v3/authorize?response_type=code&access_type=online&state=${getUuid()}&client_id=109601493&redirect_uri=${encodeURI(redirect_uri)}&scope=openid+profile`
        window.open(base_url, "_parent")
    }else{
        const redirect_uri = `${window.location.protocol}//${window.location.host + "/login_callback?login_platform=huawei"}`
        const base_url : string = `https://oauth-login.cloud.huawei.com/oauth2/v3/authorize?response_type=code&access_type=online&state=${getUuid()}&client_id=109601493&redirect_uri=${encodeURI(redirect_uri)}&scope=openid+profile`
        window.open(base_url, "_parent")
    }
}

function getUuid () {
  if (typeof crypto === 'object') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
      const callback = (c) => {
        const num = Number(c);
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
      };
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, callback);
    }
  }
  let timestamp = new Date().getTime();
  let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let random = Math.random() * 16;
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (perforNow + random) % 16 | 0;
      perforNow = Math.floor(perforNow / 16);
    }
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
};
</script>