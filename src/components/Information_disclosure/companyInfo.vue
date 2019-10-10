<template>
<!-- 公司概况 -->
    <div class="main">
        <div class="gsxx">
            <div class="content gsxx_content">
                <h1 class="ch_title">工商信息</h1>
                <p class="en_title">Business information</p>
                <ul>
                    <li v-for="(item, index) in gsxxList" :key="index">
                        <div class="left item">
                            <div class="item_left">{{item[0].title}}</div>
                            <div class="item_right" v-html="item[0].desc"></div>
                        </div>
                        <div class="right item">
                            <div class="item_left">{{item[1].title}}</div>
                            <div class="item_right">{{item[1].desc}}</div>
                        </div>
                    </li>
                    
                </ul>
            </div>
        </div>
        <div class="zzjg">
            <div class="content zzjg_content">
                <img src="@/assets/images/information_img/jg_title_03.png">
                <h1>组织架构</h1>
                <p>Organizational structure</p>
                <ul>
                    <li><img src="@/assets/images/information_img/222_03.png"></li>
                    <li class="two"><img src="@/assets/images/information_img/zzjg.png"></li>
                </ul>

            </div>
        </div>
        <div class="ryfb">
            <img src="@/assets/images/information_img/kg_bg.png">
            <div class="fb_content">
                <h1>从业人员概况</h1>
                <p>General situation of employees</p>
                <ve-ring class="vchart" :data="chartData" height='360px' width='400px' :legend-visible="false" :settings="chartSettings" :colors="colors"></ve-ring>
            </div>
        </div>
         <div class="gsxx">
            <div class="content gsxx_content">
                <h1 class="ch_title">企业高管介绍</h1>
                <p class="en_title">General situation of employees</p>
                <ul>
                    <li v-for="(item, index) in employees" :key="index">
                        <div class="left item">
                            <div class="item_left">{{item[0].title}}</div>
                            <div class="item_right" v-html="item[0].desc"></div>
                        </div>
                        <div class="right item">
                            <div class="item_left">{{item[1].title}}</div>
                            <div class="item_right">{{item[1].desc}}</div>
                        </div>
                    </li>
                    
                </ul>
            </div>
        </div>
        <div class="cl_box">
            <div class="cl_content">
                <div class="important_th">
                    <img src="@/assets/images/information_img/2_03.png">
                    <h1>重大事项</h1>
                    <p>Major issues</p>
                    <ul>
                        <li v-for="(item, index) in importantThings" :key="index">
                            <div class="im_left">{{item.content}}</div>
                            <div class="im_right">{{item.desc}}</div>
                        </li>
                    </ul>
                </div>
                <div class="qd_info">
                    <div class="qd_info_nr">
                        <img src="@/assets/images/information_img/2_03.png">
                        <h1>渠道信息</h1>
                        <p>Channel information</p>
                        <ul>
                            <li>公司官方网址：www.139lc.com</li>
                            <li>网站或平台上线运营时间：2015年5月6日</li>
                            <li>APP名称：和掌柜</li>
                            <li class="img_li">
                                <div>公众号：</div>
                                <img src="@/assets/images/information_img/wechat_code.png">
                            </li>
                            <li>咨询、投诉、举报联系电话：400-020-0178</li>
                            <li>咨询、投诉、举报电子邮箱：service@139lc.com</li>
                            <li>咨询、投诉、举报通讯地址：四川省成都市天府大道南段2028号石化大厦15层</li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="zzxx">
            <img class="bg" src="@/assets/images/information_img/zz_bg.png">
            <img class="title_bg" src="@/assets/images/information_img/3_03.png">
            <div class="title">资质执照</div>
            <swiper :options="swiperOption" class="zz_swiper">
                <swiper-slide>
                    <div>
                        <img class="swiper_img" src="@/assets/images/information_img/111_03.png">
                        <p class="swiper_desc">营业执照</p>
                    </div>
                </swiper-slide>
                
                <div class="swiper-pagination"  slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
        
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VeRing from 'v-charts/lib/ring'
    export default {
        components:{
            've-ring':VeRing,
            swiper,
            swiperSlide
        },
        data() {
            this.colors = ["#ffc9bf","#ff9986","#ff674b"]
            this.chartSettings = {
                radius: [65, 100],
                hoverAnimation:true,
                offsetY:200,
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#fff'
                        },
                        smooth: 0.0,
                        length: 30,
                        length2: 20,
                    }
               },
            }
            return {
                swiperOption:{
                    slidesPerView: 1,
                    spaceBetween: 30,
                    slidesPerGroup: 1,
                    loop: true,
                    loopFillGroupWithBlank: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: false,
                        type:"custom",
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                gsxxList:[
                    [
                        {"title":"公司全称","desc":"成都融证通互联网信息服务有限公司"},
                        {"title":"公司简称","desc":"成都融证通"}
                    ],
                    [
                        {"title":"统一社会信用代码","desc":"91510100332085768U"},
                        {"title":"公司注册资本","desc":"5000万"}
                    ],
                    [
                        {"title":"公司实缴注册资本","desc":"1000万"},
                        {"title":"公司注册地","desc":"中国（四川）自由贸易试验区四川省成都市天府新区天府大道南段2028号石化大厦15楼1、2号"}
                    ],
                    [
                        {"title":"公司经营地","desc":"四川省成都市天府大道南段2028号石化大厦15层"},
                        {"title":"公司成立时间","desc":"2015年4月16日"}
                    ],
                    [
                        {"title":"公司经营期限","desc":"2015年4月16日至永久"},
                        {"title":"公司经营状态","desc":"开业"}
                    ],
                    [
                        {"title":"公司法定代表人","desc":"林育雄"},
                        {"title":"公司经营范围","desc":"信息技术咨询服务；数据处理；计算机技术开发、技术咨询；计算机系统集成服务。（依法须经批准的项目，经相关部门批准后方可开展经营活动）。"}
                    ],
                    [
                        {"title":"联系方式","desc":"地址：四川省成都市天府大道南段2028号石化大厦15层<br>电话：400-020-0178<br>邮编：610093"},
                        {"title":"分支机构","desc":"无"}
                    ],
                    [
                        {"title":"股东构成及占比","desc":"四川朗然科技有限公司持有100%工商股份"},
                        {"title":"","desc":""}
                    ],
                ],
                 employees:[
                    [
                        {"title":"法定代表","desc":"林育雄，毕业于北京语言学院，20多年金融行业从业经验，先后曾任深圳中国银行和深圳光大银行主管"},
                        {"title":"监事","desc":"郭安顺，担任过山西省朔州市长华商贸有限公司总经理，有着丰富的管理经验，精通企业管理"}
                    ],
                    [
                        {"title":"总经理","desc":"李锦荣，担任过东莞市创荣金属制品有限公司总经理、长扬能源科技有限公司，精通企业管理、营销推广和团队管理经验"},
                        {"title":"风控总监","desc":"秦晓龙，毕业于北京广播电视大学，曾担任过北京伯恩天下信息科技有限公司风控总监、北京京东世纪贸易有限公司风控总监。擅长前中后台管理和研发工作"}
                    ],
                    [
                        {"title":"技术总监","desc":"黄翔，毕业于四川广播电视大学，前万旗控股CTO、掌寻天下副总经理，搜淘网络、成都利巨人网络CTO，主持开发战略级技术创新产品20项，平台应用级产品10项，擅长人工智能、大数据、应用研发等技术领域；熟悉相关政策法规和数据化运营管理"},
                        {"title":"财务经理","desc":"罗娇，毕业于四川财经职业学院，精通公司全盘帐务处理"}
                    ],
                ],
                importantThings:[
                    {
                        "content":"减资、合并、分立、解散或者申请破产",
                        "desc":"无"
                    },
                    {
                        "content":"破产程序",
                        "desc":"无"
                    },
                    {
                        "content":"停业、整顿、关闭",
                        "desc":"无"
                    },
                    {
                        "content":"从业机构受到刑事处罚",
                        "desc":"无"
                    },
                    {
                        "content":"重大诉讼或者仲裁事项",
                        "desc":"无"
                    },
                    {
                        "content":"公司法定代表人、持股5%以上的股东、实际控制人、主要负责人、董 事、监事、高级管理人员的变更信息",
                        "desc":"无"
                    },
                    {
                        "content":"法定代表人、持股5%以上的股东、实际控制人、 主要负责人、董事、 监事、高级管理人员涉及的 重大诉讼、仲裁 ",
                        "desc":"无"
                    },
                    {
                        "content":"主要或全部业务陷入停顿",
                        "desc":"无"
                    },
                    {
                        "content":"损害出借人利益等重大事项",
                        "desc":"无"
                    },

                ],
                chartData: {
                    columns: ['年龄', '人数'],
                    rows: [
                        { '年龄': '20-25岁', '人数': 12 },
                        { '年龄': '26-30岁', '人数': 16 },
                        { '年龄': '30岁以上', '人数': 9 },
                    ]
                },
                swiperItems:1,
            }
        },
        
    }
</script>

<style scoped lang='less'>

// 工商信息
.gsxx{
    background-color: #ffffff;
        .gsxx_content{
            padding: 60px 0 46px;
            .ch_title{
                font-size: 18px;
                color: #333333;
                font-weight: bold;
            }
            .en_title{
                font-size: 12px;
                color: #848a93;
                text-transform: uppercase;
                padding: 8px 0;
                margin-bottom: 20px;
            }
            li{
                display: flex;
                justify-content: space-between;
                text-align: left;
                .left{
                    width: 540px;
                    margin-right: 40px;
                }
                .right{
                    flex: 1;
                }
                .item{
                    padding: 16px 20px;
                    display: flex;
                    align-items: center;
                    background-color: #ffffff;
                    justify-content: flex-start;
                    line-height: 1.2;
                    .item_left{
                        width: 90px;
                        padding-right: 30px;
                        font-size: 14px;
                        color: #848a93;

                    }
                    .item_right{
                        flex: 1;
                        font-size: 16px;
                        color: #333333;
                    }
                }
            }
            li:nth-of-type(2n+1) .item{
                background-color: #efefea;

            }
        }
}

//组织架构
.zzjg{
    background-color: #f2f2f2;
    .zzjg_content{
        padding: 70px 0 65px;
        text-align:left;
        position: relative;
        h1{
            position: absolute;
            left: 40px;
            top: 65px;
            color: #333333;
            font-size: 16px;
            font-weight: bold;
        }
        p{
            position: absolute;
            left: 60px;
            top: 98px;
            color: #f96e44;
            font-size: 11px;
            text-transform: uppercase;
        }
        ul{
            display: flex;
            justify-content: space-around;
            margin-top: 45px;
            .two{
                padding-top: 20px;
            }
        }

    }
}
//人员分布
.ryfb{
    position: relative;
    /deep/.fb_content{
        position: absolute !important;
        left: 50% !important;
        top: 50% !important;
        transform: translate(-50%,-50%);
        h1{
            color: #ffffff;
            font-size: 20px;
            font-weight: bold;
            padding-top: 20px;
        }
        p{
            color: #ffffff;
            text-transform: uppercase;
            font-size: 12px;
            padding-top: 10px;
        }
    }

}

//渠道信息 重大事项

.cl_box{
    
    background-color: #ffffff;
    padding-top: 30px;
    .cl_content{
        padding: 160px 0 60px 514px;
        box-sizing: border-box;
        position: relative;
        width: 1200px;
        margin: 0 auto;
        .important_th{
            background-color: #f2f2f2;
            height: 600px;
            padding: 50px 0 36px 114px;
            position: relative;
            text-align: left;
            h1{
                position: absolute;
                left: 155px;
                top: 45px;
                color: #333333;
                font-size: 16px;
            }
            p{
                position: absolute;
                left: 180px;
                top: 79px;
                color: #333333;
                font-size: 11px;
                text-transform: uppercase;
            }
            ul{
                padding-top: 50px;
                li{
                    display: flex;
                    padding: 16px 20px 16px 30px;
                    justify-content: space-between;
                    align-items: center;
                    line-height: 1.4;
                    .im_left{
                        flex: 1;
                        color: #333333;
                        font-size: 16px;
                    }
                    .im_right{
                        width: 80px;
                        text-align: right;
                        color: #848a93;
                        font-size: 16px;
                    }
                }
                li:nth-of-type(2n+1){
                    background-color: #ffffff;
                }
            }
        }

        .qd_info{
            background-color: #febe40;
            width: 600px;
            position: absolute;
            left: 0;
            top: 0;
            .qd_info_nr{
                position: relative;
                padding: 50px 30px 22px;
                text-align: left;

                h1{
                    position: absolute;
                    left: 70px;
                    top: 45px;
                    color: #333333;
                    font-size: 16px;
                }
                p{
                    position: absolute;
                    left: 100px;
                    top: 79px;
                    color: #333333;
                    font-size: 11px;
                    text-transform: uppercase;
                }
                ul{
                    padding-top: 50px;
                    padding-left: 35px;
                    li{
                        font-size: 16px;
                        color: #333333;
                        margin-bottom: 32px;
                        line-height: 1.5;
                    }
                    .img_li{
                        display: flex;
                    }
                }

            }
    }

    }


   

}
//资质信息

.zzxx{
    position: relative;
    height: 574px;
    .bg{
        width: 100%;
        height: 100%;
    }
    .title_bg{
        position:absolute;
        left: 50%;
        top: 70px;
        transform: translateX(-50%);
    }
    .title{
        position: absolute;
        left: 50%;
        top: 88px;
        transform: translateX(-50%);
        color: #ffffff;
        font-size: 28px;
        text-align: center;
    }
    .zz_swiper{
        width: 1200px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-25%);
        .swiper_img{
            width: 260px;
            height: 280px;
        }
        .swiper_desc{
            padding: 20px 0;
            color: #333333;
            font-size: 16px;
        }

    }
}

//公共
.content{
    width: 1200px;
    margin: 0 auto;
}

</style>