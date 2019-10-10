<template>
    <div class="box" v-if="trendsList.length > 0">
        <div class="title_box row">
            <img src="@/assets/images/home_img/Dynamic.png">
            <span>行业动态</span>
            <div class="more" @click="moreTrands">
                <span>更多</span>
                <img src="@/assets/images/home_img/More.png">
            </div>
        </div>
        <ul  class="content_box">
            <li v-for="(item, index) in trendsList" :key="index" @click="trendsDetail(item.Id)">
                <div class="item_box">
                    <div class="img_box">
                        <img :src="item.imgLink">
                    </div>
                    <p class="title">{{item.title}}</p>
                    <p>{{item.content}}</p>
                </div>
            </li>
        </ul>
      
    </div>
</template>

<script>
    export default {
        data() {
            return {
                trendsList:[],
            }
        },
        methods:{
            moreTrands(){
                this.$router.push("/trandsList");
            },
             trendsDetail(Id){
                this.$router.push({path:"trendsDetail",query:{id:Id}});
            }
        },
        mounted(){
            this.$axios({
                url:"/v1/cms/op/articleListByPage",
                data:{
                    articleType: "industry_dynamics",
                    num: 1,
                    size: 4,
                }
            }).then(data=>{
                var list = data.result;
                list.forEach(element => {
                    this.trendsList.push(
                        {
                          Id:element.Id,
                          content:element.sketch,
                          imgLink:element.imgLink,
                          title:element.title
                        }
                    )
                });
            });
        }
    }
</script>

<style scoped lang="less">

.box{
    background-color: #ffffff;
    padding: 34px;
    width: 1200px;
    box-sizing: border-box;
    margin: 0 auto;
    .title_box{
        display: flex;
        align-items: center;
        &>span{
            display: inline-block;
            padding-left: 12px;
            font-size: 16px;
            color: #333;
        }
        .more{
            display: flex;
            align-items: center;
            margin-left: auto;
            cursor: pointer;
            span{
                margin-right: 8px;
                font-size: 14px;
                color: #969090
            }
        }
    }
    .content_box{
        padding: 20px 10px 0px 10px;
        display: flex;
        // justify-content: space-between;
        li{
            margin-right: 20px;
            width: 260px;
            cursor: pointer;
            .item_box{
                .img_box{
                    height: 182px;
                    transition: all 0.5s;
                    img{
                        width: 100%;
                        height: 100%
                    }
                }
                .img_box:hover{
                    transform: scale(1.05);
                }
                .title{
                    color: #000000;
                    font-size: 16px;
                }
                p{
                    margin-top: 20px;
                    text-align: justify;
                    overflow: hidden;  
                    display: -webkit-box;  
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical; 
                    line-height: 1.5;
                    font-size: 14px;
                    color: #969090;
                }
                p:nth-of-type(2){
                    margin-top: 6px;
                }
                p:hover{
                    color: #333333;
                }
            }
        }
        li:last-child{
            margin-right: 0px;
        }
        
    }
}
</style>