<template>
    <arco-layout style="height: 100%;">
      <arco-layout-header>
        <arco-page-header
            :style="{ background: 'var(--color-bg-2)' }"
            :title="title"
            :subtitle="subtitle"
            @back="goBack"
            >
            <template #extra>
                <arco-button type="primary" @click="submit">提交审核</arco-button>
                <arco-tooltip content="手动保存"><arco-button @click="save" shape="circle"><icon-save/></arco-button></arco-tooltip>
                <arco-tooltip content="重命名"><arco-button @click="v2 = true" shape="circle"><icon-edit/></arco-button></arco-tooltip>
            </template>
        </arco-page-header>
      </arco-layout-header>
      <arco-layout>
        <arco-layout-sider style="background: #535353; width: 15%">
            <div class="selector">
                <arco-tabs position="left" :default-active-key="'1'">
                <arco-tab-pane key="1">
                    <template #title style="text-align: center;"><icon-clock-circle/><br/>常用</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(0) > -1" @click="clickEvent(item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                    <arco-alert type="info">如需使用图片上传功能，请使用顶部菜单栏图片图标中的上传本地图片或直接拖拽图片进编辑器</arco-alert>
                </arco-tab-pane>
                <arco-tab-pane key="2">
                    <template #title style="text-align: center;"><icon-h1/><br/>段落</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(1) > -1" @click="clickEvent(item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                </arco-tab-pane>
                <arco-tab-pane key="3">
                    <template #title style="text-align: center;"><icon-bold/><br/>内容</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(2) > -1" @click="clickEvent(item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                </arco-tab-pane>
                <arco-tab-pane key="4">
                    <template #title style="text-align: center;"><icon-link/><br/>交互</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(3) > -1" @click="clickEvent(item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                </arco-tab-pane>
                <arco-tab-pane key="5">
                    <template #title style="text-align: center;"><icon-live-broadcast/><br/>展示</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(4) > -1" @click="clickEvent(item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                    <arco-alert type="info">如需使用图片上传功能，请使用顶部菜单栏图片图标中的上传本地图片或直接拖拽图片进编辑器</arco-alert>
                </arco-tab-pane>
                <arco-tab-pane key="6">
                    <template #title style="text-align: center;"><icon-more/><br/>其他</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(5) > -1" @click="clickEvent(item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                </arco-tab-pane>
                </arco-tabs>
            </div>
        </arco-layout-sider>
        <arco-layout-content>
            <arco-spin :loading="loading" style="width: 100%; height: 100%">
                <v-md-editor :disabled-menus="[]" @upload-image="handleUploadImage" @blur="save" @save="save" v-model="content"></v-md-editor>
            </arco-spin>
        </arco-layout-content>
      </arco-layout>
    </arco-layout>
    
    <!-- 重命名对话框 -->
  <arco-modal v-model:visible="v2" :on-before-ok="h2">
    <template #title>
      更新 {{ title }} 的标题
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

<style scoped>
.arco-page-header-extra .arco-btn{
    margin-left: 24px;
}
.selector .arco-tabs .arco-tabs-nav .arco-tabs-nav-tab .arco-tabs-nav-tab-list .arco-tabs-tab-active{
    color: #FFF;
    text-align: center;
}
 .arco-tabs-tab-active .arco-tabs-tab-title{
    color: #FFF;
    text-align: center;
}
.v-md-editor{
    height: 100%;
    border-radius: 0px;
}
.selector{
    color: #FFF;
    background: #535353;
    height: 100%
}
.arco-tabs{
    height: 100%;
    margin-top: 15px;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue'
import { Modal, Message } from '@arco-design/web-vue';
import Axios from 'axios'
import { useRouter } from 'vue-router';
import Icon from '../components/icons.vue'

import { onMounted } from 'vue';
const router = useRouter();
const data = ref({})
const title = ref("编辑器加载中...")
const subtitle = ref("最后更新于 undefined")
const content = ref("")
const loading = ref(true)

// 提交审核
const submit = () => {
    Modal.confirm({
        title: '提交审核吗？',
        content: '审核阶段将无法编辑内容、重命名或删除。是否确认提交审核？',
        onBeforeOk: function(){
            Axios({
                url: `/api/v1/content/submit`,
                method: 'POST',
                data: { id: data.value['_id']['$oid'] }
            })
            .then(function(r){
                if (r['data']['code'] != 0){
                    Message.warning("提交审核失败：" + r['data']['msg'])
                    return false
                }else{
                    Message.success("提交审核成功")
                    router.push('/')
                    return true
                }
            })
            .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
        }
    })
}

// 按钮
const btnList = [
    {
        "title": "标题",
        "icon": "h1",
        "name": "h1",
        "prefix": "# ",
        "suffix": "",
        "position": [0, 1]
    },
    {
        "title": "副标题",
        "icon": "h2",
        "name": "h2",
        "prefix": "## ",
        "suffix": "",
        "position": [0, 1]
    },
    {
        "title": "段落",
        "icon": "font-colors",
        "name": "paragraph",
        "prefix": "\n",
        "suffix": "",
        "position": [0, 1]
    },
    {
        "title": "子标题",
        "icon": "h3",
        "name": "h3",
        "prefix": "### ",
        "suffix": "",
        "position": [0, 1]
    },
    {
        "title": "引用",
        "icon": "quote",
        "name": "quote",
        "prefix": "> ",
        "suffix": "",
        "position": [0, 2]
    },
    {
        "title": "提示文字",
        "icon": "highlight",
        "name": "highlight",
        "prefix": "::: tip Tips!\n",
        "suffix": "\n:::",
        "position": [0, 2]
    },
    {
        "title": "图片",
        "icon": "file-image",
        "name": "image",
        "prefix": "![",
        "suffix": "](https://)",
        "position": [0, 4]
    },
    {
        "title": "链接",
        "icon": "link",
        "name": "link",
        "prefix": "[",
        "suffix": "](https://)",
        "position": [0, 2, 3]
    },
    {
        "title": "粗体",
        "icon": "bold",
        "name": "bold",
        "prefix": "**",
        "suffix": "**",
        "position": [0, 2]
    },
    {
        "title": "斜体",
        "icon": "italic",
        "name": "italic",
        "prefix": "*",
        "suffix": "*",
        "position": [0, 2]
    },
    {
        "title": "代码块",
        "icon": "code-square",
        "name": "code",
        "prefix": "```\n",
        "suffix": "\n```",
        "position": [2]
    },
    {
        "title": "分割线",
        "icon": "underline",
        "name": "divider",
        "prefix": "***\n",
        "suffix": "",
        "position": [2]
    },
    {
        "title": "按钮",
        "icon": "play-arrow",
        "name": "button",
        "prefix": '<el-button type="primary">',
        "suffix": "</el-button>",
        "position": [3]
    },
    {
        "title": "HTML",
        "icon": "code",
        "name": "html",
        "prefix": "<ClientOnly>\n",
        "suffix": "\n</ClientOnly>",
        "position": [5]
    },
    {
        "title": "B站视频",
        "icon": "live-broadcast",
        "name": "bilibili",
        "prefix": '<!--bvid=""里面写视频BV号，可能无法渲染，如果需要两个及以上视频播放器，请保留一个script setup-->\n<BiliPlayer bvid="',
        "suffix": `"/>\n<script setup lang="ts">import BiliPlayer from "../../components/iframe/BiliPlayer.vue"</script` + ">",
        "position": [4]
    },
]

onMounted(() => {
    document.title = "编辑器 | 仙舟通鉴编辑器"
    Axios(`/api/v1/content/?id=${router.currentRoute.value.params['id']}`)
    .then(function(r){
        if (r['data']['code'] != 0){
            Message.warning(r['data']['msg'])
        }else{
            document.title = `编辑 ${r['data']['data']['title']} | 仙舟通鉴编辑器`
            data.value = r['data']['data']
            title.value = r['data']['data']['title']
            content.value = r['data']['data']['content']
            subtitle.value = `最后更新于 ${new Date(r['data']['data']['update_time'] * 1000).toLocaleString()}`
            loading.value = false;
        }
    })
    .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
})

const clickEvent = (icon_name: string) => {
    console.log('event touched')
    for(var i = 0; i < btnList.length; i++){
        if (btnList[i]['name'] == icon_name){
            const delta = btnList[i]
            const text = `\n${delta['prefix']}把我替换成你需要的内容${delta['suffix']}`
            content.value = content.value + text
        }
        else{
            console.log('nope')
        }
    }
}

const handleUploadImage = (event: any, insertImage: Function, files: Array<File>) => {
    console.log(files)
    for (var i = 0; i < files.length; i++){
        if (files[i].size > 50000000){
            Message.error(`上传图片 ${files[0]['name']} 时发生错误 图片大小过大，需在 50MB 以内`)    
        }else{
            const formData = new FormData();
            formData.append('file', files[i]);
            Axios({
                url: '/api/v1/content/uploadImage',
                method: 'POST',
                data: formData
            })
            .then(function(r){
                if (r.data['code'] != 0){
                    Message.error(`上传图片 ${files[0]['name']} 时发生错误 ${r['data']['msg']}`)    
                }else{
                    console.log(r['data']['url'])
                    insertImage({
                        url: r['data']['url'],
                        desc: files[0]['name']
                    })
                }
            })
            .catch(function(e){
                Message.error(`上传图片 ${files[0]['name']} 时发生错误 ${e.msg}`)
            })
        }
    }
}

const goBack = () => {
    Modal.confirm({
    title: "警告！",
    content: `未保存的内容将丢失。确认？`,
    onOk: function(){
        router.push('/home')
    }
  })
}

// 保存
const save = () => {
    loading.value = true;
    Axios({
        url: '/api/v1/content/update',
        method: 'POST',
        data: {
            id: data.value['_id']['$oid'],
            content: content.value
        }
    })
    .then(function(r){
        loading.value = false;
        if (r['data']['code'] != 0){
            Message.warning("保存失败：" + r['data']['msg'])
        }else{
            Message.success("保存成功")
        }
    })
    .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
}

// 重命名对话框
const v2 = ref(false)
const name2 = ref(null)
const h2 = () => {
  if (name2.value == null){
    Message.error('请填写内容名称')
    return false;
  }
  else{
    Axios({
      url: '/api/v1/content/updateTitle',
      method: 'POST',
      data: { title: name2.value, id: data.value['_id']['$oid'] }
    })
    .then(function(r){
      if (r['data']['code'] != 0){
        Message.error(r['data']['msg'])
        return false
      }
      else{
        Message.success('标题更新成功')
        return true
      }
    })
    .catch(function(e){Modal.error({title: '请求错误',content: e})})
  }
  return true
}
</script>