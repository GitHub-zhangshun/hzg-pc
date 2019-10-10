<template>
<!-- 合同链接 -->
    <div class="main">
        <div class="content">
            <img :src="link" v-if="$route.query.type=='img'">
            <h1 v-if="$route.query.type=='text'">{{title}}</h1>
            <div v-html="content">{{content}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                link:this.$route.query.link,
                title:'',
                content:''
            }
        },
        created() {
            if(this.$route.query.title){
                document.title = this.$route.query.title
            }
            if(this.$route.query.type=='text'){
                this.$axios({url:'/v1/cms/op/articleInfo',data:this.$route.query.id})
                .then(data=>{
                    if(data.code==0){
                        this.title = data.result.title
                        this.content= data.result.content;
                    }
                })
            }
        },

    }
</script>

<style scoped lang='less'>
.main{
    background-color: #f2f2f2;
    padding: 20px 0;
    /deep/.content{
        background-color: #ffffff;
        padding: 20px;
        width: 1160px;
        margin: 0 auto;
        img{
            width: 100%
        }
        h1{
            font-size: 24px;
            line-height: 2
        }
        div{
            // text-align: left;
            p{
                text-align: left;
                line-height: 2;
                font-size: 16px;
                strong{
                    font-weight: bold;
                }
            }
            ol{
                li{
                    text-align: left;
                    line-height: 2;
                    font-size: 16px;
                    strong{
                        font-weight: bold;
                    }
                }
            }
        }
        
    }

}

</style>