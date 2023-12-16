<template>
    <arco-layout style="height: 100%;">
      <arco-layout-header style="box-shadow: 0px 0px 6px #d1d1d1; border-radius: 0px 0px 10px 0px;">
        <arco-page-header @back="goBack" style="border-radius: 0px 0px 10px 0px;" :title="title" :subtitle="subtitle">
            <template #extra>
                <span style="margin-right: 10px;">当前审核状态<arco-tag style="margin-left: 10px; border-radius: 999px;" :color="data['current_status'] == 0 ? 'gray' : data['current_status'] == 1 ? '#7816ff' : data['current_status'] == 2 ? 'gold' : data['current_status'] == 3 ? 'cyan' : data['current_status'] == 4 ? 'green' : data['current_status'] == -1 ? 'orange' : data['current_status'] == -2 ? 'red' : 'purple'">{{ data['current_status'] == 0 ? '草稿' : data['current_status'] == 1 ? '待审核' : data['current_status'] == 2 ? '审核中' : data['current_status'] == 3 ? '撰稿中' : data['current_status'] == 4 ? '已发布' : data['current_status'] == -1 ? '审核驳回' : data['current_status'] == -2 ? '内容被封禁或不适宜上线' : '未知' }}</arco-tag></span>
                <arco-dropdown>
                    <arco-tooltip content="功能菜单（点击打开）" position="bl"><IconMenu/></arco-tooltip>
                    <template #content>
                        <span style="display: block; margin-top: 5px; margin-left: 10px; font-size: 0.7em; color: #acacac">功能菜单</span>
                        <arco-dropdown trigger="hover">
                            <arco-doption style="color: #3cc966">我们愿意倾听您的反馈</arco-doption>
                            <template #content>
                                <arco-doption @click="txc">用户之声</arco-doption>
                                <arco-doption @click="wj">问卷调查</arco-doption>
                            </template>
                        </arco-dropdown>
                        <arco-doption @click="save">手动保存</arco-doption>
                        <arco-doption @click="v2 = true">重命名（当前：{{data['title']}}）</arco-doption>
                        <arco-doption style="color: orange" @click="submit">提交审核（慎点）</arco-doption>
                        <arco-doption disabled>分享（在路上了...吗？）</arco-doption>
                    </template>
                </arco-dropdown>
            </template>
        </arco-page-header>
      </arco-layout-header>
      <arco-layout>
        <arco-layout-sider style="width: 250px; padding: 10px">
            <arco-tabs class="function_bar" type="rounded" position="left" :default-active-key="'1'">
                <arco-tab-pane key="1">
                    <template #title style="text-align: center;"><icon-clock-circle/>常用</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(0) > -1" @click="clickEvent(item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                    <arco-alert type="info">如需使用图片上传功能，请使用顶部菜单栏图片图标中的上传本地图片或直接拖拽图片进编辑器</arco-alert>
                </arco-tab-pane>
                <arco-tab-pane key="2">
                    <template #title style="text-align: center;"><icon-h1/>段落</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(1) > -1" @click="clickEvent(item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                </arco-tab-pane>
                <arco-tab-pane key="3">
                    <template #title style="text-align: center;"><icon-bold/>内容</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(2) > -1" @click="clickEvent(item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                </arco-tab-pane>
                <arco-tab-pane key="4">
                    <template #title style="text-align: center;"><icon-link/>交互</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(3) > -1" @click="clickEvent(item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                </arco-tab-pane>
                <arco-tab-pane key="5">
                    <template #title style="text-align: center;"><icon-live-broadcast/>展示</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(4) > -1" @click="clickEvent(item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                    <arco-alert type="info">如需使用图片上传功能，请使用顶部菜单栏图片图标中的上传本地图片或直接拖拽图片进编辑器</arco-alert>
                </arco-tab-pane>
                <arco-tab-pane key="6">
                    <template #title style="text-align: center;"><icon-more/>其他</template>
                    <template v-for="item in btnList">
                        <arco-button v-if="item['position'].indexOf(5) > -1" @click="clickEvent(item['name'])" style="width: 64px; height: 64px; text-align: center; margin-right: 10px; margin-bottom: 10px;;"><div><Icon :icon="item['icon']"/><br/>{{ item['title'] }}</div></arco-button>
                    </template>
                </arco-tab-pane>
            </arco-tabs>
        </arco-layout-sider>
        <arco-layout-content style="height: 100%">
            <arco-spin :loading="loading" style="width: 100%; height: 100%">
                <v-md-editor height="100%" :disabled-menus="[]" @upload-image="handleUploadImage" @blur="save" @save="$message.info('我们会实时自动保存你的文件')" v-model="content"></v-md-editor>
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

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Modal, Message, Notification } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';
import Icon from '../components/icons.vue'
import Axios from 'axios'
import { formatDate } from '../js/formatDate'

// 反馈
const wj = () => {
    window.open('https://wj.qq.com/s2/13193331/fbc7')
}

const txc = () => {
    window.open('https://support.qq.com/product/610528')
}

const router = useRouter()
const title = ref("Loading...")
const subtitle = ref("最后更新于 我不知道")
const content = ref("")
const loading = ref(true)
const data = ref({})

onMounted(() => {
    document.title = "正在加载 | 仙舟通鉴编辑器"
    Axios(`/api/v2/content/?id=${router.currentRoute.value.params['id']}`)
    .then(function(r){
        if (r['data']['code'] != 0){
            Message.warning(r['data']['msg'])
        }else{
            data.value = r['data']['data']
            document.title = `编辑 ${r['data']['data']['title']} | 仙舟通鉴管理器`
            data.value = r['data']['data']
            title.value = r['data']['data']['title']
            content.value = r['data']['data']['content']
            subtitle.value = `最后更新于 ${formatDate(r['data']['data']['update_time'])}`
            loading.value = false;
        }
    })
    .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
})

// 返回
const goBack = () => {
    Modal.confirm({
    title: "警告！",
    content: `未保存的内容将丢失。确认？`,
    onOk: function(){
        router.push('/home_v2')
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

// 提交审核
const submit = () => {
    Modal.confirm({
        title: '提交审核吗？',
        content: '审核阶段将无法编辑内容、重命名或删除。是否确认提交审核？',
        onBeforeOk: function(){
            Axios({
                url: `/api/v2/content/submit`,
                method: 'POST',
                data: { id: data.value['_id']['$oid'] }
            })
            .then(function(r){
                if (r['data']['code'] != 0){
                    Message.warning("提交审核失败：" + r['data']['msg'])
                    return false
                }else{
                    Message.success("提交审核成功")
                    router.push('/home_v2?path=/')
                    return true
                }
            })
            .catch(function(e){loading.value = false;Modal.error({title: '请求错误',content: e})})
        }
    })
}

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
        if (files[i].size > 10000000){
            Message.error(`上传图片 ${files[0]['name']} 时发生错误 图片大小过大，需在 10MB 以内`)    
        }else{
            const formData = new FormData();
            formData.append('file', files[i]);
            Axios({
                url: '/api/v2/content/uploadImage',
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

// 保存
const save = () => {
    subtitle.value = "自动保存中..."
    Axios({
        url: '/api/v2/content/update',
        method: 'POST',
        data: {
            id: data.value['_id']['$oid'],
            content: content.value
        }
    })
    .then(function(r){
        if (r['data']['code'] != 0){
            Notification.error({
                title: `${new Date().toLocaleString()} 保存失败`,
                content: `${r['data']['msg']}，下次保存后再试`
            })
        }else{
            subtitle.value = `${new Date().toLocaleTimeString("zh-CN")} 已自动保存`
        }
    })
    .catch(function(e){
        Notification.error({
                title: `${new Date().toLocaleString()} 保存失败`,
                content: `${e}，下次保存后再试`
            })
    })
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
      url: '/api/v2/content/updateTitle',
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

<style>
.arco-tabs-tab-title .arco-icon{
    margin-right: 10px;
}
</style>