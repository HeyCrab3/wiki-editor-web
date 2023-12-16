// GitHub @HeyCrab3 / Bilibili @是螃蟹aaaaa
'use strict'
window.onload = function(){
    createLoadingMask()
}

function createLoadingMask(){
    var loading = document.createElement('div')
    loading.className = 'cui-loading-mask'
    loading.id = 'ssoLogin-' + Math.random().toString(36).substr(2)
    window.loaderID = loading.id
    loading.innerHTML = `<div class="cui-loading-box"><svg focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg><br/><small><img src="https://editor.seelevollerei.online/light.png"/>仙舟通鉴统一登录</small></div> `
    var style = document.createElement('style')
    style.innerHTML = `
    .cui-loading-mask {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: none;
        backdrop-filter: blur(2px);
        transition: 0.5s;
        text-align: center;
        vertical-align: middle;
    }
    .cui-loading-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, .7);
    }
    .cui-loading-box svg {
        width: 35px;
        height: 35px;
        color: #fff;
        margin-top: 15px;
        animation: rotate 1s linear infinite;
    }
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg)
        }
    }
    .cui-loading-box small {
        display: inline-block;
        width: 300px;
        text-align: left;
        margin-top: 10px;
        font-size: 12px;
        color: #fff;
    }
    .cui-loading-box small img {
        width: 12px;
        height: 12px;
        vertical-align: middle;
    }
    `
    document.head.appendChild(style)
    document.body.appendChild(loading)
}

function initSSOLogin(background, themeColor, fullscreen, type, callback){
    if (window.loaderID == undefined) {
        console.error('SSOLogin Error: 请在页面加载完成后调用 initSSOLogin() 方法')
        return
    }
    var loading = document.getElementById(window.loaderID)
    loading.style.display = 'block'
    var iframe = document.createElement('iframe')
    iframe.src = `https://editor.seelevollerei.online/uniLogin?background=${background}&themeColor=${themeColor}&fullscreen=${fullscreen}&type=${type}`
    // 这一块应该做具体区分：当fullscreen参数是true时 这个iframe的宽度应该是页面宽度的90%，高度是页面高度的90%
    // 当fullscreen参数是false时 这个iframe的宽度应该是300px，高度是400px
    // 他也应该有个遮罩，并且遮罩左上角有个关闭的svg icon (<svg focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>)
    var mask = document.createElement('div')
    mask.className = 'cui-loading-mask'
    mask.id = 'ssoLogin-' + Math.random().toString(36).substr(2)
    window.loaderID = mask.id
    iframe.style.overflow = 'hidden'
    iframe.style.background = '#FFF'
    iframe.frameBorder = 'none'
    iframe.style.borderRadius = '5px'
    mask.innerHTML = `<div style="position: fixed; top: 15px; left: 15px;"><button style="border: 0.1px solid #FFF; background: none; padding: 15px; box-shadow: 0 0 10px rgba(255,255,255,0.1); border-radius: 10000px" onclick="closeLoginDialog()"><svg style="fill: #FFF; font-size: 0.7rem" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></button></div>`
    if (fullscreen) {
        iframe.style.width = '90%'
        iframe.style.height = '90%'
        iframe.style.display = 'block'
        iframe.style.margin = 'auto'
        iframe.style.marginTop = '30px;'
    }else{
        iframe.style.width = '550px'
        iframe.style.height = '700px'
        iframe.style.margin = 'auto'
        iframe.style.marginTop = '10%'
    }
    mask.appendChild(iframe)
    document.body.appendChild(mask)
    iframe.onload = function(){
        loading.style.display = 'none'
        mask.style.display = 'flex'
    }
    // 监听来自 iframe 的消息
    window.addEventListener('message', (event) => {
        if (event.data.type === 'login') {
            const token = event.data.token;
            callback(token);
        }
    });
}

function closeLoginDialog(){
    var mask = document.getElementById(window.loaderID)
    mask.remove()
    createLoadingMask()
}