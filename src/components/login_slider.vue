<template>
    <a-carousel
        :style="{
            width: '60%',
            height: '100%',
            borderRadius: '10px',
            float: 'left',
        }"
        :auto-play="true"
        indicator-type="slider"
        show-arrow="hover"
    >
        <arco-carousel-item>
            <div
                :style="{
                    ...defaultStyle,
                    background: 'url(https://t.mwm.moe/pc/) no-repeat',
                    backgroundSize: 'cover',
                    color: '#FFF',
                    textShadow: '0px 0px 6px #898989',
                }"
                class="hero"
            >
                <h2>v2.1版本上线</h2>
                <p>
                    页面布局重构、支持创建分享（完成度10%）、修复一些小Bug以及一个还未完成的第三方登录模块（不要去试，不好用，没法用）
                </p>
                <p>当然 我们依然愿意倾听您的反馈</p>
                <div>
                    <arco-button class="slider-btn" size="large" type="primary" href="home_v2">
                        <ArrowRightOutlined />去看看？
                    </arco-button>
                </div>
            </div>
        </arco-carousel-item>
        <arco-carousel-item>
            <div
                :style="{
                    ...defaultStyle,
                    background: 'url(https://t.mwm.moe/fj/) no-repeat',
                    backgroundSize: 'cover',
                    color: '#FFF',
                    textShadow: '0px 0px 6px #898989',
                }"
                class="hero"
            >
                <h2>加入官方 QQ 频道 / 关注我们的B站</h2>
                <p>我们的官方QQ频道：仙舟通鉴，我们的官方B站账号：@仙舟通鉴wiki</p>
                <p>来这里结识更多志同道合的米友，和其他编辑一起协作，反馈平台问题</p>
                <div>
                    <arco-button class="slider-btn" size="large" type="primary" href="https://pd.qq.com/s/9p6w252k1" target="_blank">
                        <ArrowRightOutlined />我要去频道！
                    </arco-button>
                </div>
                <div>
                    <arco-button class="slider-btn" size="large" status="warning" href="https://space.bilibili.com/3537119408556068" target="_blank">
                        <ArrowRightOutlined />我要去B站！
                    </arco-button>
                </div>
            </div>
        </arco-carousel-item>
        <arco-carousel-item>
            <div
                :style="{
                    ...defaultStyle,
                    background: 'url(https://imgapi.xl0408.top/index.php) no-repeat',
                    backgroundSize: 'cover',
                    color: '#FFF',
                    textShadow: '0px 0px 6px #898989',
                }"
                class="hero"
            >
                <h2>加入我们的核心用户群</h2>
                <p>如果您在频道中保持活跃并发表了一些有价值的内容，您将被邀请加入我们的飞书，和编辑高效交流，并体验还未发布的新功能</p>
                <p>只需要您在社区内保持活动即可</p>
                <div>
                    <arco-button size="large" type="primary" href="https://pd.qq.com/s/9p6w252k1" target="_blank">
                        <ArrowRightOutlined />加入 QQ 频道
                    </arco-button>
                </div>
                <div>
                    <arco-button class="slider-btn" size="large" href="https://www.feishu.cn/download" target="_blank">
                        <ArrowRightOutlined />下载飞书客户端
                    </arco-button>
                </div>
            </div>
        </arco-carousel-item>
    </a-carousel>
</template>

<style>
.hero {
    height: 100%;
}

.hero h2 {
    font-size: 2rem;
    margin: 10px;
}

.hero p,
.hero div {
    margin-left: 10px;
}

.hero div {
    margin-top: 10px;
}

.slider-btn {
    text-shadow: none;
}
</style>

<script lang="ts" setup>
import { CSSProperties, ref } from 'vue';
import { ArrowRightOutlined } from '@ant-design/icons-vue';

const defaultStyle = ref<CSSProperties>({
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: '10px',
    padding: '20px',
});
</script>