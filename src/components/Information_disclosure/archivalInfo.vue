
<template>
   <!-- //备案信息 -->
    <div class="main">
        <div class="content">
            <div class="en_title">Filing information</div>
            <h1 class="ch_title">备案信息</h1>
            <div class="line"></div>
            <ul class="nr_box">
                <li class="item">
                    <div class="left">备案登记地方 金融监管部门</div>
                    <div class="right">天府新区成都管委会财政金融局</div>
                </li>
                <li class="item">
                    <div class="left">备案登记时间</div>
                    <div class="right">备案完成后披露</div>
                </li>
                <li class="item">
                    <div class="left">备案登记编号</div>
                    <div class="right">备案完成后披露</div>
                </li>
                <li class="item">
                    <div class="left">电信业务经营 许可信息</div>
                    <div class="right"><img src="@/assets/images/information_img/accloay.png"></div>
                </li>
                <li class="item">
                    <div class="left">资金存管信息</div>
                    <div class="right">
                        <p>资金存管银行：陕坝银行</p>
                        <p>资金存管签约时间：2019-08-02</p>
                        <p>资金存管全量业务上线时间：2019-10-09</p>
                        <!-- <p>上海富友支付服务股份有限公司</p> -->
                    </div>
                </li>
                <li class="item">
                    <div class="left">网站备案图标 及编号</div>
                    <div class="right">完成后披露</div>
                </li>
                <li class="item">
                    <div class="left">ICP备案图标 及编号</div>
                    <div class="right">完成后披露</div>
                </li>

            </ul>

        </div>

    </div>
</template>

<script>
    export default {
        
    }
</script>


<style scoped lang='less'>

.main{
    padding: 20px 0 35px;
    .content{
        background-color: #ffffff;
        width: 1200px;
        margin: 0 auto;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding: 44px 84px 0;
        text-align: left;
        .en_title{
            font-size: 12px;
            color: #848a93;
            text-transform: uppercase;
        }
        .ch_title{
            font-size: 18px;
            color: #333333;
            font-weight: bold;
            margin: 8px 0 12px;
        }
        .line{
            width: 100px;
            height: 2px;
            background-color: #969090;
        }
        .nr_box{
            margin-top: 1px;
            margin-left: 98px;
            border-left: 2px dashed #cbcbc8;
            padding-left: 36px;
            padding-bottom: 60px;
            .item{
                padding: 20px 18px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                background: #ffffff;
                .left{
                    width: 88px;
                    padding-right: 30px;
                    line-height: 1.4;
                }
                .right{
                    flex: 1;
                    font-size: 16PX;
                    color: #333333;
                    P{
                        line-height: 1.4;
                    }
                }
            }
            .item:nth-of-type(2n+1){
                background-color: #efeeeb;
            }
        }
    }
}
</style>