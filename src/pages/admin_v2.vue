<template>
    <CUiDialog @ok="logout" @close="close" :type="1" :open="exit" title="退出登录" content="真的要这么做吗？"/>
    <a-layout style="height: 100%;">
      <a-layout>
        <a-layout-sider style="width: 270px">
            <div style="padding: 10px;">
                <img style="width: 32px" src="/light.png" alt="logo"/>
                <h2 style="display: inline-block; position: relative; bottom: 10px; left: 6px; font-size: 1rem;">仙舟通鉴 | Wiki 内容编辑器</h2>
            </div>
            <MenuNext @logout="exit = true"/>
        </a-layout-sider>
        <a-layout-content>
            <Layout/>
            <FeedBack/>
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>

<style>
.arco-btn-only-icon{
    position: relative;
    top: 1.5px;
}
.content-card{
    margin-top: 10px;
    margin-left: 10px;
    height: 45px;
    vertical-align: middle;
    line-height: 45px;
    box-shadow: 0px 0px 5px #eeeeee;
    border-radius: 10px;
    padding: 5px;
    transition: 0.5s;
}
.content-card:hover{
    box-shadow: 0px 0px 5px #dbdbdb;
}
</style>

<script lang="ts" setup>
import MenuNext from '../components/menu_next.vue'
import FeedBack from '../components/feedback.vue'
import Carousel from '../components/carousel.vue'
import Axios from 'axios'
import { ref, onMounted } from 'vue'
import CUiDialog from '../components/dialog.vue'
import { Message, Modal } from '@arco-design/web-vue'
import { PlusOutlined, ClockCircleOutlined, IdcardOutlined, MoreOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import Layout from '../components/admin/admin_layout.vue'

const loading = ref(true)
const exit = ref(false)
const router = useRouter()

// 格式化日期相关
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const now = new Date();

  if (isToday(date, now)) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  if (isYesterday(date, now)) {
    return '昨天 ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  if (isSameYear(date, now)) {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const isToday = (date, now) => {
  return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

const isYesterday = (date, now) => {
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  return date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
};

const isSameYear = (date, now) => {
  return date.getFullYear() === now.getFullYear();
};

document.title = '管理员后台 | 仙舟通鉴编辑器'

const logout = () => { window.location = '/api/v1/logout' }
const close = () => { exit.value = false }
</script>