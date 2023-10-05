<template>
    <a-spin style="width: 100%; height: 100%" :loading="loading" :size="32" tip="正在加载数据">
        <a-typography-title :heading="4">审阅</a-typography-title>
        <div style="margin-top: 25px; width: 100%; height: 100%">
            <a-table :draggable="{}" :data="data">
                <template #columns>
                    <template v-for="item in columns">
                        <a-table-column :title="item['title']" :data-index="item['dataIndex']">
                        </a-table-column>
                    </template>
                    <a-table-column title="操作">
                        <template #cell="{ record }">
                            <a-button type="primary" @click="push(record['_id'])">查看</a-button>
                        </template>
                    </a-table-column>
                </template>
            </a-table>
        </div>
    </a-spin>
</template>

<style scoped>

</style>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Axios from 'axios'
import { Modal, Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import Menu from '../../components/menu.vue'
import VerticalMenu from '../../components/vertical_menu.vue'

const router = useRouter();
const data = ref([])
const columns = [
    {
        title: '内容 ID',
        dataIndex: '_id'
    },
    {
        title: '内容名称',
        dataIndex: 'title'
    },
    {
        title: '内容',
        dataIndex: 'content'
    },
    {
        title: '提交人',
        dataIndex: 'author'
    },
    {
        title: '最后更新时间',
        dataIndex: 'update_time'
    },
    {
        title: '创建时间',
        dataIndex: 'create_time'
    },
]
const loading = ref(true)

const push = (id: string) => {
    router.push(`/admin_v2/editor/${id}`)
}

onMounted(() => {
    document.title = "审阅 | 仙舟通鉴 Wiki 内容管理器"
    Axios('/api/v2/content_manage/zone/2/getCurrentContentList')
    .then(function(r){
        if (r['data']['code'] != 0){
            Message.error(r['data']['msg'])
        }else{
            var list = []
            for (var i = 0; i < r['data']['data'].length; i++){
                var data1 = {
                    _id: r['data']['data'][i]['_id']['$oid'],
                    title: r['data']['data'][i]['title'],
                    content: r['data']['data'][i]['content'].substring(0,26) + "...",
                    author: r['data']['data'][i]['author'],
                    update_time: new Date(r['data']['data'][i]['update_time'] * 1000).toLocaleString(),
                    create_time: new Date(r['data']['data'][i]['create_time'] * 1000).toLocaleString(),
                }
                list.push(data1)
            }
            data.value = list
            console.log(data.value)
            loading.value = false;
        }
    })
    .catch(function(error){
        Modal.error({
            title: '请求错误',
            content: error.message
        })
    })
})
</script>
