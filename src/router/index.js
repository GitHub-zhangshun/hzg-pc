import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import layout from '@/views/Layout.vue'
// 个人中心路由
import personalRouter from './my'
//产品路由
import product from './product'
//信息披露
import information from './information'
//其他路由
import other from './other'
//
export default new Router({
    mode:'history',
    routes: [        
        {
            path: '/',
            redirect: 'index',
            component: layout,
            children:[                
                //首页
                {
                    path: 'index',
                    component: (resolve) => require(['@/views/index.vue'], resolve),
                    meta:{
                        title:'首页'
                    }
                },
                //我要出借
                {
                    path: 'product',
                    component: (resolve) => require(['@/views/product/index.vue'], resolve),
                    children:[...product],
                    redirect:'/'
                },
                //信息披露
                {
                    path: 'Information',
                    name: 'Information',
                    component: (resolve) => require(['@/views/Information/Information.vue'], resolve),
                    children: [
                        ...information
                    ],
                    redirect: '/Information/aboutUS'
                },
                //个人中心
                {
                    path: 'personal',
                    name: 'personal',
                    component: (resolve) => require(['@/views/personal/personal.vue'], resolve),
                    redirect: '/personal/myaccount',
                    children: [
                        ...personalRouter
                    ]
                },                               
                ...other,
            ]
        },
        //中转页
        {
            path: '/redirect',
            component: (resolve) => require(['@/views/redirect.vue'], resolve),
            meta:{
                title:'跳转中',
                requireAuth: true,
            }
        },
        // 网络出错
        {
            path: '/page403',
            name: 'error',
            component: (resolve) => require(['@/views/page403.vue'], resolve),
            meta:{
                title:'网络出错了'
            }
        },
        // 404
        {
            path: '*',
            name: 'notfount',
            component: (resolve) => require(['@/views/page404.vue'], resolve),
            meta:{
                title:'页面未被找到'
            }
        }
    ]
})
