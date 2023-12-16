<template>
    <EditorLayout>
      <Layout/>
    </EditorLayout>
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
import EditorLayout from '../components/editor_layout.vue'
import { ref, onMounted } from 'vue'
import CUiDialog from '../components/dialog.vue'
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