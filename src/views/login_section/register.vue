<template>
    <div class="register">
        <img src="@/assets/images/login_register_forget_img/bg.jpg" alt="背景">
        <div class="components">
            <div class="register_section">
                 <header>
                    <h1>欢迎您加入和掌柜！</h1>
                </header>
                <div class="name">
                    <input type="text" placeholder="注册手机号" class="text_size_14" v-model="formData.phone">
                </div>
                <div class="code">
                    <input type="text" placeholder="短信验证码" class="text_size_14" v-model="formData.code">
                    <button :class="code_disabled?'color_gray':'color_red'" @click="code" :disabled='code_disabled'>{{word}}</button>
                </div>
                <div class="pwd">
                    <input :type="this.typeClass?'password':'text'" placeholder="设置6-16字符的登录密码" class="text_size_14" v-model="formData.pwd">
                    <i :class="this.typeClass?'icon iconfont icon-biyan text_size_16':'icon iconfont icon-yanjing text_size_16'" @click="typeClick"></i>
                </div>
                <p class="text_size_14 text_left color_gray">注册代表你已阅读并同意<span class="color_black" @click="agreement">《用户协议》</span></p>
                <span class="tips text_left color_red text_size_14">{{message}}</span>
                <el-button type="primary" :loading="loading" :class="disabled?'text_size_16 disabled_gray':'text_size_16 color_white disabled_hover'" :disabled="disabled" @click="register">注册</el-button>
            </div>          
        </div>        
    </div>
</template>

<script>
import forgetText from '@/components/other_components/forget_text.vue'
import {checkPhone,checkPwd} from '@/libs/publicFun'
import { MessageBox,Button } from 'element-ui';
import md5 from 'blueimp-md5'
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
                formData:{
                    code: "",
                    correlationSimplify: "platform_register_correlation_pc",
                    phone: "",
                    pwd: "",
                    smsSimplify: "register_sms_code"
                },
                message:'',
                loading:false
            }
        },
        watch:{
            formData:{
                deep:true,
                handler(){
                    this.message = ''
                    if(this.formData.code==''|| this.formData.phone==''|| this.formData.pwd==''){
                        this.disabled = true
                    }else{
                        this.disabled = false
                    }
                }
            }
        },
        methods:{
            agreement(){
                sessionStorage.setItem('registerPhone', this.formData.phone)
                sessionStorage.setItem('registerCode', this.formData.code)
                this.$axios({url:'/v1/cms/op/platformConfig'})
                .then(data=>{
                    this.$router.push({path:'/contract',query:{id:JSON.parse(sessionStorage.getItem('platformConfig')).registerAgreementLink,type:'text',title:'用户协议'}})
                })                
            },           
            typeClick(){
                this.typeClass = !this.typeClass
            },
            //验证码发送
            code(){
                if(!checkPhone(this.formData.phone)){
                    this.message = '手机号格式不正确'
                    return
                }
                this.$axios({
                    url:'/v1/cms/core/smsCodeSend',
                    data:{
                        phone:this.formData.phone,
                        simplify:'register_sms_code',
                        existUser:false
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
            //注册
            register(){
                if(!checkPhone(this.formData.phone)){
                    this.message = '手机号格式不正确'
                    return
                }
                if(!checkPwd(this.formData.pwd)){
                    this.message = '请设置6-16字符的登录密码'
                    return
                }
                this.loading = true
                this.$axios({
                    url:'/v1/uc/user/investorRegister',
                    data:{
                        code: this.formData.code,
                        correlationSimplify: "platform_register_correlation_pc",
                        phone: this.formData.phone,
                        pwd: md5(md5(md5(this.formData.pwd))),
                        smsSimplify: "register_sms_code"
                    }
                })
                .then(data=>{
                    this.loading = false
                    if(data.code!=0){
                        this.message = data.message
                    }else{
                        MessageBox('注册成功', '提示', {
                        confirmButtonText: '确定',
                        }).then(()=>{
                            setToken(data.result.token)
                            window.localStorage.setItem('userInfo',JSON.stringify(data.result))
                            this.$router.push('/personal/myaccount')
                            // this.$router.push('/personal/openaccount')
                        }).catch(() => {});
                    }
                })                
            }
        },
        beforeRouteEnter (to, from, next) {  
            next(vm => {
                if(from.path == '/contract' && sessionStorage.getItem('registerPhone')){
                    vm.formData.phone = sessionStorage.getItem('registerPhone')
                    vm.formData.code = sessionStorage.getItem('registerCode')
                }
            });
        }
    }
</script>

<style scoped lang='less'>
.register{
    position: relative;   
    img{
        height: 100%;
    }
    .components{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 1200px;
        display: flex;
        flex-direction:row-reverse;
        .register_section{
            width: 360px;
            background: rgba(255,255,255,0.8);
            padding: 34px 30px 56px;
            border-radius: 10px;
            header{
                padding-bottom: 42px;
                h1{
                    text-align: left;
                    font-size: 26px;
                    color: #32363c;
                }
            }
            .name,.pwd{
                background: #fff;
                height: 44px;
                border-radius: 5px;
                padding-left:20px; 
                border: 1px solid #e2e2e2;
            }
            .name{        
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
            .pwd{
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                input{
                    width: 90%;
                    height: 100%;
                }
                i{
                    flex: 1;
                }
            }
            &>p{
                padding-left: 20px;
                span{
                    cursor: pointer;
                }    
            }
            .tips{
                display: block;
                height: 14px;
                padding: 10px 0 5px;
            }
            &>button{
                width: 100%;
                height: 46px;
                border: 1px solid #e2e2e2;
                background: #ff4e30;
                border-radius: 5px;
                margin-top: 4px;
                cursor: pointer;
                transition:  all .5s;
            }
            .disabled_gray{
                background: #c4c7c8;
            }
            .disabled_hover:hover{
                background: #f78989;
            }           
        }
    }
}
</style>