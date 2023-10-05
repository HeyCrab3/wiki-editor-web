<template>
    <a-typography-title :heading="4">数据库</a-typography-title>
    <div>
        <a-auto-complete style="width: 20%" v-model="dbname" :data="options" placeholder="数据库名"></a-auto-complete>
        <a-button @click="getDB" style="display: inline-block;" type="primary">查找</a-button>
    </div>
    <div id="monaco-editor"></div>
</template>
    
<style scoped>
#monaco-editor{
    height: 70%;
    border: 0.3px solid #00000038;
    margin-top: 30px;
}
</style>

<script lang="ts" setup>
import { Message, Modal } from '@arco-design/web-vue'
import { ref } from 'vue';
import Axios from 'axios'
import * as monaco from 'monaco-editor'

const dbname = ref(null)
const editor = ref(null)
interface Option {
    value: string;
}

const options = ref<Option[]>([
    {value: 'user'},
    {value: 'message'},
    {value: 'content'},
])


const init = (value: any) => {
        editor.value = monaco.editor.create(document.getElementById('monaco-editor'), {
              value: JSON.stringify(value),
              language: 'json',
              readOnly: true,
              automaticLayout: true,
              fontSize: 15
        })
}

const getDB = () => {
        if (dbname == null){
            Message.warning('请填写数据库名称')
        }else{
            document.getElementById('monaco-editor').innerHTML = ""
            Axios({
                url: '/api/v2/content_manage/zone/9999/getDatabaseInfo?db=' + dbname.value
            })
            .then(function(Response){
                var isPassed = Response['data']['code']
                if (isPassed == 0){
                    init(Response['data']['result'])
                }else{
                    Message.warning(Response['data']['msg'])
                }
            })
            .catch(function(error){
                Modal.error({
                    title: '请求时发生错误',
                    content: error.message
                })
                console.error('错误！' + error)
            })
        }
    }
</script>