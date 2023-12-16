// @ts-nocheck
import FourOFour from '../pages/404.vue'

import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../pages/index.vue'
import AppView from '../pages/app.vue'

// middleware
import OAuthCallback from '../pages/third_party/oauth.vue'
import ThirdPartyCallback from '../pages/third_party/login.vue'

import AdminNextView from '../pages/admin_v2.vue'
import HomeNextView from '../pages/home_next.vue'
import EditorNextView from '../pages/editor_next.vue'
import UserNextView from '../pages/user_next.vue'
import ShareView from '../pages/share.vue'
import EditorV3View from '../pages/editor_v3.vue'

import AdminHomeV2View from '../pages/admin_v2/home.vue'
import AdminViewV2View from '../pages/admin_v2/view.vue'
import AdminDownloadV2View from '../pages/admin_v2/download.vue'
import AdminDBV2View from '../pages/admin_v2/db.vue'
import AdminUserV2View from '../pages/admin_v2/user.vue'
import AdminEditorV2View from '../pages/admin_v2/editor.vue'

// 分享
import Share1View from '../pages/share/share.vue'

// 新的登录页面
import LoginV3View from '../pages/login/login_v3.vue'
import RegisterV3View from '../pages/login/register_v3.vue'
import UniLoginPortal from '../pages/login/unilogin_portal.vue'

const routes = [
    {
        path: '/',
        name: 'index',
        component: IndexView
    },
    {
        path: '/app',
        name: 'download_app',
        component: AppView
    },
    {
        path: '/login',
        name: 'login',
        redirect: { name: 'loginV3' }
    },
    {
        path: '/uniLogin',
        name: 'uniLogin',
        component: UniLoginPortal
    },
    {
        path: '/register',
        name: 'register',
        redirect: { name: 'registerV3' }
    },
    {
        path: '/login_v3',
        name: 'loginV3',
        component: LoginV3View
    },
    {
        path: '/register_v3',
        name: 'registerV3',
        component: RegisterV3View
    },
    {
        path: '/home_v2',
        name: 'home v2',
        component: HomeNextView
    },
    {
        path: '/user_v2',
        name: 'user v2',
        component: UserNextView
    },
    {
        path: '/myshare',
        name: 'myShare',
        component: ShareView
    },
    {
        path: '/editor_v2/:id',
        name: 'editor v2',
        component: EditorNextView
    },
    {
        path: '/editor_v3/:id',
        name: 'editor v3',
        component: EditorV3View
    },
    {
        path: '/admin_v2',
        name: 'admin_v2',
        component: AdminNextView,
        children: [
            {
                path: '',
                component: AdminHomeV2View
            },
            {
                path: 'view',
                component: AdminViewV2View
            },
            {
                path: 'user',
                component: AdminUserV2View
            },
            {
                path: 'db',
                component: AdminDBV2View
            },
            {
                path: 'download',
                component: AdminDownloadV2View
            }
        ]
    },
    {
        path: '/admin_v2/editor/:id',
        name: 'admin v2 editor',
        component: AdminEditorV2View
    },
    {
        path: '/oauth_callback',
        name: 'OAuth Callback',
        component: OAuthCallback
    },
    {
        path: '/login_callback',
        name: 'Login Callback',
        component: ThirdPartyCallback
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: FourOFour
    },
    {
        path: '/share/:id',
        name: 'share',
        component: Share1View
    }
]
  
const router = createRouter({
    history: createWebHistory(),
    routes
})
  
export default router