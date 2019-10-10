<template>
<!-- 公告详情 -->
    <div class="column main_box">
        <div class="banner">
            <img src="@/assets/images/home_img/notice_banner.png" >
            <div class="bTitle_box">
                <h1 class="bTitle">平台公告</h1>
                <span></span>
            </div>
        </div>
        
        <div class="content center_h">
            <p class="title">{{title}}</p>
            <p class="time">{{time}}</p>
            <div v-html="content" class="contentDiv"></div>
        </div>
        
    </div>
</template>

<script>
import { formatDate } from '@/libs/publicFun'
    export default {
        data() {
            return {
                content:'',
            }
        },
        mounted(){
            this.$axios({
                url:'/v1/cms/op/articleInfo',
                data:this.$route.query.id
            }).then(data=>{
                this.content = data.result.content
                this.title = data.result.title
                this.time = formatDate(data.result.createAt,'yyyy-mm-dd')
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
        padding: 78px 44px 60px 44px;  
        min-height: 300px; 
        text-align: left;
        line-height: 1.5;
        .title{
            text-align: center;
            font-weight: bold;
            font-size: 40px;
        }
        .time{
            text-align: center;
            margin-bottom: 20px;
            color: #969090;
        }
        /deep/.contentDiv{
            font-size: 16px;
            img{
                max-width: 100%;
            }
        }         
    }
}

</style>