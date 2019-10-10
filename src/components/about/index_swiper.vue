<template>
    <div class="banner">
        <img src="@/assets/images/home_img/banner.png" alt="banner" v-if="bannerShow=='placeholderImg'">
        <swiper :options="swiperOption" v-if="bannerShow=='imgList'">
            <swiper-slide v-for="(item, index) in bannerList" :key="index">
                <a :href="item.link"><img :src="item.imgLink" alt="banner"></a>               
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>        
    </div>       
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        components:{
            swiper,
            swiperSlide
        },
        data(){
            return{
                bannerShow:'',
                bannerList:[],
                swiperOption:{
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    loop : true,
                    autoplay:true
                }
            }
        },
        methods:{
             banner(){
                this.$axios({url:'/v1/cms/op/bannerListByValid',data:'banner_show_PC'})
                .then(data=>{
                    if(data.code==0){
                        let banner = []
                        data.result.forEach(element => {
                            if(element.showType=='d1fe73d7-4614-4cd4-bd40-1b4377eba926'){
                                banner.push(element)
                            }
                        });
                        this.bannerList = banner
                        if(this.bannerList.length==0){
                            this.bannerShow = 'placeholderImg'
                            return
                        }
                        this.bannerShow ='imgList'
                    }else{
                        this.bannerShow = 'placeholderImg'
                    }
                })
            }
        },
        created(){
            this.banner()
        }
    }
</script>

<style scoped lang="less">
.banner{
    height: 401px;
    .swiper-container{
        .swiper-wrapper{
            .swiper-slide{
                height: 401px;
                a{
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                
            }
        }
    }
    /deep/.swiper-pagination-bullet{
        border: 1px solid #fff;
        background: transparent;
        opacity: 1;
    }
    /deep/.swiper-pagination-bullet-active{
        background: transparent;
        border: 1px solid #ff4e3c;
    }
}


</style>