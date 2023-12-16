<template>
    <EditorLayout>
        <div style="padding: 10px">
            <h1>我的分享</h1>
            <p>这里显示你创建的分享和分享链接。</p>
            <arco-spin style="width: 100%; margin-top: 30px;" :loading="loading">
              <div>
                <arco-empty v-if="shares.length == 0 && completed == true"/>
                <arco-result status="500" subtitle="服务器错误，请稍后再试。" v-if="error"></arco-result>
                <div v-for="(item, index) in shares" class="content-card">
                  <span style="margin-left: 10px;"><arco-tooltip content="文章"><icon-edit style="margin-right: 10px;"/></arco-tooltip> {{item['title']}}</span>
                  <arco-tooltip content="创建时间"><span style="margin-left: 10%;"><ClockCircleOutlined/>  {{ formatDate(item['timestamp']) }}</span></arco-tooltip>
                  <arco-tooltip content="分享ID"><span style="margin-left: 10%;"><IdcardOutlined/>  {{ item['_id']['$oid'] }}</span></arco-tooltip>
                  <div style="margin-right: 10px; display: inline-block; float: right">
                    <arco-button style="margin: 0px 10px" status="success" shape="round" @click="createShortURL(item)"><template #icon><icon-public/></template>创建短链接</arco-button>
                    <arco-button style="margin: 0px 10px" shape="round" @click="edit(item)"><template #icon><icon-edit/></template>编辑</arco-button>
                    <arco-button style="margin: 0px 10px" status="danger" shape="round" @click="deleteShare(item)"><template #icon><icon-delete/></template>删除</arco-button>
                    </div>
                  </div>
              </div>
            </arco-spin>
        </div>
    </EditorLayout>
    <EditShare :open="open" @close="open = false" :title="title" :id="id"/>
    <CreateShortURL :open="open1" @close="open1 = false" :title="title" :id="id"/>
</template>

<style>

</style>

<script lang="ts" setup>
import EditorLayout from '../components/editor_layout.vue'
import { Modal, Message } from '@arco-design/web-vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Axios from 'axios'
import { ClockCircleOutlined, IdcardOutlined } from '@ant-design/icons-vue'
import EditShare from '../components/edit_share.vue'
import CreateShortURL from '../components/create_shorturl.vue'

document.title = '我的分享 | 仙舟通鉴编辑器'

const router = useRouter()
const shares = ref([])
const loading = ref(true)
const completed = ref(false)
const error = ref(false)
const isAgreed = ref(window.localStorage.getItem('agreed') == 'true')

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

// 提示
const alert = () => {
    if (!isAgreed){
        Modal.confirm({
            title: '注意',
            content: '这是测试版功能，我们不对其的品质和稳定性所负责。如果遇到问题，欢迎反馈给我们。',
            okText: '好的',
            cancelText: '取消',
            onCancel: () => {
                router.push('/home_v2?path=/')
            },
            onOk: () => {
                window.localStorage.setItem('agreed', 'true')
                isAgreed.value = true
            }
        })
    }
}

// 获取分享
const load = () => {
    Axios.get('/api/v2.1/myShare').then(res => {
        loading.value = false
        if (res.data.code == 0) {
            shares.value = res.data.data
            completed.value = true
        } else {
            error.value = true
            Message.error(res.data.msg)
        }
    }).catch(err => {
        loading.value = false
        error.value = true
        Modal.error({
            title: '服务器错误',
            content: '获取分享列表失败，请稍后再试。'
        })
    })
}

// 删除分享
const deleteShare = (item) => {
    Modal.confirm({
        title: '删除分享',
        content: '你确定要删除这个分享吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
            Axios.post('/api/v2.1/share/deleteShare', {
                share_id: item['_id']['$oid']
            }).then(res => {
                if (res.data.code == 0) {
                    Message.success('删除成功！')
                    load()
                } else {
                    Message.error(res.data.msg)
                }
            }).catch(err => {
                Modal.error({
                    title: '服务器错误',
                    content: '删除分享失败，请稍后再试。'
                })
            })
        }
    })
}

// 编辑分享
const open = ref(false)
const title = ref('')
const id = ref('')
const edit = (item) => {
    title.value = item['title']
    id.value = item['_id']['$oid']
    open.value = true
}

// 创建短链接
const open1 = ref(false)
const createShortURL = (item) => {
    title.value = item['title']
    id.value = item['_id']['$oid']
    open1.value = true
}

onMounted(() => {
    alert()
    load()
})
</script>