<template>
    <ul>
        <li v-for="(item, index) in list" :key="index" @click="onClick(item.link)">
            <img :src="item.img" :alt="item.desc">
            <p class="title">{{item.title}}</p>
            <p class="desc">{{item.desc}}</p>
        </li>
    </ul>
</template>

<script>
    export default {
        data() {
            return {
                list:[
                    {
                        "img":require("@/assets/images/home_img/deposit.png"),
                        "title":"资金透明",
                        "desc":"保障资金安全",
                        "link":"/safety",
                    },
                    {
                        "img":require("@/assets/images/home_img/transparent.png"),
                        "title":"信息披露",
                        "desc":"实时平台数据展示",
                        "link":"/Information/aboutUS",
                    },
                    {
                        "img":require("@/assets/images/home_img/Windcontrol.png"),
                        "title":"严格风险控制",
                        "desc":"专业风控团队 多重风控审核",
                        "link":"/Information/riskContrl",
                    },
                ]
            }
        },
        methods:{
            onClick(link){
                this.$router.push(link)
                // window.location.href=''
            }
        }
    }
</script>

<style scoped lang="less">
ul{
    display: flex;
    justify-content:space-around;
    width: 1200px;
    margin: 0px auto;
    li{
        width: 500px;
        text-align: center;
        background-color: #fff;
        padding: 30px 0px;
        margin-right: 20px;
        cursor: pointer;
        .title{
            color: #333;
            font-size: 16px;
            padding-top: 22px;
            padding-bottom: 16px;
        }
        .desc{
            color: #969090;
            font-size: 13px;
        }
    }
    li:last-child{
        margin-right: 0px;
    }
    li:hover{
        background-color: #fafdfc;
    }
}

</style>