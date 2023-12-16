<template>
    <arco-form :model="formState" layout="vertical">
        <arco-form-item
            field="userName"
            label="用户名"
            :rules="[{ required: true, message: '请输入用户名' }]"
            :validate-trigger="['change','input']"
        >
            <arco-input :disabled="isLoading" placeholder="用户名" v-model="formState.userName">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </arco-input>
        </arco-form-item>

        <arco-form-item
            field="nick"
            label="昵称"
            :rules="[{ required: true, message: '请输入昵称' }]"
            :validate-trigger="['change','input']"
        >
            <arco-input :disabled="isLoading" placeholder="昵称" v-model="formState.nick">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </arco-input>
        </arco-form-item>

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
            field="code"
            label="验证码"
            :rules="[{ required: true, message: '请输入验证码' }]"
            :validate-trigger="['change','input']"
        >
            <arco-input :disabled="isLoading" placeholder="验证码" v-model="formState.code">
                <template #prefix>
                    <CodeOutlined class="site-form-item-icon" />
                </template>
                <template #suffix>
                    <arco-button @click="click" :disabled="cooldown" :loading="sending" type="primary">{{ button_txt }}</arco-button>
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

        <arco-form-item
            field="confirmPassWord"
            label="确认密码"
            :rules="[{ required: true, message: '请输入密码' }]"
            :validate-trigger="['change','input']"
        >
            <arco-input-password :disabled="isLoading" placeholder="确认密码" v-model="formState.confirmPassWord">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </arco-input-password>
        </arco-form-item>

        <arco-form-item>
            <arco-button type="primary" style="width: 100%" :loading="isLoading" :disabled="disabled" variant="solid" @click="post">
                注册
            </arco-button>
        </arco-form-item>

        <arco-form-item>
            <arco-link href="#" @click="push">返回登录</arco-link>
        </arco-form-item>
    </arco-form>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, toRaw } from 'vue';
import { UserOutlined, LockOutlined, CodeOutlined, MobileOutlined } from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';
import Axios from 'axios';
import { routerKey, useRouter } from 'vue-router';

const isLoading = ref(false);
const router = useRouter();
const CaptchaObj = ref(null);
const data = ref({});
const Message = message;
const button_txt = ref("获取验证码");
const sending = ref(false);
const cooldown = ref(false);

const click = () => {
    if (formState.phone != '') {
        toRaw(CaptchaObj.value).showCaptcha();
    } else {
        Message.warning('请填写手机号');
    }
};

const send = () => {
    sending.value = true;
    Axios({
        url: '/api/v2/global/send_sms',
        method: 'POST',
        data: {
            phone: formState.phone,
            catagory: 0,
            lot_number: data.value['lot_number'],
            captcha_output: data.value['captcha_output'],
            pass_token: data.value['pass_token'],
            gen_time: data.value['gen_time'],
        },
    })
        .then(function (r) {
            if (r['data']['code'] != 0) {
                sending.value = false;
                Message.error(r['data']['msg']);
            } else {
                sending.value = false;
                Message.success(r['data']['msg']);
                let countdown = 120;
                cooldown.value = true;
                button_txt.value = "120s 后重发";
                var a = setInterval(function () {
                    countdown -= 1;
                    button_txt.value = `${countdown}s 后重发`;
                    if (countdown <= 0) {
                        clearInterval(a);
                        cooldown.value = false;
                        button_txt.value = `重发验证码`;
                    }
                }, 1000);
            }
        })
        .catch(function (e) {
            Modal.error({
                title: '错误',
                content: '后端服务器通讯故障\n' + e,
            });
            sending.value = false;
        });
};

const push = () => {
    router.push('/login');
};

initGeetest4(
    {
        captchaId: 'e61e058583e790945b982f988b8452a7',
        product: 'bind',
        language: 'zho',
    },
    function (captchaObj) {
        captchaObj.onReady(function () {
            console.log('captcha ok');
            CaptchaObj.value = captchaObj;
        }).onSuccess(function () {
            data.value = captchaObj.getValidate();
            send();
        }).onError(function () {
            Modal.error({
                title: '验证码初始化失败',
                content: '请尝试刷新页面',
                onOk: function () {
                    window.location.reload();
                },
            });
        });
    }
);

interface FormState {
    userName: string;
    passWord: string;
    phone: string;
    code: string;
    confirmPassWord: string;
    nick: string;
}

const formState = reactive<FormState>({
    userName: '',
    passWord: '',
    phone: '',
    code: '',
    confirmPassWord: '',
    nick: '',
});

const post = (data: any) => {
    console.log(formState);
    if (formState['passWord'] != formState['confirmPassWord']) {
        Message.error('两次输入的密码不一致');
    } else {
        isLoading.value = true;
        Axios({
            url: '/api/v2/user/reg',
            data: {
                userName: formState['userName'],
                passWord: formState['passWord'],
                phone: formState['phone'],
                code: formState['code'],
                nickName: formState['nick'],
            },
            method: 'POST',
            timeout: 30000,
            timeoutErrorMessage: '请求超时',
        })
            .then(function (Response) {
                isLoading.value = false;
                if (Response['data']['code'] != 0) {
                    Message.error(Response['data']['msg']);
                } else {
                    Message.success('注册成功');
                    router.push('/login');
                }
            })
            .catch(function (error) {
                isLoading.value = false;
                console.error('通信失败！' + error);
                Modal.error({
                    title: '后端通信错误',
                    content: '后端服务器通讯故障\n' + error,
                });
            });
    }
};

const disabled = computed(() => {
    return !(formState.userName && formState.passWord && formState.confirmPassWord && formState.nick);
});
</script>