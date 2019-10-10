<template>
<!-- 审查报告 -->
    <div class="expReport">
        <div class="content">

            <div class="top">
                <h2 class="color_black">审计报告</h2>
                <span class="subtitle">Audit report</span>
                <p class="text_size_16 text_left">为进一步加强平台透明化建设与信息公示披露，和掌柜依据《中国银监会办公厅关于印发网络借贷信息中介机构业务活动信息披露指引的通知》，将我司各项审查报告披露如下，欢迎点击查看。
    </p>
                <!-- 图片 -->
                <ul class="row">
                    <li>
                        <viewer :images="img2015">
                            <img v-for="src in img2015" :src="src" :key="src" width="230" @click="clickImg(2015)">
                        </viewer>
                        <p class="color_black">2015年度年报审计报告</p>
                    </li>
                    <li>
                        <viewer :images="img2016">
                            <img v-for="src in img2016" :src="src" :key="src" width="230" @click="clickImg(2016)">
                        </viewer>
                        <p class="color_black">2016年度年报审计报告</p>
                    </li>
                    <li>
                        <viewer :images="img2017">
                            <img v-for="src in img2017" :src="src" :key="src" width="230" @click="clickImg(2017)">
                        </viewer>
                        <p class="color_black">2017年度年报审计报告</p>
                    </li>
                </ul>
            </div>

            <div class="center">
                <img src="@/assets/images/information_img/report_bg.png">
                <div class="main">
                    <div>
                        <h2 class="color_white">经营合规重点环节的审计结果</h2>
                        <span class="subtitle">Audit Results of Key Links of Operational Compliance</span>
                    </div>
                    
                    <!-- 滑动轮播 -->
<!--                     <swiper :options="swiperOption" class="swiper">
                        <swiper-slide v-for="(item, index) in swiperItems" :key="index">
                            <div>
                                <img src="">
                                <p class="color_white">xxxxx</p>
                            </div>
                        </swiper-slide>
                    </swiper>
                    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                    <div class="swiper-button-next swiper-button-white" slot="button-next"></div> -->
                    <div class="color_white ing">进行中</div>
                </div>
            </div>

            <div class="bot">
               <div class="main">
                    <div>
                        <h2 class="color_black">经营合规重点环节的审计结果</h2>
                        <span class="subtitle">Audit Results of Key Links of Operational Compliance</span>
                    </div>
                    
                    <!-- 滑动轮播 -->
<!--                    <el-carousel :interval="4000" type="card" class="swiper" arrow="always" height="360px" width="680px">
                        <el-carousel-item v-for="item in 6" :key="item">
                            <img src="">
                            <p class="color_black">xxxxxxxx</p>
                        </el-carousel-item>
                    </el-carousel> -->
                    <div class="color_black ing">进行中</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//引入swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Carousel,CarouselItem }  from 'element-ui';


    export default {
        components: {
            swiper,
            swiperSlide,
            'el-carousel': Carousel,
            'el-carousel-item': CarouselItem,
        },
        methods:{
            clickImg(year){
                if(year == 2015){
                    this.img2015.push(
                        require('@/assets/images/information_img/report2015/20180928012422185_0002.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0003.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0004.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0005.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0006.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0007.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0008.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0009.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0010.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0011.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0012.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0013.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0014.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0015.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0016.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0017.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0018.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0019.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0020.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0021.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0022.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0023.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0024.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0025.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0026.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0027.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0028.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0029.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0030.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0031.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0032.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0033.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0034.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0035.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0036.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0037.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0038.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0039.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0040.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0041.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0042.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0043.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0044.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0045.jpg'),
                        require('@/assets/images/information_img/report2015/20180928012422185_0046.jpg')
                    )
                }else if(year == 2016){
                    this.img2016.push(
                        require('@/assets/images/information_img/report2016/20180928012717198_0002.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0003.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0004.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0005.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0006.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0007.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0008.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0009.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0010.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0011.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0012.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0013.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0014.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0015.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0016.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0017.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0018.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0019.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0020.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0021.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0022.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0023.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0024.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0025.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0026.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0027.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0028.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0029.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0030.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0031.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0032.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0033.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0034.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0035.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0036.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0037.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0038.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0039.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0040.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0041.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0042.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0043.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0044.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0045.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0046.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0047.jpg'),
                        require('@/assets/images/information_img/report2016/20180928012717198_0048.jpg')
                    )
                }else if(year == 2017){
                    this.img2017.push(
                        require('@/assets/images/information_img/report2017/LAC0001.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0002.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0003.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0004.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0005.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0006.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0007.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0008.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0009.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0010.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0011.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0012.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0013.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0014.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0015.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0016.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0017.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0018.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0019.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0020.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0021.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0022.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0023.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0024.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0025.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0026.jpg'),               
                        require('@/assets/images/information_img/report2017/LAC0027.jpg'),                 
                        require('@/assets/images/information_img/report2017/LAC0028.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0029.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0030.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0031.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0032.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0033.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0034.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0035.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0036.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0037.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0038.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0039.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0040.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0041.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0042.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0043.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0044.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0045.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0046.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0047.jpg'),             
                        require('@/assets/images/information_img/report2017/LAC0048.jpg'),         
                    )
                }
            }
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: 4,
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                swiperItems:6,
                img2015:[
                    require('@/assets/images/information_img/report2015/20180928012422185_0001.jpg'),
                ],
                img2016:[
                    require('@/assets/images/information_img/report2016/20180928012717198_0001.jpg'),
                ],
                img2017:[
                    require('@/assets/images/information_img/report2017/LAC.jpg'),     
                ]
            }
        }
    }
</script>

<style scoped lang="less">
.expReport{
    h2{
        font-size: 20px;
    }
    .subtitle{
        font-size: 12px;
        display: block;
        color: #767676;
        margin: 10px 0 26px 0;
    }
    background-color: #fff;
    .content{
        padding: 60px 0;
        .top{
            margin: 0 auto;
            width: 1200px;
            p{
                line-height: 28px;
            }
            ul{
                justify-content: center;
                margin: 42px 0 50px 0;
                li{
                    margin: 0 50px;
                    img{
                        width: 230px;
                        height: 312px;
                        margin-bottom: 10px;
                        display: none;
                        &:first-of-type{
                            display: inline-block;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .center{
            width: 100%;
            position: relative;
            .main{
                position: absolute; 
                top: 60px;
                left: 50%; 
                transform: translate(-50%, 0);
                .subtitle{
                    color: #dedede;
                }
            }
            .swiper{
                width: 1200px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, 20%);
                img{
                    width: 260px;
                    height: 320px;
                    margin-bottom: 16px;
                }
            }
            .swiper-button-prev{
                position: absolute;
                left: -520px;
                top: 263px;
            }
            .swiper-button-next{
                position: absolute;
                right: -520px;
                top: 263px;
            }
            .ing{
                width: 260px;
                height: 320px;
                border: 1px solid #fff;
                line-height: 320px;
                margin-top: 60px;
            }
        }
        .bot{
            width: 100%;
            height: 540px;
            position: relative;
            .main{
                position: absolute; 
                top: 60px;
                left: 50%; 
                transform: translate(-50%, 0);
            }
            .swiper{
                width: 1200px;
                position: absolute;
                top: 100px;
                left: 50%;
                transform: translate(-50%, 0);
                img{
                    width: 680px;
                    height: 320px;
                }
                p{
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translate(-50%, 0);
                }
            }
            /deep/.el-carousel__indicators--outside{
                display: none;
            }
            .ing{
                width: 680px;
                height: 320px;
                border: 1px solid #333;
                line-height: 320px;
                margin-top: 60px;
            }
        }
    }
}
</style>