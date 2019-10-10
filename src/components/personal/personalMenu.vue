<template>
    <div class="personalmenu">
        <div class="box"><div class="line"></div></div>
        <ul class="menu">
            <li v-for="(item, index) in items" :key="index" @click="curClick(item.path)" :class="{current:label == item.path}">
                <img :src="item.src">
                <span>{{item.title}}</span>
            </li>
        </ul>

        <!-- 风险评测弹框 -->
        <toastEvaluation v-model="isShow"></toastEvaluation>
    </div>
</template>

<script>
//风险评测弹框
import toastEvaluation from '@/components/toastEvaluation'
import {getToken} from '@/libs/auth'
    export default {
        data(){
            return {
                label:'',
                items:[
                    {
                        title:'我的账户',
                        path:'/personal/myaccount',
                        src:require('@/assets/images/personal_img/icon_myaccount.png')
                    },
                    {
                        title:'出借记录',
                        path:'/personal/lendrecord',
                        src:require('@/assets/images/personal_img/icon_lendrecord.png')
                    },
                    {
                        title:'资金记录',
                        path:'/personal/moneyrecord',
                        src:require('@/assets/images/personal_img/icon_moneyrecord.png')
                    },
                    {
                        title:'我的回款',
                        path:'/personal/returned',
                        src:require('@/assets/images/personal_img/icon_returned.png')
                    },
                    {
                        title:'福利中心',
                        path:'/personal/welfare',
                        src:require('@/assets/images/personal_img/icon_welfare.png')
                    },
                    {
                        title:'优惠券',
                        path:'/personal/coupon',
                        src:require('@/assets/images/personal_img/icon_coupon.png')
                    },
                    {
                        title:'风险测评',
                        path:'/personal/riskevaluation',
                        src:require('@/assets/images/personal_img/icon_riskevaluation.png')
                    },
                    {
                        title:'帮助中心',
                        path:'/personal/help',
                        src:require('@/assets/images/personal_img/icon_help.png')
                    },
                    {
                        title:'账户设置',
                        path:'/personal/setting',
                        src:require('@/assets/images/personal_img/icon_setting.png')
                    },
                ],
                isShow: false
            }
        },
        methods:{
            curClick(lab){                
                if(lab === '/personal/riskevaluation' && getToken()){
                    this.user = localStorage.getItem('userInfo') && JSON.parse(localStorage.userInfo).user
                    if(this.user.riskLevelInfo){
                        this.$router.push(lab)
                        this.label = lab
                    }else{
                        this.isShow = true
                    }
                }else{
                    this.$router.push(lab)
                    this.label = lab
                }
            }
        },
        components: {
            toastEvaluation
        },
        created(){
              switch(this.$route.path){
                case '/personal/question': this.label = '/personal/help' ; break;
                case '/personal/charge' : this.label = '/personal/myaccount' ; break;
                case '/personal/takeout' : this.label = '/personal/myaccount' ; break;
                case '/personal/lenddetail' : this.label = '/personal/lendrecord' ; break;
                case '/personal/changepwd' : this.label = '/personal/setting' ;break;
                default : this.label = this.$route.path; break;           
              }
        }
    }
</script>

<style scoped lang="less">
.personalmenu{
    margin-right: 20px;
    .box{    
        width: 260px;
        background: #fff;
        height: 14px;
        .line{
            height: 4px;
            background: #ff4e30;
            margin-bottom: 10px;
        }
    }

    .menu{
        width: 260px;
        height: 480px;
        li{
            background: #fff;
            display: block;
            box-sizing: border-box;
            text-align: left;
            color: #696666;
            font-size: 16px;
            padding: 15px 0 15px 24px;
            border-bottom: 1px solid #f3eceb;
            cursor: pointer;
            img{
                margin-right: 8px;
                position: relative;
                top: -2px;
            }
            &.current{
                background: #f3eceb
            }
        }
    }
}


</style>