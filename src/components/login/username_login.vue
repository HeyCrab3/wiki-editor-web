<template>
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
            <Input :disabled="isLoading" placeholder="手机号" v-model:value="formState.phone">
                <template #prefix>
                    <MobileOutlined class="site-form-item-icon" />
                </template>
            </Input>
        </arco-form-item>

        <arco-form-item
            field="passWord"
            label="密码"
            :rules="[{ required: true, message: '请输入密码' }]"
            :validate-trigger="['change','input']"
        >
            <InputPassword :disabled="isLoading" placeholder="密码" v-model:value="formState.passWord">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </InputPassword>
        </arco-form-item>

        <arco-form-item>
            <span>未注册手机号验证后自动注册，登录或注册即表示您已同意<Button type="link" target="_blank" href="https://seelevollerei.online/build/guide.html#crab-studio-%E6%9C%80%E7%BB%88%E7%94%A8%E6%88%B7%E8%AE%B8%E5%8F%AF%E5%8D%8F%E8%AE%AE">《用户协议》</Button>和<Button type="link" target="_blank" href="https://seelevollerei.online/build/guide.html#%E9%9A%90%E7%A7%81%E6%94%BF%E7%AD%96">《隐私政策》</Button></span>
        </arco-form-item>

        <arco-form-item>
            <Button style="width: 100%" :loading="isLoading" :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                登录
            </Button>
        </arco-form-item>
    </arco-form>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw, computed } from 'vue'
import { message } from 'ant-design-vue'
import Axios from 'axios'
import { Modal, Button, Input, InputPassword } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'
import { MobileOutlined, LockOutlined } from '@ant-design/icons-vue'
const Message = message;
const isLoading = ref(false)
const router = useRouter()
const user = useUserStore()
const emit = defineEmits(['login'])
const prop = defineProps(['iframe'])

interface FormState {
  phone: string;
  passWord: string;
}
const formState = reactive<FormState>({
  phone: '',
  passWord: '',
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
</script>