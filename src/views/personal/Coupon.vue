<template>
<!-- 优惠券 -->
    <div class="content text_left">
        <div v-for="(item,index) in list" :key="index" class="coupon">
            <img v-if="item.couponType==1 && item.status=='未使用'" src="@/assets/images/personal_img/bg_full.png">
            <img v-if="item.couponType==2 && item.status=='未使用'" src="@/assets/images/personal_img/bg_add.png">
            <img v-if="item.status == '已使用' || item.status == '已失效'" src="@/assets/images/personal_img/bg_used.png">
            <div class="used">
                <img src="@/assets/images/personal_img/icon_past.png" v-if="item.status == '已失效'">
                <img src="@/assets/images/personal_img/icon_used.png" v-if="item.status == '已使用'">
            </div>
            <div class="text_size_16 title color_white">
                <p><span class="text_size_38">{{ item.couponVal }}</span>&nbsp;<span class="text_size_18" v-if="item.couponType == 1">元</span><span class="text_size_18" v-if="item.couponType == 2">%</span></p>
                <p>（&nbsp;{{ item.typeTxt }}&nbsp;）</p>
            </div>
            <div class="color_gray text">
                <p>适用项目：<span class="color_black" v-if="item.bidType">{{ item.bidType }}</span><span class="color_black" v-else>无限制</span></p>
                <p>单笔出借金额：<span class="color_black" v-if="item.minMoney">≥{{ item.minMoney }}元</span><span class="color_black" v-else>无限制</span></p>
                <p>适用项目期限：<span class="color_black" v-if="item.limitTime">≥{{ item.limitTime }}天</span><span class="color_black" v-else>无限制</span></p>
                <p>有效期：<span class="color_black">{{ item.createAt }}至{{ item.validTime }}</span></p>
            </div>
        </div>
        <p v-if="list.length==0" class="nodata">暂无数据</p>

        <!-- 分页 -->
        <el-pagination 
        v-if="totalNum>pageSize"
        background 
        prev-text="上一页" 
        next-text="下一页" 
        layout="prev, pager, next" 
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :total="totalNum">
        </el-pagination>
    </div>
</template>

<script>
import { Pagination } from 'element-ui';
import { listByAll, formatDate } from '@/libs/publicFun'

    export default {
        components:{
            'el-pagination': Pagination
        },
        data(){
            return {
                pageSize: 6,
                currentPage:1,
                list:[],
                totalNum:0
            }
        },
        methods:{
            handleCurrentChange(currentPage){          
                this.currentPage = currentPage;
                this.getCouponList()  //获取优惠券             
            },
            getCouponList(){
                this.$axios({
                    url: "/v1/uc/user/couponListByPage",
                    data: { num:this.currentPage, size:this.pageSize }
                }).then(data => {
                    console.log(data.result)
                    data.result.forEach(item => {
                        item.status = listByAll(item.status).title
                        item.bidType = item.bidType && item.bidType.split(',')
                        item.bidType = item.bidType && item.bidType.map(item => {
                            return listByAll(item).title
                        })
                        item.bidType = item.bidType.toString().replace(',','、')                      
                        item.createAt = formatDate(item.createAt,"yyyy-MM-dd")
                        item.validTime = formatDate(item.validTime,"yyyy-MM-dd")
                        if(item.minMoney>=10000){
                            item.minMoney = item.minMoney/10000 + '万'
                        }
                    })
                    this.list = data.result
                    this.totalNum = data.total
                })
            },
        },
        created(){
            this.getCouponList()  //获取优惠券                 
        }
    }
</script>

<style scoped lang="less">
.content{
    box-sizing: border-box;
    width: 920px;
    background: #fff;
    min-height: 540px;
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    .coupon{
        margin: 8px;
        width: 270px;
        position: relative;
        .title{
            line-height: 24px;
            position: absolute;
            top: 60px;
            left: 50%;
            transform: translateX(-50%)
        }
        img{
            width: 270px;
        }
        .text{
            background: #f2f2f2;
            line-height: 30px;
            padding: 8px 14px 30px 14px;
        }
        .used{
            img{
                width: 67px;
                position: absolute; 
                top: 0;
                left: 0;
            }
        }
    }

    .nodata{
        width: 100%;
        text-align: center;
    }

    /deep/.el-pagination{
        width: 100%;
        text-align: center;
        margin-top: 30px;
        .el-pager li{
            background: none !important;
            &.active{
                background: #ed5f4e !important;;
                &:hover{
                    color: #fff !important;;
                }
            }
            &:hover{
                color: #ed5f4e !important;;
            }
        }
        span{
            background: #fff;
        }
    }
   
}
</style>