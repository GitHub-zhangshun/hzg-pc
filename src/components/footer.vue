<template>
    <div class="footer">
        <div class="footer_content">
            <ul class="footer_top">
                    <li class="one_li">
                        <div>
                            <h1>信息披露</h1>
                            <p @click="$router.push('/Information/aboutUS')">关于我们</p>
                            <!-- <p @click="$router.push('/Information/bankInfo')">银行存管</p> -->
                            <p @click="$router.push('/Information/archivalInfo')">备案信息</p>
                            <p @click="$router.push('/Information/companyInfo')">公司概况</p>
                        </div>
                        <div>
                            <h1>监督管理</h1>
                            <p @click="$router.push('/safety',)">监督管理</p>
                            <p @click="$router.push('/safety')">技术保障</p>
                        </div>
                        <div>
                            <h1>帮助中心</h1>
                            <p @click="$router.push('/personal/help')">疑问解答</p>
                        </div>
                    </li>
                    <li class="two_li">
                        <div>
                            <div class="img_box">
                                <img src="@/assets/images/04ed382ccbe2b2a93be0bf95cb523bd.png" >
                            </div>
                            <div>和掌柜公众号</div>
                        </div>
                        <div>
                            <div class="img_box">
                                <img src="@/assets/images/1570562746.png" >
                            </div>
                            <div>APP下载</div>
                        </div>

                    </li>
                    <li class="three_li">
                        <div class="th_top">
                            <i class="icon iconfont icon-dianhua"></i>
                            <span>客服热线:</span>
                        </div>
                        <div class="th_middle">400-020-0178</div>
                        <div class="th_bottom">(工作日 9:00 - 18:00)</div>
                    </li>
                
            </ul>
            <div class="footer_bottom">融证通互联网信息服务有限公司 版权所有</div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="less">

.footer{
    background-color: #333333;

    .footer_content{
        width: 1200px;
        margin: 0 auto;
        .footer_top{
            padding-top: 58px;
            display: flex;
            .one_li{
                width: 400px;
                color: #ffffff;
                display: flex;
                justify-content: space-between;
                text-align: left;
                padding-right: 80px;
                h1{
                    font-size: 16px;
                    margin-bottom: 26px;
                }
                p{
                    font-size: 14px;
                    margin-bottom: 20px;
                    cursor: pointer;
                }
                p:hover{
                    text-decoration: underline;

                }
            }
            .two_li{
                display: flex;
                justify-content: space-between;
                color: #ffffff;
                width: 310px;

                .img_box{
                    margin-bottom: 14px;
                    img{
                      width: 136px;
                      border-radius: 20px;
                    }
                }

            }
            .three_li{
                padding-left: 140px;
                color: #ffffff;
                .th_top{
                    text-align: left;
                    i{
                        font-size: 22px;
                        margin-right: 4px;
                    };
                    span{
                        font-size: 13px;
                    }
                
                    
                }
                .th_middle{
                    text-align: left;
                    font-size: 36px;
                    margin-top: 30px;
                    margin-bottom: 12px;
                }
                .th_bottom{
                    font-size: 14px;
                }

            }
        }

        .footer_bottom{
            color: #ffffff;
            font-size: 12px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-top: 0.5px solid #555454;
            margin-top: 36px;
        }
    }



}

</style>