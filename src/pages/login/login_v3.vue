<template>
    <div style="background: url(https://api-images.kanochan.net/api.php?album=Genshin-Impact) no-repeat; background-size: cover; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
        <div class="login_box">
            <LoginSlider/>
            <div style="float: right; padding: 16px; height: 100%; width: 35%">
                <div>
                    <img style="width: 32px" src="/light.png" alt="logo"/>
                    <h2 style="display: inline-block; position: relative; bottom: 10px; left: 6px; font-size: 1rem;">仙舟通鉴编辑器 (测试版)</h2>
                    <div style="float: right; height: 32px; vertical-align: center">
                        <span v-if="!qrLoginMode" style="margin-right: 5px; color: rgb(231,113,26)">扫码登录更安全</span>
                        <Tooltip :title="!qrLoginMode ? '扫码登录更安全' : '切换手机号/验证码登录'">
                            <QrcodeOutlined style="font-size: 1.5em; cursor: pointer" v-if="!qrLoginMode" @click="qrLoginMode = true"/>
                            <MobileOutlined style="font-size: 1.5em;  cursor: pointer" v-else @click="qrLoginMode = false"/>
                        </Tooltip>
                    </div>
                </div>
                <h2><ArrowLeftOutlined @click="$router.push('/')" style="cursor: pointer; margin-right: 10px;"/>欢迎登录</h2>
                <a-tabs default-active-key="1" type="rounded" v-if="!qrLoginMode">
                    <a-tab-pane key="1">
                        <template #title><MobileOutlined style="margin-right: 10px;"/>验证码登录</template>
                        <PhoneLogin/>
                        <a-button type="text" style="margin-top: 20px;" @click="$router.push('/register_v3')">没有账号？注册一个</a-button>
                        <a-button type="text" style="margin-top: 20px; margin-left: 15px" @click="$router.push('/forget_password')">忘记密码？</a-button>
                    </a-tab-pane>
                    <a-tab-pane key="2">
                        <template #title><LockOutlined style="margin-right: 10px;"/>密码登录</template>
                        <UsernameLogin/>
                        <a-button type="text" style="margin-top: 20px;" @click="$router.push('/register_v3')">没有账号？注册一个</a-button>
                        <a-button type="text" style="margin-top: 20px; margin-left: 15px" @click="$router.push('/forget_password')">忘记密码？</a-button>
                    </a-tab-pane>
                </a-tabs>
                <QrLogin v-else/>
            </div>
        </div>
    </div>
</template>

<style>
.login_box {
    width: 80%;
    height: 60%;
    background: #ffffffcb;
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
}
</style>

<script lang="ts" setup>
import LoginSlider from '../../components/login_slider.vue'
import { ref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import PhoneLogin from '../../components/login/phone_login.vue'
import UsernameLogin from '../../components/login/username_login.vue'
import QrLogin from '../../components/login/qr_login.vue'
import { QrcodeOutlined, MobileOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue'
const qrLoginMode = ref(false)
document.title = "登录 | 仙舟通鉴编辑器"
</script>