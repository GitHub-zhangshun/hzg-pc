<template>
    <div class="header">
        <div class="top_border">
            <div class="top">
                <div class="left text_size_12">
                    <i class="icon iconfont icon-dianhua color_gray"></i>
                    <span class="color_gray">服务热线：</span>
                    <p class="color_black">400-020-0178</p>
                    <span class="color_gray">（时间：9：00~18：00）</span>
                </div>
                <div class="right text_size_12">
                    <button class="color_gray" v-if="!login_show" @click="logout">安全退出&emsp;|</button>
                    <button class="color_gray" @click="$router.push('/personal/help')">&emsp;帮助中心&emsp;|&emsp;</button>
                    <el-tooltip class="item" effect="light" placement="bottom">
                        <div slot="content" class="public_number">
                            <img src="@/assets/images/04ed382ccbe2b2a93be0bf95cb523bd.png" alt="">
                        </div>
                        <button class="color_gray" style="display: flex;align-items: center;">
                            <i class="icon iconfont icon-weixin-copy"></i>&nbsp;关注我们&emsp;
                        </button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="light" placement="bottom">
                        <div slot="content" class="public_number">
                          <img src="@/assets/images/1570562746.png" alt="">
                        </div>
                        <button>
                            <i class="icon iconfont icon-shouji"></i>手机APP下载
                        </button>
                    </el-tooltip>
                    
                </div>
            </div>
        </div>
        <div class="big_div">
          <div class="bottom_border" :class="{isFixed:topFixed==true}">
            <div class="bottom">
                <div class="left">
                    <img src="@/assets/images/home_img/logo.png" alt="logo">
                </div>
                <div class="right">
                    <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#ff4e3c" background-color="transparent" text-color="#696666">
                        <el-menu-item index="/index">首页</el-menu-item>
                        <el-menu-item index="/product">我要出借</el-menu-item>
                        <el-menu-item index="/Information">信息披露</el-menu-item>
                        <el-menu-item index="/safety">监督管理</el-menu-item>
                    </el-menu>
                    <div class="nologin" v-if="login_show">
                        <i class="icon iconfont icon-weidenglutouxiang color_gray"></i>
                        <span class="color_gray" style="cursor: pointer;" @click="$router.push('/verification_code_login')">登录</span>
                        <span class="color_gray">&nbsp;/&nbsp;</span>
                        <span class="color_gray" style="cursor: pointer;" @click="$router.push('/register')">注册</span>
                    </div>
                    <div class="login" v-else @click="myAccount">
                        <img :src="headImg" alt="头像">
                        <span class="text_size_16">{{nickName}}</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
        
    </div>
</template>

<script>
import {MenuItem,Menu} from 'element-ui';
import { getToken,deleteToken } from '@/libs/auth.js'
import { MessageBox,Tooltip } from 'element-ui';
    export default {
        components:{
            'el-menu':Menu,
            'el-menu-item':MenuItem,
            'el-tooltip':Tooltip ,
        },
        data(){
            return{         
                visible: true,       
                activeIndex: '',
                //登陆的view的显示隐藏切换  true:未登录  false:登录
                login_show:true,
                headImg:'',
                nickName:'',
                size: 128,
                bgColor: '#fff',
                fgColor: '#000',
                topFixed:false,  //顶部固定   
            }
        },
        methods:{
            //退出登录
            logout(){
                 MessageBox.confirm('确定要退出登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=>{
                    deleteToken()
                    localStorage.clear()
                    sessionStorage.clear()
                    this.login_show = true
                    window.location.href = '/login'
                    // this.$router.push('/login')
                }).catch(()=>{

                })                
            },
            myAccount(){
                this.$router.push('/personal')
            },
            investorCurrent(){
                this.$axios({url:'/v1/uc/user/investorCurrent'})
                .then(data=>{
                    if(data.code==0){
                        localStorage.userInfo = JSON.stringify(data.result)
                        this.headImg = data.result.user && data.result.user.headImg?data.result.user.headImg:require('@/assets/images/personal_img/icon_defaulticon.png')
                        this.nickName = data.result.user && data.result.user.nickName?data.result.user.nickName:data.result.user.phone
                    }                    
                })
            },
            //监听滚动事件
            handleScroll () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                console.log(scrollTop)
                if (scrollTop >= 40) {
                    this.topFixed = true
                } else {
                    this.topFixed = false
                }
            },         
        },
        created(){
            // if(localStorage.userInfo && getToken()){
            //     this.headImg = localStorage.userInfo && JSON.parse(localStorage.userInfo).user.headImg?JSON.parse(localStorage.userInfo).user.headImg:require('@/assets/images/personal_img/icon_defaulticon.png')
            //     this.nickName = localStorage.userInfo &&  JSON.parse(localStorage.userInfo).user.nickName?JSON.parse(localStorage.userInfo).user.nickName:JSON.parse(localStorage.userInfo).user.phone
            // }
            // if(getToken() && !localStorage.userInfo){
            //     this.investorCurrent()
            // }

            if(getToken()){
                this.investorCurrent()
            }

            let a = (this.$route.path).split('/')
            switch (a[1]){
                case 'Information':
                this.activeIndex = '/Information'
                break;
                case 'index':
                this.activeIndex = '/index'
                break;
                case 'product':
                this.activeIndex = '/product'
                break;
                case 'safety':
                this.activeIndex = '/safety'
                break;
            }
            if(getToken()){                
                this.login_show = false          
            }else{
                this.login_show = true
            }
        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll)
        }
    }
</script>

<style scoped lang="less">
.header{
    background: #fff;
    .top_border{       
        border-bottom: 1px solid #E8E8E8;
        .top{
            line-height: 40px;
            margin: 0 auto;
            width: 1200px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left{
                display: flex;
                i{
                    padding-right: 8px;
                }
            }
            .right{
                display: flex;
                button{
                    background: transparent;
                    cursor: pointer;
                }
                button:last-child{
                    display: flex;
                    align-items: center;
                    border: 1px solid #ff4e30;
                    border-radius:5px;  
                    padding:0 5px;               
                    color:#ff4e30;
                }
                /deep/.public_number{
                    img{
                        width: 150px;
                    }
                }
                // &>span{
                //     display: inline-block;
                //     width: 50px;
                //     // width: 
                //     &>div{
                //         button{
                //             display: flex;
                //             align-items: center;
                //             border: 1px solid #ff4e30;
                //             border-radius:5px;  
                //             padding:0 5px;               
                //             color:#ff4e30;
                //         }
                //     }
                    
                // }
            }
        }
    }
    .big_div{
      min-height: 80px;
    }
    .bottom_border{
        border-bottom: 1px solid #E8E8E8;
        line-height: 80px;
        &.isFixed{
            width: 100%;
            background: #fff;
            position: fixed;
            top: 0;
            z-index: 50;
        }
        .bottom{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .right{
                display: flex;
                align-items: center;
                .el-menu-demo{
                    border: none;
                    .el-menu-item{
                        background: transparent !important;
                        font-size: 16px;
                        padding: 0;
                        margin: 0 20px;
                    }
                }
                .nologin{
                    margin-left: 87px;
                    display: flex;
                    align-items: center;
                    i{
                        margin-right: 24px;
                        font-size: 22px;
                    }
                }
                .login{
                    padding-left: 67px;
                    cursor: pointer;
                    img{
                        margin-right: 10px;
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}
</style>