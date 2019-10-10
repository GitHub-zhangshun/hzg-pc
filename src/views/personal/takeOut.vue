<template>
<!-- 提现 -->
    <div>
        <div class="content text_left">
            <div class="title row">
                <div :class="{ current:label == 'takeMoney'  }" @click="selected('takeMoney')">提现</div>
                <div :class="{ current:label == 'takeRecord' }" @click="selected('takeRecord')">提现记录</div>
            </div>

            <!-- 内容组件 -->
            <div class="main">
                <takeMoney v-if="label == 'takeMoney'"></takeMoney>
                <takeRecord v-if="label == 'takeRecord'"></takeRecord>
            </div>

        </div>

        <!-- 存管弹框 -->
        <toastOpenAccount v-model="isShow"></toastOpenAccount>
    </div>
</template>

<script>
import takeMoney from "@/components/personal/takeMoney";
import takeRecord from "@/components/personal/takeRecord"
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
                this.$router.push({path: '/personal/takeout',query:{ type:lab}})
            }
        },
        components: {
            takeMoney,
            takeRecord,
            toastOpenAccount
        },
        created(){
            this.label = this.$route.query.type || 'takeMoney'

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