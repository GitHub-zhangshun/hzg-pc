<template>
    <!-- 出借记录 -->
    <div>
        <div class="content">
            <div class="title text_left">
                <span v-for="(item,index) in selectList" :key="index" @click="selected(index)" :class="{current:label == index,red:label == index}">{{ item.title }}</span>
            </div>
    
            <!-- 数据 -->
            <div class="type text_left row">
                <div>
                    <span>{{publicObj.title}}</span>&emsp;
                    <el-select v-model="year" placeholder="请选择">
                        <el-option v-for="(item, index) in (publicObj.itemList && publicObj.itemList[0] && publicObj.itemList[0].sourceValList)" :key="index" :label="item" :value="item">
                        </el-option>
                    </el-select>
                    &nbsp;<i class="iconfont icon-line"></i>&nbsp;

                    <el-select v-model="month" placeholder="请选择">
                        <el-option v-for="(item, index) in (publicObj.itemList && publicObj.itemList[1] && publicObj.itemList[1].sourceValList)" :key="index" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </div>

                <div v-if="JSON.stringify(this.priceObj) !== '{}'">
                    &emsp;<span>{{priceObj.title}}</span>&emsp;
                    <input type="text" v-model="lowPrice" :placeholder="lowPriceHolder">
                    &nbsp;<i class="iconfont icon-line"></i>&nbsp;
                    <input type="text" v-model="highPrice" :placeholder="highPriceHolder">
                </div>

                <el-button round class="searchBtn" @click="search">搜索</el-button>
            </div>
    
            <table>
                <thead>
                    <tr>
                        <th>标的名称</th>
                        <th>参考年回报率</th>
                        <th>发布时间</th>
                        <th>出借总额</th>
                        <th>还款方式</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
    
                <tbody>
                    <tr v-for="item in tableData" :key='item.id'>
                        <td>{{ item.name }}</td>
                        <td>{{ item.rate }}%</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.totalPrice }}</td>
                        <td>{{ item.returnType }}</td>
                        <td :class="{red:item.stateSimplify == 'bid_product_show_raise_underway',
                                     green:item.stateSimplify == 'bid_product_show_raise_finish',
                                     orange:item.stateSimplify == 'bid_product_show_repayment_underway',
                                     orange2:item.stateSimplify == 'bid_product_show_repayment_finish',
                                     finish:item.stateSimplify == 'bid_product_show_over'}">{{ item.state }}</td>
                        <td>
                            <el-button round class="detailBtn" @click="toDetail(item.Id)">查看详情</el-button>
                        </td>
                    </tr>
                    <tr v-if="tableData.length==0">
                        <td colspan="7" style="text-align:center;padding-right:20px">暂无数据</td>                       
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
    </div>
</template>

<script>
    import { Button, Select, Option, Pagination } from 'element-ui';
    import { setTimeout } from 'timers';
    import {listByAll,formatDate,number_format} from "@/libs/publicFun"
    import global from '@/libs/globalVar'
    export default {
        data() {
            return {
                //状态默认选择第一个
                label: 0,
                //初始化类型id，空表示全部
                typeId:"",
                //初始化状态类型数组（默认加上全部）
                selectList: [{
                    "Id": "",
                    "title": "全部记录"
                }],
                //发布日期筛选对象
                publicObj: {},
                //选择年份值
                year: '',
                //选择月份值
                month: '',
                //价格区间筛选对象
                priceObj: {},
                //最低阶
                lowPrice:'',
                //最高价
                highPrice:'',
                 //最低阶placeholder
                lowPriceHolder:'',
                //最高价placeholder
                highPriceHolder:'',
                //数据列表
                tableData: [],
                //pageNum
                pageNum:1,
                //总页数
                totalPageNum:0,
                //分页页数
                page_size:global.sizeCount,
    
            }
        },
        methods: {
            //去下级列表
            toDetail(id) {
                this.$router.push({path:'/personal/lenddetail',query:{id:id}})
            },
            selected(i) {
                this.label = i;
                this.typeId = this.selectList[i].Id;
                this.getRecordList();
            },
            getTypeListAndFiltrateData() {
                //获取出借记录状态类型列表
                this.$axios({
                    url: "/v1/cms/core/statusListByTypeSimplify",
                    data: "bid_product_status_show"
                }).then(data => {
                    var list = data.result;
                    list.forEach(element => {
                        this.selectList.push({
                            Id: element.Id,
                            title: element.title
                        })
                    });
                })
                //获取高级筛选条件列表
                this.$axios({
                    url: "/v1/bid/business/productHighScreenList",
                }).then(data => {
                    var list = data.result;
                    list.forEach(element => {
                        //取出发布日期
                        if (element.simplify == "bid_high_screen_drop_time_year_month") {
                            this.publicObj = {
                                'Id': element.Id,
                                'title': element.title,
                                'itemList': element.itemList,
                            }
                            //取出价格区间
                        } else if (element.simplify == "bid_high_screen_interval_money") {
                            this.priceObj = {
                                'Id': element.Id,
                                'title': element.title,
                                'itemList': element.itemList,
                            }
                            this.lowPriceHolder  = this.priceObj.itemList[0].tips;
                            this.highPriceHolder = this.priceObj.itemList[1].tips;

                        }
                    });
                })
            },
            //获取出借记录的标列表
            getRecordList(){
                
                this.$axios({
                    url:"/v1/bid/business/userProductList",
                    data:{
                        num: this.pageNum,
                        size: global.sizeCount,
                        productStatus:this.typeId,
                        screenList:[
                            {
                                "Id":this.publicObj.Id,
                                itemList:[
                                    {"val":this.year},
                                    {"val":this.month}
                                ]
                            },
                            {
                                "Id":this.priceObj.Id,
                                itemList:[
                                    {"val":this.lowPrice},
                                    {"val":this.highPrice}
                                ]
                            }
                            
                        ]
                    }
                }).then(data=>{
                    if(data.code == 0){
                        //清空数组
                        this.tableData = [];
                        //总条数
                        this.totalPageNum = data.total;

                        var list = data.result;
                        list.forEach(element => {
                            var stateDic  = listByAll(element.showStatus);
                            var returnDic = listByAll(element.repayment);
                            this.tableData.push({
                                Id:element.Id,
                                name:element.name,
                                rate:element.rate,
                                totalPrice:number_format(element.investMoney,2),
                                state:stateDic.title,
                                stateSimplify:stateDic.simplify,
                                returnType:returnDic.title,
                                date:formatDate(element.timeInfo.publish,"yyyy-MM-dd")
                            })
                        });
                    }else{
                        
                    }
                })

            },
            //当前分页数发生变化
            current_change(val){
                this.pageNum = val;
                this.getRecordList()
            },
            //搜索
            search(){
                this.getRecordList();
            }
        },
        components: {
            'el-button': Button,
            'el-select': Select,
            'el-option': Option,
            'el-pagination': Pagination
        },
        created() {
            console.log(this.page_size)
            this.getTypeListAndFiltrateData()
            this.getRecordList()
        },

    }
</script>

<style scoped lang="less">
    .red {
        color: #ff4e30;
    }
    
    .green {
        color: #67ccb7;
    }
    
    .orange {
        color: #f09421;
    }
    .orange2 {
        color: #f09421;
    }
    .finish{
        color: #b3b6b9;
    }
    
    .content {
        box-sizing: border-box;
        width: 920px;
        background: #fff;
        padding: 30px;
        min-height: 540px;
        .title {
            margin-bottom: 22px;
            span {
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
        .type {
            align-items: center;
            justify-content: space-between;
            margin: 16px 0;
            padding-left: 18px;
            /deep/.el-select {
                width: 120px;
                .el-input__inner {
                    height: 32px;
                    line-height: 32px;
                    border-radius: 180px;
                    font-family: '微软雅黑';
                    border: none;
                    background: #f2f4fc;
                }
                .el-input__icon{
                    width: 50px;
                    color: #696666;
                    height: 32px;
                    line-height: 32px;
                }
                input::-webkit-input-placeholder {
                    color: #afb5bc;
                }
            }
            input {
                width: 120px;
                height: 32px;
                border-radius: 180px;
                text-align: center;
                background: #f2f4fc;
                font-family: '微软雅黑';
                &::-webkit-input-placeholder {
                    color: #afb5bc;
                }
            }
            .searchBtn {
                width: 80px;
                height: 32px;
                padding: 0;
                font-size: 14px;
                color: #fff;
                background: #ff4e30;
                margin-left: 36px;
                margin-right: 20px;
            }
        }
        table {
            width: 100%;
            th {
                padding-left: 20px;
                font-weight: normal;
                font-size: 15px;
                border-bottom: 1px solid #e2e2e2;
                border-top: 1px solid #e2e2e2;
                height: 60px;
                // width: 130px;
            }
            td {
                padding-left: 20px;
                border-bottom: 1px solid #e2e2e2;
                height: 60px;
                background: #f2f4fc;
                .detailBtn {
                    width: 90px;
                    height: 34px;
                    color: #696666;
                    background: #f2f4fc;
                    padding: 0;
                    span {
                        position: relative;
                        top: 10px;
                        left: 10px;
                    }
                }
            }
        }
        /deep/.el-pagination {
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
            span {
                background: #fff;
            }
        }
    }
</style>