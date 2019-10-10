<template>
    <div class="anticipated">
        <h2>参考年回报率计算方式</h2> 
        
        <div class="text_left color_black">
            <p>1.以天数计算的标的</p>
            <p>参考年回报率=出借本金*年利率*持有天数/365天</p>
        </div>
        <div class="text_left color_black">
            <p>2.以月数计算的标的</p>
            <p>参考年回报率=出借本金*年利率*月数/12</p>
        </div>

        <p>预计收益为参考的收益，不为实际收益。实际收益请查看回款计划表，如有疑问，请联系客服电话400-020-0178。</p> 

    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="less">
.anticipated{
    width: 1200px;
    margin: 0 auto;
    margin-top: 30px;
    background: #fff;
    padding: 50px 30px;
    line-height: 28px;
    h2{
        font-size: 24px;
        margin-bottom: 30px;
        color: #333
    }
    &>div{
        margin-bottom: 30px;
        :nth-child(2){
            text-indent: 12px;
        }
    }
    &>p{
        color: #848a93;
        text-align: left;
    }
}

</style>