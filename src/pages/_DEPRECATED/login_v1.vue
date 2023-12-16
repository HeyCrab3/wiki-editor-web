<template>
    <div style="background: url(https://www.dmoe.cc/random.php) no-repeat; background-size: cover; width: 100%; height: 100%">
        <div class="login">
            <div class="container">
                <h2>旧版账号登录</h2>
                <arco-form
                    ref="formRef"
                    :model="formState"
                    @submit="onFinish"
                    layout="vertical"
                >
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
                        <arco-link href="/login">返回</arco-link>
                    </arco-form-item>
                </arco-form>
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
import { reactive, computed, ref, onMounted } from 'vue';
import { UserOutlined, LockOutlined, CodeOutlined } from '@ant-design/icons-vue';
import { Modal, Message } from '@arco-design/web-vue';
import Axios from 'axios'
import { routerKey, useRouter } from 'vue-router';

const isLoading = ref(false)
const router = useRouter()

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
  return !(formState.userName && formState.passWord);
});
</script>