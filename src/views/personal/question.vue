<template>
<!-- 问题详情 -->
    <div>
        <div class="content text_left" v-for="(item,index) in quesList" :key="index">
            <div>
                <h3>{{ item.title }}</h3>
                <p v-html="item.answer"></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                quesList : [
                    {id: 1, title: '无法注册？', answer: '联系客服400-020-0178。'},
                    {id: 2, title: '开户不成功是什么原因？怎么解决？', answer: '1.信息填写有误：根据页面提示的报错信息，对自己填写的姓名、身份证号码、银行卡号码、手机号进行校对，确认填写无误；<br>2.银行卡问题：<br>（1）您输入的银行卡没有开通网上银行业务；<br>（2）不支持您使用的银行卡。<br>3.用户开户时填写的信息与银行已有用户的信息重复；<br>4.如以上仍未解决您的问题，请直接拨打客服电话 400-020-0178。'},
                    {id: 3, title: '如何修改手机号？', answer: '登录和掌柜官方网站，进入“个人中心”进入“账户设置”，选择“登录手机号”，点击“修改”按钮。'},
                    {id: 4, title: '提现什么时候能到？', answer: '操作提现的T+0（当天）到账，如果用户对提现有任何疑问，可联系和掌柜客服(400-020-0178)咨询。'},
                    {id: 5, title: '如何充值？', answer: '登录和掌柜官方网站，通过“个人中心”页面进入“我的账户”，点击“充值”按钮即可。'},
                    {id: 6, title: '充值后银行成功扣款，但余额未显示金额到账？', answer: '请耐心等待5分钟尝试刷新后若仍未充值成功，请联系客服400-020-0178。'},
                    {id: 7, title: '如何更换银行卡？', answer: '登录和掌柜官方网站，通过“个人中心”页面进入“账户设置”，选择“我的银行卡”，点击“设置”按钮即可。'},
                    {id: 8, title: '如何修改登录密码？', answer: '登录和掌柜官方网站，通过“个人中心”页面进入“账户设置”，选择“修改登录密码”，点击“修改”按钮即可。'},
                    {id: 9, title: '如何修改交易密码？', answer: '登录和掌柜官方网站，通过“个人中心”页面进入“账户设置”，选择“重置交易密码”，点击“充值”按钮即可。'},
                    {id: 10, title: '投标后什么时候开始计息？', answer: '按照标的约定起息日开始计息。'},
                    {id: 11, title: '投标后能否取消？', answer: '投标后不可以取消，如果此标流标资金会回到账户可用余额里。如果审核通过则必须等到标的到期后才能收回本金利息，如果有提前还款按实际回款时间来定。'},
                ],
                typeId:''
            }
        },
        created(){
            this.quesList = this.quesList.filter(item => { return item.id == this.$route.query.id })
        }
    }
</script>

<style scoped lang="less">
.content{
    box-sizing: border-box;
    width: 920px;
    background: #fff;
    padding: 30px;

    h3{
        font-size: 18px;
        color: #333;
        margin: 16px 0;
    }

    p{
        line-height: 30px;
    }

}
</style>