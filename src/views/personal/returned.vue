<template>
<!-- 我的回款 -->
    <div class="content">
        <div class="title text_left row">
            <div>
                <div class="row" v-if="isReturned == false">
                    <p class="color_gray top">待回本金总额：<span class="red text_size_16">{{ waitPrincipal }}</span> 元</p>    
                    <p class="color_gray">待回收益总额：<span class="red text_size_16">{{ waitInterest }}</span> 元</p>   
                </div>
                <div class="row" v-if="isReturned">
                    <p class="color_gray top">已回本金总额：<span class="red text_size_16">{{ repayPrincipal }}</span> 元</p>    
                    <p class="color_gray">已回收益总额：<span class="red text_size_16">{{ repayInterest }}</span> 元</p>    
                </div>
            </div>
            <el-button round class="switch row"  @click="clickSwitch">
                <span v-if="this.isReturned == false">已回款</span>
                <span v-if="this.isReturned == true">待回款</span>
                <img src="@/assets/images/personal_img/icon_switch.png">
            </el-button>
        </div>

        <!-- 数据 -->
        <table>
            <thead>
                <tr>
                    <th>标的名称</th>
                    <th><span v-if="isReturned == false">待回本金</span><span v-if="isReturned == true">已回本金</span></th>
                    <th><span v-if="isReturned == false">待回收益</span><span v-if="isReturned == true">已回收益</span></th>
                    <th>回款日期</th>
                    <th>回款期数</th>
                </tr>
            </thead>

            <tbody v-if="this.isReturned == false">
                <tr v-for="(item,index) in waitInfo" :key="index">
                    <td>{{ item.bidName }}</td>
                    <td>{{ item.principal }}</td>
                    <td>{{ item.interest }}<span class="color_red" v-if="item.increaseInterest">+{{ item.increaseInterest }}</span></td> 
                    <td>{{ item.time }}</td>
                    <td class="red">{{ item.currentNum }}/{{ item.totalNum }}</td>
                </tr>
                <tr v-if="waitInfo.length==0">
                    <td colspan="5" style="text-align:center;padding-right:20px">暂无数据</td>                       
                </tr> 
            </tbody> 

            <tbody v-else>
                <tr v-for="(item,index) in returnedInfo" :key="index">
                    <td>{{ item.bidName }}</td>
                    <td>{{ item.principal }}</td>
                    <td>{{ item.interest }}<span class="color_red" v-if="item.increaseInterest">+{{ item.increaseInterest }}</span></td>
                    <td>{{ item.time }}</td>
                    <td class="red">{{ item.currentNum }}/{{ item.totalNum }}</td>
                </tr>
                <tr v-if="returnedInfo.length==0">
                    <td colspan="5" style="text-align:center;padding-right:20px">暂无数据</td>                       
                </tr>         
            </tbody> 
        </table>

        <!-- 分页 -->
        <el-pagination
        v-if="isReturned?(returnedTotalNum>pageSize):(waitTotalNum>pageSize)"
        background
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :total="isReturned?returnedTotalNum:waitTotalNum">
        </el-pagination>
    </div>
</template>

<script>
import { Button, Pagination} from 'element-ui';
//引入时间戳和金额格式
import { formatDate, number_format } from '@/libs/publicFun'
import global from '@/libs/globalVar'

    export default {
        data(){
            return {
                isReturned: false,
                returnedInfo:[],
                waitInfo:[],
                returnedTotalNum:0,
                waitTotalNum:0,
                pageSize:global.sizeCount,
                currentPage:1,
                waitPrincipal:0,  //待还本金 
                waitInterest:0,  //待还利息  
                repayPrincipal:0,   //已还本金 
                repayInterest:0,  //已还利息 
            }
        },
        methods:{
            clickSwitch(){
                this.isReturned = !this.isReturned;
                this.currentPage = 1
                this.getWaitInfo()  //获取待回款              
                this.getreturnedInfo()  //已回款
            },
            handleCurrentChange(currentPage){          
                this.currentPage = currentPage;
                this.getWaitInfo()  //获取待回款              
                this.getreturnedInfo()  //已回款
            },
            //待回款  
            getWaitInfo(){
                this.$axios({
                    url: "/v1/bid/business/userRepayList",
                    data: { dataId: "repayment_plan_waiting", num:this.currentPage, size:this.pageSize }
                }).then(data => {
                    data.result.forEach(item => {
                        item.time = formatDate(item.time,"yyyy-MM-dd")
                        item.principal = number_format(item.principal, 2, '.', ',')
                        item.interest = number_format(item.interest, 2, '.', ',')
                    })
                    this.waitInfo = data.result
                    this.waitTotalNum = data.total     
                    console.log(this.waitInfo)  
                })
            },
            //已回款    
            getreturnedInfo(){
                this.$axios({
                    url: "/v1/bid/business/userRepayList",
                    data: { dataId: "repayment_plan_success", num:this.currentPage, size:this.pageSize }
                }).then(data => {
                    data.result.forEach(item => {
                        item.time = formatDate(item.time,"yyyy-MM-dd")
                        item.principal = number_format(item.principal, 2, '.', ',')
                        item.interest = number_format(item.interest, 2, '.', ',')
                    })
                    this.returnedInfo= data.result
                    this.returnedTotalNum = data.total  
                })
            }
        },
        components:{
            'el-button': Button,
            'el-pagination': Pagination
        },
        created(){
            //获取待回款
            this.getWaitInfo()
            //已回款
            this.getreturnedInfo()

            //获取本金和利息
            this.$axios("/v1/bid/business/userRepayStatistics")
            .then(data => {
                this.repayInterest = number_format(data.result.repayTotalIncome || 0, 2 ,'.', ',')
                this.repayPrincipal = number_format(data.result.repayPrincipal || 0, 2 ,'.', ',')
                this.waitInterest = number_format(data.result.waitInterest || 0, 2 ,'.', ',')
                this.waitPrincipal = number_format(data.result.waitPrincipal || 0, 2 ,'.', ',')
            }) 
        }
    }
</script>

<style scoped lang="less">

.rightLine{
    border-right: 1px solid #e2e2e2;
}
.red{
    color: #ff4e30;
}
    .content{
        box-sizing: border-box;
        width: 920px;
        background: #fff;
        padding: 30px;
        min-height: 540px;
        .title{
            margin-bottom: 22px;
            justify-content: space-between;
            align-items: center;
            padding-left: 18px;
            .top{
                margin-right: 60px;
            }
            .switch{
                width: 120px;
                height: 40px;
                font-size: 14px;
                color: #fff;
                background: #ff4e30;
                align-items: center;
                justify-content: center;
            }
        }

        table{
            width: 100%;
            th{
                padding-left: 20px;
                font-weight: normal;
                font-size: 15px;
                border-bottom: 1px solid #e2e2e2;
                border-top: 1px solid #e2e2e2;
                height: 60px;
                width: 184px;
            }
            td{
                padding-left: 20px;
                border-bottom: 1px solid #e2e2e2;
                height: 60px;
                background: #f2f4fc;
            }
        }

        /deep/.el-pagination{
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