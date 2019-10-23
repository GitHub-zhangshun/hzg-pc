const product = [
    //产品列表
    {
        path: '/',
        component: (resolve) => require(['@/views/product/product.vue'], resolve),
        meta:{
            title:'产品列表'
        }
        
    },
    //产品详情
    {
        path: 'productInfo',
        component: (resolve) => require(['@/views/product/productInfo.vue'], resolve),
        meta:{
            title:'产品详情',
            // requireAuth: true,
        }
    },
    //产品详情
    {
        path: 'anticipated',
        component: (resolve) => require(['@/views/product/anticipated.vue'], resolve),
        meta:{
            title:'参考年回报率计算方式',
        }
    },
]
export default product