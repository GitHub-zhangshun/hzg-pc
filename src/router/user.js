//登录 注册 找回密码
let userLogin = [
        //账号密码登录
        {
            path: 'login',
            name:'login',
            component: (resolve) => require(['@/views/login_section/login.vue'], resolve),
            meta:{
                title:'账号密码登录'
            }
        },
        //验证码登录
        {
            path: 'verification_code_login',
            name:'verification_code_login',
            component: (resolve) => require(['@/views/login_section/verification_code_login.vue'], resolve),
            meta:{
                title:'验证码登录'
            }
        },
        //验证码登录
        {
            path: 'register',
            name:'register',
            component: (resolve) => require(['@/views/login_section/register.vue'], resolve),
            meta:{
                title:'验证码登录'
            }
        },
        //忘记密码
        {
            path: 'forget_pwd',
            name:'forget_pwd',
            component: (resolve) => require(['@/views/login_section/forget_pwd.vue'], resolve),
            meta:{
                title:'忘记密码'
            }
        },
    ]

export default userLogin