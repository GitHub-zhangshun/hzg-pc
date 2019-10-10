//个人中心
const personalRouter =[
    {
      path: 'myaccount',
      component: (resolve) => require(['@/views/personal/myAccount.vue'], resolve),
      meta:{
        title:'我的账户',
        requireAuth: true,
      }      
    },
    {
      path: 'charge',
      component: (resolve) => require(['@/views/personal/charge.vue'], resolve),
      meta:{
        title:'充值',
        requireAuth: true,
      }
    },
    {
      path: 'takeout',
      component: (resolve) => require(['@/views/personal/takeOut.vue'], resolve),
      meta:{
        title:'提现',
        requireAuth: true,
      }
    },
    {
      path: 'lendrecord',
      component: (resolve) => require(['@/views/personal/lendRecord.vue'], resolve),
      meta:{
        title:'我的出借',
        requireAuth: true,
      }
    },
    {
      path: 'lenddetail',
      component: (resolve) => require(['@/views/personal/lendDetail.vue'], resolve),
      meta:{
        title:'投资详情',
        requireAuth: true,
      }
    },
    {
      path: 'moneyrecord',
      component: (resolve) => require(['@/views/personal/moneyRecord.vue'], resolve),
      meta:{
        title:'资金记录',
        requireAuth: true,
      }
    },
    {
      path: 'returned',
      component: (resolve) => require(['@/views/personal/returned.vue'], resolve),
      meta:{
        title:'我的回款',
        requireAuth: true,
      }
    },
    {
      path: 'welfare',
      component: (resolve) => require(['@/views/personal/Welfare.vue'], resolve),
      meta:{
        title:'福利中心',
        requireAuth: true,
      }
    },
    {
      path: 'coupon',
      component: (resolve) => require(['@/views/personal/Coupon.vue'], resolve),
      meta:{
        title:'优惠券',
        requireAuth: true,
      }
    },
    {
      path: 'riskevaluation',
      component: (resolve) => require(['@/views/personal/riskEvaluation.vue'], resolve),
      meta:{
        title:'风险测评',
        requireAuth: true,
      }
    },
    {
      path: 'help',
      component: (resolve) => require(['@/views/personal/help.vue'], resolve),
      meta:{
        title:'帮助中心'
      }
    },
    {
      path: 'question',
      component: (resolve) => require(['@/views/personal/question.vue'], resolve),
      meta:{
        title:'问题详情'
      }
    },
    {
      path: 'setting',
      component: (resolve) => require(['@/views/personal/setting.vue'], resolve),
      meta:{
        title:'账户设置',
        requireAuth: true,
      }
    },
    {
      path: 'changepwd',
      component: (resolve) => require(['@/components/personal/changepassword.vue'], resolve),
      meta:{
        title:'修改登录密码',
        requireAuth: true,
      }
    },
    {
      path: 'success',
      component: (resolve) => require(['@/components/personal/successPage.vue'], resolve),
      meta:{
        requireAuth: true,
      }
    },
    {
      path: 'openaccount',
      component: (resolve) => require(['@/views/personal/openAccount.vue'], resolve),
      meta:{
        title:'开通账户',
        requireAuth: true,
      }
    },    
    {
      path: 'openaccountstep1',
      component: (resolve) => require(['@/views/personal/openAccountStep1.vue'], resolve),
      meta:{
        title:'开通账户',
        requireAuth: true,
      }
    },
  ]


export default personalRouter