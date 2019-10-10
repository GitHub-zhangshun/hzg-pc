
<template>
   <!-- 风险管理 -->
    <div class="main">
        <div class="content">
            <div class="en_title">Risk management framework</div>
            <h1 class="ch_title">风险管理构架</h1>
            <div class="line"></div>
            <div class="nr_box">
                <img src="@/assets/images/information_img/risk_gou.png">
            </div>
        </div>
        <div class="risk_flow">
            <img class="risk_bg" src="@/assets/images/information_img/riskc_bg.png" >
            <div class="risk_flow_content">
                <div class="title_box title_white">
                    <p class="en_title">Risk assessment process</p>
                    <p class="ch_title">风险评估流程</p>
                    <p class="line"></p>
                </div>
                <img class="flow_img" src="@/assets/images/information_img/Riskassessment.png">
            </div>
        </div>
        <div class="risk_control">
            <div class="content">
                <div class="title_box title_black">
                    <p class="en_title">Risk assessment process</p>
                    <p class="ch_title">风险评估流程</p>
                    <p class="line"></p>
                </div>
                <ul>
                    <li v-for="(item, index) in items" :key="index">
                        <img :src="item.icon">
                        <div class="item_content">
                            <h1>{{item.title}}</h1>
                            <p>{{item.desc}}</p>
                        </div>
                    </li>
                </ul>
                <div class="content cuishou_content">
                    <div class="en_title">Collection method</div>
                    <h1 class="ch_title">催收方式</h1>
                    <div class="line"></div>
                    <div class="nr_box cuishou_nr">
                        <img src="@/assets/images/information_img/cuishou.png">
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                items:[
                    {
                        "icon":require("@/assets/images/information_img/daiqian.png"),
                        "title":"贷前审批",
                        "desc":"风险评估，信用评分/评级，预审/复审"
                    },
                    {
                        "icon":require("@/assets/images/information_img/daizhong.png"),
                        "title":"贷中复查",
                        "desc":"尽职调查，限额管理"
                    },
                    {
                        "icon":require("@/assets/images/information_img/daihou.png"),
                        "title":"贷后管理",
                        "desc":"贷后检查、风险监测、催收管理"
                    },
                ]
            }
        },
        
    }
</script>


<style scoped lang='less'>

.main{
    background-color: #ffffff;
    .content{
        width: 1032px;
        margin: 0 auto;
        padding: 80px 84px 0;
        text-align: left;
        &>.en_title{
            font-size: 12px;
            color: #848a93;
            text-transform: uppercase;
        }
        &>.ch_title{
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
            padding-bottom: 60px;
            text-align: center;
        }
    }
    //风险流程
    .risk_flow{
        position: relative;
        .risk_flow_content{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            .flow_img{
                margin-top: 44px;
            }
        }
    }
    //风险管理情况
    .risk_control{
        background-color: #f2f2f2;
        .content{
            width: 1200px;
            margin: 0 auto;
            padding-top: 80px;

            ul{
                display: flex;
                justify-content: space-between;
                margin: 35px 0 75px;
                li{
                    display: flex;
                    width: 380px;
                    height: 156px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    padding: 32px 24px;
                    box-sizing: border-box;
                    img{
                        width: 62px;;
                        height: 62px;;
                    }
                    .item_content{
                        margin-left: 15px;
                        h1{
                            font-size: 20px;
                            color: #333333;
                            padding: 10px 0;
                        }
                        p{
                            font-size: 16px;
                            color: #848a93;
                            line-height: 1.5;
                        }
                    }
                }
            }
        }
        .cuishou_content{
            background-color: #ffffff;
            width: 1120px;
            padding-left: 80px;
            padding-right: 0;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            .cuishou_nr{
                padding-top: 30px;
                padding-bottom: 100px;
            }
        }

    }

    //公共的

    .title_box{
        text-align: center;
        .en_title{
            font-size: 12px;
            text-transform: uppercase;
        }
        .ch_title{
            font-weight: bold;
            font-size: 18px;
            padding: 10px 0;
        }
        

    }
    .title_white{
        color: #ffffff;
        .line{
            background-color: #ffffff;
            height: 2px;
            width: 34px;
            margin-left: auto;
            margin-right: auto;
        }
    }
    .title_black{
         color: #333333;
        .line{
            background-color: #333333;
            height: 2px;
            width: 34px;
            margin-left: auto;
            margin-right: auto;
        }

    }
}
</style>