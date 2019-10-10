<template>
    <div class="main_box">
        <div class="content_box">
            <div class="notice_box">
                <div class="title_box">
                    <img src="@/assets/images/home_img/icon_Message.png">
                    <span>平台公告</span>
                    <div class="more" @click="moreNotice">
                        <span>更多</span>
                        <img src="@/assets/images/home_img/More.png">
                    </div>
                </div>
                <div class="notice_content">
                    <p v-for="(item, index) in noticeList" :key="index" @click="noticeItemClick(item.id)">{{item.title}}</p>
                </div>
            </div>
            <div class="operate_box">
                <ul class="top_ul">
                    <li>
                        <i class="icon iconfont icon-9"></i>
                        <span class="op_title">运营时间</span>
                        <span class="op_time" v-for="(item, index) in runTime" :key="index">{{item}}</span>
                        <span>天</span>
                    </li>
                    <li><button @click="$router.push('/Information/operationData')">查看实时数据</button></li>
                </ul>
                <ul class="bottom_ul">
                    <li v-for="(item, index) in operateItems" :key="index">
                        <img :src="item.icon"  :title="item.title">
                        <div class="op_right">
                            <div class="title">{{item.title}}</div>
                            <div class="data_box">
                                <span class="data">{{item.data}}</span>
                                <span class="unit">{{item.unit}}</span>
                            </div>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { number_format } from "@/libs/publicFun";

    export default {
        data() {
            return {
                    operateItems:[
                        {
                            "icon":require("@/assets/images/home_img/Totaltransactions.png"),
                            "title":"累计交易总额",
                            "data":"0.00",
                            "unit":"元",
                        },
                        {
                            "icon":require("@/assets/images/home_img/Numberofusers.png"),
                            "title":"累计注册用户数",
                            "data":"0",
                            "unit":"人",
                        },
                        {
                            "icon":require("@/assets/images/home_img/Income.png"),
                            "title":"累计用户收益",
                            "data":"0.00",
                            "unit":"元",
                        }
                    ],
                    noticeList:[],
                    runTime:[],
            }
        },
        methods:{
            moreNotice(){
                this.$router.push("/noticeList");
            },
            noticeItemClick(itemId){
                this.$router.push({path:'noticeDetail',query:{id:itemId}})
            }
        },
        mounted(){
            //获取首页公告
            this.$axios({
                url:'/v1/cms/op/articleListByPage',
                data:{
                    articleType: "platform_article_affiche_sys",
                    num: 1,
                    size: 3,
                }
            }).then(data=>{
                let res = data.result
                for(let i = 0; i<res.length;i++){
                    this.noticeList.push({
                        id:res[i].Id,
                        title:res[i].title
                    })
                }               
            })
            //获取首页运营数据
            this.$axios({
                url:"/v1/cms/op/platformRunData",
                data:{

                }
            }).then(data=>{
                var res = data.result;
                //运营时间
                var time = res.runTime.toString();
                this.runTime = time.split("");
                //成交金额
                var obj1 = this.operateItems[0];
                
                if(res.transactionTotal >= 100000000){
                    obj1.data =  ( parseInt( (res.transactionTotal/100000000) * 100 ) / 100 ).toFixed(2);
                    obj1.unit = '亿元'
                }else{
                    obj1.data = number_format(res.transactionTotal,2)
                }
                //注册人数
                var obj2 = this.operateItems[1];
                obj2.data = res.registerTotal;
                 //创造收益(此处需要后台增加字段)
                var obj3 = this.operateItems[2];
                if(res.incomeTotal >= 10000){
                    obj3.data = ( parseInt( (res.incomeTotal/10000) * 100 ) / 100 ).toFixed(2);
                    obj3.unit = '万元'
                }else{
                    obj3.data = number_format(res.incomeTotal,2)
                }
            })
        }
    }
</script>

<style scoped lang='less'>
    .main_box {
        background-color: #ffffff;
        .content_box {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            padding: 30px 0;
            .notice_box {
                width: 436px;
                .title_box {
                     display: flex;
                     align-items: center;
                    &>span {
                        display: inline-block;
                        padding-left: 12px;
                        font-size: 16px;
                        color: #333333;
                    }
                    .more {
                        display: flex;
                        align-items: center;
                        margin-left: auto;
                        cursor: pointer;
                        span {
                            margin-right: 6px;
                            font-size: 14px;
                            color: #969090;
                        }
                    }
                }
                .notice_content{
                    padding-top: 20px;
                    p{
                        font-size: 14px;
                        color: #969090;
                        text-align: left;
                        height: 26px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        cursor: pointer;
                    }
                }
            }
            .operate_box {
                flex: 1;
                margin-left: 40px;
                border-left: 1px dashed #e2e2e2;
                padding-left: 30px;
                .top_ul{
                    display: flex;
                    justify-content: space-between;
                    li{
                        display: flex;
                        align-items: center;

                        i{
                            font-size: 28px;
                            color: #ff5227;
                        }
                        .op_title{
                            font-size: 14px;
                            color: #969090;
                            margin-left: 8px;
                            margin-right: 16px;
                        }
                        .op_time{
                            width: 30px;
                            height: 30px;
                            background-color: #eff3ff;
                            margin-right: 10px;
                            color: #333333;
                            font-size: 20px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        button{
                            width: 112px;
                            height: 38px;
                            background-color: #e2e2e2;
                            border-radius: 4px;
                            font-size: 14px;
                            color: #333333;
                            cursor: pointer;
                        }
                    }
                }
                .bottom_ul{
                    padding-right: 30px;
                    margin-top: 24px;
                    display: flex;
                    justify-content: space-between;
                    li{
                        display: flex;
                        align-items: center;
                        .op_right{
                            text-align: left;
                            margin-left: 10px;
                            .title{
                                font-size: 14px;
                                color: #969090;
                            }
                            .data_box{
                                margin-top: 8px;
                                .data{
                                    font-size: 22px;
                                    color: #ff4e30;
                                }
                                .unit{
                                    font-size: 14px;
                                    color: #333333;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>