<template>
  <EditorLayout>
    <h1 style="margin-left: 10px;">我的文件</h1>
    <span style="margin-left: 10px;">当前目录下共有 {{ file_list.length }} 个文件，{{ folder_list.length }} 个文件夹</span>
    <arco-breadcrumb style="display: block; margin: 10px 0px 0px 10px">
        <template #separator>
          <icon-right />
        </template>
        <arco-breadcrumb-item @click="router.push('/home_v2?path=/')" style="cursor: pointer">根目录</arco-breadcrumb-item>
        <arco-breadcrumb-item v-if="router.currentRoute.value.query.path != '/'">{{ router.currentRoute.value.query.path }}</arco-breadcrumb-item>
      </arco-breadcrumb>
      <arco-dropdown-button shape="round" @click="v1 = true" type="primary" style="display: block; margin-top: 20px; margin-left: 10px;">
          <PlusOutlined/>新建文件<template #icon><icon-down /></template><template #content><arco-doption @click="v3 = true">新建文件夹</arco-doption></template>
      </arco-dropdown-button>
      <arco-spin :loading="loading" style="width: 90%">
        <div>
            <div v-for="(item, index) in folder_list" class="content-card">
                <span style="margin-left: 10px;"><arco-tooltip content="文件夹"><FolderOutlined style="margin-right: 10px;"/></arco-tooltip>{{item['title']}}</span>
                <arco-tooltip content="最后编辑时间"><span style="margin-left: 10%;"><ClockCircleOutlined/>  {{ formatDate(item['update_time']) }}</span></arco-tooltip>
                <arco-tooltip content="内容ID"><span style="margin-left: 10%;"><IdcardOutlined/>  {{ item['_id']['$oid'] }}</span></arco-tooltip>
                <div style="margin-right: 10px; display: inline-block; float: right">
                  <arco-button @click="router.push('/home_v2?path=' + item['title'])" type="primary" shape="round">打开</arco-button>
                  <arco-dropdown trigger="hover">
                    <MoreOutlined style="margin-left: 10px;"/>
                    <template #content>
                      <arco-doption @click="o2(item['_id']['$oid'], item['title'])">重命名</arco-doption>
                      <arco-doption @click="deleter2(item['_id']['$oid'], item['title'])" style="color: red">删除</arco-doption>
                    </template>
                  </arco-dropdown>
                </div>
              </div>
            </div>
          <div>
              <div v-for="(item, index) in file_list" class="content-card">
                  <span style="margin-left: 10px;"><arco-tooltip content="文章"><icon-edit style="margin-right: 10px;"/></arco-tooltip> {{item['title']}}</span>
                  <arco-tooltip content="当前状态"><span style="margin-left: 10px;"><arco-tag :color="item['current_status'] == 0 ? 'gray' : item['current_status'] == 1 ? '#7816ff' : item['current_status'] == 2 ? 'gold' : item['current_status'] == 3 ? 'cyan' : item['current_status'] == 4 ? 'green' : item['current_status'] == -1 ? 'orange' : item['current_status'] == -2 ? 'red' : 'purple'">{{ item['current_status'] == 0 ? '草稿' : item['current_status'] == 1 ? '待审核' : item['current_status'] == 2 ? '审核中' : item['current_status'] == 3 ? '撰稿中' : item['current_status'] == 4 ? '已发布' : item['current_status'] == -1 ? '审核驳回' : item['current_status'] == -2 ? '内容被封禁或不适宜上线' : '未知' }}</arco-tag></span></arco-tooltip>
                  <arco-tooltip content="最后编辑时间"><span style="margin-left: 10%;"><ClockCircleOutlined/>  {{ formatDate(item['update_time']) }}</span></arco-tooltip>
                  <arco-tooltip content="内容ID"><span style="margin-left: 10%;"><IdcardOutlined/>  {{ item['_id']['$oid'] }}</span></arco-tooltip>
                  <div style="margin-right: 10px; display: inline-block; float: right">
                      <arco-button @click="router.push(`/editor_v2/${item['_id']['$oid']}`)" type="primary" shape="round">打开</arco-button>
                      <arco-dropdown trigger="hover">
                        <MoreOutlined style="margin-left: 10px;"/>
                          <template #content>
                            <arco-doption @click="open(index)">详细信息</arco-doption>
                            <arco-doption @click="o(item['_id']['$oid'], item['title'])">重命名</arco-doption>
                            <arco-tooltip content="测试中，不代表最终品质"><arco-doption @click="openShare(item['title'], item['_id']['$oid'])">分享</arco-doption></arco-tooltip>
                            <arco-doption @click="deleter(item['_id']['$oid'], item['title'])" style="color: red">删除</arco-doption>
                          </template>
                        </arco-dropdown>
                    </div>
                  </div>
                  <arco-result style="margin-top: 10%" v-if="file_list.length === 0 && folder_list.length === 0" status="404" title="空  空  如  也" subtitle="不如创建点内容？"></arco-result>
                </div>
        </arco-spin>
  </EditorLayout>
    <!-- 新建对话框 -->
  <arco-modal v-model:visible="v1" :on-before-ok="h1">
    <template #title>
      创建新内容
    </template>
    <div>在创建之前请确保已阅读完所有的 <arco-link target="_blank" href="https://seelevollerei.online/build/guide.html" type="primary">编辑规定和要求</arco-link>
      <p style="color: red">分类创建后不支持更改，请谨慎选择</p>
    </div>
    <div style="margin-top: 20px;">
      <small>内容名称</small>
      <arco-input v-model="name" placeholder="新内容的名称" allow-clear>
        <template #prefix>
          <icon-edit />
        </template>
      </arco-input>
      <small :style="{marginTop: '20px', display: 'block'}">内容分类</small>
      <arco-select v-model:model-value="catagory" :style="{width:'100%',}" placeholder="选择分类">
        <arco-option :value="1">词条（例如人、称呼、群体、标签等）</arco-option>
        <arco-option :value="2">历史事件（例如节奏大战等）</arco-option>
        <arco-option :value="3">梗（例如著名的“米哈游赛博撅龙脉”）</arco-option>
        <arco-option disabled :value="4">忘却之庭（用途未知，暂不开放创建）</arco-option>
    </arco-select>
    </div>
    <div style="margin-top: 20px;">
      <arco-checkbox v-model="t">我已阅读并同意《编辑规定》，《Crab Studio 最终用户许可协议》和《隐私政策》，并对创建的内容所负责。</arco-checkbox>
    </div>
  </arco-modal>
  <!-- 新建文件夹对话框 -->
  <arco-modal v-model:visible="v3" :on-before-ok="h3">
    <template #title>
      创建文件夹
    </template>
    <div style="margin-top: 20px;">
      <arco-input v-model="name3" placeholder="文件夹名称" allow-clear>
        <template #prefix>
          <icon-edit />
        </template>
      </arco-input>
    </div>
  </arco-modal>
  <!-- 重命名对话框 -->
  <arco-modal v-model:visible="v2" :on-before-ok="h2">
    <template #title>
      更新 {{ a }} 的标题 (ID: {{ b }})
    </template>
    <div style="margin-top: 20px;">
      <arco-input v-model="name2" placeholder="新内容的名称" allow-clear>
        <template #prefix>
          <icon-edit />
        </template>
      </arco-input>
    </div>
  </arco-modal>
    <!-- 重命名文件夹对话框 -->
  <arco-modal v-model:visible="v4" :on-before-ok="h4">
    <template #title>
      更新 {{ a2 }} 的标题 (ID: {{ b2 }})
    </template>
    <div style="margin-top: 20px;">
      <arco-input v-model="name4" placeholder="新内容的名称" allow-clear>
        <template #prefix>
          <icon-edit />
        </template>
      </arco-input>
    </div>
  </arco-modal>
  <!-- 详细信息 -->
  <arco-drawer @cancel="openornot = false" :footer="false" :visible="openornot" :width="340" unmountOnClose>
    <template #title>
      {{ drawer_text['title'] }}
    </template>
    <div v-for="i in drawer_text['content']">{{ i }}
    </div>
  </arco-drawer>
  <CreateShare :title="m3" :id="m4" :open="m5" @close="m5 = false"/>
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
import Axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { Message, Modal } from '@arco-design/web-vue'
import { PlusOutlined, ClockCircleOutlined, IdcardOutlined, MoreOutlined, FolderOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import EditorLayout from '../components/editor_layout.vue'
import CreateShare from '../components/create_share.vue'

const loading = ref(true)
const file_list = ref([])
const folder_list = ref([])
const exit = ref(false)
const router = useRouter()
const openornot = ref(false)

const drawer_text = ref({})

// 分享
const m3 = ref(null)
const m4 = ref(null)
const m5 = ref(false)
const openShare = (title: string, id: string) => {
  m3.value = title
  m4.value = id
  m5.value = true
}

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
const catagory = ref(0)
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
      data: { title: name.value, parent: router.currentRoute.value.query['path'], catagory: catagory.value }
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
</script>>