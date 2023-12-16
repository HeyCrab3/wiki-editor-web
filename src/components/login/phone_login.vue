<template>
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
            <Input :disabled="isLoading" placeholder="手机号" v-model:value="formState2.phone">
                <template #prefix>
                    <MobileOutlined class="site-form-item-icon" />
                </template>
            </Input>
        </arco-form-item>

        <arco-form-item
            field="code"
            label="验证码"
            :rules="[{ required: true, message: '请输入验证码' }]"
            :validate-trigger="['change','input']"
        >
            <Input :disabled="isLoading" placeholder="验证码" v-model:value="formState2.code">
                <template #prefix>
                    <CodeOutlined class="site-form-item-icon" />
                </template>
                <template #suffix>
                    <Button @click="click" :disabled="cooldown" :loading="sending" type="primary">{{ button_txt }}</Button>
                </template>
            </Input>
        </arco-form-item>

        <arco-form-item>
            <span>未注册手机号验证后自动注册，登录或注册即表示您已同意<Button type="link" target="_blank" href="https://seelevollerei.online/build/guide.html#crab-studio-%E6%9C%80%E7%BB%88%E7%94%A8%E6%88%B7%E8%AE%B8%E5%8F%AF%E5%8D%8F%E8%AE%AE">《用户协议》</Button>和<Button type="link" target="_blank" href="https://seelevollerei.online/build/guide.html#%E9%9A%90%E7%A7%81%E6%94%BF%E7%AD%96">《隐私政策》</Button></span>
        </arco-form-item>

        <arco-form-item>
            <Button style="width: 100%" :loading="isLoading" :disabled="disabled2" type="primary" html-type="submit" class="login-form-button">
                登录
            </Button>
        </arco-form-item>
    </arco-form>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw, computed } from 'vue'
import { message } from 'ant-design-vue'
import Axios from 'axios'
import { Modal, Button, Input } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'
import { MobileOutlined, LockOutlined, CodeOutlined } from '@ant-design/icons-vue'
const Message = message;
const isLoading = ref(false)
const user = useUserStore()
const router = useRouter()
const button_txt = ref("获取验证码")
const sending = ref(false)
const cooldown = ref(false)
const CaptchaObj = ref(null)
const data = ref({})
const emit = defineEmits(['login'])
const prop = defineProps(['iframe'])

interface FormState2 {
    phone: string;
    code: string;
}

const formState2 = reactive<FormState2>({
    phone: '',
    code: '',
});

const click = () => {
    if (formState2.phone != '') {
        toRaw(CaptchaObj.value).showCaptcha()
    } else {
        Message.warning('请填写手机号')
    }
}

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
        .then(function(r) {
            if (r['data']['code'] != 0) {
                sending.value = false
                Message.error(r['data']['msg'])
            } else {
                sending.value = false
                Message.success(r['data']['msg'])
                let countdown = 120
                cooldown.value = true
                button_txt.value = "120s 后重发"
                var a = setInterval(function() {
                    countdown -= 1
                    button_txt.value = `${countdown}s 后重发`
                    if (countdown <= 0) {
                        clearInterval(a)
                        cooldown.value = false
                        button_txt.value = `重发验证码`
                    }
                }, 1000)
            }
        })
        .catch(function(e) {
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
}, function(captchaObj) {
    captchaObj.onReady(function() {
        console.log('captcha ok')
        CaptchaObj.value = captchaObj;
    }).onSuccess(function() {
        data.value = captchaObj.getValidate()
        send()
    }).onError(function() {
        Modal.error({
            title: '验证码初始化失败',
            content: '请尝试刷新页面',
            onOk: function() { window.location.reload() }
        })
    })
});

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
        .then(function(Response) {
            isLoading.value = false
            if (Response['data']['code'] != 0) {
                Message.error(Response['data']['msg'])
            } else {
                user.fetchUserData()
                if (prop.iframe == true) {
                    emit('login')
                }
                else{
                    Message.success('登陆成功')
                    if (router.currentRoute.value.query['redirect_to'] != null) {
                        router.push(router.currentRoute.value.query['redirect_to'])
                    } else {
                        router.push('/')
                    }
                }
            }
        })
        .catch(function(error) {
            isLoading.value = false
            console.error('通信失败！' + error)
            Modal.error({
                title: '错误',
                content: '后端服务器通讯故障',
            })
        })
};

const disabled2 = computed(() => {
    return !(formState2.phone && formState2.code);
});
</script>