<template>
<!-- 404 -->
    <div class="page404">
        <img src="@/assets/images/page404.png" alt="">
        <p>抱歉!  您访问的页面失联啦...</p>
        <button @click="$router.go(-1)">返回上一页</button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="less">
.page404{
    position: absolute;
    top:40%;
    left: 50%;
    transform: translate(-50%,-50%);
    p{
        padding: 50px 0 50px 0;
        font-size: 50px;
    }
    button{
        background: transparent;
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>