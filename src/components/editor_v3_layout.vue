<template>
    <ConfigProvider :locale="zhCN" :theme="{token: { colorPrimary: '#66CCFF' }}">
      <a-layout style="height: 100%;">
        <a-layout-header>
          <a-page-header ref="ref1" @back="goBack" :show-back="isShowBack" :style="{ background: 'var(--color-bg-2)', boxShadow: '0px 0px 6px rgb(215 215 215)' }">
            <template #title>
              <a-skeleton :animation="true" :loading="loading" v-if="loading">
                <a-space direction="vertical" :style="{width:'100px'}" size="large">
                  <a-skeleton-line :rows="1" />
                </a-space>
              </a-skeleton>
              <template v-else>{{ prop.data.title }}<a-tooltip content="测试版功能，会受到网络情况等影响，不代表最终品质"><a-tag size="large" style="margin-left: 10px" color="orange" v-if="isShareMode">协作编辑中</a-tag></a-tooltip></template>
            </template>
            <template #subtitle>
              <a-skeleton :animation="true" :loading="loading" v-if="loading">
                <a-space direction="vertical" :style="{width:'100px'}" size="large">
                  <a-skeleton-line :rows="1" />
                </a-space>
              </a-skeleton>
              <template v-else><div><a-tooltip content="我们会实时自动保存你的文章"><icon-check-circle style="margin-right: 5px;"/><span  ref="ref2" style="text-decoration: dotted underline 2px #d6d6d6;">{{ subtitle }}</span></a-tooltip></div></template>
            </template>
              <template #extra>
                <a-skeleton :animation="true" :loading="loading" v-if="loading">
                  <a-space direction="vertical" :style="{width:'100px'}" size="large">
                    <a-skeleton-line :rows="1" />
                  </a-space>
                </a-skeleton>
                <div v-else  ref="ref3">
                  <span style="margin-right: 10px;"><a-tag style="border-radius: 999px; max-width: 300px; min-width: 75px; text-align: center;" :color="ping < 0 ? 'orange' : ping >0 && ping <= 50 ? 'green': ping > 50 && ping <= 100 ? 'orange' : ping > 100 ? 'red': 'orange'" size="large"><template #icon><svg style="position: relative; top: 4px" width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 20V19M8 20V16M12 20V12M16 20V8M20 20V4"  :stroke="ping < 0 ? 'orange' : ping >0 && ping <= 50 ? '#00B42A': ping > 50 && ping <= 100 ? '#FF7D00' : ping > 100 ? '#F53F3F': '#FF7D00'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></template>{{ping}}ms | {{ ping < 0 ? '网络检测中' : ping >0 && ping <= 50 ? '网络质量好': ping > 50 && ping <= 100 ? '网络质量中' : ping > 100 ? '网络质量差': '网络检测中' }}</a-tag></span>
                  <span style="margin-right: 10px;"><a-tag size="large" v-if="permission == 0">只能阅读</a-tag><a-tag color="green" size="large" v-else>可编辑</a-tag></span>
                  <a-button @click="visible = true" status="danger" style="margin-right: 10px;"><template #icon><icon-exclamation-polygon-fill /></template>举报该内容</a-button>
                  <arco-dropdown>
                      <arco-tooltip content="功能菜单（点击打开）" position="bl"><IconMenu ref="ref4"/></arco-tooltip>
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
                          <arco-doption>获取该文章的内容ID</arco-doption>
                          <arco-doption>复制到我的空间</arco-doption>
                      </template>
                  </arco-dropdown>
                </div>
              </template>
          </a-page-header>
        </a-layout-header>
        <a-layout>
          <a-layout-sider style="width: 300px">
            <template v-if="loading">
              <div style="padding: 14px;">
                <a-row :gutter="24">
                  <a-col :span="3">
                    <a-skeleton :animation="true">
                      <a-space direction="vertical" :style="{width:'100px'}" size="large">
                        <a-skeleton-shape />
                        <a-skeleton-shape />
                        <a-skeleton-shape />
                        <a-skeleton-shape />
                        <a-skeleton-shape />
                        <a-skeleton-shape />
                        <a-skeleton-shape />
                        <a-skeleton-shape />
                      </a-space>
                    </a-skeleton>
                  </a-col>
                  <a-col :span="5" :offset="6">
                    <a-skeleton :animation="true">
                      <a-space direction="vertical" :style="{width:'180px'}" size="large">
                        <a-skeleton-line :rows="24" />
                      </a-space>
                    </a-skeleton>
                  </a-col>
                </a-row>
              </div>
            </template>
            <editor-left-function ref="ref5" @click-event="clickEvent" v-else style="margin-left: 14px; margin-top: 14px;"/>
          </a-layout-sider>
          <a-layout-content>
            <a-skeleton v-if="loading" animation>
              <a-space direction="vertical" :style="{width:'95%', padding: '25px'}" size="large">
                <a-skeleton-line :rows="24" />
              </a-space>
            </a-skeleton>
            <div v-else style="height: 100%" ref="ref6"><slot/></div>
          </a-layout-content>
        </a-layout>
      </a-layout>
      <a-drawer title="举报" width="400px" :visible="visible" @cancel="visible = false" :footer="false">
        <iframe height="100%" width="100%" src="https://form.antdv.com/r/656a74d05f6b0046" frameborder="0"></iframe>
      </a-drawer>
      <Tour v-model:current="current" :open="isOpen" :steps="steps" @close="handleClose" />
      <FloatButton
            shape="square"
            type="primary"
            ref="ref7"
            :style="{
            right: '24px',
            }"
            @click="chat_open = !chat_open"
        >
            <template #icon>
                <MessageOutlined />
            </template>
      </FloatButton>
      <Chat :open="chat_open"/>
    </ConfigProvider>
</template>

<script lang="ts" setup>
import { useUserStore } from '../store/user'
import { ref, watch, createElementVNode } from 'vue';
import { formatDate } from '../js/formatDate'
import { useRouter } from 'vue-router';
import EditorLeftFunction from './editor_left_function.vue'
import { Modal } from '@arco-design/web-vue';
import type { TourProps } from 'ant-design-vue';
import { Tour, ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import Chat from '../components/share/chat.vue'
import { FloatButton } from 'ant-design-vue'
import { MessageOutlined } from '@ant-design/icons-vue'

const prop = defineProps(['loading', 'data', 'permission'])
const emit = defineEmits(['clickFunction'])
const user = useUserStore();
const subtitle = ref("正在加载")
const visible = ref(false)
const chat = ref([])
const chat_open = ref(false)

// WebSocket Ping
const ping = ref(0)

// 漫游式引导
const isToured = window.localStorage.getItem('isToured') == 'true'
const current = ref(0)
const isOpen = ref(false)
const ref1 = ref(null);
const ref2 = ref(null);
const ref3 = ref(null);
const ref4 = ref(null);
const ref5 = ref(null);
const ref6 = ref(null);
const ref7 = ref(null)


const steps: TourProps['steps'] = [
{
    title: '🎉欢迎使用新版仙舟通鉴编辑器',
    description: '这个导览会带您熟悉新版编辑器的全部功能，让我们现在就开始吧！',
    cover: createElementVNode('img', {
      alt: '漫游导引-1',
      src: 'https://fe-static.crabapi.cn/xianzhoutongjian/editor/Tour-1.png',
    }),
    target: null,
  },
  {
    title: '这是你的顶栏',
    description: '这里会显示你当前打开的文章名称、协作模式、最后编辑时间、当前在线的协作者（如有）、审核状态、编辑权限等信息。这里可以说是一个“超级入口”。\n当然，也有“举报”按钮。',
    target: () => ref1.value && ref1.value.$el,
  },
  {
    title: '文件保存状态',
    description: '这里显示之前最后一次的文件保存时间以及最新的文件保存时间和协作者（如有）。',
    cover: createElementVNode('img', {
      alt: '漫游导引-2',
      src: 'https://fe-static.crabapi.cn/xianzhoutongjian/editor/Tour-2.png',
    }),
    target: () => ref2.value && ref2.value.$el,
  },
  {
    title: '编辑权限',
    description: '一个可以由你（或者分享者）动态控制的访问权限，谁能看、谁能写、谁被拒之门外，一目了然。',
    cover: createElementVNode('img', {
      alt: '漫游导引-3',
      src: 'https://fe-static.crabapi.cn/xianzhoutongjian/editor/Tour-3.png',
    }),
    target: () => ref3.value && ref3.value.$el,
  },
  {
    title: '更多功能',
    description: '一些次级功能被收纳在这里，可以去使用。',
    cover: createElementVNode('img', {
      alt: '漫游导引-4',
      src: 'https://fe-static.crabapi.cn/xianzhoutongjian/editor/Tour-4.png',
    }),
    target: () => ref4.value && ref4.value.$el,
  },
  {
    title: '功能栏',
    description: '熟悉的味道。这里所有的东西都可以被直接插入到编辑器中，不需要手动再写 Markdown 语法代码了！',
    cover: createElementVNode('img', {
      alt: '漫游导引-5',
      src: 'https://fe-static.crabapi.cn/xianzhoutongjian/editor/Tour-5.png',
    }),
    target: () => ref5.value && ref5.value.$el,
    placement: 'right',
  },
  {
    title: '编辑区',
    description: '这是你进行编辑的地方。没有什么变化，只会有功能上的更新（比如协作锚点）。',
    cover: createElementVNode('img', {
      alt: '漫游导引-6',
      src: 'https://fe-static.crabapi.cn/xianzhoutongjian/editor/Tour-6.png',
    }),
    target: () => ref6.value && ref6.value.$el,
  },
  {
    title: '协作',
    description: '独乐乐不如众乐乐！叫上你的好朋友来和你一起协作，享受低延迟无广告编辑体验，还完全免费！',
    cover: createElementVNode('img', {
      alt: '漫游导引-7',
      src: 'https://fe-static.crabapi.cn/xianzhoutongjian/editor/Tour-7.png',
    }),
    target: () => ref7.value && ref7.value.$el,
    placement: 'right',
  },
  {
    title: '🎉恭喜完成教学',
    description: '点击“退出导引”按钮回到编辑器开始编辑吧！',
    cover: createElementVNode('img', {
      alt: '漫游导引-8',
      src: 'https://fe-static.crabapi.cn/xianzhoutongjian/editor/Tour-8.png',
    }),
    target: null,
  },
];

const handleClose = () => {
  isOpen.value = false
  window.localStorage.setItem('isToured', 'true')
}

const clickEvent = (item: string) => {
    emit('clickFunction', item)
}

const routerQueryData = useRouter().currentRoute.value.query
const isShowBack = useUserStore().user_data.nickName == undefined;
const router = useRouter()
const isShareMode = routerQueryData.share == '1'

watch(() => prop.data, (newVal) => {
    if (newVal.title != undefined) {
        subtitle.value = `最后更新于 ${formatDate(prop.data.update_time)}`
    }
})

watch(() => prop.loading, (newVal) => {
    if (newVal == false) {
        isOpen.value = !isToured && !prop.loading
    }
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
</script>