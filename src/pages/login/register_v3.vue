<template>
    <div style="background: url(https://api-images.kanochan.net/api.php?album=Genshin-Impact) no-repeat; background-size: cover; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
        <div class="login_box">
            <LoginSlider/>
            <div style="float: right; padding: 16px; height: 100%; width: 35%">
                <div>
                    <img style="width: 32px" src="/light.png" alt="logo"/>
                    <h2 style="display: inline-block; position: relative; bottom: 10px; left: 6px; font-size: 1rem;">仙舟通鉴编辑器 (测试版)</h2>
                </div>
                <h2><ArrowLeftOutlined @click="$router.push('/login_v3')" style="cursor: pointer; margin-right: 10px;"/>欢迎注册</h2>
                <Register/>
            </div>
        </div>
    </div>
</template>

<style>
.login_box {
    width: 80%;
    height: 80%;
    background: #ffffffcb;
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
}
</style>

<script lang="ts" setup>
import LoginSlider from '../../components/login_slider.vue'
import Register from '../../components/login/register.vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
document.title = "注册 | 仙舟通鉴编辑器"
</script>