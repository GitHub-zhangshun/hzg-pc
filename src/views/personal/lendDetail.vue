<template>
<!-- 投资详情 -->
    <div>
        <div class="content">
            <table>
                <thead>
                    <tr>
                        <th>出借订单号</th>
                        <th>出借时间</th>
                        <th>出借金额</th>
                        <th>优惠券</th>
                        <th>操作</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in tableData" :key='item.id'>
                        <td>{{ item.txnSsn }}</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.totalPrice }}</td>
                        <td><span v-if="item.full || item.increase"><span v-if="item.full">返利{{ item.full }}元</span><span v-if="item.increase">加息{{ item.increase }}%</span></span><span v-else>--</span></td>   
                        <td>
                            <el-button v-if="bidsimplify == 'bid_product_show_repayment_underway' || bidsimplify == 'bid_product_show_repayment_finish'" round class="detailBtn" @click="toReturnPlan(item.id)">回款计划</el-button>
                            <el-button v-if="bidsimplify == 'bid_product_show_repayment_underway' || bidsimplify == 'bid_product_show_repayment_finish'" round class="detailBtn" @click="toAgreement(item.id)">出借协议</el-button>        
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- 分页
            <el-pagination
            background
            prev-text="上一页"
            next-text="下一页"
            layout="prev, pager, next"
            :total="1000">
            </el-pagination> -->
        </div>

        <!-- 弹框 -->
        <returnPlanBox v-model="alertBox"></returnPlanBox>
    </div>
</template>

<script>
import { Button, Pagination, MessageBox} from 'element-ui';
import returnPlanBox from '@/components/personal/returnPlanBox';
import { create } from 'domain';
import {listByAll,formatDate,number_format} from "@/libs/publicFun";

    export default {
        data(){
            return {
                //数据列表
                tableData:[],
                alertBox:{
                    isShow:false,
                    text:''
                },
                //标的序列号（判断状态）
                bidsimplify:"",
            }
        },
        methods:{
            //查看回款计划表
            toReturnPlan(id){
                this.alertBox = {
                    isShow :true,
                    text:id,
                }
            },
            //查看出借协议
            toAgreement(id){
                this.getAgreementLink(id);
            },
            //获取列表数据
            getDataList(){
                //单个标的记录列表
                this.$axios({
                    url:'/v1/bid/business/userProductInfo',
                    data: this.$route.query.id
                }).then(data=>{
                    var list = data.result.investList;
                    var stateDic  = listByAll(data.result.showStatus);
                    this.bidsimplify = stateDic.simplify;

                    list.forEach(element => {
                        this.tableData.push(
                            {
                                id:element.Id,
                                txnSsn:element.txnSsn,
                                totalPrice:number_format(element.money,2),
                                date:formatDate(element.createAt,"yyyy-MM-dd hh:mm"),
                                full:element.fullReduction,
                                increase:element.increaseRate
                            }
                        )
                        
                    });
                })
            },
             //获取出借协议链接
            getAgreementLink(id){
                this.$axios({
                    url:'/v1/bid/business/userProductInvestInfo',
                    data:id
                }).then(data=>{
                    console.log("111",data);
                    if(data.code == 0){
                        var link = data.result.contractLink;
                        if(link && link.length > 0){
                            this.$router.push({path:"/contract",query:{link:link,type:'img',title:'电子合同'}});
                        }else{
                            //电子合同正在签署中
                            MessageBox('电子合同正在签署中', '提示', {
                                confirmButtonText: '确定',  
                            }).then(()=>{
                            }).catch(() => {});
                        }
                        
                    }
                })
            }

        },
        components:{
            'el-button': Button,
            'el-pagination': Pagination,
            returnPlanBox
        },
        created(){
            this.getDataList();
        }
    }
</script>

<style scoped lang="less">

    .content{
        box-sizing: border-box;
        width: 920px;
        background: #fff;
        padding: 30px;
        padding-top: 10px;
        min-height: 540px;
        table{
            width: 100%;
            th{
                padding-left: 20px;
                font-weight: normal;
                font-size: 16px;
                border-bottom: 1px solid #e2e2e2;
                border-top: 1px solid #e2e2e2;
                height: 60px;
                min-width: 120px;
            }
            td{
                padding-left: 20px;
                border-bottom: 1px solid #e2e2e2;
                height: 60px;
                background: #f2f4fc; 
                .detailBtn{
                    width: 90px;
                    height: 34px;
                    color: #696666;
                    background: #f2f4fc; 
                    padding: 0;
                    span{
                        position: relative;
                        top: 10px;
                        left: 10px;
                    }
                }
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