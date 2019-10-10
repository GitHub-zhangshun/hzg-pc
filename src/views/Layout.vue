<template>
  <!-- layout -->
  <div>
    <indexHeader :key="(new Date()).toString()" class="header"></indexHeader>
    <div class="contain">
      <router-view></router-view>
    </div>
    <indexFooter></indexFooter>
    <el-dialog :visible="dialogVisible" :show-close="false" class="pwd_dialog">
      <div class="close" slot="title" @click="dialogVisible=false">
        <img src="@/assets/images/login_register_forget_img/icon_Close.png" alt="">
      </div>
      <div class="dialog_text">
        <p class="big">和掌柜平台已升级至陕坝银行存管系统</p>
        <p class="small">
          <span>为保障您账户安全，请先修改您的</span>
          登录密码
          <span>和</span>
          支付密码。
        </p>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    Button,
    Dialog
  } from 'element-ui';
  import indexFooter from '@/components/footer'
  import indexHeader from '@/components/header'
  export default {
    components: {
      indexFooter,
      indexHeader,
      'el-button':Button,
      'el-dialog':Dialog
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    computed:{
      loginPwd(){
        return this.$store.getters.loginPwd || false
      }
    },
    watch:{
      loginPwd(n){
        this.dialogVisible = n
      }
    },
    methods:{
      submit(){
        this.$store.commit('loginPwd',false)
        this.$router.push({path:'/forget_pwd',query:{'isLogin':true}})
      }
    },
  }

</script>

<style scoped lang="less">
  .contain {
    min-height: calc(100vh - 444.5px)
  }
  .pwd_dialog{
  /deep/.el-dialog{
      width: 424px;
      height: 410px;
      background: url('../assets/images/login_register_forget_img/bg.png') no-repeat center center;
      border-radius: 8px;
      .el-dialog__header{
        display: flex;
        justify-content: flex-end; 
        padding: 14px 18px 0 0;
        .close{
          width: 28px;
          height: 27px;
          .img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .el-dialog__body{
        padding: 195px 0 0 0; 
        .dialog_text{
          line-height: 1.5;
          .big{
            color: #000000;
            font-size: 18px;
          }
          .small{
            color: #000000;
            font-size: 14px;
              span{
              color: #979ea1;
            }
          }
        }
      }
      .el-dialog__footer{
        text-align: center;
        padding: 32px 0 0 0;
        div{
          button{
            width: 296px;
            height: 54px;
            border-radius: 54px;
            background: #05a766;
            border: none;
          }
        }
      }
    }
  }
</style>
