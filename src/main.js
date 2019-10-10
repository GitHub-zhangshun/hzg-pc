// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style/border.css'
import '@/assets/style/reset.css'
import '@/assets/style/css.css'
import {request} from '@/libs/request'
import { getToken } from '@/libs/auth'
import { Loading } from 'element-ui';
import 'babel-polyfill'
import store from './store/index'

//引入图片查看器
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
})

Vue.config.productionTip = false
Vue.prototype.$axios = request;
Vue.prototype.$loading = Loading.service

//全局字典
if(!sessionStorage.getItem('dictionaryListByAll')){
    request({url:'/v1/cms/core/dictionaryListByAll'})
    .then(data=>{
        sessionStorage.setItem('dictionaryListByAll',JSON.stringify(data.result))
    })
}
//平台配置信息
if(!sessionStorage.getItem('platformConfig')){
    request({url:'/v1/cms/op/platformConfig'})
    .then(data=>{
        sessionStorage.setItem('platformConfig',JSON.stringify(data.result))
    })
}

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    let title = to.query.title || to.meta.title || '和掌柜'
    window.document.title = title;
    // 验证token，若没有跳到登陆页面，有就继续操作
    if(to.meta.requireAuth){
        if(getToken()){
            next()
        }else{
            next({path:'/verification_code_login',query:{redirect:to.fullPath}})
        }
    }
    window.scrollTo(0,0)
    next()
})

/* eslint-disable no-new */
new Vue({
el: '#app',
router,
store,
components: { App },
template: '<App/>',
})
