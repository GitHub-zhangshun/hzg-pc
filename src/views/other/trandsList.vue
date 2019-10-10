<template>
<!-- 行业动态列表 -->
    <div class="column main_box">
        <div class="banner">
            <img src="@/assets/images/home_img/notice_banner.png" >
            <div class="bTitle_box">
                <h1 class="bTitle">行业动态</h1>
                <span></span>
            </div>
        </div>
        
        <div class="content center_h">
            <div class="item" v-for="(item, index) in trendsList" :key="index" >
                    <div class="date_box">
                        <div class="top">{{item.month}}/<span>{{item.date}}</span></div>
                        <div class="middle">YEAR</div>
                        <div class="bottom">{{item.year}}</div>
                    </div>
                    <div class="img_box">
                        <img :src="item.imgLink">
                    </div>
                    <div class="right_box">
                        <h1>{{item.title}}</h1>
                        <p>{{item.desc}}</p>
                        <div class="more_box row">
                            <span class="center_v" @click="trendsDetail(item.Id)">查看详情</span>
                            <i class="icon iconfont icon-jiantou center_v"></i>
                        </div>
                    </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { timestampToTimesfs } from '@/libs/publicFun'
    export default {
        data() {
            return {
                trendsList:[],
            }
        },
        methods:{
            trendsDetail(Id){
                this.$router.push({path:"trendsDetail",query:{id:Id}});
            }
        },
         mounted(){
            this.$axios({
                url:'/v1/cms/op/articleListByPage',
                data:{
                    articleType: "industry_dynamics",
                    num: 1,
                    size: global.sizeCount,
                }
            }).then(data=>{
                var list = data.result;
                list.forEach(element => {
                    var dateObj =  timestampToTimesfs(element.createAt)
                    this.trendsList.push({
                        year:dateObj.Y,
                        month:dateObj.M,
                        date:dateObj.D,
                        title:element.title,
                        desc:element.sketch,
                        imgLink:element.imgLink,
                        Id:element.Id
                    }) 
                });
            })
        }
    }
</script>

<style scoped lang="less">

.main_box{
    .banner{
        height: 260px;
        width: 100%;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        .bTitle_box{
            position: absolute;
            top: 64px;
            left: 50%;
            transform: translateX(-50%);
            h1{
                font-size: 36px;
                font-weight: bold;
            }
            span{
                border-top: 4px solid #333333;
                width: 48px;
                display: inline-block;
                border-radius: 2px;
            }
        }
    }

    .content{
        width: 1200px;
        margin-top: -102px;
        border-radius: 8px;
        margin-bottom: 46px;
        background-color: #ffffff;
        z-index: 2;    
        padding: 60px 54px 0 46px;  
        min-height: 300px; 

        .item{
            display: flex;
            margin-bottom: 50px;
            .date_box{
                width: 80px;
                .top{
                    color: #ffffff;
                    font-size: 16px;
                    width: 80px;
                    height: 80px;
                    line-height: 80px;
                    background-color: #696765;
                    border-radius: 8px;
                    span{
                        font-size: 32px;
                    }
                }
                .middle{
                    margin-top: 10px;
                }
                .bottom{
                    margin-top: 6px;
                }

            }
            .img_box{
                width: 262px;
                height: 182px;
                margin: 0 26px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .right_box{
                flex: 1;
                text-align: left;
                padding-top: 24px;
                h1{
                    font-size: 28px;
                    color: #333333;
                    font-weight: bold;
                    cursor: pointer;
                }
                p{
                    font-size: 16px;
                    color: #878a8a;
                    margin-top: 18px;
                    line-height: 1.5;
                    cursor: pointer;
                }
                .more_box{
                    cursor: pointer;
                    width: 120px;
                    height: 46px;
                    border-radius: 25px;
                    border: 2px solid #e2e2e2;
                    padding: 0 20px;
                    margin-top: 20px;
                    transition:  all .5s;
                    span{
                        font-size: 16px;
                    }
                    i{
                        color:#8d9497;
                        margin-left: auto;
                        font-weight: bold;
                    }
                   
                }
                .more_box:hover{
                    width: 156px;
                    border:2px solid red;
                }

            }

        }
        
    }
}

</style>