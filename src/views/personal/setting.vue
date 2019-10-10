<template>
<!-- 账户设置 -->
    <div>
        <div class="content text_left">
            <ul>
                <li class="row" v-for="(item,index) in setList" :key="index">
                    <div>
                        <img :src="item.img"><span>{{ item.title }}</span>
                        <label>{{ item.label }}</label>
                    </div>
                    <el-button round @click="set(index)" v-if="item.showBtn" :loading="item.loading">{{ item.btn }}</el-button>
                </li>
            </ul>
        </div>

        <!-- 弹框 设置密码等-->
        <messageBox v-model="alertBox"></messageBox>

        <!-- 弹框 开通存管账户 -->
        <toastOpenAccount v-model="isShow"></toastOpenAccount>
    </div>
</template>

<script>
import messageBox from '@/components/personal/messageBox';
import { Button, MessageBox } from 'element-ui';
//存管弹框
import toastOpenAccount from '@/components/toastOpenAccount';
//清除token
import { deleteToken } from '@/libs/auth.js'
import { redirectTripartite } from '@/libs/publicFun'
import { setTimeout } from 'timers';



    export default {
        data(){
            return {
                user:{},
                bankCardNo:'',
                setList:[],
                alertBox:{
                    isShow:false,
                    text:''
                },
                usable:'',
                investment:'',
                isShow: false
            }
        },
        methods:{
            set(a){
                switch(a){
                    case 0 : case 1: case 2: 
                    this.alertBox = {
                        isShow :true,
                        text:a,
                    };
                    break;
                    case 3: this.$router.push('/personal/changepwd'); break;
                    case 4 : 
                    if(this.user && this.user.isOpen && this.user.bankCardInfo.cardNo){
                        this.alertBox = {
                            isShow :true,   
                            text:a,
                        };
                    }else if(this.user && this.user.isOpen && this.user.bankCardInfo.cardNo==''){
                        this.setList[a].loading = true
                        this.$axios({url:'/v1/fin/account/changeCard',data:1})
                        .then(data => {
                            if(data.code === '0'){
                                localStorage.setItem('path',this.$route.path)
                                redirectTripartite(data.result)
                            }else{
                                this.setList[a].loading = false
                                MessageBox({
                                    title:'提示',
                                    message: data.message||'网络异常，请稍后再试'
                                }).catch(() => {})
                            }
                        })
                    }else{
                        this.isShow = true;
                        // this.$router.push('/personal/openaccount')
                    };
                    break;
                    case 5 :
                        if(this.user && this.user.isOpen){
                            this.setList[a].loading = true
                            this.$axios('/v1/fin/account/editPassword')
                            .then(data => {
                                if(data.code === '0'){
                                    localStorage.setItem('path',this.$route.fullPath)
                                    redirectTripartite(data.result)
                                }else{
                                    this.setList[a].loading = false
                                    MessageBox({
                                        title:'提示',
                                        message: data.message||'网络异常，请稍后再试'
                                    }).catch(() => {})
                                }
                            })
                        }else{
                            this.isShow = true;
                            // this.$router.push('/personal/openaccount')
                        };
                    break;
                    case 6 :
                        if(this.user && this.user.isOpen){
                            this.setList[a].loading = true
                            this.$axios('/v1/fin/account/resetPassword')
                            .then(data => {
                                if(data.code === '0'){
                                    localStorage.setItem('path',this.$route.fullPath)
                                    redirectTripartite(data.result)
                                }else{
                                    this.setList[a].loading = false
                                    MessageBox({
                                        title:'提示',
                                        message: data.message||'网络异常，请稍后再试'
                                    }).catch(() => {})
                                }
                            })
                        }else{
                            this.isShow = true;
                            // this.$router.push('/personal/openaccount')
                        };
                    break;
                    case 7 :
                        MessageBox.confirm('注销后所有数据将无法找回，确认要申请注销账户吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            beforeClose: (action, instance, done) => {
                                if (action === 'confirm') {
                                    instance.confirmButtonLoading = true;
                                    instance.confirmButtonText = '确定';
                                    this.$axios("/v1/uc/user/userApplyCancel")
                                    .then( data => {
                                        done();
                                        instance.confirmButtonLoading = false;
                                        if(data.code==0){
                                            if(this.user && this.user.isOpen){
                                                localStorage.setItem('path','/')
                                                redirectTripartite(data.result)
                                            }else{
                                                setTimeout( () => {
                                                    MessageBox({
                                                        title:'提示',
                                                        message:'注销成功'
                                                    })
                                                    .then( () => {
                                                        deleteToken()
                                                        localStorage.clear()
                                                        this.$router.push('/login')
                                                    })
                                                },10)
                                            }
                                        }else{
                                            setTimeout( () => {
                                                MessageBox({
                                                    title:'提示',
                                                    message:data.message || '网络异常，请稍后再试'
                                                })
                                                .catch( ()=> {})
                                            },10)
                                        }
                                    })
                                } else {
                                    done();
                                }
                            }
                        })
                        .then(() => {})
                        .catch(() => {})
                    break;
                    }             
            },
        },
        components:{
            'el-button': Button,
            messageBox,
            toastOpenAccount,
        },
        created(){
            console.log(this.$route)
            //登录账户信息
            this.$axios("/v1/uc/user/investorCurrent")
            .then(data => {
                localStorage.setItem('userInfo',JSON.stringify(data.result))
                this.user = data.result.user

                this.bankCardNo = this.user.bankCardInfo && this.user.bankCardInfo.cardNo

                this.setList.push(
                    { img:require('@/assets/images/personal_img/icon_nickname.png'), title:'设置昵称', label:this.user && this.user.nickName, btn:'设置',showBtn: true,loading:false},
                    { img:require('@/assets/images/personal_img/icon_username.png'), title:'我的用户名', label:this.user.accountInfo && this.user.accountInfo.account,loading:false, btn:'设置', showBtn:this.user.accountInfo && this.user.accountInfo.account?false:true  },
                    { img:require('@/assets/images/personal_img/icon_phone.png'), title:'登录手机号码', label:this.user && this.user.phone, btn:'修改', showBtn: true,loading:false},
                    { img:require('@/assets/images/personal_img/icon_password.png'), title:'登录密码', label:'', btn:'修改',showBtn: true, loading:false },
                    // { img:require('@/assets/images/personal_img/icon_bank.png'), title:'开通账户', label:'', btn:'去开通', showBtn: true, },
                    { img:require('@/assets/images/personal_img/icon_bankcard.png'), title:'我的银行卡', loading:false, label:this.user && this.user.isOpen?this.bankCardNo && '尾号'+ this.bankCardNo.substring(this.bankCardNo.length-4):'', btn:this.user && this.user.isOpen && this.user.bankCardInfo.cardNo?'查看':this.user && this.user.isOpen && this.user.bankCardInfo.cardNo==''?'绑定':'设置',showBtn: true },
                    { img:require('@/assets/images/personal_img/icon_resetpwd.png'), title:'修改交易密码', loading:false, label:'', btn:this.user && this.user.isOpen?'修改':'设置',showBtn: true },
                    { img:require('@/assets/images/personal_img/icon_resetpwd.png'), title:'重置交易密码', loading:false, label:'', btn:this.user && this.user.isOpen?'重置':'设置',showBtn: true },
                    { img:require('@/assets/images/personal_img/icon_cancel.png'), title:'申请注销账户', loading:false, label:'', btn:'注销',showBtn: true },
                )
            }); 

            //资金信息
            this.$axios("/v1/fin/capital/accountInfo")
            .then(data=>{
                this.usable = data.result && data.result.usable
                this.investment = data.result && data.result.investment
            })   
        }
    }
</script>

<style scoped lang="less">
.content{
    box-sizing: border-box;
    width: 920px;
    background: #fff;
    padding: 30px;
    min-height: 540px;
    ul li{
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e2e2e2;
        padding: 16px 0;
        &>div{
            position: relative;
            img{
                margin-right: 10px;
            }
            label{
                width: 200px;
                color: #ff4e30;
                position: absolute;
                top: 8px;
                left: 160px;
            }
        }
        &:first-of-type{
            border-top: 1px solid #e2e2e2;
        }
        .el-button{
            width: 92px;
            height: 32px;
            padding: 0;
        }
    }

}

</style>