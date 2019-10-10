<template>
<!-- 首页 -->
    <div>
        <indexSwpier></indexSwpier>
        <notice></notice>
        <operation></operation>
        <productList :number="6"></productList>
        <trends></trends>
        <partner></partner>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import indexSwpier from '@/components/about/index_swiper'
import productList from '@/components/product/product_list'
import notice from '@/components/about/noticeAndOperate'
import operation from '@/components/about/operation'
import trends from '@/components/about/trends'
import partner from '@/components/about/partner'

    export default {
        components:{
            productList,
            notice,
            operation,
            trends,
            indexSwpier,
            partner
        }
    }
</script>

<style scoped lang="less">

div{
    .main_box{
        margin-bottom: 28px;
    }
    .box{
        margin-top: 28px;
    }
}
</style>