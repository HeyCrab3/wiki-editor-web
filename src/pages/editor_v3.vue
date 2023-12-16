<template>
    <EditorLayout @clickFunction="clickEvent" :loading="loading" :data="data">
        <v-md-editor height="100%" :disabled-menus="[]" @upload-image="handleUploadImage" @blur="save" @save="$message.info('我们会实时自动保存你的文件')" v-model="editor_value"/>
    </EditorLayout>
</template>

<style>

</style>

<script lang="ts" setup>
import EditorLayout from '../components/editor_v3_layout.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Axios from 'axios'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { btnList } from '../js/btnList'

const router = useRouter()
const loading = ref(true)
const data = ref({})
const edit_permission = ref(null)
const editor_value = ref("")

onMounted(() => {
    document.title = "正在加载 | 仙舟通鉴编辑器"
    Axios('/api/v2/content?id=' + router.currentRoute.value.params.id + "&channel_access_token=" + router.currentRoute.value.query.channel_access_token)
    .then(res => {
        if (res.data.code == 0) {
            loading.value = false
            data.value = res.data.data
            document.title = res.data.data.title + " | 仙舟通鉴编辑器"
            editor_value.value = res.data.data.content
        }
        else {
            message.error(res.data.msg)
        }
    })
    .catch(err => {
        message.error("服务器错误，请稍后再试。" + err)
    })
    Axios('/api/v2.1/share/getUserPermission?share_id=' + router.currentRoute.value.query.share_id)
    .then(res => {
        if (res.data.code == 0) {
            edit_permission.value = res.data.data.permission
        }
        else {
            message.error(res.data.msg)
        }
    })
    .catch(err => {
        message.error("服务器错误，请稍后再试。" + err)
    })
})

const clickEvent = (icon_name: string) => {
    console.log('event touched')
    for(var i = 0; i < btnList.length; i++){
        if (btnList[i]['name'] == icon_name){
            const delta = btnList[i]
            const text = `\n${delta['prefix']}把我替换成你需要的内容${delta['suffix']}`
            editor_value.value = editor_value.value + text
        }
        else{
            console.log('nope')
        }
    }
}
</script>