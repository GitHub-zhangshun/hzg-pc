<template>
<!-- 我的账户 -->
    <div class="myAccount">
            <!-- 内容 -->
            <div class="content">
                <!-- 上部框 -->
                <div class="top">
                    <div class="left">
                        <div class="row">
                            <img :src="user && user.headImg ? user.headImg : require('@/assets/images/personal_img/icon_defaulticon.png')" class="headIcon">    
                            <div class="info">
                                <p class="accoutName">{{ user && user.phone }}</p>
                                <p class="state">
                                    <img src="@/assets/images/personal_img/icon_approved.png">&nbsp;<span v-if="user.isOpen">已认证</span><span v-else>未认证</span>&emsp;
                                    <img src="@/assets/images/personal_img/icon_binded.png">&nbsp;<span>已绑定</span>
                                </p>
                                <p>风险测评：{{ user.riskLevelInfo && user.riskLevelInfo.riskLevelTxt || '未测评'}}</p>
                            </div>
                        </div>
                        <router-link to="/niskEvaluation" class="again" v-if="user.riskLevelInfo && user.riskLevelInfo.riskLevelTxt && count>0">重新测评 >></router-link>
                        <router-link to="/niskEvaluation" class="again" v-if="count>0&&!(user.riskLevelInfo && user.riskLevelInfo.riskLevelTxt)">去测评 >></router-link>
                    </div>
                    <div class="right">
                        <P>账户总额：<span class="totalPrice">{{ totalPrice }}</span> 元</P>
                        <el-button class="charge" @click="toCharge">充值</el-button>
                        <el-button class="take" @click="toTakeOut">提现</el-button>
                    </div>
                </div>

                <!-- 下部框 -->
                <div class="bottom">
                    <p class="title">我的账户</p>
                    <div class="priceBox">
                        <div class="priceType">
                            <p class="row type"><img :src="require('@/assets/images/personal_img/icon_myaccount01.png')" ><span>账户余额</span></p>
                            <p class="price">&yen;&nbsp;<span>{{ usable }}</span></p>
                        </div>
                        <div class="priceType">
                            <p class="row type"><img :src="require('@/assets/images/personal_img/icon_myaccount02.png')" ><span>在投金额</span></p>
                            <p class="price">&yen;&nbsp;<span>{{ investment }}</span></p>
                        </div>
                        <div class="priceType">
                            <p class="row type"><img :src="require('@/assets/images/personal_img/icon_myaccount03.png')" ><span>预计待收金额</span></p>
                            <p class="price">&yen;&nbsp;<span>{{ expectIncome }}</span></p>
                        </div>
                        <div class="priceType">
                            <p class="row type"><img :src="require('@/assets/images/personal_img/icon_myaccount04.png')" ><span>已收收益</span></p>
                            <p class="price">&yen;&nbsp;<span>{{ totalIncome }}</span></p>
                        </div>
                    </div>
                </div>
            </div>

        <!-- 存管弹框 -->
        <toastOpenAccount v-model="isShow"></toastOpenAccount>

        <!-- 认证弹框 -->
        <!-- <authenticatedAccount v-model="isShowAuthen"></authenticatedAccount> -->
        
        </div>
</template>

<script>
//导航
import personalMenu from "@/components/personal/personalMenu";
//存管弹框
import toastOpenAccount from '@/components/toastOpenAccount';
//认证弹框
import authenticatedAccount from '@/components/authenticatedAccount';

import { Button, MessageBox } from 'element-ui';
import returnedVue from './returned.vue';
//格式化数字
import { number_format } from "@/libs/publicFun";

    export default {
        data(){
            return {
                user:{},
                usable:'',
                investment:'',
                expectIncome:'',
                totalIncome:'',
                totalPrice:'',
                isShow: false,
                isShowAuthen: false,
                count:''
            }
        },
        methods: {
            toCharge(){
                localStorage.setItem('path',this.$route.path)
                if(this.user && this.user.isOpen && this.user.bankCardInfo.cardNo){
                    // if(this.user.personalAttestation){
                        this.$router.push('/personal/charge')
                    // }else{
                        // this.isShowAuthen = true;
                    // }
                }else if(this.user && this.user.isOpen && this.user.bankCardInfo.cardNo==''){
                    MessageBox.confirm('您还未绑定存管银行卡，请先绑卡','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    })
                    .then(() => {
                        this.$router.push('/personal/setting')
                    })
                    .catch( () => {})
                }else{
                    this.isShow = true;
                }
            },
            toTakeOut(){
                localStorage.setItem('path',this.$route.path)
                if(this.user && this.user.isOpen && this.user.bankCardInfo.cardNo){
                    // if(this.user.personalAttestation){
                        this.$router.push('/personal/takeout')
                //     }else{
                //         this.isShowAuthen = true;
                //     }   
                }else if(this.user && this.user.isOpen && this.user.bankCardInfo.cardNo==''){
                    MessageBox.confirm('您还未绑定存管银行卡，请先绑卡','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    })
                    .then(() => {
                        this.$router.push('/personal/setting')
                    })
                    .catch( () => {})
                }else{
                    this.isShow = true;
                }  
            }
        },
       components: {
           personalMenu,
           toastOpenAccount,
           authenticatedAccount,
           'el-button':Button
       },
       created(){
           //登录账户信息
           this.$axios("/v1/uc/user/investorCurrent")
           .then(data => {
               this.user = data.result.user
               localStorage.setItem('userInfo',JSON.stringify(data.result))
           });


           this.$axios("/v1/fin/capital/accountInfo")
           .then(data=>{
                this.usable = number_format(data.result && data.result.usable || 0 , 2, '.', ','),
                this.investment = number_format(data.result && data.result.investment || 0, 2, '.', ','),
                this.expectIncome = number_format(data.result && data.result.expectIncome || 0, 2, '.', ','),
                this.totalIncome = number_format(data.result && data.result.totalIncome || 0, 2, '.', ',')
                this.totalPrice = number_format((Number(data.result.investment) + Number(data.result.usable)) || 0, 2, '.', ',')
            })    
            
            //请求风险测评
            this.$axios("/v1/uc/user/investorRiskEvaluateCount")
            .then(data => {
                this.count = data.result
            })
       },    
    }
</script>

<style scoped lang="less">

.myAccount{
    .content{
        width: 920px;
        .top{
            box-sizing: border-box;
            height: 150px;
            padding: 22px 0 22px 18px;
            background: #fff;
            display: flex;
            justify-content: space-between;
            .left{
                width: 450px;
                display: flex;
                justify-content: space-between;
                .headIcon{
                    width: 100px;
                    height: 100px;
                    margin-right: 20px; 
                }
                .info{
                    margin-top: 10px;
                    text-align: left;
                    .accoutName{
                        font-size: 22px;
                        color: #333;
                        height: 22px;
                    }
                    .state{
                        color: #969090;
                        font-size: 12px;
                        padding: 14px 0 26px 0;
                    }
                }
                .again{
                    margin-top: 86px;
                    color: #696666;
                }
            }
            .right{
                margin-right: 130px;
                margin-top: 6px;
                align-self: center;
                .totalPrice{
                    color: #333;
                    font-size: 22px;
                    font-weight: bold;
                }
                .charge,.take{
                    width: 100px;
                    height: 40px;
                    border-radius: 8px;
                    color: #fff;
                    margin-top: 24px;
                }
                .charge{
                    background: #45b8ef;
                }
                .take{
                    background: #ff4e30;
                }
            }
        }

        .bottom{
            margin-top: 10px;
            background: #fff;
            padding: 24px 24px 50px 24px;
            text-align: left;
            .title{
                font-size: 16px;
            }
            .priceBox{
                display: flex;
                flex-wrap: wrap;
                margin: 10px 10px 0 10px;
                .priceType{
                    width: 400px;
                    height: 120px;
                    box-sizing: border-box;
                    background: #f2f2f2;
                    margin: 10px;
                    border-radius: 8px; 
                    padding: 24px 0 36px 30px;
                    .type{
                        align-items: center;
                        margin-bottom: 12px;
                        img{
                            width: 26px;
                            height: 26px;
                            margin-right: 8px;
                        }
                    }
                    .price{
                        color: #333;
                        font-weight: bold;
                        font-size: 16px;
                        margin-left: 40px;
                        span{
                            font-size: 28px;
                        }   
                    }
                }
            }
        }
    }

}


</style>