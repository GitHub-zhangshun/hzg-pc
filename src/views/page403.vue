<template>
<!-- 403 -->
    <div class="page404">
        <img src="@/assets/images/page403.png" alt="">
        <p>网络连接出错了...</p>
        <div class="btn">
            <button @click="$router.go(-1)">返回上一页</button>
            <button @click="$router.go(-1)">刷新页面</button>
        </div>
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
    .btn{
        button{
            background: transparent;
            cursor: pointer;
            text-decoration: underline
        }
        button:nth-of-type(1){
            margin-right: 20px;
            
        }
    }
    
}
</style>