<template>
<!-- 出借结果页 -->
    <div class="content">
        <div>
            <img  v-if="$route.query.title=='出借成功'" src="@/assets/images/icon_Success.png">    
            <img v-if="$route.query.title=='出借失败'" src="@/assets/images/icon_Failure.png">
            <div class="text_size_18 title" v-if="$route.query.title=='出借成功'">出借成功</div>
            <div class="text_size_18 title" v-if="$route.query.title=='出借失败'">非常抱歉，出借失败</div>
            <p v-if="$route.query.title=='出借失败'" class="color_gray">失败原因：{{ $route.query.msg }}</p>
        </div>
        <div v-if="$route.query.title=='出借成功'">
            <el-button @click="$router.push('/personal/lendrecord')">出借明细</el-button>
            <el-button @click="$router.push('/product')">继续出借</el-button>
        </div>
        <div v-if="$route.query.title=='出借失败'">
            <el-button @click="$router.push('/product')">查看其他产品</el-button>
            <el-button @click="lendAgain">重新出借</el-button>
        </div>
    </div>
</template>

<script>
import { Button } from 'element-ui';

    export default {
        components:{
            'el-button': Button,
        },
        data(){
            return {
                status:'success'
            }
        },
        methods:{
            lendAgain(){
                if(sessionStorage.getItem('lendConfirm')){
                    this.$router.push(sessionStorage.getItem('lendConfirm'))
                }else{
                    this.$router.push('/product')
                }
            }
        },
    }
</script>

<style scoped lang="less">
.content{
    background: #fff;
    margin: 20px auto;
    width: 1200px;
    box-sizing: border-box;
    padding: 80px;
    padding-bottom: 170px;
    img{
        width: 86px;
    }
    .title{
        margin: 24px 0 14px 0;
    }
    .el-button{
        margin-top: 30px;
        width: 180px;
        height: 50px;
        border-radius: 180px;
        border: 1px solid #ccc;
        &:last-of-type{
            background: #fe4f2f;
            color: #fff;
            border: none;
        }
    }
}

</style>