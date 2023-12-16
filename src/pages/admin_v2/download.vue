<template>
    <arco-typography-title :heading="4">下载已审阅内容</arco-typography-title>
    <arco-table :draggable="{}" :data="data">
            <template #columns>
                <template v-for="item in columns">
                    <arco-table-column :title="item['title']" :datarco-index="item['dataIndex']">
                    </arco-table-column>
                </template>
                <arco-table-column title="操作">
                    <template #cell="{ record }">
                        <arco-button type="primary" @click="blob(record['_id'])">下载</arco-button>
                    </template>
                </arco-table-column>
            </template>
        </arco-table>
</template>

<style scoped>

</style>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Message, Modal } from '@arco-design/web-vue';
import Axios from 'axios'

const data = ref([])
const bk = ref([])

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

onMounted(() => {
    document.title = "审阅 | 仙舟通鉴编辑器"
    Axios('/api/v2/content_manage/zone/3/getList')
    .then(function(r){
        if (r['data']['code'] != 0){
            Message.error(r['data']['msg'])
        }else{
            var list = []
            var list2 = []
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
            for (var i = 0; i < r['data']['data'].length; i++){
                var data2 = {
                    _id: r['data']['data'][i]['_id']['$oid'],
                    title: r['data']['data'][i]['title'],
                    content: r['data']['data'][i]['content'],
                    author: r['data']['data'][i]['author'],
                    update_time: new Date(r['data']['data'][i]['update_time'] * 1000).toLocaleString(),
                    create_time: new Date(r['data']['data'][i]['create_time'] * 1000).toLocaleString(),
                }
                list2.push(data2)
            }
            data.value = list
            bk.value = list2
            console.log(data.value)
        }
    })
    .catch(function(error){
        Modal.error({
            title: '请求错误',
            content: error.message
        })
    })
})

const blob = (content_id: string) => {
    var d = bk.value
    let content = null
    let filename = null
    for (var i = 0; i < d.length; i++){
        if (d[i]['_id'] == content_id){
            content = d[i]['content']
            filename = d[i]['title'] + ".md"
        }
    }
    var blob = new Blob([content], {type: 'text/plain;charset=utf-8'})
    const link = URL.createObjectURL(blob)
    const a_link = document.createElement('a')
    a_link.href = link
    a_link.download = filename
    Message.success('已开始下载')
    a_link.click()
}
</script>