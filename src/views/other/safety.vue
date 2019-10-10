<template>
<!-- 监督管理 -->
    <div>
       <div class="banner">
           <img src="@/assets/images/safe_img/banner.png">
       </div>
       <div class="content_box">
           <div class="content">
                <div class="title_box">
                    <img src="@/assets/images/safe_img/title.png" >
                    <span>监督管理</span>
                </div>
                <ul>
                    <li v-for="(item, index) in hList" :key="index">
                        <img :src="item.icon">
                        <h1>{{item.title}}</h1>
                        <p>{{item.desc}}</p>
                    </li>
                </ul>
           </div>
       </div>
       <div class="bottom_box">
           <div class="bottom_content">
               <div class="title_box">
                    <img src="@/assets/images/safe_img/title.png" >
                    <span>技术保障</span>
                </div>
                <ul>
                    <li v-for="(item, index) in items" :key="index">
                        <div class="img_box">
                            <img :src="item.icon">
                        </div>
                        <div class="right_box">{{item.desc}}</div>
                    </li>
                </ul>

           </div>
       </div>
    </div>
</template>

<script>
    export default {       
        data() {
            return {
                hList:[
                    // {
                    //     "icon":require("@/assets/images/safe_img/yhcg.png"),
                    //     "title":"银行存管",
                    //     "desc":"和掌柜与晋城银行合作的银行存管系统，实现资金分账管理，资金去向可追踪。",
                    // },
                    {
                        "icon":require("@/assets/images/safe_img/smrz.png"),
                        "title":"实名认证",
                        "desc":"和掌柜进行实名校验认证，多重手段核查借贷双方身份信息",
                    },
                    {
                        "icon":require("@/assets/images/safe_img/xxtm.png"),
                        "title":"小额分散",
                        "desc":"和掌柜出借项目主要以小额借款项目为主，严格按照《网络借贷信息中介机构业务活动管理暂行办法》的规定执行：同一自然人在和掌柜平台的借款余额上限不超过人民币20万元；同一法人或其他组织在和掌柜平台的借款余额上限不超过人民币100万元。",
                    }
                ],
                items:[
                    {
                        "icon":require("@/assets/images/safe_img/jsbz.png"),
                        "desc":"和掌柜严格按照国家相关法律法规要求，进行平台数据信息加密保管，保障信息安全。",
                    },
                    {
                        "icon":require("@/assets/images/safe_img/xtbz.png"),
                        "desc":"和掌柜系统均为自主研发，配置完善防黑体系及灾备系统，符合国家标准要求。",
                    },
                    {
                        "icon":require("@/assets/images/safe_img/dzqz.png"),
                        "desc":"用户每一笔交易与还款操作均有存证和具有法律效力， 所有出借也都有免证效力的电子合同。",
                    }
                ],
            }
        },
    }
</script>

<style scoped lang="less">

.banner{
    img{
       width: 100%;
       height: 100%;
    }
}
.content_box{
    background-color: #ffffff;
    .content{
        padding-top: 15px;
        padding-bottom: 60px;
        width: 1200px;
        margin: 0 auto;
        ul{
            display:flex;
            // justify-content: space-between;
            li{
                // width: 344px;
                width: 50%;
                h1{
                    margin-top: 34px;
                    margin-bottom: 24px;
                    font-size: 24px;
                    color: #333333;
                }
                p{
                    font-size: 16px;
                    color: #7d8283;
                    text-align: left;
                    line-height: 1.8;
                    padding: 0 50px;
                }
            }
        }
    }
}
.bottom_box{
    background-color: #f2f2f2;
    .bottom_content{
        padding-top: 15px;
        padding-bottom: 60px;
        width: 1200px;
        margin: 0 auto;

        li{
            display: flex;
            margin-bottom: 20px;
            background-color: #ffffff;
            .right_box{
                color: #7d8283;
                font-size: 18px;
                margin-top: auto;
                margin-bottom: auto;
                padding-left: 44px;
            }

        }
    }
}


.title_box{
    height: 114px;
    line-height: 114px;
    position: relative;
    span{
        color: #45baed;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        font-size: 22px;
    }
}

</style>