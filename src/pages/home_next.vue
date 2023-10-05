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
        <a-layout-content style="padding: 10px">
          <a-alert style="margin-bottom: 10px;" type="warning">v2版本仍在测试，如遇问题欢迎加入我们的官方QQ频道：仙舟通鉴 进行反馈，或直接点击右下角“用户之声”反馈。如需提取旧版编辑器资料，请发信到heycrab@petalmail.com，一般7个工作日内回复。</a-alert>
            <h2 style="margin-left: 10px;">我的文件</h2>
            <span style="margin-left: 10px;">您共有 {{ file_list.length }} 个文件，{{ folder_list.length }} 个文件夹</span>
            <a-breadcrumb style="display: block; margin: 10px 0px 0px 10px">
                <template #separator>
                    <icon-right />
                </template>
                <a-breadcrumb-item @click="router.push('/home_v2?path=/')" style="cursor: pointer">根目录</a-breadcrumb-item>
                <a-breadcrumb-item v-if="router.currentRoute.value.query.path != '/'">{{ router.currentRoute.value.query.path }}</a-breadcrumb-item>
            </a-breadcrumb>
            <a-dropdown-button @click="v1 = true" type="primary" style="display: block; margin-top: 20px; margin-left: 10px;">
                    <PlusOutlined/>新建文件<template #icon>
                        <icon-down />
                    </template>
                    <template #content>
                        <a-doption @click="v3 = true">新建文件夹</a-doption>
                    </template>
                </a-dropdown-button>
            <FeedBack/>
            <a-spin :loading="loading" style="width: 90%">
              <div>
                    <div v-for="(item, index) in folder_list" class="content-card">
                        <span style="margin-left: 10px;"><FolderOutlined style="margin-right: 10px;"/>{{item['title']}}</span>
                        <a-tooltip content="最后编辑时间"><span style="margin-left: 10%;"><ClockCircleOutlined/>  {{ formatDate(item['update_time']) }}</span></a-tooltip>
                        <a-tooltip content="内容ID"><span style="margin-left: 10%;"><IdcardOutlined/>  {{ item['_id']['$oid'] }}</span></a-tooltip>
                        <div style="margin-left: 10px; display: inline-block">
                            <a-button @click="router.push('/home_v2?path=' + item['title'])" type="primary" shape="round">打开</a-button>
                            <a-dropdown trigger="hover">
                                <MoreOutlined style="margin-left: 10px;"/>
                                <template #content>
                                    <a-doption @click="o2(item['_id']['$oid'], item['title'])">重命名</a-doption>
                                    <a-doption @click="deleter2(item['_id']['$oid'], item['title'])" style="color: red">删除</a-doption>
                                </template>
                            </a-dropdown>
                        </div>
                    </div>
                </div>
                <div>
                    <div v-for="(item, index) in file_list" class="content-card">
                        <span style="margin-left: 10px;">{{item['title']}}</span>
                        <a-tooltip content="当前状态"><span style="margin-left: 10px;"><a-tag :color="item['current_status'] == 0 ? 'gray' : item['current_status'] == 1 ? '#7816ff' : item['current_status'] == 2 ? 'gold' : item['current_status'] == 3 ? 'cyan' : item['current_status'] == 4 ? 'green' : item['current_status'] == -1 ? 'orange' : item['current_status'] == -2 ? 'red' : 'purple'">{{ item['current_status'] == 0 ? '草稿' : item['current_status'] == 1 ? '待审核' : item['current_status'] == 2 ? '审核中' : item['current_status'] == 3 ? '撰稿中' : item['current_status'] == 4 ? '已发布' : item['current_status'] == -1 ? '审核驳回' : item['current_status'] == -2 ? '内容被封禁或不适宜上线' : '未知' }}</a-tag></span></a-tooltip>
                        <a-tooltip content="最后编辑时间"><span style="margin-left: 10%;"><ClockCircleOutlined/>  {{ formatDate(item['update_time']) }}</span></a-tooltip>
                        <a-tooltip content="内容ID"><span style="margin-left: 10%;"><IdcardOutlined/>  {{ item['_id']['$oid'] }}</span></a-tooltip>
                        <div style="margin-left: 10px; display: inline-block">
                            <a-button @click="router.push(`/editor_v2/${item['_id']['$oid']}`)" type="primary" shape="round">打开</a-button>
                            <a-dropdown trigger="hover">
                                <MoreOutlined style="margin-left: 10px;"/>
                                <template #content>
                                    <a-doption @click="open(index)">详细信息</a-doption>
                                    <a-doption @click="o(item['_id']['$oid'], item['title'])">重命名</a-doption>
                                    <a-tooltip content="敬请期待"><a-doption disabled>分享</a-doption></a-tooltip>
                                    <a-doption @click="deleter(item['_id']['$oid'], item['title'])" style="color: red">删除</a-doption>
                                </template>
                            </a-dropdown>
                        </div>
                    </div>
                    <a-result style="margin-top: 5%" v-if="file_list.length === 0 && folder_list.length === 0" status="404" title="空  空  如  也" subtitle="不如创建点内容？">
                    </a-result>
                </div>
            </a-spin>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!-- 新建对话框 -->
  <a-modal v-model:visible="v1" :on-before-ok="h1">
    <template #title>
      创建新内容
    </template>
    <div>在创建之前请确保已阅读完所有的 <a-link target="_blank" href="https://seelevollerei.online/build/guide.html" type="primary">编辑规定和要求</a-link>
    </div>
    <div style="margin-top: 20px;">
      <a-input v-model="name" placeholder="新内容的名称" allow-clear>
        <template #prefix>
          <icon-edit />
        </template>
      </a-input>
    </div>
    <div style="margin-top: 20px;">
      <a-checkbox v-model="t">我已阅读并同意《编辑规定》，《Crab Studio 最终用户许可协议》和《隐私政策》，并对创建的内容所负责。</a-checkbox>
    </div>
  </a-modal>
  <!-- 新建文件夹对话框 -->
  <a-modal v-model:visible="v3" :on-before-ok="h3">
    <template #title>
      创建文件夹
    </template>
    <div style="margin-top: 20px;">
      <a-input v-model="name3" placeholder="文件夹名称" allow-clear>
        <template #prefix>
          <icon-edit />
        </template>
      </a-input>
    </div>
  </a-modal>
  <!-- 重命名对话框 -->
  <a-modal v-model:visible="v2" :on-before-ok="h2">
    <template #title>
      更新 {{ a }} 的标题 (ID: {{ b }})
    </template>
    <div style="margin-top: 20px;">
      <a-input v-model="name2" placeholder="新内容的名称" allow-clear>
        <template #prefix>
          <icon-edit />
        </template>
      </a-input>
    </div>
  </a-modal>
    <!-- 重命名文件夹对话框 -->
  <a-modal v-model:visible="v4" :on-before-ok="h4">
    <template #title>
      更新 {{ a2 }} 的标题 (ID: {{ b2 }})
    </template>
    <div style="margin-top: 20px;">
      <a-input v-model="name4" placeholder="新内容的名称" allow-clear>
        <template #prefix>
          <icon-edit />
        </template>
      </a-input>
    </div>
  </a-modal>
  <!-- 详细信息 -->
  <a-drawer @cancel="openornot = false" :footer="false" :visible="openornot" :width="340" unmountOnClose>
    <template #title>
      {{ drawer_text['title'] }}
    </template>
    <div v-for="i in drawer_text['content']">{{ i }}
    </div>
  </a-drawer>
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
import { ref, onMounted, watch } from 'vue'
import CUiDialog from '../components/dialog.vue'
import { Message, Modal } from '@arco-design/web-vue'
import { PlusOutlined, ClockCircleOutlined, IdcardOutlined, MoreOutlined, FolderOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

const loading = ref(true)
const file_list = ref([])
const folder_list = ref([])
const exit = ref(false)
const router = useRouter()
const openornot = ref(false)

const drawer_text = ref({})

const open = (index: number) => {
    openornot.value = true
    drawer_text.value = {
        title: `${file_list.value[index]['title']} 的详细信息`,
        content: [
            `内容标题：${file_list.value[index]['title']}\n`,`创建时间：${new Date(file_list.value[index]['create_time'] * 1000).toLocaleString()}\n`,`最后编辑时间：${new Date(file_list.value[index]['update_time'] * 1000).toLocaleString()}`,`当前状态（数字标识）：${file_list.value[index]['current_status']}`
        ]
    }
}

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

document.title = '主页 | 仙舟通鉴编辑器'

const logout = () => { window.location = '/api/v1/logout' }
const close = () => { exit.value = false }

onMounted(() => {
    if (router.currentRoute.value.path == '/home_v2'){
        router.push('/home_v2?path=/')
    }
})

watch(() =>router.currentRoute.value.query.path,(newValue)=> {
        console.log('watch',newValue);
        load()
},{ immediate: true })

const load = () => {
  file_list.value = []
  folder_list.value = []
  loading.value = true
    Axios('/api/v2/content/list?path=' + router.currentRoute.value.query['path'])
    .then((r) => {
        if (r['data']['code'] != 0){
            Message.error(r['data']['msg'])
        }else{
            file_list.value = r['data']['files']
            folder_list.value = r['data']['folders']
            loading.value = false
        }
    })
    .catch((e) => {
        Modal.error({
            title: 'sth happened =(',
            content: e
        })
    })
}
load()

// 新建对话框
const v1 = ref(false)
const t = ref(false)
const name = ref(null)
const h1 = () => {
  if (name.value == null){
    Message.error('请填写内容名称')
    return false;
  }
  else if (t.value == false){
    Message.error('请同意相关条例后再创建内容！')
    return false;
  }
  else{
    Axios({
      url: '/api/v2/content/create',
      method: 'POST',
      data: { title: name.value, parent: router.currentRoute.value.query['path'] }
    })
    .then(function(r){
      if (r['data']['code'] != 0){
        Message.error(r['data']['msg'])
        return false
      }
      else{
        Message.success('内容创建成功')
        load();
        return true
      }
    })
    .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
  }
  return true
}

// 重命名对话框
const v2 = ref(false)
const a = ref(null)
const b = ref(null)
const name2 = ref(null)
const o = (id: string, old_name: string) => { 
  v2.value = true;
  a.value = old_name;
  b.value = id;
 }
const h2 = () => {
  if (name2.value == null){
    Message.error('请填写内容名称')
    return false;
  }
  else{
    Axios({
      url: '/api/v2/content/updateTitle',
      method: 'POST',
      data: { title: name2.value, id: b.value }
    })
    .then(function(r){
      if (r['data']['code'] != 0){
        Message.error(r['data']['msg'])
        return false
      }
      else{
        Message.success('标题更新成功')
        load();
        return true
      }
    })
    .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
  }
  return true
}

// 重命名文件夹对话框
const v4 = ref(false)
const a2 = ref(null)
const b2 = ref(null)
const name4 = ref(null)
const o2 = (id: string, old_name: string) => { 
  v4.value = true;
  a2.value = old_name;
  b2.value = id;
 }
const h4 = () => {
  if (name2.value == null){
    Message.error('请填写内容名称')
    return false;
  }
  else{
    Axios({
      url: '/api/v2/content/updateFolderTitle',
      method: 'POST',
      data: { title: name2.value, id: b.value }
    })
    .then(function(r){
      if (r['data']['code'] != 0){
        Message.error(r['data']['msg'])
        return false
      }
      else{
        Message.success('标题更新成功')
        load();
        return true
      }
    })
    .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
  }
  return true
}

// 新建文件夹
const v3 = ref(null)
const name3 = ref(null)
const h3 = () => {
  if (name3.value == null){
    Message.error('请填写文件夹名')
    return false;
  }else{
    // if (router.currentRoute.value.query.path != "/"){
    //   Message.warning('抱歉，但是我们暂时不支持文件夹内嵌套文件夹')
    // }else{
      Axios({
        url: '/api/v2/content/create_folder',
        method: 'POST',
        data: {
          parent: router.currentRoute.value.query.path,
          title: name3.value
        }
      })
      .then((r) => {
        if (r['data']['code'] != 0){
          Message.error(r['data']['msg'])
          return false
        }
        else{
          Message.success('创建文件夹成功')
          load();
          return true
        }
      })
      .catch((e) => {
        Modal.error({title: '请求错误',content: e})
      })
    }
  // }
}

// 删除对话框
const deleter = (id: string, title: string) => {
  Modal.confirm({
    title: "警告！",
    content: `你正在删除名为 ${title} (ID: ${id}) 的内容，此操作不可逆，是否继续？`,
    onOk: function(){
      Axios({
        url: '/api/v2/content/delete',
        method: 'POST',
        data: { id: id }
      })
      .then(function(r){
        if (r['data']['code'] != 0){
          Message.error(r['data']['msg'])
        }else{
          Message.success('内容已删除')
          load();
        }
      })
      .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
    }
  })
}

// 删除文件夹对话框
const deleter2 = (id: string, title: string) => {
  Modal.confirm({
    title: "警告！",
    content: `你正在删除名为 ${title} (ID: ${id}) 的文件夹，同时将删除文件夹内所有内容，此操作不可逆，是否继续？`,
    onOk: function(){
      Axios({
        url: '/api/v2/content/deleteFolder',
        method: 'POST',
        data: { id: id }
      })
      .then(function(r){
        if (r['data']['code'] != 0){
          Message.error(r['data']['msg'])
        }else{
          Message.success('内容已删除')
          load();
        }
      })
      .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
    }
  })
}
</script>