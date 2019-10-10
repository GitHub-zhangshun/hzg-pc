const information = [
    {
        path: 'aboutUS',
        component: (resolve) => require(['@/components/Information_disclosure/aboutUS.vue'], resolve),
        meta:{
            title:'关于我们'
        }
    },
    {
        path: 'archivalInfo',
        component: (resolve) => require(['@/components/Information_disclosure/archivalInfo.vue'], resolve),
        meta:{
            title:'备案信息'
        }
    },
    {
        path: 'bankInfo',
        component: (resolve) => require(['@/components/Information_disclosure/bankInfo.vue'], resolve),
        meta:{
            title:'银行存管'
        }
    },
    {
        path: 'companyInfo',
        component: (resolve) => require(['@/components/Information_disclosure/companyInfo.vue'], resolve),
        meta:{
            title:'公司概况'
        }
    },
    {
        path: 'expReport',
        component: (resolve) => require(['@/components/Information_disclosure/expReport.vue'], resolve),
        meta:{
            title:'审查报告'
        }
    },
    {
        path: 'lawInfo',
        component: (resolve) => require(['@/components/Information_disclosure/lawInfo.vue'], resolve),
        meta:{
            title:'法律法规'
        }
    },
    {
        path: 'operationData',
        component: (resolve) => require(['@/components/Information_disclosure/operationData.vue'], resolve),
        meta:{
            title:'运营数据'
        }
    },
    {
        path: 'riskContrl',
        component: (resolve) => require(['@/components/Information_disclosure/riskContrl.vue'], resolve),
        meta:{
            title:'风险管理'
        }
    },
    {
        path: 'riskTips',
        component: (resolve) => require(['@/components/Information_disclosure/riskTips.vue'], resolve),
        meta:{
            title:'风险提示'
        }
    },
    {
        path: 'statement',
        component: (resolve) => require(['@/components/Information_disclosure/statement.vue'], resolve),
        meta:{
            title:'信披声明'
        }
    },
]
export default information