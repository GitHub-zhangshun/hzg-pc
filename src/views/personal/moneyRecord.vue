<template>
<!-- 资金记录 -->
    <div>
        <div class="content">
            <div class="title text_left">
                <span v-for="(item,index) in selectList" :key="index" @click="selected(index)" :class="{current:label == index,red:label == index}">{{ item.title }}</span>
            </div>

            <!-- 数据 -->
            <table>
                <thead>
                    <tr>
                        <th>状态</th>
                        <th>完成时间</th>
                        <th>账户余额</th>
                        <th>金额</th>
                        <th>操作</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in tableData" :key='item.id'>
                        <td>{{ item.state }}</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.usable }}</td>
                        <td class="red">{{item.flowType=='in'?'+':'-'}}{{ item.amount }}</td>
                        <td><el-button v-if="item.stateSimplify != 'capital_other' && item.usable != '--'" round class="detailBtn" @click="toDetail(item.capitalLogId,item.stateSimplify)">查看详情</el-button></td>
                    </tr>
                    <tr v-if="tableData.length==0">
                        <td colspan="5" style="text-align:center;padding-right:20px">暂无数据</td>                       
                    </tr>
                </tbody>
            </table>

            <!-- 分页 -->
            <el-pagination 
            v-if="totalPageNum>page_size"
            background 
            prev-text="上一页" 
            next-text="下一页" 
            layout="prev, pager, next" 
            :total="totalPageNum" 
            :page-size="page_size" 
            @current-change="current_change">
            </el-pagination>
        </div>

        <!-- 弹框 -->
        <messageBox v-model="alertBox"></messageBox>

    </div>
</template>

<script>
import { Button, Pagination} from 'element-ui';
import messageBox from '@/components/personal/messageBox';
import {listByAll,formatDate,number_format} from "@/libs/publicFun"
import global from '@/libs/globalVar'
    export default {
        data(){
            return {
                isShow: false,
                //默认选择第一个
                label: 0,
                 //初始化类型id，空表示全部
                typeId:null,
                //初始化状态类型数组（默认加上全部）
                selectList: [{
                    "Id": null,
                    "title": "全部记录"
                }],
                 //数据列表
                tableData: [],
                //pageNum
                pageNum:1,
                //总页数
                totalPageNum:0,
                //分页页数
                page_size:global.sizeCount,

                alertBox:{
                    isShow:false,
                    text:''
                }
            }
        },
        methods:{
            //筛选类型
             selected(i){
                this.label = i;
                this.typeId = this.selectList[i].Id;
                this.getDataList();
            },
             //当前分页数发生变化
            current_change(val){
                this.pageNum = val;
                this.getDataList()
            },
            //查看详情
            toDetail(capitalLogId,stateSimplify){               
                this.alertBox = {
                    isShow :true,
                    capitalLogId:capitalLogId,
                    text:stateSimplify
                }
            },
            //获取资金记录类型
            getTypeList(){
                 this.$axios({
                    url: "/v1/fin/capital/capitalTypeList",
                    data: ""
                }).then(data => {
                    var list = data.result;
                    list.forEach(element => {
                        this.selectList.push({
                            Id: element.Id,
                            title: element.title
                        })
                    });
                })
            },
            //获取数据列表
            getDataList(){
                this.$axios({
                    url:"/v1/fin/capital/capitalList",
                    data:{
                        num: this.pageNum,
                        size: global.sizeCount,
                        typeId:this.typeId,
                    }
                }).then(data=>{
                    if(data.code == 0){
                        //清空数组
                        this.tableData = [];
                        //总条数
                        this.totalPageNum = data.total;

                        var list = data.result;
                        list.forEach(element => {
                            var stateDic  = listByAll(element.typeId);
                            this.tableData.push({
                                capitalLogId:element.capitalLogId,
                                usable:element.usable == null?'--':number_format(element.usable,2),
                                amount:number_format(element.amount,2),
                                state:stateDic.title,
                                stateSimplify:stateDic.simplify,
                                flowType:element.flowType,
                                date:formatDate(element.createAt,"yyyy-MM-dd hh:mm")
                            })
                        });
                    }else{
                        
                    }
                })

            }           
        },
        created(){
            this.getTypeList();
            this.getDataList();
        },
        components:{
            'el-button': Button,
            'el-pagination': Pagination,
            messageBox
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
            span{
                 cursor: pointer;
                border-right: 1px solid #e2e2e2;
                padding: 0 18px;
                // &:nth-of-type(2),&:nth-of-type(3),&:nth-of-type(4){
                //     border-right: 1px solid #e2e2e2;
                //     padding: 0 18px;
                // }
                &:first-of-type {
                    border-right: 0;
                }
                &:last-of-type {
                    padding-left: 18px;
                    border-right: 0;
                }
                &.current {
                    font-size: 16px;
                }
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
                min-width: 70px;
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