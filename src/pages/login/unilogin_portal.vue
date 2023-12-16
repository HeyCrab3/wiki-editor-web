<template>
    <div style="height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center; background-size: cover;" :style="{ background: fullscreen == '1' ? `url(${background}) no-repeat` : 'none' }">
        <ConfigProvider :theme="{token: { colorPrimary: themeColor }}">
            <div :style="computedCSS">
                <LoginSlider v-if="fullscreen == '1'"/>
                <div v-if="!completed && !error" :style="computedCSS2">
                    <div>
                        <img style="width: 32px" src="/light.png" alt="logo"/>
                        <h2 style="display: inline-block; position: relative; bottom: 10px; left: 6px; font-size: 1rem;">仙舟通鉴编辑器 (测试版)</h2>
                        <div style="float: right; height: 32px; vertical-align: center" :style="{ marginRight: fullscreen == '1' ? 'none': '20px' }">
                            <span v-if="!qrLoginMode" style="margin-right: 5px; color: rgb(231,113,26)">扫码登录更安全</span>
                            <Tooltip :title="!qrLoginMode ? '扫码登录更安全' : '切换手机号/验证码登录'">
                                <QrcodeOutlined style="font-size: 1.5em; cursor: pointer" v-if="!qrLoginMode" @click="qrLoginMode = true"/>
                                <MobileOutlined style="font-size: 1.5em;  cursor: pointer" v-else @click="qrLoginMode = false"/>
                            </Tooltip>
                        </div>
                    </div>
                    <h2>统一登录</h2>
                    <a-tabs default-active-key="1" type="rounded" v-if="!qrLoginMode">
                        <a-tab-pane key="1">
                            <template #title><MobileOutlined style="margin-right: 10px;"/>验证码登录</template>
                            <PhoneLogin @login="handleLogin" :iframe="true"/>
                        </a-tab-pane>
                        <a-tab-pane key="2">
                            <template #title><LockOutlined style="margin-right: 10px;"/>密码登录</template>
                            <UsernameLogin @login="handleLogin" :iframe="true"/>
                        </a-tab-pane>
                    </a-tabs>
                    <QrLogin @login="handleLogin" v-else/>
                </div>
                <div :style="computedCSS2" v-if="completed">
                    <div>
                        <img style="width: 32px" src="/light.png" alt="logo"/>
                        <h2 style="display: inline-block; position: relative; bottom: 10px; left: 6px; font-size: 1rem;">仙舟通鉴编辑器 (测试版)</h2>
                    </div>
                    <h2>统一登录</h2>
                    <div style="text-align: center">
                        <Result status="success" title="登陆成功" sub-title="请返回授权应用继续操作"/>
                    </div>
                </div>
                <div :style="computedCSS2" v-if="error">
                    <div>
                        <img style="width: 32px" src="/light.png" alt="logo"/>
                        <h2 style="display: inline-block; position: relative; bottom: 10px; left: 6px; font-size: 1rem;">仙舟通鉴编辑器 (测试版)</h2>
                    </div>
                    <h2>统一登录</h2>
                    <div style="text-align: center">
                        <Result status="error" title="登录失败" :sub-title="`请将以下错误信息反馈给应用开发者或加入QQ频道：仙舟通鉴 进行反馈：\n${ex}`"/>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    </div>
</template>

<style>

</style>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { ConfigProvider, message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import LoginSlider from '../../components/login_slider.vue'
import { Tooltip, Result } from 'ant-design-vue'
import PhoneLogin from '../../components/login/phone_login.vue'
import UsernameLogin from '../../components/login/username_login.vue'
import QrLogin from '../../components/login/qr_login.vue'
import { QrcodeOutlined, MobileOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue'
import Axios from 'axios'
import Cookies from 'js-cookie'

const qrLoginMode = ref(false)
const themeColor = ref('#1890ff')
const fullscreen = ref('0')
const loading = ref(true)
const background = ref('0')
const type = ref<any>('session')
const completed = ref(false)
const error = ref(false)
const ex = ref(null)
const CSS = ref({
  borderRadius: '10px',
});

const computedCSS = computed(() => {
  return {
    width: fullscreen.value == '0' ? '100vw' : '80%',
    height: fullscreen.value == '0' ? '100vh' : '80%',
    background: fullscreen.value == '1' ? '#FFFFFFCB' : 'none',
    backdropFilter: fullscreen.value == '1' ? 'blur(10px)' : 'none',
    boxShadow: fullscreen.value == '1' ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none',
    overflow: 'hidden',
    ...CSS.value,
  };
});

const computedCSS2 = computed(() => {
  return {
    float: fullscreen.value == '1' ? 'right' : 'none',
    width: fullscreen.value == '1' ? '35%' : '100%',
    height: fullscreen.value == '0' ? '100vh' : '100%',
    padding: fullscreen.value == '0' ? '20px' : '16px',
    margin: fullscreen.value == '0' ? 'auto' : 'none',
  };
});

const getFingerprint = () => {
    var fingerprint = [];
    // 用户代理
    fingerprint.push({ key: "user_agent", value: navigator.userAgent });
    // 语言
    fingerprint.push({ key: "language", value: navigator.language });
    // 设备像素比：物理像素和设备独立像素的比例
    fingerprint.push({ key: "pixel_ratio", value: window.devicePixelRatio });
    // 硬件并发数，即：几核CPU
    fingerprint.push({ key: "hardware_concurrency", value: navigator.hardwareConcurrency });
    // 屏幕的宽度、高度
    fingerprint.push({ key: "resolution", value: [screen.width, screen.height] });
    // 屏幕分辨率的高、宽
    fingerprint.push({ key: "available_resolution", value: [screen.availHeight, screen.availWidth] });
    // 格林威治时间与本地时间的差值，单位是分钟
    fingerprint.push({ key: "timezone_offset", value: new Date().getTimezoneOffset() });
    // 本地存储支持度识别，例：window.openDatabase被IE、Google Chrome支持、但FireFox不支持
    fingerprint.push({ key: "session_storage", value: !window.sessionStorage });
    fingerprint.push({ key: "local_storage", value: !window.localStorage });
    fingerprint.push({ key: "indexed_db", value: !window.indexedDB });
    // 系统平台类型，如:win32
    fingerprint.push({ key: "navigator_platform", value: navigator.platform });
    // 浏览器是否开启隐私保护
    fingerprint.push({ key: "do_not_track", value: navigator.doNotTrack });
    // 屏幕是否支持触摸
    fingerprint.push({ key: "touch_support", value: navigator.maxTouchPoints });
    // 浏览器插件
    for (var i = 0; i < navigator.plugins.length; i++) {
        fingerprint.push({ key: "navigator_plugin_" + i, value: navigator.plugins[i].name });
    }
    // 是否支持cookie
    fingerprint.push({ key: "cookie_enabled", value: navigator.cookieEnabled });
    // 简化指纹
    var short_fingerprint = "";
    for (var j = 0; j < fingerprint.length; j++) {
        short_fingerprint += fingerprint[j].value.toString().toLowerCase().substring(0, 1);
    }
    short_fingerprint += fingerprint.length;
    short_fingerprint += navigator.plugins.length;
    return short_fingerprint
}

onMounted(() => {
    window.localStorage.setItem('device_fingerprint', getFingerprint())
    document.title = "仙舟通鉴统一登录"
    const router = useRouter();
    themeColor.value = "#" + router.currentRoute.value.query.themeColor || '#1890ff';
    fullscreen.value = router.currentRoute.value.query.fullscreen || '0'
    background.value = router.currentRoute.value.query.background || 'none'
    type.value = router.currentRoute.value.query.type || 'session'
    loading.value = false
})

const handleLogin = async() => {
    try{
        if (type.value == 'code'){
            Axios('/api/v2/getOauthToken')
            .then(res => {
                if (res.data.code == 0) {
                    completed.value = true
                    // 向父窗口发送消息
                    window.parent.postMessage({ type: 'login', token: res.data.token }, '*');
                }
                else {
                    message.error(res.data.msg)
                }
            })
        }else{
            let token = Cookies.get('session')
            completed.value = true
            window.parent.postMessage({ type: 'login', token: token }, '*');
        }
    }
    catch(err){
        error.value = true
        ex.value = err
    }
}
</script>