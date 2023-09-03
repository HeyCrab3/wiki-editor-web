<template>
    <a-layout id="layout" style="height: 100%;">
      <a-layout-header><home_menu style="position: fixed"/></a-layout-header>
      <a-layout-content>
        <div class="hero" :style="gradientStyle">
            <h2>随时随地</h2>
            <h2>轻松编辑</h2>
            <p>轻松、愉悦地编辑 Wiki 中的任何内容并且无需掌握 Markdown 语法知识</p>
            <div v-if="user.user_data.nickName == null"><a-button size="large" type="primary" href="register"><EditOutlined/>立刻开始</a-button></div>
            <div v-else><a-button size="large" type="primary" href="home"><ArrowRightOutlined/>我的工作台</a-button></div>
            <div v-if="user.user_data.nickName == null"><a-button size="large" href="login"><ArrowRightOutlined/>已经有账号了？登录</a-button></div>
        </div>
        <div style="margin-top: 10px; padding: 20px; text-align: center;">
            <section>
                <h1>为什么选择我们</h1>
                <article>
                    <p>我们是一个专注于记载米哈游游戏节奏类内容的公益性质 Wiki。</p>
                    <p>我们 Wiki 中的每份内容都被仔细地审查过并经过润色，使其对于纯良米友来讲更具有可阅读性。</p>
                    <p>我们的 Wiki 是开放编辑的（这也就是为什么这个站点存在的原因），任何希望参与我们网站内容建设的米友均可注册账号编辑内容，亦或者是在 Gitee 上直接使用 Pull Request 功能提交或更改内容。</p>
                    <p>除此之外，我们还正在尝试制作节奏剖析等内容，使得 Wiki 的内容更充实。</p>
                </article>
            </section>
            <section>
                <h1>我们的优势在哪</h1>
                <article>
                    <p><CheckCircleOutlined style="color: rgb(0, 206, 0); margin-right: 10px;"/>公开透明的源代码，保证我们的网站不会窃取您的用户信息</p>
                    <p><CheckCircleOutlined style="color: rgb(0, 206, 0); margin-right: 10px;"/>透明的捐助信息和账单信息，确保您的捐助款都用在了我们需要的地方</p>
                    <p><CheckCircleOutlined style="color: rgb(0, 206, 0); margin-right: 10px;"/>使用 Markdown 语法，易上手，扩展性更高</p>
                    <p><CheckCircleOutlined style="color: rgb(0, 206, 0); margin-right: 10px;"/>包容性高的社区，友好的环境氛围</p>
                    <p><CheckCircleOutlined style="color: rgb(0, 206, 0); margin-right: 10px;"/>人人都可参与共建</p>
                    <p><CheckCircleOutlined style="color: rgb(0, 206, 0); margin-right: 10px;"/>积极参与社区维护的管理团队、编辑团队和运营团队</p>
                </article>
            </section>
            <section>
                <h1>对此仍有疑问？</h1>
                <article>
                    <a-button type="primary" size="large" href="mailto:heycrab@petalmail.com"><PhoneOutlined/> 联系我们</a-button>
                </article>
            </section>
        </div>
        <div style="padding: 20px 20px 0px 20px; height: 366px; background: url(https://portal.volccdn.com/obj/volcfe/bee_prod/biz_950/tos_2781e7adcbfb6de5c4b8888357699d4a.jpeg) no-repeat; text-align: center; display: flex; flex-direction: column">
            <h1>开启您的新旅程</h1>
            <span>加入我们的编辑团队，与我们一起建设 Wiki 的内容</span><br/>
            <a-button type="primary" shape="round" href="/register" style="width: 30%; margin: auto;" size="large"><ArrowRightOutlined style="margin-right: 10px;"/>出发吧！</a-button>
        </div>
        <a-layout-footer style="height: 100px; padding: 15px; background: #f5f5f5">
            <div style="float: left; position: relative; bottom: 6px">
                <h2>仙舟通鉴</h2>
                <small>©{{ new Date().getFullYear() }} Crab Studio. All Rights Reserved.</small><br/>
                <small>本站所有内容均以 CC-BY-NC-NA 协议授权。</small>
            </div>
            <!-- 这里需要注意最右边的导航栏是第一个div -->
            <div style="float: right; margin-left: 20px; text-align: right;">
                <h3 style="margin: 0; margin-bottom: 5px;">我们的服务</h3>
                <a-link style="display: block;" target="_blank" href="https://seelevollerei.online"><RightOutlined style="margin-right: 10px;"/>仙舟通鉴</a-link>
                <a-link style="display: block;" target="_blank" href="https://editor.seelevollerei.online"><RightOutlined style="margin-right: 10px;"/>Wiki 内容编辑器</a-link>
                <a-link style="display: block;" target="_blank" href="https://help.seelevollerei.online"><RightOutlined style="margin-right: 10px;"/>帮助中心</a-link>
            </div>
            <div style="float: right; margin-left: 20px; text-align: right">
                <h3 style="margin: 0; margin-bottom: 5px;">关注官方社媒</h3>
                <a-link style="display: block;" target="_blank" href="https://space.bilibili.com/3537119408556068?spm_id_from=333.999.0.0"><RightOutlined style="margin-right: 10px;"/>哔哩哔哩</a-link>
                <a-link style="display: block;" target="_blank" href="https://pd.qq.com/s/9p6w252k1"><RightOutlined style="margin-right: 10px;"/>QQ频道</a-link>
            </div>
            <div style="float: right; margin-left: 20px; text-align: right">
                <h3 style="margin: 0; margin-bottom: 5px;">联系我们</h3>
                <a-link href="mailto:heycrab@petalmail.com"><svg style="margin-right: 10px;" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#080341"/>
</svg>heycrab@petalmail.com</a-link>
            </div>
        </a-layout-footer>
      </a-layout-content>      
    </a-layout>
    <a-back-top target-container="#layout" :style="{position:'absolute'}" />
</template>

<style>
.arco-layout-footer div div .arco-link{
    margin-bottom: 5px;
}
.hero h2{
    font-size: 2rem;
    margin: 10px;
}
.hero p, .hero div{
    margin-left: 10px;
}
.hero div{
    margin-top: 10px;
}
</style>

<script lang="ts" setup>
import { onMounted } from 'vue';
import home_menu from '../components/home_menu.vue'
import { useUserStore } from '../store/user'
import { CSSProperties, watch } from 'vue';
import { ArrowRightOutlined, EditOutlined, CheckCircleOutlined, PhoneOutlined, RightOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
let gradientAngle = ref(140);

const gradientStyle = ref<CSSProperties>({
    height: '60%',
    background: `linear-gradient(${gradientAngle.value}deg, #acfcff, #8dc8ff)`,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: '0px 0px 10px 10px',
    padding: '20px',
}) ;
const user = useUserStore();

watch(gradientAngle, (newValue) => {
  gradientStyle.value.background = `linear-gradient(${newValue}deg, #acfcff, #8dc8ff)`;
});

setInterval(() => {
        gradientAngle.value = (gradientAngle.value + 1) % 360;
}, 10);

onMounted(() => {
    document.title = "首页 | 仙舟通鉴 Wiki 内容编辑器"
})
</script>