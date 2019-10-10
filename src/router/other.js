const other = [
    //账号密码登录
    {
        path: 'login',
        component: (resolve) => require(['@/views/login_section/login.vue'], resolve),
        meta:{
            title:'账号密码登录'
        }
    },
    //验证码登录
    {
        path: 'verification_code_login',
        component: (resolve) => require(['@/views/login_section/verification_code_login.vue'], resolve),
        meta:{
            title:'验证码登录'
        }
    },
    //验证码登录
    {
        path: 'register',
        component: (resolve) => require(['@/views/login_section/register.vue'], resolve),
        meta:{
            title:'验证码登录'
        }
    },
    //忘记密码
    {
        path: 'forget_pwd',
        component: (resolve) => require(['@/views/login_section/forget_pwd.vue'], resolve),
    },
    //安全保障
    {
        path: 'safety',
        component: (resolve) => require(['@/views/other/safety.vue'], resolve),
        meta:{
            title:'安全保障'
        }
    },
    //公告列表
    {
        path: 'noticeList',
        component: (resolve) => require(['@/views/other/noticeList.vue'], resolve),
        meta:{
            title:'公告列表'
        }
    },
    //公告详情
    {
        path: 'noticeDetail',
        component: (resolve) => require(['@/views/other/noticeDetail.vue'], resolve),
        meta:{
            title:'公告详情'
        }
    },
    //行业动态列表
    {
        path: 'trandsList',
        component: (resolve) => require(['@/views/other/trandsList.vue'], resolve),
        meta:{
            title:'行业动态列表'
        }
    },
    //行业动态详情
    {
        path: 'trendsDetail',
        component: (resolve) => require(['@/views/other/trendsDetail.vue'], resolve),
        meta:{
            title:'行业动态详情'
        }
    },
    //风险测评
    {
        path: 'niskEvaluation',
        component: (resolve) => require(['@/views/user/riskEvaluation.vue'], resolve),
        meta:{
            title:'风险测评',
            requireAuth: true,
        }
    },
    //风险测评结果
    {
        path: 'niskEvaluationResult',
        component: (resolve) => require(['@/views/user/niskEvaluationResult.vue'], resolve),
        meta:{
            title:'风险测评结果',
            requireAuth: true,
        }
    },
    //各种协议
    {
        path: 'contract',
        component: (resolve) => require(['@/views/personal/contract.vue'], resolve),
    },
    //晋城银行协议
    {
        path: 'jcAgreement',
        component: (resolve) => require(['@/components/Information_disclosure/jcAgreement.vue'], resolve),
        meta:{
            title:'晋城银行协议',
        }
    }, 
    //和掌柜协议
    {
        path: 'hzgAgreement',
        component: (resolve) => require(['@/components/Information_disclosure/hzgAgreement.vue'], resolve),
        meta:{
            title:'和掌柜协议',
        }
    },     
    //福利中心内页
    {
        path: 'welfarecenter',
        component: (resolve) => require(['@/views/personal/WelfareCenter.vue'], resolve),
        meta:{
            title:'福利中心详情',
        }
    },  
    //出借结果页
    {
        path: 'lendresult',
        component: (resolve) => require(['@/components/product/lendResult.vue'], resolve),
    }
]
export default other