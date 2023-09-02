<template>
    <div style="background: url(https://www.dmoe.cc/random.php) no-repeat; background-size: cover; width: 100%; height: 100%">
        <div class="login">
            <div class="side_panel">
                <h2>✨ 欢迎登录仙舟通鉴 Wiki 内容编辑器</h2>
                <p>在这里提交你的内容，并可视化看到审核进度</p>
            </div>
            <div class="container">
                <h2>欢迎登录</h2>
                <a-form
                    ref="formRef"
                    :model="formState"
                    @submit="onFinish"
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
                    <a-button :loading="isLoading" :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                        登录
                    </a-button>
                    或者
                    <a-link href="/register">现在注册</a-link>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login{
    width: 70%;
    height: 60%;
    border-radius: 10px;
    background: #000000b6;
    backdrop-filter: blur(25px);
    margin: auto;
    position: relative;
    top: 20%;
    color: #FFF
}
.side_panel, .container{
    display: inline-block;
    height: 92%;
    padding: 24px 18px;
    border-radius: 10px;
}
.side_panel{
    width: 45%;
    background: url(/light-bg2.png) no-repeat;
    background-size: 100% 100%;
    float: left
}
.container{
    float: right;
    width: 45%
}

</style>

<script lang="ts" setup>
import { reactive, computed, ref, onMounted } from 'vue';
import { UserOutlined, LockOutlined, CodeOutlined } from '@ant-design/icons-vue';
import { Modal, Message } from '@arco-design/web-vue';
import Axios from 'axios'
import { routerKey, useRouter } from 'vue-router';

const isLoading = ref(false)
const router = useRouter()

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
  userName: string;
  passWord: string;
}
const formState = reactive<FormState>({
  userName: '',
  passWord: '',
});
const onFinish = (values: any) => {
    isLoading.value = true;
    Axios({
        url: '/api/v1/user/login',
        data: {
            userName: formState['userName'],
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
            Message.success('登陆成功')
            router.push('/')
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
  return !(formState.userName && formState.passWord);
});
</script>