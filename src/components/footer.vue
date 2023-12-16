<template>
    <arco-layout-footer style="height: 100px; padding: 15px; background: #f5f5f5">
            <div style="float: left; position: relative; bottom: 6px">
                <h2>仙舟通鉴  <arco-tooltip content="本站已支持 IPv6 网络访问"><a href="https://ipw.cn/ipv6webcheck/?site=editor.seelevollerei.online" target='_blank'><img style='display:inline-block;vertical-align:middle' src="https://static.ipw.cn/icon/ipv6-s1.svg"></a></arco-tooltip></h2>
                <small>©{{ new Date().getFullYear() }} Crab Studio. All Rights Reserved.</small><br/>
                <small>本站所有内容均以 CC-BY-NC-NA 协议授权。</small>
            </div>
            <div style="float: right; margin-left: 20px; text-align: right;">
                <h3 style="margin: 0; margin-bottom: 5px;">我们的服务</h3>
                <arco-link style="display: block;" target="_blank" href="https://seelevollerei.online"><RightOutlined style="margin-right: 10px;"/>仙舟通鉴</arco-link>
                <arco-link style="display: block;" target="_blank" href="https://editor.seelevollerei.online"><RightOutlined style="margin-right: 10px;"/>Wiki 内容编辑器</arco-link>
                <arco-link style="display: block;" target="_blank" href="https://help.seelevollerei.online"><RightOutlined style="margin-right: 10px;"/>帮助中心</arco-link>
            </div>
            <div style="float: right; margin-left: 20px; text-align: right">
                <h3 style="margin: 0; margin-bottom: 5px;">关注官方社媒</h3>
                <arco-link style="display: block;" target="_blank" href="https://space.bilibili.com/3537119408556068?spm_id_from=333.999.0.0"><RightOutlined style="margin-right: 10px;"/>哔哩哔哩</arco-link>
                <arco-link style="display: block;" target="_blank" href="https://pd.qq.com/s/9p6w252k1"><RightOutlined style="margin-right: 10px;"/>QQ频道</arco-link>
            </div>
            <div style="float: right; margin-left: 20px; text-align: right">
                <h3 style="margin: 0; margin-bottom: 5px;">联系我们</h3>
                <arco-link href="mailto:heycrab@petalmail.com"><svg style="margin-right: 10px;" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#080341"/>
</svg>heycrab@petalmail.com</arco-link>
            </div>
        </arco-layout-footer>
</template>