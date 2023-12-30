<template>
    <a-layout>
        <a-layout-header style="overflow: hidden">
            <HomeHeader style="position: fixed"/>
        </a-layout-header>
        <a-layout-content>
            <div :class="bannerClass" :style="{ background: !loading ?  `url(${uinfo['d']['cover']}) no-repeat` : '#EEE', backgroundSize: 'cover' }">
                <div class="user">
                    <Skeleton :active="true" :loading="loading" :avatar="true" :title="true" :paragraph="true"/>
                    <template v-if="!loading">
                        <Avatar :src="uinfo['d']['avatar']" :size="56"/>
                        <div style="margin-left: 10px;">
                            <h2 style="display: inline-block; margin: 5px;">{{ uinfo['nickName'] }} <Tag :bordered="false" style="font-weight: 500" :icon="h(SafetyOutlined)" v-if="uinfo['d']['verify']['type'] != 0" :color="uinfo['d']['verify']['type'] == 1 ? 'orange' : 'blue'">{{ uinfo['d']['verify']['type'] == 1 ? '个人认证' : '机构认证' }}：{{ uinfo['d']['verify']['content']}}</Tag></h2><br/>
                            <TypographyParagraph style="display: inline-block; margin: 5px; font-family: 'HYSongYunLangHeiW-1', 'sr', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" v-model:content="sign" :editable="isUser"><template #editableTooltip>点击编辑签名</template></TypographyParagraph>
                        </div>
                    </template>
                </div>
                <a-button target="_blank" :href="`https://space.bilibili.com/${uinfo['d']['bilibili_uid']}`" v-if="uinfo['d']['bilibili_uid'] != null" class="actionBtn" shape="round" style="margin-right: 20%; color: #FFF; background: #ff6f9a"><UserOutlined style="margin-right: 15px;"/>去B站关注ta</a-button>
                <a-button target="_blank" :href="uinfo['d']['homepage_url']" v-if="uinfo['d']['homepage_url'] != null" class="actionBtn" shape="round" style="margin-right: 10%; color: #FFF; background: #c56fff"><HomeOutlined style="margin-right: 15px;"/>前往ta的博客</a-button>
                <a-button @click="upload = true" class="changeBtn" v-if="isUser" shape="round"><FileImageOutlined style="margin-right: 15px;"/>更换背景</a-button>
            </div>
            <div class="content">
                <Tabs size="large">
                    <TabPane key="1" tab="文章">
                        <Skeleton :active="true" :loading="loading"/>
                        <template v-if="!loading">
                            <Empty v-if="uinfo['articles'].length === 0" style="margin-top: 10%" :imageStyle="{height: '120px'}" description="这里什么都没有"/>
                            <template v-else>
                                <div class="cui-content-card" v-for="item in uinfo['articles']">
                                    <h2>{{ item['title'] }}</h2>
                                    <p>最后编辑于 {{ formatDate(item['update_time']) }}</p>
                                    <a-tooltip content="这是没有被格式化和渲染的 Markdown 内容，体验比较糟糕，仅供预览。" position="tl"><TypographyParagraph :copyable="{ text: item['content'] + `\n————————\n作者：${uinfo['nickName']}\n链接：https://seelevollerei.online/content.html?id=${item['_id']['$oid']}\n内容以 CC-BY-NC-NA 协议授权，转载请注明出处。` }" :ellipsis="true ? { rows: 2, expandable: true, symbol: '\n\r查看更多' } : false" style="font-family: 'HYSongYunLangHeiW-1', 'sr', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" :content="item['content']"/></a-tooltip>
                                    <div class="btngroup">
                                        <Button target="_blank" :href="`https://seelevollerei.online/content.html?id=${item['_id']['$oid']}`" type="primary">在通鉴中查看</Button>
                                        <Button @click="copy(item)">分享</Button>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </TabPane>
                    <TabPane key="2" tab="个人简介">
                        <Skeleton :active="true" :loading="loading"/>
                        <template v-if="!loading">
                            <Button :icon="h(EditOutlined)" v-if="isUser" type="primary" @click="updateDetail = true">更新个人简介</Button>
                            <v-md-preview :text="detail" />
                        </template>
                    </TabPane>
                    <TabPane key="3" tab="设置" v-if="isUser">
                        <Skeleton :active="true" :loading="loading"/>
                        <template v-if="!loading">
                            <strong>都非必填，按需填写。</strong>
                            <a-tooltip content="填写后就会展示在主页上，以一个“前往B站关注”的按钮展示"><p style="width: 250px">B站UID（可以在你的个人空间中查看）<Input placeholder="uid" v-model:value="uinfo['d']['bilibili_uid']" style="position: relative; left: 0px; "><template #prefix><UserOutlined/></template></Input><Button @click="saveUID" style="margin-top: 10px;" type="primary">保存</Button></p></a-tooltip>
                            <a-tooltip content="填写后就会展示在主页上，以一个“前往ta的博客”的按钮展示（注意：需要带协议头如https://）"><p style="width: 450px">你的博客 URL<Input style="position: relative; left: 0px; " placeholder="飞书云文档、语雀、Notion或者WordPress之类的都可以！" v-model:value="uinfo['d']['homepage_url']"><template #prefix><HomeOutlined/></template></Input><Button @click="saveHP" style="margin-top: 10px;" type="primary">保存</Button></p></a-tooltip>
                        </template>
                    </TabPane>
                </Tabs>
            </div>
        </a-layout-content>
        <a-layout-footer>
            <Footer/>
        </a-layout-footer>
    </a-layout>
    <UploadBanner :show="upload" @close="upload = false" @done="upload = false; load()"/>
    <UpdateDetail :show="updateDetail" @close="updateDetail = false" :content="detail"/>
</template>

<style>
.banner {
    display: flex;
    flex-direction: row; /* 默认值是 column，修改为 row */
    justify-content: space-between; /* 控制水平排列位置 */
    width: 100%;
    min-height: 220px;
    max-height: 600px;
    height: 400px;
    position: relative;
    transition: 2s;
}

/* ... 其他样式 ... */

.actionBtn,
.changeBtn {
    /* 你的按钮样式 */
    margin-right: 10px; /* 控制按钮之间的间距 */
}

@media (min-height: 660px){
    .banner{
        height: 280px
    }
}
@media (min-height: 880px){
    .banner{
        height: 320px
    }
}
@media (min-height: 900px){
    .banner{
        height: 400px
    }
}
@media (min-width: 1400px){
    .banner{
        height: 600px
    }
}
.banner-loading{
    background: #EEE
}
.user{
    min-width: 240px;
    float: left;
    position: absolute;
    bottom: 20px;
    left: 24px;
    display: flex;
    align-items: center;
    background: #ffffff8f;
    backdrop-filter: blur(25px);
    padding: 15px;
    border-radius: 999px;
}
.content{
    position: relative;
    padding: 24px;
    min-height: 600px;
}
.changeBtn:hover{
    background: #12ffdf70; 
    transform: scale(1.05);
}
.changeBtn{
    float: right;
    position: absolute;
    bottom: 20px;
    right: 24px; 
    background: #ffffff0c; 
    backdrop-filter: blur(25px);
    transition: 1s
}
.actionBtn{
    float: right;
    position: absolute;
    bottom: 20px;
    right: 0px;
    margin-right: 24px; 
    transition: 1s
}
.cui-content-card{
    width: 90%;
    padding: 15px;
    background: #FFF;
    box-shadow: 0px 0px 6px #CCC;
    border-radius: 10px;
    vertical-align: middle;
    color: #000;
    transition: 0.5s;
}
.cui-content-card p{
    color: #666;
    transition: 0.5s;
    margin: 0;
    margin-top: 5px;
}
.cui-content-card h2{
    font-weight: 500;
    margin: 0;
}
.cui-content-card .ant-typography{
    color: #9e9e9e;
    transition: 0.5s;
    margin: 0;
    margin-top: 15px;
}
.btngroup{
    margin-top: 10px;
}
.btngroup .ant-btn{
    margin-right: 10px;
}
.cui-content-card:hover .ant-typography{
    color: #DDD;
}
.cui-content-card:hover p{
    color: #EEE
}
.cui-content-card:hover .ant-typography-expand{
    color: #FFF
}
.cui-content-card:hover .ant-btn-primary{
    color: #FFF;
    background: none;
    box-shadow: 0px 0px 6px #FFF;
}
.cui-content-card:hover .ant-btn{
    color: #FFF;
    background: none;
    border: 0.5px solid #CCC
}
.cui-content-card:hover{
    background: #1890ff;
    box-shadow: 0px 0px 6px #1890ff;
    color: #FFF;
}
</style>

<script lang="ts" setup>
import HomeHeader from '../../components/home_menu.vue'
import Footer from '../../components/footer.vue'
import { ref, onMounted, h, watch } from 'vue';
import { formatDate } from '../../js/formatDate';
import { useUserStore } from '../../store/user';
import { message as Message, Modal, Button, Skeleton, Avatar, Tabs, TabPane, Tag, TypographyParagraph, Empty, Input } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import Axios from 'axios';
import { SafetyOutlined, FileImageOutlined, EditOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons-vue';
import UploadBanner from '../../components/user/upload_banner.vue';
import UpdateDetail from '../../components/user/update_detail.vue';

const updateDetail = ref(false)
const router = useRouter()
const user = useUserStore()
const bannerClass = ref("banner banner-loading")
const loading = ref(true)
const upload = ref(false)
const sign = ref(null)
const detail = ref("Loading...")
const isUser = ref(false)
const uinfo = ref({})
const id = ref(router.currentRoute.value.params.id)

watch(sign, (n, o) => {
    if (o != null){
        Axios.post('/api/v2/user/changesign', { sign: n })
        .then((r) => {
            if (r['data']['code'] != 0){
                Message.error('签名更新失败 ' + r['data']['msg'])
            }else{
                Message.success('签名已更新')
            }
        })
        .catch((e) => {
            Modal.error({
                title: '网络错误',
                content: '请重试 ' + e
            })
        })
    }else{
        console.log('passed change sign event')
    }
})

watch(detail, (n, o) => {
    if (o != "Loading..."){
        Axios.post('/api/v2/user/changedetail', { detail: n })
        .then((r) => {
            if (r['data']['code'] != 0){
                Message.error('资料卡更新失败 ' + r['data']['msg'])
            }else{
                Message.success('资料卡已更新')
            }
        })
        .catch((e) => {
            Modal.error({
                title: '网络错误',
                content: '请重试 ' + e
            })
        })
    }else{
        console.log('passed change detail event')
    }
})

const load = () => {
    if (id.value.length == 24){
        Axios('/api/v2.1/user/' + id.value)
        .then((r) => {
            if (r['data']['code'] != 0){
                router.push('/404')
            }else{
                loading.value = false
                uinfo.value = r['data']['data']
                document.title = r['data']['data']['nickName'] + " 的用户主页 | 仙舟通鉴"
                if (r['data']['data']['userName'] == user.user_data.userName) isUser.value = true
                bannerClass.value = "banner"
                sign.value = r['data']['data']['d']['sign']
                detail.value = r['data']['data']['d']['detail']
            }
        })
        .catch((e) => {
            Modal.error({
                title: '加载数据失败',
                content: '请刷新页面重试 ' + e
            })
        })
    }else{
        Axios('/api/v2.1/user/uid/' + id.value)
        .then((r) => {
            if (r['data']['code'] != 0){
                router.push('/404')
            }else{
                loading.value = false
                uinfo.value = r['data']['data']
                document.title = r['data']['data']['nickName'] + " 的用户主页 | 仙舟通鉴"
                if (r['data']['data']['userName'] == user.user_data.userName) isUser.value = true
                bannerClass.value = "banner"
                sign.value = r['data']['data']['d']['sign']
                detail.value = r['data']['data']['d']['detail']
            }
        })
        .catch((e) => {
            Modal.error({
                title: '加载数据失败',
                content: '请刷新页面重试 ' + e
            })
        })
    }
}

onMounted(() => {
    document.title = "用户主页 | 仙舟通鉴"
    load()
})

const copy = (item) => {
    if (loading.value == false){
        const input = document.createElement('input')
        input.setAttribute('readonly', 'readonly')
        input.setAttribute('value',  `来自仙舟通鉴的文章 ${item['title']}：https://seelevollerei.online/content.html?id=${item['_id']['$oid']}`)
        document.body.appendChild(input)
        input.select()
        if (document.execCommand('copy')) {
            document.execCommand('copy')
            Message.success('链接已复制，快点分享给你的好友吧！')
        }
        document.body.removeChild(input)
    }
    else {
        Message.warning('=(')
    }
}

const saveUID = () => {
    const key = 'l'
    Message.loading({ content: '稍等，正在保存数据', key })
    Axios.post('/api/v2/user/changeuid', { uid: uinfo.value['d']['bilibili_uid'] })
    .then((r) => {
        if (r['data']['code'] != 0){
            Message.error({ content: '个人资料更新失败 ' + r['data']['msg'], key, duration: 2 })
        }else{
            Message.success({ content: '更新成功，刷新后生效!', key, duration: 2 });
        }
    })
    .catch((e) => {
        Message.destroy(key)
        Modal.error({
            title: '网络错误',
            content: '请重试 ' + e
        })
    })
}

const saveHP = () => {
    const key = 'k'
    Message.loading({ content: '稍等，正在保存数据', key })
    Axios.post('/api/v2/user/changeHP', { hp: uinfo.value['d']['homepage_url'] })
    .then((r) => {
        if (r['data']['code'] != 0){
            Message.error({ content: '个人资料更新失败 ' + r['data']['msg'], key, duration: 2 })
        }else{
            Message.success({ content: '更新成功，刷新后生效!', key, duration: 2 });
        }
    })
    .catch((e) => {
        Message.destroy(key)
        Modal.error({
            title: '网络错误',
            content: '请重试 ' + e
        })
    })
}
</script>