<template>
    <div class="partner" v-if="list.length > 0">
        <div class="content">
            <div class="title">
                <img src="@/assets/images/home_img/partner_icon.png">
                <div>合作伙伴</div>
            </div>
            <ul class="list" >
                <li v-for="(item, index) in list" :key="index" class="row" @click="toPartner(item.link)">
                    <img :src="item.imgLink">
                </li>
            </ul>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                items:[
                    {"img":require("@/assets/images/home_img/4_03.png")},
                ],
                list:[]
            }
        },
        methods: {
            toPartner(link){
                if(link){
                    window.location.href = link 
                } 
            }
        },
        created(){
            this.$axios({url:'/v1/cms/op/bannerListByValid', data:'cooperator_show'})
            .then(data => {
                this.list = data.result
            })
        }
        
    }
</script>

<style scoped lang='less'>
.partner{
    background-color: #ffffff;
    margin-top: 44px;
    .content{
        width: 1200px;
        margin: 0 auto;
        padding: 44px 0 14px;
        .title{
            display: flex;
            padding-bottom: 18px;
            border-bottom: 1px solid #dedede;
            align-items: center;
            font-size: 16px;
            color: #333333;
            img{
                margin-right: 10px;
            }

        }
        .list{
            display: flex;
            flex-wrap: wrap;
            margin-top: 38px;
            li{
                margin-right: 50px;
                margin-bottom: 30px;
                width: 200px;
                height: 80px;
                cursor: pointer;  
                img{
                    width: 100%;
                }
            }
            li:nth-of-type(5n){
                margin-right: 0;
            }
        }
    }
}

</style>