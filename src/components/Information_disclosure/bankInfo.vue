<template>
<!-- 银行存管 -->
    <div class="main">
        <div class="elm_box">
            <h1>2019年10月,和掌柜与陕坝银行合作的银行存管系统正式上线。</h1>
            <img src="@/assets/images/information_img/xieyi.png">
        </div>
        <div class="blue_box">
            <h1>银行存管对用户的好处</h1>
            <h2>Benefits of Bank Deposits to Users</h2>
            <ul>
                <li v-for="(item, index) in items" :key="index">
                    <img :src="item.icon">
                    <p class="a_title">{{item.title}}</p>
                    <p class="a_content">{{item.content}}</p>
                </li>
            </ul>
        </div>
        <div class="bottom_box">
            <div class="cg_box">
                <h1>银行存管模式</h1>
                <h2>Bank custody mode</h2>
                <img src="@/assets/images/information_img/cgms.png">
            </div>
            <div class="sf_box">
                <div class="item">
                    <img src="@/assets/images/information_img/Introduction.png">
                    <div class="ab_box">
                        <h1>为什么要银行存管</h1>
                        <p>银行存管是衡量P2P网贷平台是否合规的硬性指标。</p>
                        <p>依据2016年8月24日银监会、工信部、公安部、网信办联合公布的《网络借贷信息中介机构业务活动管理暂行办法》要求，需要互联网金融平台与银行业金融机构对接，对平台资金进行银行存管，具体做法是互联网金融平台在银行业金融机构开设独立账户，用于存放用户的交易资金，银行业金融机构根据用户的指令、合同内容，对用户的交易与资金流水进行划拨和簿记。</p>
                    </div>
                </div>
                <div class="item">
                    <img src="@/assets/images/information_img/cg.png">
                    <div class="ab_box">
                        <h1>陕坝银行简介</h1>
                        <p>陕坝农商银行是拥有六十多年发展历史，历经两次体制改革组建的股份制商业银行，总部位于内蒙古自治区巴彦淖尔市杭锦后旗陕坝镇。目前下设34家支行，在辖区各行政村设立107个助农服务点，实现助农金融全覆盖，填补农牧区金融服务空白。陕坝农商银行已成为杭锦后旗地区营业网点最多、覆盖面最广、服务客户总量最多的金融机构</p>
                        <p>长期以来，陕坝农商银行深入贯彻落实国家普惠金融、绿色金融理念，坚持“立足社区、面向三农、服务小微”的市场定位，致力于打造“三支银行”。近三年，各项存款增幅保持在25%以上，2016年末全行资产规模突破68亿元，不良贷款率控制在监管要求指标内。陕坝农商银行已经发展成为内蒙古地区一家成长性良好、支持地方经济贡献突出的金融机构。</p>
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
                    {"icon":require("@/assets/images/information_img/zjgl.png"),
                        "title":"资金隔离",
                        "content":"和用户资金有效隔离，平台不能触碰用户资金。",
                    },
                    {"icon":require("@/assets/images/information_img/yhsq.png"),
                        "title":"用户授权",
                        "content":"银行必须根据用户授权操作指令才能进行资金划转。",
                    },
                    {"icon":require("@/assets/images/information_img/jytm.png"),
                        "title":"交易透明",
                        "content":"银行根据合同约定及用户发出的交易指令，对交易流程进行管理并记录用户资金流水，交易可查。",
                    },
               ],
            }
        },
    }
</script>

<style scoped lang="less">

.main{
    .elm_box{
        background-color: #ffffff;
        text-align: center;
        h1{
            font-size: 14px;
            padding: 78px 0 38px;
        }
        img{
          width: 604px;
        }
    }
    .blue_box{
        background-image: url("../../assets/images/information_img/bank_bg.png");
        color: #ffffff;
        h1{
            font-size: 20px;
            padding: 70px 0 10px;
        }
        h2{
            font-size: 12px;
        }
        ul{
            display: flex;
            width: 1200px;
            margin: 0 auto;
            padding: 44px 0 100px;
            justify-content: space-around;
            li{
                width: 272px;
                .a_title{
                    padding: 20px 0 10px;
                    font-size: 16px;
                    font-weight: bold;
                }
                .a_content{
                    font-size: 14px;
                    line-height: 1.2;
                }
            }
        }
    }
    .bottom_box{
        padding-bottom: 60px;
        background-color: #f3f8f7;
        .cg_box{
            background-color: #ffffff;
            width: 1200px;
            margin: 0 auto;
            padding-bottom: 44px;
            box-shadow: 0 4px 3px rgba(4, 34, 53, 0.35);
            h1{
            font-size: 20px;
            padding: 60px 0 10px;
            font-weight: bold;
            color: #333333;
        }
            h2{
                font-size: 12px;
                color: #848a93;
                margin-bottom: 20px;
            }
        }
        .sf_box{
            display: flex;
            width: 1200px;
            margin-top: 50px;
            margin-left: auto;
            margin-right: auto;
            .item{
                position: relative;
                .ab_box{
                    position: absolute;
                    left: 0;
                    top: 150px;
                    padding: 0 26px;

                    h1{
                        font-size: 20px;
                        color: #333333;
                        margin-bottom: 20px;
                    }
                    p{
                        color: #848a93;
                        font-size: 14px;
                        margin-bottom: 10px;
                        line-height: 1.5;
                        text-align: left;
                    }
                }
            }
            .item:first-child{
                 margin-right: 40px;
            }
        }
    }
}
</style>