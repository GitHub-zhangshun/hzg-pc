<template>
<!-- 出借详情 回款计划 -->

<div class="text_left returnPlanBox">
    <el-dialog :visible.sync="dialogVisible" width="46%" @close="close">
      <span slot="title" class="title">回款计划表</span>

        <!-- 出借详情 回款计划 -->  
        <table>
            <thead>
                <tr>
                    <th>回款时间</th>
                    <th>回款金额</th>
                    <th>本金</th>
                    <th>收益</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableData" :key='item.id'>
                    <td>{{ item.date }}</td>
                    <td>{{ item.totalPrice }}</td>
                    <td>{{ item.principal }}</td>
                    <td>{{ item.interest }}<span class="color_red" v-if="item.increase">+加息收益{{ item.increase }}</span></td>
                    <td :class="{color_red:item.stateSimplify == 'repayment_plan_waiting'}">{{ item.stateText }}</td>
                </tr>
            </tbody>
        </table>

    </el-dialog>
  </div>
  
</template>

<script>
import { Dialog } from "element-ui";
import {listByAll,formatDate,number_format} from "@/libs/publicFun";
    export default {
        data(){
            return {
                tableData:[],
                dialogVisible: false,
            }
        },
        components: {
            "el-dialog": Dialog
        },
        props: {
            value:{
                type:Object
            }
        },
        watch: {
            value(a) {
                this.dialogVisible = a.isShow;
                this.getDataList(a.text);
            },
        },
        methods: {
            close() {
                this.$emit("input", {isShow:false,text:''});
            },
            //获取回款计划表
            getDataList(id){
                this.tableData = []
                this.$axios({
                    url:'/v1/bid/business/userProductInvestInfo',
                    data:id
                }).then(data=>{
                    console.log("111",data);
                    if(data.code == 0){
                        var list = data.result.repayList;
                        list.forEach(element => {
                            var state = listByAll(element.status)
                            this.tableData.push(
                                {
                                   date:formatDate(element.time,"yyyy-MM-dd"), 
                                   principal:number_format(element.principal,2),
                                   interest:number_format(element.interest,2),
                                   totalPrice:number_format(element.principal+element.interest+element.increaseInterest,2),
                                   stateText:state.title,
                                   stateSimplify:state.simplify,
                                   increase:element.increaseInterest
                                }
                            )
                            
                        });
                        console.log("222",this.tableData);
                    }
                })
            }
        }
    }
</script>


<style scoped lang="less">
.returnPlanBox{
    /deep/.el-dialog{
        border-radius: 8px;
        width: 860px !important;
    }
    /deep/.el-dialog__wrapper{
        margin-top: 80px;
        .el-dialog__header{
            padding: 18px;
            background: #f1f1f1;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            .title{
                font-size: 14px;
            }
            .el-dialog__headerbtn{
                top: 14px;
                background: #c7c7c7;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                .el-dialog__close{
                    color: #f1f1f1;
                }
            }
        }
        .el-dialog__body{
            padding-top: 12px;
            padding-bottom: 60px;
        }
    }

    table{
        width: 100%;
        th{
            padding-left: 20px;
            font-weight: normal;
            font-size: 16px;
            border-bottom: 1px solid #e2e2e2;
            height: 60px;
            min-width: 120px;
        }
        td{
            padding-left: 20px;
            border-bottom: 1px solid #e2e2e2;
            height: 46px;
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
}
</style>