<template>
<!-- 福利中心 -->
    <div class="content text_left">
        <div class="row list" v-for="(item,index) in list" :key="index" @click="toDetai(item.link)">
            <img :src="item.banner" class="left">
            <div class="right row color_gray">
                <div>
                    <p class="color_black text_size_18">{{ item.name }}</p>
                    <p>{{ item.describe }}</p>
                </div>
                <img src="@/assets/images/personal_img/More.png">
            </div>
        </div>

        <div v-if="list.length == 0" class="nodata column">
            <img src="@/assets/images/welfare_img/nodata.png">
            <p>暂无活动，敬请期待~~</p>  
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                list:[]
            }
        },
        methods:{
            toDetai(link){
                location.href = link
            }
        },
        created(){
            this.$axios({url:'/v1/cms/op/activityListByWhere', data:{}})
            .then(data => {
                this.list = data.result
                console.log(this.list)
            })
        }
    }
</script>

<style scoped lang="less">
.content{
    box-sizing: border-box;
    width: 920px;
    background: #fff;
    padding: 40px 30px;
    min-height: 540px;
    .list{
        align-items: center;
        margin-bottom: 16px;
        cursor: pointer;
        .left{
            width: 60px;
            margin-right: 12px;
            margin-bottom: 20px;
        }
        .right{
            flex: 1;
            padding-bottom: 6px;
            border-bottom: 1px solid #ccc;
            align-items: center;
            div{
                width: 99%;
                p{
                    margin-bottom: 12px;
                }
            }
        }
    }
    .nodata{
        margin-top: 40px;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        img{
            margin-bottom: 24px;
        }
    }
}

</style>