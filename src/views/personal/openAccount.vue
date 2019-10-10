<template>
<!-- 开户 -->
    <div class="content text_left">
        <p>完成以下3步，即可前往出借</p>
        <div class="row" v-for="(item,index) in list" :key="index" @click="toOperate(index)">
            <img :src="item.img" class="left">
            <div class="right row color_gray">
                <div>
                    <p class="color_black text_size_16 text_bold">{{ item.title }}</p>
                    <p>{{ item.content }}</p>
                </div>
                <img :src="item.checkIcon">
            </div>
        </div>
    </div>
</template>

<script>
import { getToken } from '@/libs/auth'
import { MessageBox } from 'element-ui';

    export default {
         data(){
            return{
                list:[],
                userInfo:{}
            }
        },
        methods: {
            toOperate(i){
                if(!localStorage.getItem('path')){
                    localStorage.setItem('path', '/personal/myaccount')
                }
                switch(i){
                    case 0 : 
                    if(!this.userInfo.isOpen){
                        this.$router.push('/personal/openaccountstep1'); 
                    }
                    break;
                    case 1 :
                    //签约
                    if(this.userInfo.isOpen){
                        if(!this.userInfo.signFlag){
                            location.href = process.env.domain + '/v1/fin/account/appSignCard?isApp=false&token='+ getToken()
                        }
                    }else{
                        MessageBox('请先完成开通账户', '提示', {
                            confirmButtonText: '确定',
                        }).catch(() => {});
                        return
                    };
                    break;
                    case 2 : 
                    //授权
                    if(this.userInfo.signFlag){
                        if(!this.userInfo.withdrawAuthFlag){
                            location.href = process.env.domain + '/v1/fin/account/appAuth?isApp=false&token='+ getToken()
                        }
                    }else{
                        MessageBox('请先完成银行卡签约', '提示', {
                            confirmButtonText: '确定',
                        }).catch(() => {});
                        return
                    }; 
                    break;
                }
            }
        },
        created(){
            //登录账户信息
            this.$axios("/v1/uc/user/investorCurrent")
            .then(data => {
                this.userInfo = data.result.user

                console.log(this.userInfo)
                this.list.push(
                    {img:require('@/assets/images/personal_img/open1.png'), title:'开通账户', content:'账户隔离，资金更安全', checkIcon: this.userInfo.isOpen?require('@/assets/images/personal_img/icon_Complete.png'):require('@/assets/images/personal_img/icon_next.png') },
                    {img:require('@/assets/images/personal_img/open2.png'), title:'银行卡签约', content:'快捷支付，抢标快人一步', checkIcon:this.userInfo.signFlag?require('@/assets/images/personal_img/icon_Complete.png'):require('@/assets/images/personal_img/icon_next.png')  },
                    {img:require('@/assets/images/personal_img/open3.png'), title:'委托充值授权', content:'快捷支付，抢标快人一步', checkIcon: this.userInfo.withdrawAuthFlag?require('@/assets/images/personal_img/icon_Complete.png'):require('@/assets/images/personal_img/icon_next.png')  },
                )
            });
        }
    }
</script>

<style scoped lang="less">
.content{
    box-sizing: border-box;
    width: 920px;
    background: #fff;
    padding: 30px;
    &>p{
        font-size: 26px;
        margin-bottom: 40px;
    }
    &>div{
        align-items: center;
        margin-bottom: 20px;
        margin-left: 24px;
        cursor: pointer;
        .left{
            width: 60px;
            margin-right: 12px;
            margin-bottom: 20px;
        }
        .right{
            flex: 1;
            padding-bottom: 6px;
            border-bottom: 1px solid #ccc;
            align-items: center;
            div{
                width: 99%;
                p{
                    margin-bottom: 12px;
                }
            }
            img{
                width: 46px;
            }
        }
    }
}

</style>