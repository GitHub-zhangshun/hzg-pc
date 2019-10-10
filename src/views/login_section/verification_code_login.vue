<template>
    <div class="verification_login">
        <img src="@/assets/images/login_register_forget_img/bg.jpg" alt="背景">
        <div class="components">
            <div class="verification_login_section">
                <header>
                    <h1>欢迎回来</h1>
                    <h3 class="text_size_14 color_red" style="cursor: pointer;" @click="$router.push('/register')">注册</h3>
                </header>
                <div class="name">
                    <input type="text" placeholder="手机号" class="text_size_14" v-model="formData.phone">
                </div>
                <div class="code">
                    <input type="text" placeholder="请输入验证码" class="text_size_14" v-model="formData.code">
                    <button :class="code_disabled?'color_gray':'color_red'" @click="code" :disabled='code_disabled'>{{word}}</button>
                </div>
                <div class="tips">
                    <span>{{message}}</span>
                    <forgetText></forgetText>
                </div>              
                <el-button type="primary" :loading="loading" :class="disabled?'text_size_16 disabled_gray':'text_size_16 color_white disabled_hover'" :disabled="disabled" @click="submit">登录</el-button>
                <button class="verification_code" @click="goLogin"><span>密码登录</span><i class="icon iconfont icon-jiantou"></i></button>
            </div>            
        </div>       
    </div>
</template>

<script>
import { Button,MessageBox } from 'element-ui';
import forgetText from '@/components/other_components/forget_text.vue'
import {checkPhone} from '@/libs/publicFun'
import { setToken } from '@/libs/auth.js'
    export default {
         components:{
            forgetText,
            'el-button':Button
        },
        data(){
            return{
                typeClass:true,
                disabled:true,
                word:'获取验证码',
                code_disabled:false,
                message:'',
                formData:{
                    phone:'',
                    code:''
                },
                loading:false
            }
        },
        watch:{
            formData:{
                deep:true,
                handler(){
                    this.message = ''
                    if(this.formData.phone!=''&&this.formData.code!=''){
                        this.disabled = false;
                    }else{
                        this.disabled = true
                    }
                }                
            }
        },
        mounted(){
            if(this.$route.query.redirect){
                            console.log(1)
                        }
        },
        methods:{
            goLogin(){
                if(this.$route.query.redirect){
                    this.$router.push({path:'/login',query:{redirect:this.$route.query.redirect}})
                }else{
                    this.$router.push('/login')
                }
                
            },
            typeClick(){
                this.typeClass = !this.typeClass
            },
            code(){
                if(!checkPhone(this.formData.phone)){
                    this.message = '手机号格式不正确'
                    return
                }
                this.$axios({
                    url:'/v1/cms/core/smsCodeSend',
                    data:{
                        phone:this.formData.phone,
                        simplify:'login_sms_code',
                        existUser:true
                    }
                }).then(data=>{
                    if(data.code!=0){
                        this.message = data.message
                    }else{
                        let time = 60,that = this
                        var sendTimer = setInterval(function(){
                            that.code_disabled = true;
                            time--;
                            that.word = time+'S';
                            if(time < 0){
                                that.code_disabled = false;
                                clearInterval(sendTimer);
                                that.word = "获取验证码";
                            }
                        },1000)
                    }
                })
                
            },
            submit(){
                this.loading = true
                this.$axios({
                    url:'/v1/uc/user/investorSmsLogin',
                    data:{
                        phone:this.formData.phone,
                        code:this.formData.code,
                        simplify:'login_sms_code'
                    }
                }).then(data=>{
                    this.loading = false
                    if(data.code!=0){
                        this.message = data.message
                    }else{
                      setToken(data.result.token)
                      window.localStorage.setItem('userInfo', JSON.stringify(data.result))
                      if(data.result.attachInfo.isInitPassword){
                        this.$store.commit('loginPwd',true)
                      }
                      if (this.$route.query.redirect) {
                        this.$router.push(this.$route.query.redirect)
                      } else {
                        this.$router.push('/')
                      }


                        // setToken(data.result.token)
                        // window.localStorage.setItem('userInfo',JSON.stringify(data.result))
                        // if(data.result.attachInfo.isInitPassword){
                        //      MessageBox.confirm('尊敬的客官：您好！系统识别到您已注册和掌柜，请修改登录密码，进行后续操作。', '温馨提示', {
                        //         confirmButtonText: '确定',
                        //         cancelButtonText: '取消',
                        //     }).then(()=>{
                        //         this.$router.push({path:'/forget_pwd',query:{'isLogin':true}})
                        //     }).catch(()=>{
                        //         if(this.$route.query.redirect){
                        //             this.$router.push(this.$route.query.redirect)
                        //         }else{
                        //             this.$router.push('/') 
                        //         } 
                        //     }) 
                        // }                                                     
                    }                    
                })
            }
        }
    }
</script>

<style scoped lang='less'>
.verification_login{
    position: relative;
    
    img{
        height: 100%;
    }
    &>.components{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 1200px;
        display: flex;
        flex-direction:row-reverse;
        .verification_login_section{
            width: 360px;
            background: rgba(249,247,242,.9);
            padding: 34px 30px 56px;
            border-radius: 10px;
            header{
                padding-bottom: 42px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                h1{
                    font-size: 26px;
                    color: #32363c;
                }
            }
            .name{    
                background: #fff;
                height: 44px;
                border-radius: 5px;
                padding-left:20px; 
                border: 1px solid #e2e2e2;    
                margin-bottom: 14px;
                input{
                    width: 98%;
                    height: 100%;
                }
            }
            .code{
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;
                input{
                    padding-left:20px;
                    width: 224px;
                    height: 100%;
                    border: 1px solid #e2e2e2;
                    border-radius: 5px;
                }
                button{
                    width: 98px;
                    border-radius: 5px;
                    border: 1px solid #e2e2e2;
                    background: #fff;
                    height: 100%;
                    cursor: pointer;
                }
            }
            .tips{
                display: flex;
                justify-content: space-between;
                color: #ff4e30;
                &>p{
                    cursor: pointer;
                }
            }
            
            &>button{
                width: 100%;
                height: 46px;
                border: 1px solid #e2e2e2;
                background: #ff4e30;
                border-radius: 5px;
                margin-top: 28px;
                cursor: pointer;
                transition:  all .5s;
            }
            .disabled_gray{
                background: #c4c7c8;
            }
            .disabled_hover:hover{
                background: #f78989;
            }
            .verification_code{
                display: flex;
                margin: 36px auto 0;
                align-items: center;
                width: 196px;
                height: 48px;
                border-radius: 48px;
                background: transparent;
                border-color: #696666;
                padding: 0 14px;
                span{
                    flex: 1;
                }
            }
        }
    }
}
</style>