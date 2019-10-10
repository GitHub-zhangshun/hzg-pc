<template>
<!-- 福利中心内页 -->
    <div class="content">
        <img src="@/assets/images/welfare_img/title.png" class="title">
        
        <div v-for="(item,index) in list" :key="index" class="row_item">
            <img src="@/assets/images/welfare_img/bg_box.png" class="box_img">  
            <img :src="item.img" class="step_title">

            <div class="row">
                <div class="small_item">
                    <img src="@/assets/images/welfare_img/bg_item.png">
                    <div class="row text_left">
                        <div class="text_size_34 left"><span>1.5</span>%</div>
                        <div>
                            <p class="text_size_38 coupon">加息券</p>
                            <p class="description">最终计息金额=实际支付金额+满减金额</p>
                        </div>
                    </div>
                </div>

                <div class="small_item">
                    <img src="@/assets/images/welfare_img/bg_item.png">
                    <div class="row text_left">
                        <div class="text_size_34 left"><span>100</span>&yen;</div>
                        <div>
                            <p class="text_size_38 coupon">返利券</p>
                            <p class="description">最终收益=原本收益+加息收益</p>
                        </div>
                    </div>
                </div>
            </div>

            <p class="tip">{{ item.text }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                list:[
                    {img:require('@/assets/images/welfare_img/step1.png'), text:'用户注册成功后，系统将自动发放优惠券至出借人账户中，发放成功后将通过短信方式通知'},
                    {img:require('@/assets/images/welfare_img/step2.png'), text:'用户开户成功后，系统将自动发放优惠券至出借人账户中，发放成功后将通过短信方式通知'},
                    {img:require('@/assets/images/welfare_img/step3.png'), text:'用户充值成功后，系统将自动发放优惠券至出借人账户中，发放成功后将通过短信方式通知'},
                    {img:require('@/assets/images/welfare_img/step4.png'), text:'用户出借成功后，系统将自动发放优惠券至出借人账户中，发放成功后将通过短信方式通知'},
                ]
            }
        }
    }
</script>

<style scoped lang="less">
.content{
    width: 100%;
    height: auto;
    background: url('../../assets/images/welfare_img/bg.png') no-repeat center;
    .title{
        margin: 80px 0 50px 0;
    }
    .row_item{
        position: relative;
        width: 1188px;
        margin: 0 auto;
        .box_img{
            width: 1188px;
            height: 481px;
        }
        .step_title{
            position: absolute;
            top: 8px;
            left: 50%;
            z-index: 9;
            transform: translateX(-50%)
        }
        &>div{
            justify-content: center;
            position: absolute;
            top: 45px;
            left: 90px;
            img{
                width: 500px;
                height: 212px;
            }
            .small_item{
                position: relative;
                margin: 0 10px;
                &>div{
                    position: absolute;
                    bottom: 20px;
                    left: 50px;
                    color:#fff;
                    span{
                        font-size: 56px;
                    }
                    .left{
                        margin: 0 20px 12px 0;
                    }
                    .description{
                        background: #ffed86;
                        color:  #f95329;
                        border-radius: 180px;
                        padding: 6px 12px;
                    }
                    .coupon{
                        margin-bottom: 6px;
                        padding-bottom: 2px;
                    }
                }
            }
        }
        .tip{
            position: absolute;
            color: #fa821d;
            bottom: 176px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}

</style>