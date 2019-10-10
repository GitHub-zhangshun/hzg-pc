<template>
<!-- 充值 -->
    <div>
        <div class="content text_left">
            <div class="title row">
                <div :class="{ current:label == 'chargeMoney'  }" @click="selected('chargeMoney')">充值</div>
                <div :class="{ current:label == 'chargeRecord' }" @click="selected('chargeRecord')">充值记录</div>
            </div>

            <!-- 内容组件 -->
            <div class="main">
                <chargeMoney v-if="label == 'chargeMoney'"></chargeMoney>
                <chargeRecord v-if="label == 'chargeRecord'"></chargeRecord>
            </div>

        </div>

        <!-- 存管弹框 -->
        <toastOpenAccount v-model="isShow"></toastOpenAccount>
    </div>
</template>

<script>
import chargeMoney from "@/components/personal/chargeMoney";
import chargeRecord from "@/components/personal/chargeRecord"
//存管弹框
import toastOpenAccount from '@/components/toastOpenAccount';

    export default {
        data(){
            return {
                label:'',
                isShow: false,
            }
        },
        methods: {
            selected(lab){
                this.label  = lab;
                this.$router.push({path: '/personal/charge',query:{ type:lab}})
            }
        },
        components: {
            chargeMoney,
            chargeRecord,
            toastOpenAccount,
        },
        created(){
            this.label = this.$route.query.type || 'chargeMoney'

            //登录账户信息
           this.$axios("/v1/uc/user/investorCurrent")
           .then(data => {
               let userInfo = data.result.user
                if(userInfo.isOpen){
                    this.isShow = false;
                }else{
                    this.isShow = true;
                }
           });
       
        }
    }
</script>

<style scoped lang="less">
.content{
        box-sizing: border-box;
        width: 920px;
        background: #fff;

        .title{
            height: 56px;
            background: #f2f4fc;
            div{
                width: 140px;
                text-align: center;
                padding: 20px 0;
                font-size: 16px;
                cursor: pointer;
                &.current{
                    background: #fff;
                }
            }
        }

        .main{
            padding: 30px;
            background: #fff;
        }
        
}
</style>