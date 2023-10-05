import { createApp } from 'vue'
import * as Sentry from '@sentry/vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import router from './router';
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import { createPinia } from 'pinia';

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

app.use(ArcoVue);
app.use(router);
app.use(ArcoVueIcon);
app.use(VMdEditor);
app.use(createPinia(useUserStore))
app.mount('#app');