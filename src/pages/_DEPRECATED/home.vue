// @ts-nocheck
<template>
  <!-- menu -->
  <Menu/>
  <!-- main -->
  <div style="width: 100%; height: 100%">
    <arco-spin :size="32" :loading="loading" tip="正在加载编辑数据">
      <div style="padding: 16px 20px;">
        <arco-typography-title :heading="4">我的编辑内容 ({{ count }})  <arco-button type="primary" @click="v1 = true">创建新内容</arco-button></arco-typography-title>
        <div style="margin-top: 20px;">
          <arco-card v-for="item in data" hoverable class="card2"  :title="item['title']">
              <span>{{item['content'].substring(0,47)}}...</span>
              <arco-tooltip content="创建时间"><p><icon-history />{{ new Date(item['create_time'] * 1000).toLocaleString() }}</p></arco-tooltip>
              <arco-tooltip content="最后更新时间"><p><icon-edit />{{ new Date(item['update_time'] * 1000).toLocaleString() }}</p></arco-tooltip>
              <arco-tooltip content="当前状态"><p><icon-sync /><arco-tag :color="item['current_status'] == 0 ? 'gray' : item['current_status'] == 1 ? '#7816ff' : item['current_status'] == 2 ? 'gold' : item['current_status'] == 3 ? 'cyan' : item['current_status'] == 4 ? 'green' : item['current_status'] == -1 ? 'orange' : item['current_status'] == -2 ? 'red' : 'purple'">{{ item['current_status'] == 0 ? '草稿' : item['current_status'] == 1 ? '待审核' : item['current_status'] == 2 ? '审核中' : item['current_status'] == 3 ? '撰稿中' : item['current_status'] == 4 ? '已发布' : item['current_status'] == -1 ? '审核驳回' : item['current_status'] == -2 ? '内容被封禁或不适宜上线' : '未知' }}</arco-tag></p></arco-tooltip>
              <arco-tooltip content="内容 ID"><p><icon-loop />{{ item['_id']['$oid'] }}</p></arco-tooltip>
              <template #actions>
                <router-link :to="`/editor/${item['_id']['$oid']}`"><arco-button type="primary">打开</arco-button></router-link>
                <arco-button @click="o(item['_id']['$oid'], item['title'])">重命名</arco-button>
                <arco-button @click="deleter(item['_id']['$oid'], item['title'])" status="danger">删除</arco-button>
              </template>
            </arco-card>
        </div>
      </div>
    </arco-spin>
  </div>
  <!-- 新建对话框 -->
  <arco-modal v-model:visible="v1" :on-before-ok="h1">
    <template #title>
      创建新内容
    </template>
    <div>在创建之前请确保已阅读完所有的 <arco-link target="_blank" href="https://seelevollerei.online/build/guide.html" type="primary">编辑规定和要求</arco-link>
    </div>
    <div style="margin-top: 20px;">
      <arco-input v-model="name" placeholder="新内容的名称" allow-clear>
        <template #prefix>
          <icon-edit />
        </template>
      </arco-input>
    </div>
    <div style="margin-top: 20px;">
      <arco-checkbox v-model="t">我已阅读并同意《编辑规定》，《Crab Studio 最终用户许可协议》和《隐私政策》，并对创建的内容所负责。</arco-checkbox>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Axios from 'axios'
import { Modal, Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import Menu from '../components/menu.vue'

const data = ref({})
const count = ref(0)
const router = useRouter()
const loading = ref(true)
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
      url: '/api/v1/content/create',
      method: 'POST',
      data: { title: name.value }
    })
    .then(function(r){
      if (r['data']['code'] != 0){
        Message.error(r['data']['msg'])
        return false
      }
      else{
        Message.success('内容创建成功')
        loadData();
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
      url: '/api/v1/content/updateTitle',
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
        loadData();
        return true
      }
    })
    .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
  }
  return true
}

// 删除对话框
const deleter = (id: string, title: string) => {
  Modal.confirm({
    title: "警告！",
    content: `你正在删除名为 ${title} (ID: ${id}) 的内容，此操作不可逆，是否继续？`,
    onOk: function(){
      Axios({
        url: '/api/v1/content/delete',
        method: 'POST',
        data: { id: id }
      })
      .then(function(r){
        if (r['data']['code'] != 0){
          Message.error(r['data']['msg'])
        }else{
          Message.success('内容已删除')
          loadData();
        }
      })
      .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
    }
  })
}

onMounted(() => {
  document.title = "主页 | 仙舟通鉴编辑器"
  loadData();
})

async function loadData(){
  Axios('/api/v1/content/count')
  .then(function(r){ 
    if (r['data']['code'] != 0){
      Message.error(r['data']['msg'])
    }else{
      count.value = r['data']['count']
    }
   })
   .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
   Axios('/api/v1/content/list')
  .then(function(r){ 
    if (r['data']['code'] != 0){
      Message.error(r['data']['msg'])
    }else{
      data.value = r['data']['list']
      loading.value = false;
    }
   })
   .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
}
</script>

<style scoped>
.arco-spin{
  width: 100%;
  height: 100%;
}
.card2:hover {
  transform: translateY(-4px);
}
.card2 {
  width: 400px;
  margin-right: 24px;
  margin-top: 10px;
  transition-property: all;
  border-radius: 5px;
  display: inline-block;
  animation: pop_up 1s
}
@keyframes pop_up {
  0%{
    margin-top: 45px;
    opacity: 0;
  }
  100%{
    margin-top: 10px;
    opacity: 1;
  }
}
</style>
  