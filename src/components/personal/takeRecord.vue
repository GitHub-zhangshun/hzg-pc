<template>
<!-- 提现记录 -->
    <div class="takeRecord">
            <table>
                <thead>
                    <tr>
                        <th>状态</th>
                        <th>提交时间</th>
                        <th>订单号</th>
                        <th>提现金额</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in takeInfo" :key='item.id'>
                        <td>{{ item.status }}</td>
                        <td>{{ item.createAt }}</td>
                        <td>{{ item.txnSsn }}</td>
                        <td class="color_red">{{ item.amount }}</td>
                    </tr>
                </tbody>
            </table>

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
import { Pagination} from 'element-ui';
//引入时间戳和全局字典
import { formatDate, listByAll, number_format } from '@/libs/publicFun'
import global from '@/libs/globalVar'

    export default {
        data(){
            return {
                takeInfo:[],
                totalNum:0,
                pageSize:global.sizeCount,
                currentPage:1
            }
        },
        components:{
            'el-pagination': Pagination
        },        
        methods:{
            handleCurrentChange(currentPage){
                this.currentPage = currentPage;
                this.getTakeRecord()
            },
            //获取提现记录
            getTakeRecord(){
                this.$axios({
                    url:"/v1/fin/withdraw/withdrawRecord",
                    data:{ num:this.currentPage, size:this.pageSize },
                }).then(data => {
                    data.result.forEach(item => {
                        item.status = listByAll(item.status).title
                        item.createAt = formatDate(item.createAt,"yyyy-MM-dd hh:mm")
                        item.amount = number_format(item.amount, 2, '.', ',')
                    })
                    this.takeInfo = data.result
                    this.totalNum = data.total
                })
            }
        },
        created(){
            this.getTakeRecord()
        }
    }
</script>
 
<style scoped lang="less">
.takeRecord{
    text-align: center;
    table{
        width: 100%;
        th{
            padding-left: 20px;
            font-weight: normal;
            font-size: 16px;
            border-bottom: 1px solid #e2e2e2;
            border-top: 1px solid #e2e2e2;
            height: 60px;
            width: 130px;
        }
        td{
            padding-left: 20px;
            border-bottom: 1px solid #e2e2e2;
            height: 60px;
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