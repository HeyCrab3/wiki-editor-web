import { createApp } from 'vue'
import * as Sentry from '@sentry/vue'
import Antd from 'ant-design-vue';
import App from './App.vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import router from './router';
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import { createPinia } from 'pinia';
import "@arco-design/web-vue/es/message/style/css.js"
import "@arco-design/web-vue/es/notification/style/css.js"
import "@arco-design/web-vue/es/modal/style/css.js"
import "@arco-design/web-vue/es/icon/index.d.ts"
import { message } from 'ant-design-vue'
// highlightjs
import hljs from 'highlight.js';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from 'firebase/performance'
import { useUserStore } from './store/user';

// 路由守卫
import Cookies from 'js-cookie'

const firebaseConfig = {
  apiKey: "AIzaSyDvp3Qm6UjsOQK35bdGkgXhGDkOz6HeHZk",
  authDomain: "editor-web-88d70.firebaseapp.com",
  projectId: "editor-web-88d70",
  storageBucket: "editor-web-88d70.appspot.com",
  messagingSenderId: "303514522323",
  appId: "1:303514522323:web:1c52a22c57316f70e0fa26",
  measurementId: "G-NT6408207W"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const perf = getPerformance(firebaseApp)


const app = createApp(App);

const whileList = ['/', '/app', '/share', '/editor_v3', '/login_v3', '/register_v3', '/forget_password', '/login', '/register', '/uniLogin', '/u', '/404']
 
router.beforeEach((to, from, next) => {
    let token = Cookies.get('session')
    //白名单 有值 或者登陆过存储了token信息可以跳转 否则就去登录页面
    if (whileList.includes(to.path) || token || to.path.includes('/u')) {
        next()
    } else {
        message.error('请先登录')
        next({
            path:'/login_v3',
            query: {
                redirect_to: to.fullPath
            }
        })
    }
})

Sentry.init({
  app,
  dsn: "https://0962f6ffafc7c7368e72609bdcd228b0@o4505714426576896.ingest.sentry.io/4505809296752640",
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
    new Sentry.Replay(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

VMdEditor.Codemirror = Codemirror;
VMdEditor.use(vuepressTheme, {
  Hljs: hljs,
});

VMdPreview.use(vuepressTheme, {
  Hljs: hljs,
});

app.use(Antd)
app.use(router);
app.use(ArcoVueIcon);
app.use(VMdEditor);
app.use(createPinia(useUserStore))
app.use(VMdPreview)

window.removeLoadingPage()

app.mount('#app');