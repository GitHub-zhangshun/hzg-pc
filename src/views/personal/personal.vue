<template>
<!-- 个人中心入口 -->
    <div class="personal">
        <div class="container">
            <!-- 导航 -->
            <personalMenu :key="(new Date()).toString()"></personalMenu>

            <!-- 内容 -->
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
//导航
import personalMenu from "@/components/personal/personalMenu";
    export default {
       components:{
           personalMenu
       },
       created(){
        //登录账户信息
/*         this.$axios("/v1/uc/user/investorCurrent")
        .then(data => {
            localStorage.setItem('userInfo',JSON.stringify(data.result))
        }); */
       }
    }
</script>

<style scoped lang="less">
.personal{
    width: 100%;
    padding-bottom: 50px;
    padding-top: 30px;
    background: #f2f2f2;
    .container{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            color: #696666;
        }
}


</style>