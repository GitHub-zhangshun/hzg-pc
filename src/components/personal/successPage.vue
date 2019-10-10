<template>
<!-- 充值提现成功页 -->
    <div class="content">
        <img src="@/assets/images/personal_img/success.png">
        <div class="title">
            <p class="text_size_22" v-if="$route.query.title == '充值成功'">充值成功</p>
            <p class="text_size_22" v-if="$route.query.title == '提现成功'">您已成功提交提现申请</p>
            <div v-if="$route.query.title == '提现成功'" class="color_gray">预计24小时内到账，具体到账时间以银行为准</div>
        </div>
        <div class="btn row">
            <div class="row" v-if="$route.query.title == '充值成功'">
                <p @click="$router.push('/product')">立即出借</p>
                <p @click="$router.push('/personal/myaccount')">查看账户</p>
            </div>
            <p v-if="$route.query.title == '提现成功'" class="complete" @click="$router.push('/personal/myaccount')">完成</p>
        </div>
    </div>
</template> 

<script>
    export default {
        data(){
            return {
                
            }
        },
        created(){
        }
    }
</script>

<style scoped lang="less">
.content{
    box-sizing: border-box;
    width: 920px;
    background: #fff;
    padding: 30px;
    img{
        width: 83px;
        margin: 100px 0 20px 0;
    }
    .title{
        margin-bottom: 30px;
        div{
            padding-top: 12px;
        }
    }
    .btn{
        align-items: center;
        justify-content: center;
        p{
            width: 180px;
            height: 50px;
            line-height: 50px;
            border: 1px solid #d2d2d5;
            margin: 0 9px;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            &:first-of-type{
                border: 1px solid #fb5230;
                color: #fb5230; 
            }
            &.complete{
                width: 300px;
                background: #fb5230;
                color: #fff;
            }
        }
    }
}


</style>