<template>
<!-- 充值提现 短信验证码 -->
    <div>
         <el-dialog
        :visible.sync="dialogVisible"
        width="28%"
        @close="close" 
        :close-on-click-modal="false"
        class="verify">
            <p class="title">请完成信息验证</p>
            <p class="send_msg color_gray">已向您{{ phone || 0 }}的手机号发送验证码</p>
            <div class="code-input-main">
                <div class="code-input-main-item">{{code[0]}}</div>
                <div class="code-input-main-item">{{code[1]}}</div>
                <div class="code-input-main-item">{{code[2]}}</div>
                <div class="code-input-main-item">{{code[3]}}</div>
                <div class="code-input-main-item">{{code[4]}}</div>
                <div class="code-input-main-item">{{code[5]}}</div>
                <input class="code-input-input" v-model="code" maxlength="6" type="text" autofocus/>
            </div>
            <el-button class="again" @click="again" :class="code_disabled?'color_gray':'color_red'" :disabled='code_disabled' style="border:none;background:none;height:60px;">{{ word }}</el-button>
            <el-button @click="toConfirm" :disabled="isDisabled" :loading="isLoading" :class="isDisabled?'disable':'able'">确认</el-button>
        </el-dialog>
    </div>
</template>

<script>
import { Button, Dialog, MessageBox } from 'element-ui';
import { getToken } from '@/libs/auth'
import { clearInterval } from 'timers';

let sendTimer = null,time = 60

    export default {
        components: {
            'el-button': Button,
            "el-dialog": Dialog, 
        },
        data(){
            return {
                isDisabled:true,
                isLoading:false,
                dialogVisible: false,
                code: '',   //验证码
                word:'60S',
                code_disabled:true,
                isDisabled:true,
                phone:'',
            }
        },
        methods: {
            close() {
                // this.$emit("input", false);
                this.$emit("update:isShow",false)
            },
            again(){
                this.code = ''

                let obj = {url:'/v1/cms/core/smsCodeDefaultSend', data:''}
                if(this.$route.path == '/personal/charge'){
                    obj.data = 'replenish_sms_code'
                }else if(this.$route.path == '/personal/takeout'){
                    obj.data = 'Cash_withdrawal_sms_code'
                }else if(this.$route.path == '/product/productInfo'){
                    obj.data = 'lenders_deal_captcha'
                }
                //发送验证
                this.$axios(obj).then(data => {
                    if (data.code != 0) {
                        MessageBox({
                            title:'提示',
                            message: data.message
                        }).catch(() => {});
                    }else{
                        time = 60
                        let that = this
                        sendTimer = setInterval(function(){
                            that.code_disabled = true;
                            time--;
                            that.word = time+'S';
                            if(time < 0){
                                that.code_disabled = false;
                                window.clearInterval(sendTimer);
                                that.word = "重新获取";
                            }
                        },1000)
                    }
                });  
            },
            toConfirm(){
                this.isLoading = true;
                if(this.$route.path == '/personal/charge'){
                    //充值
                    this.$axios({
                        url: "/v1/fin/recharge/recharge",
                        data: { amt: this.price, code: this.code, smsSimplify: 'replenish_sms_code',}
                    }).then(data => {
                        this.isLoading = false

                        if(data.code == 0 || data.code == '0001'){
                            this.$router.push({path:'/personal/success', query:{title:'充值成功'}})
                        }else if(data.code =='5557'){
                            MessageBox.confirm('您的账户还未授权此功能', '提示', {
                                confirmButtonText: '去授权',
                                cancelButtonText: '关闭',
                            }).then(()=>{
                                localStorage.setItem('path', this.$route.fullPath)  
                                //去授权    
                                location.href = process.env.domain + '/v1/fin/account/appAuth?token='+ getToken()     
                            }).catch(()=>{})   
                        }else if(data.code == '3018'){
                            MessageBox({
                                title:'提示',
                                message: '余额不足'
                            }).then(() => {
                                this.dialogVisible = false
                            }).catch(() => {
                                this.dialogVisible = false
                            });
                        }else if(data.code == '5138'){
                            MessageBox({
                                title:'提示',
                                message: '系统错误，请稍后再试'
                            }).catch(() => {});
                        }else{
                            MessageBox({
                                title:'提示',
                                message: data.message
                            }).catch(() => {});
                        }
                    })
                }else if(this.$route.path == '/personal/takeout'){
                    //提现
                    localStorage.setItem('path', this.$route.fullPath)

                     this.$axios({
                        url: "/v1/fin/withdraw/withdraw",
                        data: { amt: this.price, code: this.code, smsSimplify: 'Cash_withdrawal_sms_code', type: this.typeid}
                    }).then(data => {
                        this.isLoading = false

                        if(data.code == 0 || data.code == '0001'){
                            this.$router.push({path:'/personal/success', query:{title:'提现成功'}})                            
                        }else if(data.code == '5557'){
                            MessageBox.confirm('您的账户还未授权此功能', '提示', {
                                confirmButtonText: '去授权',
                                cancelButtonText: '关闭',
                            }).then(()=>{
                                localStorage.setItem('path', this.$route.fullPath)  
                                //去授权    
                                location.href = process.env.domain + '/v1/fin/account/appAuth?token='+ getToken()     
                            }).catch(()=>{})   
                        }else if(data.code == '3018'){
                            MessageBox({
                                title:'提示',
                                message: '余额不足'
                            }).then(() => {
                                this.dialogVisible = false
                            }).catch(() => {
                                this.dialogVisible = false
                            });
                        }else{
                            MessageBox({
                                title:'提示',
                                message: data.message
                            }).catch(() => {});
                        }
                    })
                }else if(this.$route.path == '/product/productInfo'){
                    // 出借
                    this.$axios({
                        url: "/v1/bid/business/productInvest", 
                        data:{ bidId:this.$route.query.id, code: this.code, couponId: this.conponId, money:this.price, smsSimplify:'lenders_deal_captcha'}            
                    })
                    .then(data => {
                        sessionStorage.setItem('lendConfirm', this.$route.fullPath)

                        this.isLoading = false
                        if (data.code != 0) {
                            this.$router.push({path:'/lendresult', query:{title:'出借失败', msg:data.message}})
                        }else{
                            this.$router.push({path:'/lendresult', query:{title:'出借成功'}})
                        }
                    })
                }
            }
        },
        props: {
            isShow:{
                type:Boolean
            },
            price:{
                type:String
            },
            conponId:{
                type:String
            },
            typeid:{
                type:String
            }
        },
        watch: {
            // value(newData, oldData) {
            //     this.dialogVisible = newData;
            //     this.$emit("input", newData);
            // },
            code(val){
                if(val !== '' && !isNaN(val)){
                    this.isDisabled = false
                }else{
                    this.isDisabled = true
                }
            },
            isShow(n){
                this.code = ''
                this.dialogVisible = n
            },
            dialogVisible(val){
                if(val){
                    this.word = 60+'S';
                    time = 60
                    let that = this
                    sendTimer = setInterval(function(){
                        that.code_disabled = true;
                        time--;
                        that.word = time+'S';
                        if(time < 0){
                            that.code_disabled = false;
                            window.clearInterval(sendTimer);
                            that.word = "重新获取";
                        }
                    },1000)
                }else{
                    window.clearInterval(sendTimer)
                }
            },
        },
        created(){
            let user = localStorage.getItem('userInfo') && JSON.parse(localStorage.userInfo).user
            this.phone = user.phone
        }
    }
</script>

<style scoped lang="less">
/deep/.el-button{
    width: 240px;
    height: 50px;
    border-radius: 180px;
    margin-left: 100px;
    margin: 0 auto !important;
    &.able{
        color: #fff;
        background: #ff4e30;
    }
    &.disable{   
        color: #969090;
        background: #c4c7c8;
    }
}

.verify{
    /deep/.el-dialog {
        border-radius: 8px;
        width: 360px !important;
    }      
    /deep/.el-dialog__headerbtn {
        top: 14px;
        background: #c7c7c7;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        .el-dialog__close {
            color: #f1f1f1;
        }
    }
    /deep/.el-dialog__body {
        text-align: center;
        padding: 40px 20px 50px 20px;
        .title{
            font-size: 20px;
        }
        .send_msg{
            margin-top: 20px;
        }
        .again{
            text-decoration: underline;
            /deep/&.el-button{
                margin: 10px 0 20px 0;
                width: 100px;
                height: 30px;
                line-height: 10px;
                font-size: 14px;
                background: none;
                border: none;
            }
        }
        /deep/.el-button{
            width: 300px;
            height: 56px;
            margin: 0 auto;
            font-size: 18px;
        }
    }

    //验证码输入框
    .code-input-main {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 20px;
        .code-input-main-item {
            width: 40px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #ccc;
            margin: 5px;
            text-align: center;
            font-size: 22px;
            border-radius: 3px;
            opacity: 0.6;
        }

        .code-input-input {
            height: 42px;
            position: absolute;
            width: 100%;
            outline: none;
            background: transparent;
            color: transparent;
            text-shadow: 0 0 0 transparent;
            width: 300%;
            margin-left: -100%;
        }
    }
}

</style>