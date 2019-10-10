<template>
<!-- 银行存管银行 -->
    <div class="bankAccount">
        <div class="row top">
            <img src="@/assets/images/personal_img/icon_bankLogo.png">
            <div>
                <p class="title">晋城存管银行</p>
                <p class="text">您的资金由晋城银行管理</p>
            </div>
        </div>

        <div class="bot">
            <p class="color_gray text_size_16">开户人：<span class="color_black">{{ user && user.realName }}</span></p>
            <p class="color_gray text_size_16">存管银行：<span class="color_black">{{ user && user.account }}</span></p>
            <p class="color_gray text_size_16">开户手机号：<span class="color_black">{{ user && user.phone }}</span></p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                user:{}
            }
        },
        created(){
            this.user = localStorage.getItem('userInfo') && JSON.parse(localStorage.userInfo).user
        }
    }
</script>

<style scoped lang="less">
.bankAccount{
    width: 80%;
    margin: 0 auto;
    .top{
        align-items: center;
        line-height: 26px;
        margin-bottom: 20px;
        .title{
            font-size: 20px;
            color: #333;
        }
        .text{
            color: #adafb1;
        }
        img{
            width: 46px;
            height: 46px;
            margin-right: 12px;
        }
    }
    .bot{
        width: 68%;
        margin: 0 auto;
        margin-bottom: 20px;
        line-height: 36px;
    }
}


</style>