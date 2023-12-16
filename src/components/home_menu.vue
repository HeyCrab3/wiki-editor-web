<template>
    <div class="title" :style="titleStyle">
        <arco-link class="b" @click="go" :style="{ color: color, 'text-shadow': textShadow }">仙舟通鉴编辑器</arco-link>
        <div  :style="{ color: color, 'text-shadow': textShadow }" style="float: right; margin-right: 30px; position: relative; bottom: 6px" v-if="user.user_data.nickName != null">
            {{ user.user_data.nickName }}
            <arco-button type="text" href="api/v1/logout" style="text-shadow: none">退出登录</arco-button>
            <arco-button shape="round" @click="dashboard" size="large"><DashboardOutlined/>  我的工作台</arco-button>
            <arco-button shape="round" @click="download" type="primary" size="large"><DownloadOutlined/>  下载客户端</arco-button>
        </div>
        <div style="float: right; margin-right: 30px; position: relative; bottom: 6px" v-else>
            <arco-button type="text" href="login_v3">登录</arco-button>
            <arco-button type="text" href="register_v3">注册</arco-button>
            <arco-button shape="round" @click="download" type="primary" size="large"><DownloadOutlined/>  下载客户端</arco-button>
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
const dashboard = () => { router.push('/home_v2') }
const download = () => { router.push('/app') }

const color = ref('#FFF')
const titleStyle = ref({
  height: '24px',
  padding: '15px',
  background: '#ffffff00',
  verticalAlign: 'middle',
  lineHeight: '24px',
  width: '100%',
  zIndex: 998,
  backdropFilter: null,
  transition: '0.5s',
});
const textShadow = ref('0px 0px 6px #898989')

onMounted(() => {
  if (user.user_data.nickName == null) {
    user.fetchUserData();
  }
  if (router.currentRoute.value.path == '/'){
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop - ( 0.25 * document.body.clientHeight) <= 0) {
        titleStyle.value.background = '#ffffff00';
        titleStyle.value.backdropFilter = null
        color.value = "#FFF"
        textShadow.value = '0px 0px 6px #898989'
      } else {
        titleStyle.value.background = '#FFFFFFBE';
        titleStyle.value.backdropFilter = "blur(10px)"
        color.value = "#000"
        textShadow.value = 'none'
      }
    });
  }
  else{
    titleStyle.value.background = '#FFFFFFBE';
    titleStyle.value.backdropFilter = "blur(10px)"
    color.value = "#000"
    textShadow.value = 'none'
  }
});
</script>