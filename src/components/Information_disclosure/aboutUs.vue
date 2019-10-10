
<template>
<!-- 关于我们 -->
    <div class="main_box">
        <div class="content">
            <div class="en_title">ENTERPRISE INTRODUCTION</div>
            <h1 class="ch_title">了解和掌柜</h1>

            <ul>
                <li class="left_li"></li>
                <li class="content_li">
                    <p>和掌柜（www.cd-rzt.com）成立于2015年，并于2015年5月6日正式上线运营，是一家网络借贷信息中介服务平台。目前，和掌柜的运营主体为成都融证通互联网信息服务有限公司（简称“成都融证通”），致力于向借款人和出借人提供信息公布、借贷撮合等服务。</p>
                    <p>2018年4月10日成都融证通引入四川朗然科技有限公司为股东，注册资本增至5000.00万人民币。</p>
                </li>
                <li class="img_li">
                    <img src="@/assets/images/information_img/map1.png">
                </li>
            </ul>

        </div>
        <div class="bg_box">
            <img src="@/assets/images/information_img/aboutUs_bg.jpg">
            <ul>
                <li v-for="(item, index) in items" :key="index">
                    <img :src="item.icon">
                    <p class="a_title">{{item.title}}</p>
                    <p class="a_content">{{item.content}}</p>
                    <p>{{item.mark}}</p>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {     
    data(){
        return {
            items:[
                {"icon":require("@/assets/images/information_img/Customerservice.png"),
                    "title":"客服电话",
                    "content":"400-020-0178",
                    "mark":""
                },
                {"icon":require("@/assets/images/information_img/Workingtime.png"),
                    "title":"工作时间",
                    "content":"周一至周五9:00 - 18:00",
                    "mark":"(法定节假日除外)"
                },
                {"icon":require("@/assets/images/information_img/Mail.png"),
                    "title":"服务邮箱",
                    "content":"service@139lc.com",
                    "mark":""
                },
                {"icon":require("@/assets/images/information_img/Onlinehelp.png"),
                    "title":"在线帮助",
                    "content":"客服微信号“hzg-jr”",
                    "mark":""
                },
            ],
        }
    },
}
</script>

<style scoped lang="less">
.main_box{
    background-color: #ffffff;
    .content{
        width: 1200px;
        margin: 0 auto;
        padding-top: 66px;
        text-align: left;
        .en_title{
            font-size: 12px;
            color: #848a93;
        }
        .ch_title{
            font-size: 18px;
            color: #333333;
            font-weight: bold;
            margin: 8px 0 12px;
        }
        ul{
            display: flex;
            .left_li{
                width: 104px;
                height: 300px;
                border-top: 2px solid #abaeb3;
                border-right: 2px dashed #abaeb3;
            }
            .content_li{
                padding: 28px 25px 0 25px;
                width: 480px;
                p{
                    color: #333333;
                    text-indent: 30px;
                    line-height: 1.8;
                    font-size: 15px;
                }
            }
            .img_li{
                padding-top: 22px;
            }
        }
    }
    .bg_box{
        height: 360px;
        position: relative;
        &>img{
           width: 100%;
           height: 100%;
        }
        ul{
          display: flex;
          width: 1200px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          li{
              width: 25%;
              color: #f4f4f4;
              font-size: 14px;
              .a_title{
                  padding: 20px 0 12px;
              }
              .a_content{
                  padding-bottom: 12px;
                  color: #ffffff;
                  font-size: 16px;
              }
           
            }
        }
    }
}

</style>