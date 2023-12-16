<template>
    <div v-if="status === 'expired'" style="margin: auto; margin-top: 60%; width: 180px; height: 180px;">
        <p style="font-size: 1.5em;">二维码已失效</p>
        <arco-button type="primary" size="large" @click="refreshQr">点击刷新</arco-button>
    </div>
    <div v-if="scanned" style="margin: auto; margin-top: 60%;;">
        <arco-result status="success" title="扫码成功">
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
    <div style="margin: auto; text-align: center;" v-if="!scanned">
        <QRCode
            :size="128"
            :icon-size="128 / 4"
            error-level="H"
            :value="'loginByQr:' + qrKey"
            :status="status"
            icon="/light.png"
            @refresh="getQr"
            style="margin: auto; margin-top: 70px; border: none"
        />
    </div>
    <span v-if="status === 'active' && !scanned" style="display: block; margin-top: 20px; text-align: center;">{{ qrText }}</span>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw, computed } from 'vue'
import { message } from 'ant-design-vue'
import Axios from 'axios'
import { Modal, QRCode } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { requireQrCode, requireQrStatus } from '../../js/require_qr'
import { useUserStore } from '../../store/user';

const a = ref<null | any>(null)
const Message = message;
const router = useRouter()
const qrloading = ref(true)
const qrText = ref('二维码正在获取')
const qrKey = ref(null)
const user = useUserStore()
const status = ref('loading')
const scanned = ref(false)
const emit = defineEmits(['login'])
const prop = defineProps(['iframe'])

const refreshQr = () => {
    status.value = 'loading'
    getQr()
    console.log(a)
    clearInterval(toRaw(a))
}

const getQr = () => {
    if (a.value != null) {
        clearInterval(toRaw(a))
    }
    if (status.value !== 'loading') {
        status.value = 'loading'
    }
    requireQrCode().then((key) => {
        if (key === false) {
            status.value = 'expired'
            Message.error('二维码获取失败，请稍后再试')
        } else {
            qrKey.value = key
            qrloading.value = false;
            status.value = 'active'
            qrText.value = "请使用最新版仙舟通鉴编辑器App扫描二维码登录"
            var s = setInterval(() => {
                requireQrStatus(key).then((code) => {
                    if (code === -2 || code === -1) {
                        clearInterval(s)
                        status.value = 'expired'
                    }
                    if (code === 1) {
                        scanned.value = true
                    }
                    if (code === 2) {
                        Axios('/api/v2/user/get_token?qr_key=' + key)
                            .then((r) => {
                                clearInterval(s)
                                if (r['data']['code'] !== 0) {
                                    Message.error('扫码登录失败：' + r['data']['msg'])
                                } else {
                                    user.fetchUserData()
                                    Message.success('登陆成功')
                                    if (prop.iframe == true) {
                                        emit('login')
                                    }
                                    else{
                                        if (router.currentRoute.value.query['redirect_to'] != null) {
                                            router.push(router.currentRoute.value.query['redirect_to'])
                                        } else {
                                            router.push('/')
                                        }
                                    }
                                }
                            })
                            .catch((e) => {
                                clearInterval(s)
                                Modal.error({
                                    title: '二维码获取失败，请稍后再试',
                                    content: '请加入官方QQ频道（仙舟通鉴）反馈，并附带以下错误信息：\n' + e,
                                    okButtonProps: {
                                        onClick: () => {
                                            window.location.reload()
                                        }
                                    }
                                });
                            })
                    }
                })
            }, 1000)
            a.value = s
        }
    })
}

getQr()
</script>