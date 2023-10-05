<template>
    <a-dropdown v-model:popup-visible="popupVisible" position="top">
        <div @click="popupVisible = !popupVisible" class="feedback" :style="gradientStyle"><MessageOutlined/><span style="margin: auto; display: inline-block; text-align: center; font-size: 1.1em; margin-top: 10px; margin-left: 5px;">我们愿意倾听您的反馈</span></div>
        <template #content>
            <a-doption @click="wj">问卷调研</a-doption>
            <a-doption @click="txc">用户之声</a-doption>
        </template>
    </a-dropdown>
</template>

<style>
.feedback{
    float: right;
    position: fixed;
    right: 12px;
    bottom: 30px;
    width: 200px;
    height: 40px;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    cursor: pointer;
    box-shadow: 0px 0px 6px #dddddd;
}
</style>

<script setup>
import { watch, ref, } from 'vue'
import { MessageOutlined, CloseOutlined } from '@ant-design/icons-vue';
let gradientAngle = ref(140);
const popupVisible = ref(false)

const gradientStyle = ref({
    background: `linear-gradient(${gradientAngle.value}deg, #b9cf69, #4ccfa8)`,
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: '10px 10px 10px 10px',
}) ;

watch(gradientAngle, (newValue) => {
  gradientStyle.value.background = `linear-gradient(${newValue}deg, #b9cf69, #4ccfa8`;
});

const wj = () => {
    window.open('https://wj.qq.com/s2/13193331/fbc7')
}

const txc = () => {
    window.open('https://support.qq.com/product/610528')
}

setInterval(() => {
        gradientAngle.value = (gradientAngle.value + 1) % 360;
}, 10);
</script>