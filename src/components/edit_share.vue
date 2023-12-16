<template>
    <arco-modal width="70%" v-bind:visible="open" @cancel="emit('close')" :footer="false" unmount-on-close @close="handleAfterClose">
      <template #title>
        编辑分享 (文章：{{ title }}，分享 ID：{{ id }})
      </template>
      <div v-if="success" style="text-align: center;">
        <span style="font-size: 128px; user-select: none">🎉</span>
        <h2>保存成功</h2>
        <p>干点别的？</p>
        <arco-button @click="success = false; emit('close')" style="margin: 10px;" size="large" shape="round" status="success"><template #icon><icon-check /></template>完成</arco-button>
        <arco-button type="primary" @click="$router.push('/myshare')" style="margin: 10px;" size="large" shape="round" status="success"><template #icon><icon-thunderbolt /></template>查看分享</arco-button>
      </div>
      <arco-skeleton :animation="true" :loading="loading" style="width: 100%">
        <arco-space direction="vertical" :style="{width:'100%'}" size="large">
          <arco-skeleton-line :rows="14" />
          <arco-skeleton-shape size="small" />
        </arco-space>
      </arco-skeleton>
      <div v-if="!loading && !success">
        <arco-alert type="warning">该功能处于测试阶段，我们不保证它的可靠性。</arco-alert>
        <arco-form :model="share" :style="{ width: '600px', marginTop: '30px' }" @submit-success="submit">
            <arco-form-item :rules="[{required:true, message:'系统错误，请刷新页面重试'}]" field="share_id" tooltip="无需填写" label="分享ID">
                <arco-input v-model="share.share_id" readonly disabled/>
            </arco-form-item>
            <arco-form-item :content-flex="false" field="share_to" label="分享给" tooltip="可选，设置分享用户和权限">
                <arco-button :disabled="creating" style="display: block" @click="nestedVisible = true" type="primary" shape="round"><template #icon><icon-plus/></template>添加用户</arco-button>
                <div v-for="(item, index) in share.share_to" style="height: 30px; line-height: 30px; margin: 10px;">
                    <arco-avatar :size="24" :style="{ backgroundColor: '#3370ff' }"><IconUser /></arco-avatar>
                    <span style="margin-left: 10px;">{{ item['nickName'] }} ({{ item['userName'] }})</span>
                    <div style="float: right; margin-left: 40px;">
                        <arco-select :disabled="creating" v-model:model-value="item['permission']" :style="{width:'100px'}" placeholder="设置权限">
                            <arco-option :value="0">可查看</arco-option>
                            <arco-option :value="1">可编辑</arco-option>
                        </arco-select>
                        <arco-button :disabled="creating" style="margin-left: 10px;" status="danger" @click="share.share_to.splice(index)">删除</arco-button>
                    </div>
                </div>
                <template #extra>
                    <div>如果需要分享给特定用户或设置特定用户的权限，可以在这里设置</div>
                </template>
            </arco-form-item>
            <arco-form-item :rules="[{type:'array', minLength:1, message:'请同意协议'}]" field="agreed">
                <arco-checkbox-group :disabled="creating" v-model="share.agreed"><arco-checkbox>我已阅读并同意《编辑规定》，《Crab Studio 最终用户许可协议》和《隐私政策》，并对创建的内容所负责。</arco-checkbox></arco-checkbox-group>
            </arco-form-item>
            <arco-form-item :rules="[{type:'array', minLength:1, message:'请同意协议'}]" field="test">
                <arco-checkbox-group :disabled="creating" v-model="share.test"><arco-checkbox>我已知晓该功能为测试版功能，不代表最终成品质量，并为可能带来的风险负责。</arco-checkbox></arco-checkbox-group>
            </arco-form-item>
            <arco-form-item>
                <arco-button :loading="creating" id="submit" type="primary" size="large" html-type="submit" shape="round"><template #icon><icon-check/></template>保存</arco-button>
            </arco-form-item>
        </arco-form>
      </div>
    </arco-modal>
    <SearchUser :open="nestedVisible" @close="nestedVisible = false" @add_user="add_user"/>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, reactive, onUnmounted, watch } from 'vue'
import Axios from 'axios'
import { Message, Modal } from '@arco-design/web-vue';
import SearchUser from './search_user.vue'  

// 搜寻用户
const nestedVisible = ref(false)
const add_user = (user: Object) => {
    share.share_to.push({ nickName: user['nickName'], userName: user['userName'], user_id: user['_id'], permission: 0 })
    nestedVisible.value = false
}
const success = ref(false)
const contentData = ref({})
const prop = defineProps(['id', 'title', 'open'])
const emit = defineEmits(['close'])
const loading = ref(true)
const creating = ref(false)
const change = () => { console.log(share) }
// example: { content_id: xxx, creator_id: xxx, vaild_before: xxx, code: xxx, share_type: xxx, share_to: [{ user_id: xxx, permission: xxx }] }
const share = reactive({
    title: prop['title'],
    share_id: prop['id'],
    share_to: [],
    agreed: [],
    test: []
})
  
const handleSubmit = (values, errors) => {
    if (errors != undefined) {
      Message.warning('请正确填写表单')
    }
    else{
      submit()
    }
}

const getContentData = () => {
    Axios('/api/v2.1/share/getShareInfo?share_id=' + prop['id'])
      .then((r) => {
        if (r['data']['code'] != 0) {
          Message.error(r['data']['msg'])
        }
        else {
          contentData.value = r['data']['data']
          share.title = r['data']['data']['title']
          share.share_to = r['data']['data']['share_to']
          loading.value = false
        }
      })
      .catch((e) => {
        Modal.error({
          title: '服务器错误',
          content: '服务器错误，请稍后再试。' + e
        })
      })
}
  
const handleAfterClose = () => {
    contentData.value = {}
    loading.value = true
}
  
watch(() => prop.open, (newVal) => {
    if (newVal) {
      getContentData()
    }
})
  
// 提交 创建分享
const submit = () => {
      creating.value = true
      Axios.post('/api/v2.1/share/updateSharePermission', share)
        .then((r) => {
          if (r['data']['code'] != 0) {
            Message.error(r['data']['msg'])
          }
          else {
              success.value = true
          }
          creating.value = false
        })
        .catch((e) => {
          Modal.error({
            title: '服务器错误',
            content: '服务器错误，请稍后再试。' + e
          })
          creating.value = false
        })
}

</script>
  
<style>
#submit{
    padding: 20px 40px;
    border-radius: 114514px;
    background: #1aac21;
    transition: 0.5s;
    margin-top: 20px;
}
#submit:hover{
    background: #0eb916;
    box-shadow: 0px 0px 15px #1aac21;
    transform: rotate(5deg) scale(1.02);
}
</style>
  