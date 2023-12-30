<template>
    <Modal :open="prop.show" :footer="null" title="上传底图" :confirm-loading="loading" @ok="handleOk" @cancel="emit('close')">
      <p>在下面上传你的新底图：</p>
      <a-upload :custom-request="upload">
        <template #upload-button>
          <div
            :class="`arco-upload-list-item${
              file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
            }`"
          >
            <div
              class="arco-upload-list-picture custom-upload-avatar"
              v-if="file && file.url"
            >
              <img :src="file.url" />
              <div class="arco-upload-list-picture-mask">
                <IconEdit />
              </div>
            </div>
            <div class="arco-upload-picture-card" v-else>
              <div class="arco-upload-picture-card-text">
                <IconPlus />
                <div style="margin-top: 10px; font-weight: 600">上传</div>
              </div>
            </div>
          </div>
        </template>
      </a-upload>
    </Modal>
</template>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';
import Axios, { AxiosHeaders, AxiosRequestHeaders } from 'axios'
import { message, Modal, Avatar } from 'ant-design-vue'
import { useUserStore } from '../../store/user'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { RequestOption } from '@arco-design/web-vue';
import { anyType } from 'ant-design-vue/es/_util/type';

const user = useUserStore();
const Message = message;
const prop = defineProps(['show'])
const emit = defineEmits(['close', 'done'])
const loading = ref(false)
const upt = ref(null)
const file = ref([])
const handleOk = () => {
  
};

const onChange = (_, currentFile) => {
  loading.value = true
  console.log(currentFile)
  Message.success('已添加到上传列表')
};

const upload = (option: RequestOption) => {
  Message.success('已添加到上传列表')
  loading.value = true
  const {onProgress, onError, onSuccess, fileItem, name} = option
  console.log(fileItem, name)
  const formData = new FormData()
  formData.append('file', fileItem.file)
  formData.append('file_name', fileItem.file.name)
  Axios({
    url: '/api/v2/user/changeBanner',
    method: 'POST',
    data: formData
  })
  .then((r) => {
    loading.value = false
    if (r.data['code'] != 0) {Message.error(r['data']['msg']); onError(r['data']['msg'])}
    else {Message.success('底图已更新'); onSuccess(); emit('done')}
  })
  .catch((e) => {
    loading.value = false
    Modal.error({
      title: '上传失败',
      content: '请检查网络连接：' + e
    })
    onError(e)
  })
  return anyType;
}
</script>