// @ts-nocheck
import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../pages/index.vue'
import HomeView from '../pages/home.vue'
import AppView from '../pages/app.vue'
import LoginView from '../pages/login.vue'
import RegisterView from '../pages/register.vue'
import UserView from '../pages/user.vue'
import EditorView from '../pages/editor.vue'
import AdminView from '../pages/admin.vue'

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
        path: '/admin/editor/:id',
        name: 'admin editor',
        component: AdminEditorView
    }
]
  
const router = createRouter({
    history: createWebHistory(),
    routes
})
  
export default router