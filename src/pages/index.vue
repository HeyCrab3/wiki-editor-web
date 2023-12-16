<template>
    <arco-layout id="layout" style="height: 100%;">
      <arco-layout-header><home_menu style="position: fixed"/></arco-layout-header>
      <arco-layout-content>
        <arco-carousel
            :style="{
            width: '100%',
            height: '80%',
            userSelect: 'none'
            }"
            :default-current="1"
            auto-play
        >
            <arco-carousel-item>
                <div class="hero" :style="gradientStyle">
                    <h2>随时随地</h2>
                    <h2>轻松编辑</h2>
                    <p>轻松、愉悦地编辑 Wiki 中的任何内容并且无需掌握 Markdown 语法知识</p>
                    <div v-if="user.user_data.nickName == null"><arco-button size="large" type="primary" href="register_v3"><EditOutlined/>立刻开始</arco-button></div>
                    <div v-else><arco-button size="large" type="primary" href="home_v2"><ArrowRightOutlined/>我的工作台</arco-button></div>
                    <div v-if="user.user_data.nickName == null"><arco-button size="large" href="login_v3"><ArrowRightOutlined/>已经有账号了？登录</arco-button></div>
                </div>
            </arco-carousel-item>
            <arco-carousel-item>
                <div :style="defaultStyle" class="hero" style="background: url(https://t.mwm.moe/pc/) no-repeat; background-size: cover; color: #FFF; text-shadow: 0px 0px 6px #898989">
                    <h2>v2.1版本上线</h2>
                    <p>页面布局重构、支持创建分享（完成度10%）、修复一些小Bug以及一个还未完成的第三方登录模块（不要去试，不好用，没法用）</p>
                    <p>当然 我们依然愿意倾听您的反馈</p>
                    <div><arco-button class="slider-btn" size="large" type="primary" href="home_v2"><ArrowRightOutlined/>去看看？</arco-button></div>
                </div>
            </arco-carousel-item>
            <arco-carousel-item>
                <div :style="defaultStyle" class="hero" style="background: url(https://t.mwm.moe/fj/) no-repeat; background-size: cover; color: #FFF; text-shadow: 0px 0px 6px #898989">
                    <h2>加入官方 QQ 频道 / 关注我们的B站</h2>
                    <p>我们的官方QQ频道：仙舟通鉴，我们的官方B站账号：@仙舟通鉴wiki</p>
                    <p>来这里结识更多志同道合的米友，和其他编辑一起协作，反馈平台问题</p>
                    <div><arco-button class="slider-btn" size="large" type="primary" href="https://pd.qq.com/s/9p6w252k1" target="_blank"><ArrowRightOutlined/>我要去频道！</arco-button></div>
                    <div><arco-button class="slider-btn" size="large" status="warning" href="https://space.bilibili.com/3537119408556068" target="_blank"><ArrowRightOutlined/>我要去B站！</arco-button></div>
                </div>
            </arco-carousel-item>
            <arco-carousel-item>
                <div :style="defaultStyle" class="hero" style="background: url(https://imgapi.xl0408.top/index.php) no-repeat; background-size: cover; color: #FFF; text-shadow: 0px 0px 6px #898989">
                    <h2>加入我们的核心用户群</h2>
                    <p>如果您在频道中保持活跃并发表了一些有价值的内容，您将被邀请加入我们的飞书，和编辑高效交流，并体验还未发布的新功能</p>
                    <p>只需要您在社区内保持活动即可</p>
                    <div><arco-button size="large" type="primary" href="https://pd.qq.com/s/9p6w252k1" target="_blank"><ArrowRightOutlined/>加入 QQ 频道</arco-button></div>
                    <div><arco-button class="slider-btn" size="large" href="https://www.feishu.cn/download" target="_blank"><ArrowRightOutlined/>下载飞书客户端</arco-button></div>
                </div>
            </arco-carousel-item>
            <arco-carousel-item>
                <div :style="defaultStyle" class="hero" style="background: url(https://api.oick.cn/random/api.php?type=pc) no-repeat; background-size: cover; color: #FFF; text-shadow: 0px 0px 6px #898989">
                    <h2>短链接上线</h2>
                    <p>认准正版：https://rlzline.icu</p>
                    <p>谨防仙舟诈骗</p>
                    <div><arco-button size="large" href="https://applink.feishu.cn/client/web_app/open?appId=cli_a5e014a1ca38100c&mode=appCenter" target="_blank"><ArrowRightOutlined/>在飞书内打开</arco-button></div>
                </div>
            </arco-carousel-item>
        </arco-carousel>
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
                    <arco-button type="primary" size="large" href="mailto:heycrab@petalmail.com"><PhoneOutlined/> 联系我们</arco-button>
                </article>
            </section>
        </div>
        <div style="padding: 20px 20px 0px 20px; height: 366px; background: url(https://portal.volccdn.com/obj/volcfe/bee_prod/biz_950/tos_2781e7adcbfb6de5c4b8888357699d4a.jpeg) no-repeat; text-align: center; display: flex; flex-direction: column">
            <h1>开启您的新旅程</h1>
            <span>加入我们的编辑团队，与我们一起建设 Wiki 的内容</span><br/>
            <arco-button type="primary" shape="round" href="/register" style="width: 30%; margin: auto;" size="large"><ArrowRightOutlined style="margin-right: 10px;"/>出发吧！</arco-button>
        </div>
        <Footer/>
      </arco-layout-content>      
    </arco-layout>
    <arco-back-top target-container="#layout" :style="{position:'absolute'}" />
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
.slider-btn{
    text-shadow: none
}
</style>

<script lang="ts" setup>
import { onMounted } from 'vue';
import home_menu from '../components/home_menu.vue'
import { useUserStore } from '../store/user'
import { CSSProperties, watch } from 'vue';
import { ArrowRightOutlined, EditOutlined, CheckCircleOutlined, PhoneOutlined, RightOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import Footer from '../components/footer.vue'

let gradientAngle = ref(140);

const defaultStyle = ref<CSSProperties>({
    height: "100%",
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: '0px 0px 10px 10px',
    padding: '20px',
})

const gradientStyle = ref<CSSProperties>({
    height: '100%',
    background: `linear-gradient(${gradientAngle.value}deg, #ffd54f, #e6ee9c)`,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: '0px 0px 10px 10px',
    padding: '20px',
}) ;
const user = useUserStore();

watch(gradientAngle, (newValue) => {
  gradientStyle.value.background = `linear-gradient(${newValue}deg, #ffd54f, #e6ee9c)`;
});

setInterval(() => {
        gradientAngle.value = (gradientAngle.value + 1) % 360;
}, 10);

onMounted(() => {
    document.title = "首页 | 仙舟通鉴编辑器"
})
</script>