<template>
<!-- 我的银行卡 -->
    <div class="bankAccount">
        <div class="row top">
            <img :src="user.bankCardInfo && user.bankCardInfo.icoLink">
            <div>
                <p class="title">{{ user.bankCardInfo && user.bankCardInfo.name }}</p>
                <p class="text">{{ user.bankCardInfo && user.bankCardInfo.cardNo }}</p>
            </div>
        </div>

        <div class="bot">
            <!-- <p class="color_black text_size_16">支持银行：
                <span class="color_gray text_size_14" v-for="(item,index) in bankName" :key="index">{{ item }}</span>
            </p> -->
            <p class="color_gray text_size_14">单笔充值限额：<span class="color_black">{{ singleQuota }}元</span></p>
            <p class="color_gray text_size_14">单日充值限额：<span class="color_black">{{ dayQuota }}元</span></p>
            <p class="color_gray text_size_14">单月充值限额：<span class="color_black">{{ monthQuota }}元</span></p>
        </div>

        <el-button @click="chageCard" :loading="loading">解绑银行卡</el-button>
    </div>
</template>

<script>
import { Button,MessageBox } from 'element-ui';
import { number_format,redirectTripartite } from "@/libs/publicFun";
    export default {
        data(){
            return {
                user:{},
                bank:[],
                bankName:[],
                loading:false,
                singleQuota:'',
                dayQuota:'',
                monthQuota:''
            }
        },
        methods:{
            //解绑银行卡
            chageCard(){
                this.loading = true
                this.$axios({
                    url:'/v1/fin/account/changeCard',
                    data:2
                }).then(data=>{                    
                    if(data.code == 0){
                        localStorage.setItem('path',this.$route.path)
                        redirectTripartite(data.result)
                    }else{
                        this.loading = false
                        MessageBox({
                            title:'提示',
                            message: data.message||'网络异常，请稍后再试'
                        }).catch(() => {});
                    }
                })

            }
        },
        components: {
           'el-button': Button
        },
        created(){
            //用户信息
            this.user = localStorage.getItem('userInfo') && JSON.parse(localStorage.userInfo).user

            console.log(this.user) 
            this.singleQuota = number_format(this.user.bankCardInfo.singleQuota ||  0, 2, '.', ',')
            this.dayQuota = number_format(this.user.bankCardInfo.dayQuota ||  0, 2, '.', ',')
            this.monthQuota = number_format(this.user.bankCardInfo.monthQuota ||  0, 2, '.', ',')

            //请求支持银行
            // this.$axios("/v1/cms/op/bankListByOperation")
            // .then(data => {
            //     this.bank = data.result
            //     this.bank.forEach((v,i) => {
            //         if(v.isShow){
            //             this.bankName.push(v.name)
            //             let str = this.bankName.join("、")
            //             this.bankName = str.split("、、")   
            //         }
            //     })
            // });
        }
    }
</script>

<style scoped lang="less">
.bankAccount{
    width: 80%;
    text-align: center;
    margin: 0 auto;
    .top{
        text-align: left;
        line-height: 26px;
        margin-bottom: 20px;
        .title{
            font-size: 20px;
            color: #333;
        }
        .text{
            color: #adafb1;
        }
        img{
            width: 46px;
            height: 46px;
            margin-right: 12px;
        }
    }
    .bot{
        text-align: left;
        width: 100%;
        margin: 0 auto;
        margin-bottom: 20px;
        line-height: 30px;
        margin-left: 60px;
    }
    .el-button{
        width: 70%;
        height: 44px;
        // margin-left: 56px;
        font-size: 16px;
        border-radius: 180px;
        color: #fff;
        background: #ff4e30;
    }
}


</style>