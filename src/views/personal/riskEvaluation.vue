<template>  
<!-- 风险测评 -->
    <div>
        <div class="content">
            <div>
                <img v-if="user.riskLevelInfo.riskLevelTxt == '稳健型'" :src="img.solid">
                <img v-if="user.riskLevelInfo.riskLevelTxt == '积极型'" :src="img.positive">
                <img v-if="user.riskLevelInfo.riskLevelTxt == '保守型'" :src="img.keep">
                <p class="txt">您的风险测评等级为</p>
                <h3 class="color_black type">{{ user.riskLevelInfo && user.riskLevelInfo.riskLevelTxt }}</h3>
                <p class="description text_left">{{ user.riskLevelInfo && user.riskLevelInfo.riskLevelRemark }}</p>
                <el-button @click="toProduct" class="redBg">前往出借</el-button><br>
                <el-button @click="toEvaluation"  v-if="count>0" class="whiteBg">重新评测</el-button>
                <p v-if="count>0" class="count">您今年还可以测试{{ count }}次</p>
                <p v-else class="count">您今年的测评机会已用完，若有疑问请联系客服</p>
            </div>
        </div>
    </div>
</template>

<script>
import { Button } from 'element-ui';

    export default {
        data(){
            return {
                img:{
                    solid: require('@/assets/images/personal_img/icon_solid.png'),
                    positive: require('@/assets/images/personal_img/icon_positive.png'),
                    keep: require('@/assets/images/personal_img/icon_keep.png')
                },
                user:{},
                count:'',
            }
        },
        methods: {
            toEvaluation(){
                this.$router.push('/niskEvaluation')
            },
            toProduct(){
                this.$router.push('/product')
            }
        },
        components:{
           'el-button':Button
       },
        created(){
            this.user = localStorage.getItem('userInfo') && JSON.parse(localStorage.userInfo).user
            // console.log(this.user.riskLevelInfo)
 
            //请求风险测评
            this.$axios("/v1/uc/user/investorRiskEvaluateCount")
            .then(data => {
                this.count = data.result
            })
        }
    }
</script>

<style scoped lang="less">
.content{
    box-sizing: border-box;
    width: 920px;
    background: #fff;
    padding: 60px 80px 44px 80px;
    min-height: 540px;
    .txt{
        margin: 20px 0;
    }
    .type{
        font-size: 30px;
        font-weight: bold;
    }
    .description{
        font-size: 16px;
        margin: 30px 0 16px 0;
        line-height: 24px;
    }
    .el-button{
        margin: 10px 0;
        width: 320px;
        height: 50px;
        font-size: 18px;
        border-radius: 180px;
    }
    .redBg{
        color: #fff;
        background: #ff4e30;
    }
    .whiteBg{
        color: #ff4e30;
        background: #fff;
        border: 1px solid #ff4e30;
    }
    .count{
        margin-top: 20px;
    }
}

</style>