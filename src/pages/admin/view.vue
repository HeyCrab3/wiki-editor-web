<template>
    <arco-spin style="width: 100%; height: 100%" :loading="loading" :size="32" tip="正在加载数据">
        <arco-typography-title :heading="4">审阅</arco-typography-title>
        <div style="margin-top: 25px; width: 100%; height: 100%">
            <arco-table :draggable="{}" :data="data">
                <template #columns>
                    <template v-for="item in columns">
                        <arco-table-column :title="item['title']" :datarco-index="item['dataIndex']">
                        </arco-table-column>
                    </template>
                    <arco-table-column title="操作">
                        <template #cell="{ record }">
                            <arco-button type="primary" @click="push(record['_id'])">查看</arco-button>
                        </template>
                    </arco-table-column>
                </template>
            </arco-table>
        </div>
    </arco-spin>
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
    router.push(`/admin/editor/${id}`)
}

onMounted(() => {
    document.title = "审阅 | 仙舟通鉴编辑器"
    Axios('/api/v1/content_manage/zone/2/getCurrentContentList')
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
