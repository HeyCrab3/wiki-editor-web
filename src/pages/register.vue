// @ts-nocheck
<template>
    <div id="b">
        <div class="login">
            <div class="container">
                <h2>注册</h2>
                <a-form
                    :model="formState"
                    layout="vertical"
                >
                    <a-form-item
                    field="userName"
                    label="用户名"
                    :rules="[{ required: true, message: '请输入用户名' }]"
                    :validate-trigger="['change','input']"
                    >
                    <a-input :disabled="isLoading" placeholder="用户名" v-model="formState.userName">
                        <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                    </a-form-item>

                    <a-form-item
                    field="nick"
                    label="昵称"
                    :rules="[{ required: true, message: '请输入昵称' }]"
                    :validate-trigger="['change','input']"
                    >
                    <a-input :disabled="isLoading" placeholder="昵称" v-model="formState.nick">
                        <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
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

                    <a-form-item
                    field="confirmPassWord"
                    label="确认密码"
                    :rules="[{ required: true, message: '请输入密码' }]"
                    :validate-trigger="['change','input']"
                    >
                    <a-input-password :disabled="isLoading" placeholder="确认密码" v-model="formState.confirmPassWord">
                        <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                    </a-form-item>

                    <a-form-item>
                    <a-button type="primary" style="width: 100%" :loading="isLoading" :disabled="disabled" variant="solid" @click="onFinish">
                        注册
                    </a-button>
                    </a-form-item>

                    <a-form-item><a-link href="#" @click="push">返回登录</a-link></a-form-item>
                </a-form>
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
#b{
    background: url(https://www.dmoe.cc/random.php) no-repeat;
    backgrouna-size: cover;
    width: 100%;
    height: 100%
}
</style>

<script lang="ts" setup>
import { reactive, computed, ref, toRaw, onMounted } from 'vue';
import { UserOutlined, LockOutlined, CodeOutlined } from '@ant-design/icons-vue';
//import { Modal, message } from 'ant-design-vue';
import { Message, Modal } from '@arco-design/web-vue'
import Axios from 'axios'
import { routerKey, useRouter } from 'vue-router';
const isLoading = ref(false)
const router = useRouter()
const CaptchaObj = ref(null)

const push = () => { router.push('/login') }

onMounted(() => { document.title = "注册 | 仙舟通鉴 Wiki 内容管理器" })

Axios('/api/v1/heartbeat')
.then(function(Response){
    if (Response['data']['code'] == 0){ console.log('后端通信成功') }
    else{ console.warn('返回状态码错误：' + Response['data']['code']) }
})
.catch(function(error){
    console.error('通信失败！' + error)
    Modal.error({
        title: '后端通信错误',
        content: '后端服务器通讯故障\n' + error,
        onOk: function(){ window.location.reload() }
    })
})

initGeetest4({
    captchaId: 'e61e058583e790945b982f988b8452a7',
    product: 'bind',
    language: 'zho'
}, function(captchaObj){
    captchaObj.onReady(function(){
        console.log('captcha ok')
        CaptchaObj.value = captchaObj;
    }).onSuccess(function(){
        if (formState.userName == null || formState.passWord == null || formState.confirmPassWord == null){
            Message.error('表单填写不完整')
        }else{
            post(captchaObj.getValidate())
        }
    }).onError(function(){
        Modal.error({
            title: '验证码初始化失败',
            content: '请尝试刷新页面',
            onOk: function(){ window.location.reload() }
        })
    })
});

interface FormState {
  userName: string;
  passWord: string;
  confirmPassWord: string;
  nick: string
}
const formState = reactive<FormState>({
  userName: '',
  passWord: '',
  confirmPassWord: '',
  nick: ''
});

const post = (data: any) => {
    console.log(formState)
    if (formState['passWord'] != formState['confirmPassWord']){
        Message.error('两次输入的密码不一致')
    }else{
        isLoading.value = true;
        Axios({
            url: '/api/v1/user/reg',
            data: {
                userName: formState['userName'],
                passWord: formState['passWord'],
                nickName: formState['nick'],
                lot_number: data['lot_number'],
                captcha_output: data['captcha_output'],
                pass_token: data['pass_token'],
                gen_time: data['gen_time'],
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
                Message.success('注册成功')
                router.push('/login')
            }
        })
        .catch(function(error){
            isLoading.value = false
            console.error('通信失败！' + error)
            Modal.error({
                title: '后端通信错误',
                content: '后端服务器通讯故障\n' + error,
            })
        })
    }
}

const onFinish = (values: any) => {
    toRaw(CaptchaObj.value).showCaptcha()
};

const disabled = computed(() => {
  return !(formState.userName && formState.passWord && formState.confirmPassWord && formState.nick);
});
</script>