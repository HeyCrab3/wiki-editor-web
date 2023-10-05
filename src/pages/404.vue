<template>
    <a-layout id="layout" style="height: 100%;">
      <a-layout-header><home_menu style="position: fixed"/></a-layout-header>
      <a-layout-content>
        <div style="padding: 24px; text-align: center; margin-top: 30px; height: 100%;">
            <a-result status="404" title="404" subtitle="非常抱歉（鞠躬），但是我们无法在服务器上找到你要请求的内容">
                <template #extra>
                <a-space>
                    <a-button type="primary" @click="router.back()">带我回家！</a-button>
                </a-space>
                </template>
            </a-result>
        </div>
        <a-layout-footer style="height: 100px; padding: 15px; background: #f5f5f5">
            <div style="float: left; position: relative; bottom: 6px">
                <h2>仙舟通鉴</h2>
                <small>©{{ new Date().getFullYear() }} Crab Studio. All Rights Reserved.</small><br/>
                <small>本站所有内容均以 CC-BY-NC-NA 协议授权。</small>
            </div>
            <!-- 这里需要注意最右边的导航栏是第一个div -->
            <div style="float: right; margin-left: 20px; text-align: right;">
                <h3 style="margin: 0; margin-bottom: 5px;">我们的服务</h3>
                <a-link style="display: block;" target="_blank" href="https://seelevollerei.online"><RightOutlined style="margin-right: 10px;"/>仙舟通鉴</a-link>
                <a-link style="display: block;" target="_blank" href="https://editor.seelevollerei.online"><RightOutlined style="margin-right: 10px;"/>Wiki 内容编辑器</a-link>
                <a-link style="display: block;" target="_blank" href="https://help.seelevollerei.online"><RightOutlined style="margin-right: 10px;"/>帮助中心</a-link>
            </div>
            <div style="float: right; margin-left: 20px; text-align: right">
                <h3 style="margin: 0; margin-bottom: 5px;">关注官方社媒</h3>
                <a-link style="display: block;" target="_blank" href="https://space.bilibili.com/3537119408556068?spm_id_from=333.999.0.0"><RightOutlined style="margin-right: 10px;"/>哔哩哔哩</a-link>
                <a-link style="display: block;" target="_blank" href="https://pd.qq.com/s/9p6w252k1"><RightOutlined style="margin-right: 10px;"/>QQ频道</a-link>
            </div>
            <div style="float: right; margin-left: 20px; text-align: right">
                <h3 style="margin: 0; margin-bottom: 5px;">联系我们</h3>
                <a-link href="mailto:heycrab@petalmail.com"><svg style="margin-right: 10px;" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#080341"/>
</svg>heycrab@petalmail.com</a-link>
            </div>
        </a-layout-footer>
      </a-layout-content>      
    </a-layout>
    <a-back-top target-container="#layout" :style="{position:'absolute'}" />
</template>

<style>
.arco-layout-footer div div .arco-link{
    margin-bottom: 5px;
}
.hero h2{
    font-size: 2rem;
    margin: 10px;
}
.hero p, .hero div{
    margin-left: 10px;
}
.hero div{
    margin-top: 10px;
}
.card-container {
  display: flex;
  justify-content: space-around;
}

.card {
  height: 400px;
  width: 250px;
  background: #FFF;
  box-shadow: 0px 0px 6px #EDEDED;
  border-radius: 10px;
  text-align: center;
  display: inline-block;
  position: relative;
}

.card .icon svg {
  width: 40px;
  height: 40px;
  margin-top: 40px;
}
</style>

<script lang="ts" setup>
import { onMounted } from 'vue';
import home_menu from '../components/home_menu.vue'
import { useUserStore } from '../store/user'
import { RightOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const user = useUserStore();
onMounted(() => {
    document.title = "404 | 仙舟通鉴 Wiki 内容编辑器"
})
</script>