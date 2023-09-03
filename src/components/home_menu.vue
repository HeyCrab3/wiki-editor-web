<template>
    <div class="title" :style="titleStyle">
        <a-link class="b" @click="go" style="color: #000">仙舟通鉴 Wiki 内容编辑器</a-link>
        <div style="float: right; margin-right: 30px; position: relative; bottom: 6px" v-if="user.user_data.nickName != null">
            {{ user.user_data.nickName }}
            <a-button type="text" href="api/v1/logout">退出登录</a-button>
            <a-button shape="round" @click="dashboard" size="large"><DashboardOutlined/>  我的工作台</a-button>
            <a-button shape="round" @click="download" type="primary" size="large"><DownloadOutlined/>  下载客户端</a-button>
        </div>
        <div style="float: right; margin-right: 30px; position: relative; bottom: 6px" v-else>
            <a-button type="text" href="login">登录</a-button>
            <a-button type="text" href="register">注册</a-button>
            <a-button shape="round" @click="download" type="primary" size="large"><DownloadOutlined/>  下载客户端</a-button>
        </div>
    </div>
</template>

<style>
.title div .arco-btn{
    margin-left: 10px;
}
.arco-btn .anticon{
    margin-right: 10px;
}
.b:hover{
    background: none
}
</style>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/user';
import { DownloadOutlined, DashboardOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const user = useUserStore();
const router = useRouter();

const go = () => { router.push('/') }
const dashboard = () => { router.push('/home') }
const download = () => { router.push('/app') }

const titleStyle = ref({
  height: '24px',
  padding: '15px',
  background: '#ffffff00',
  verticalAlign: 'middle',
  lineHeight: '24px',
  width: '100%',
  zIndex: 998,
  backdropFilter: 'blur(10px)',
  transition: '0.5s'
});

onMounted(() => {
  if (user.user_data.nickName == null) {
    user.fetchUserData();
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop - ( 0.25 * document.body.clientHeight) <= 0) {
      titleStyle.value.background = '#ffffff00';
    } else {
      titleStyle.value.background = '#FFFFFFBE';
    }
  });
});
</script>