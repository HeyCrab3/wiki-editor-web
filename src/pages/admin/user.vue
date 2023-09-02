<template>
    <a-typography-title :heading="4">用户</a-typography-title>
    <a-spin :loading="loading" style="width: 100%;">
        <a-table :draggable="{}" style="animation: slider 2s; width: 100%;" :data="data">
            <template #columns>
                    <template v-for="item in columns">
                        <a-table-column :title="item['title']" :data-index="item['dataIndex']">
                        </a-table-column>
                    </template>
                    <a-table-column title="操作">
                        <template #cell="{ record }">
                            <a-button status="success" type="primary" @click="b(record['userName'])">更改权限</a-button>
                            <a-button status="warning" style="margin-left: 10px;" type="primary" @click="BanUser(record['userName'])">封禁/解封</a-button>
                            <a-button status="danger" style="margin-left: 10px;" type="primary" @click="DeleteUser(record['userName'])">删号</a-button>
                        </template>
                    </a-table-column>
                </template>
        </a-table>
    </a-spin>
    <a-modal v-model:visible="c" title="更新权限" :on-before-ok="updatePermission">
        <div>您正在更新用户 {{ username }} 的权限，请在下方选择新权限</div>
        <div style="margin-top: 20px;">
            <a-select v-model="a" :style="{width:'320px'}" placeholder="Please select ...">
                <a-option :value="0">普通用户</a-option>
                <a-option :value="1">编辑</a-option>
                <a-option :value="2">管理员</a-option>
            </a-select>
        </div>
    </a-modal>
</template>

<style scoped>

</style>

<script lang="ts" setup>
import { ref } from 'vue'
import { Message, Modal } from '@arco-design/web-vue';
import Axios from 'axios'
import { onMounted } from 'vue';

const a = ref(null)
const c = ref(false)
const loading = ref(true)
const data = ref([])
const username = ref(null)

const b = (f: string) => {
    username.value = f;
    c.value = true;
}

const updatePermission = () => {
    if (a.value == null){
        Message.error('请选择一个权限！')
    }else{
        Axios({
            url: '/api/v1/content_manage/zone/9999/updatePerm',
            method: 'POST',
            data: {
                username: username.value,
                perm: a.value
            }
        })
        .then(function(r){
            if (r['data']['code'] != 0){
                Message.error(r['data']['msg'])
                return false
            }else{
                Message.success('更新权限成功')
                getUserInfo();
                return true
            }
        })
        .catch(function(e){ Message.error(e.message) })
        return true
    }
}

const DeleteUser = (username: string) => {
    Modal.confirm({
        title: '警告！',
        content: `您正在尝试删除用户 ${username}，此操作不可逆，是否继续？`,
        onOk: function(){
            Axios({
                url: '/api/v1/content_manage/zone/9999/deleteUser',
                method: 'POST',
                data: { username: username }
            })
            .then(function(r){
                if (r['data']['code'] != 0){
                    Message.error(r['data']['msg'])
                }else{
                    Message.success('删除成功')
                    getUserInfo();
                }
            })
            .catch(function(e){ Message.error(e.message) })
        }
    })
}

const BanUser = (username: string) => {
    Modal.confirm({
        title: '警告！',
        content: `您正在尝试封禁/解封用户 ${username}，是否继续？`,
        onOk: function(){
            Axios({
                url: '/api/v1/content_manage/zone/9999/banUser',
                method: 'POST',
                data: { username: username }
            })
            .then(function(r){
                if (r['data']['code'] != 0){
                    Message.error(r['data']['msg'])
                }else{
                    Message.success('封禁/解封成功')
                    getUserInfo();
                }
            })
            .catch(function(e){ Message.error(e.message) })
        }
    })
}

const columns = [
    {
        title: '用户ID',
        key: '_id',
        dataIndex: '_id'
    },
    {
        title: '用户名',
        key: 'userName',
        dataIndex: 'userName'
    },
    {
        title: '昵称',
        key: 'nickName',
        dataIndex: 'nickName'
    },
    {
        title: '封禁状态',
        key: 'banned',
        dataIndex: 'banned'
    },
    {
        title: '权限',
        key: 'perm',
        dataIndex: 'perm'
    }
]

const getUserInfo = () => {
    loading.value = true
    Axios({
        url: '/api/v1/content_manage/zone/9999/getUserData'
    })
     .then(function(Response){
        var isPassed = Response['data']['code']
        if (isPassed == 0){
            console.log(Response['data'])
            var b = []
            for (var i = 0; i < Response['data']['data'].length; i++){
                if (Response['data']['data'][i]['perm'] == 0){
                    var a = {
                        _id: Response['data']['data'][i]['_id']['$oid'],
                        userName: Response['data']['data'][i]['userName'],
                        nickName: Response['data']['data'][i]['nickName'],
                        banned: Response['data']['data'][i]['banned'],
                        perm: '普通用户'
                    }
                }
                else if (Response['data']['data'][i]['perm'] == 1){
                    var a = {
                        _id: Response['data']['data'][i]['_id']['$oid'],
                        userName: Response['data']['data'][i]['userName'],
                        nickName: Response['data']['data'][i]['nickName'],
                        banned: Response['data']['data'][i]['banned'],
                        perm: '编辑'
                    }
                }
                else if (Response['data']['data'][i]['perm'] == 2){
                    var a = {
                        _id: Response['data']['data'][i]['_id']['$oid'],
                        userName: Response['data']['data'][i]['userName'],
                        nickName: Response['data']['data'][i]['nickName'],
                        banned: Response['data']['data'][i]['banned'],
                        perm: '管理员'
                    }
                }
                else{
                    var a = {
                        _id: Response['data']['data'][i]['_id']['$oid'],
                        userName: Response['data']['data'][i]['userName'],
                        nickName: Response['data']['data'][i]['nickName'],
                        banned: Response['data']['data'][i]['banned'],
                        perm: '未知权限（不在范围内）'
                    }
                }
                b.push(a)
            }
            data.value = b
            console.log(b)
            loading.value = false;
        }else{
            Message.warning(Response['data']['msg'])
        }
    })
    .catch(function(error){
        Message.error('错误！' + error.message)
        console.error('错误！' + error)
    })
}

onMounted(() => {
    getUserInfo();
})
</script>