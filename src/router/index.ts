// @ts-nocheck
import FourOFour from '../pages/404.vue'

import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../pages/index.vue'
import HomeView from '../pages/home.vue'
import AppView from '../pages/app.vue'
import LoginView from '../pages/login.vue'
import RegisterView from '../pages/register.vue'
import UserView from '../pages/user.vue'
import EditorView from '../pages/editor.vue'
import AdminView from '../pages/admin.vue'
import LoginV1View from '../pages/login_v1.vue'

// middleware
import OAuthCallback from '../pages/third_party/oauth.vue'

import AdminNextView from '../pages/admin_v2.vue'
import HomeNextView from '../pages/home_next.vue'
import EditorNextView from '../pages/editor_next.vue'
import UserNextView from '../pages/user_next.vue'
import ShareView from '../pages/share.vue'
import AdminHomeV2View from '../pages/admin_v2/home.vue'
import AdminViewV2View from '../pages/admin_v2/view.vue'
import AdminDownloadV2View from '../pages/admin_v2/download.vue'
import AdminDBV2View from '../pages/admin_v2/db.vue'
import AdminUserV2View from '../pages/admin_v2/user.vue'
import AdminEditorV2View from '../pages/admin_v2/editor.vue'

import AdminHomeView from '../pages/admin/home.vue'
import AdminViewView from '../pages/admin/view.vue'
import AdminDownloadView from '../pages/admin/download.vue'
import AdminDBView from '../pages/admin/db.vue'
import AdminUserView from '../pages/admin/user.vue'
import AdminEditorView from '../pages/admin/editor.vue'

const routes = [
    {
        path: '/',
        name: 'index',
        component: IndexView
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView
    },
    {
        path: '/app',
        name: 'download_app',
        component: AppView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/login_v1',
        name: 'login_v1',
        component: LoginV1View
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/user',
        name: 'user',
        component: UserView
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
        path: '/share',
        name: 'share',
        component: ShareView
    },
    {
        path: '/editor_v2/:id',
        name: 'editor v2',
        component: EditorNextView
    },
    {
        path: '/editor/:id',
        name: 'editor',
        component: EditorView
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminView,
        children: [
            {
                path: 'home',
                component: AdminHomeView
            },
            {
                path: 'view',
                component: AdminViewView
            },
            {
                path: 'user',
                component: AdminUserView
            },
            {
                path: 'db',
                component: AdminDBView
            },
            {
                path: 'download',
                component: AdminDownloadView
            }
        ]
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
        path: '/admin/editor/:id',
        name: 'admin editor',
        component: AdminEditorView
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
        path: '/:catchAll(.*)',
        name: '404',
        component: FourOFour
    }
]
  
const router = createRouter({
    history: createWebHistory(),
    routes
})
  
export default router