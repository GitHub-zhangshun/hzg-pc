<template>
<!-- 帮助中心 -->
    <div>
        <div class="content text_left">
            <el-collapse accordion>
                <el-collapse-item :title="item.type" :name="index" v-for="(item,index) in help" :key="index">
                    <div v-for="(ques,index) in item.question" :key="index" class="inner" @click="clickQues(ques.id)">{{ ques.title }}</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import { Collapse, CollapseItem } from 'element-ui';

    export default {
        data() {
            return {     
                help:[
                    {
                        type:'注册与开户',
                        question: [
                            {id: 1, title: '无法注册？'},
                            {id: 2, title: '开户不成功是什么原因？怎么解决？'},
                            {id: 3, title: '如何修改手机号？'}
                        ]
                    },
                    {
                        type:'充值与提现',
                        question: [
                            {id: 4, title: '提现什么时候能到？'},
                            {id: 5, title: '如何充值？'},
                            {id: 6, title: '充值后银行成功扣款，但余额未显示金额到账？'}
                        ]
                    },
                    {
                        type:'账户与密码',
                        question: [
                            // {id: 7, title: '如何更换银行卡？'},
                            {id: 8, title: '如何修改登录密码？'},
                            // {id: 9, title: '如何修改交易密码？'}
                        ]
                    },
                    {
                        type:'其他问题',
                        question: [
                            {id: 10, title: '投标后什么时候开始计息？'},
                            {id: 11, title: '投标后能否取消？'},
                        ]
                    }
                ]
            };
        },
        methods: {
            clickQues(i){
                this.$router.push({path:'/personal/question',query:{ id : i }})
            }
        },
        components: {
            'el-collapse': Collapse,
            'el-collapse-item': CollapseItem
        }
    }
</script>

<style scoped lang="less">
.content{
    box-sizing: border-box;
    width: 920px;
    background: #fff;
    padding: 30px;
    min-height: 540px;
    /deep/.el-collapse{
        border: none;
        .el-collapse-item__header{
            padding: 0 18px;
            background: #f2f4fc;
            font-size: 16px;
            margin-bottom: 12px;
            border: none;
            height: 46px;
            color: #333;
        }
    }
    .inner{
        padding: 10px 30px;
        cursor: pointer;
    }
}

</style>