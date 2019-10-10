<template>
  <el-dialog
    :lock-scroll="false"
    top="20vh"
    :modal="true"
    custom-class="dialog_view"
    :visible.sync="isShow"
    width="30%"
    center
    @close="dialogClose"
  >
  <div>
      <p class="dialog_title">开通账户</p>
      <p class="dialog_intro">账户隔离，资金更安全</p>
  </div>
    <!-- <div v-if="openState==1">
        <p class="dialog_title">开通账户</p>
        <p class="dialog_intro">账户隔离，资金更安全</p>
    </div>
    <div v-if="openState==2">
      <p class="dialog_title">银行卡签约</p>
      <p class="dialog_intro">快捷支付，抢标快人一步</p>
    </div>
    <div v-if="openState==3">
      <p class="dialog_title">委托充值授权</p>
      <p class="dialog_intro">快捷支付，抢标快人一步</p>
    </div> -->
    <el-button @click="goOpen" class="button" :loading="loading">立即开通</el-button>
    <img src="@/assets/images/toast_open_account.png" alt>
  </el-dialog>
</template>

<script>
import { Dialog,Button } from "element-ui";
import { getToken } from '@/libs/auth'
import { redirectTripartite } from '@/libs/publicFun'
export default {
  components: {
    "el-dialog": Dialog,
    'el-button': Button
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(newData, oldData) {
      this.isShow = newData;
      this.$emit("input", newData);
    }
  },
  data() {
    return {
      isShow: false,
      loading:false
      // openState: 0
    };
  },
  methods: {
    dialogClose() {
      this.$emit("input", false);
    },
    /**
     * 去开通 */
    goOpen() {
      this.loading = true
      localStorage.setItem('path', this.$route.path)
      this.$axios('/v1/fin/account/openAccountShanBa')
      .then(data => {
        localStorage.setItem('path',this.$route.fullPath)
        redirectTripartite(data.result)
      })
      .catch( () => {
        this.loading = false
      })

      // if(this.openState == 1){
      //   this.$router.push('/personal/openaccountstep1')
      // }else if(this.openState == 2){
      //   //签约
      //   location.href = process.env.domain + '/v1/fin/account/appSignCard?isApp=false&token='+ getToken()
      // }else if(this.openState == 3){
      //   //授权
      //   location.href = process.env.domain + '/v1/fin/account/appAuth?isApp=false&token='+ getToken()
      // }

    },
  },
  created(){
      //登录账户信息
      // this.$axios("/v1/uc/user/investorCurrent")
      // .then(data => {
      //   let userInfo = data.result.user
      //     if(!userInfo.isOpen){
      //       this.openState = 1
      //     }else{
      //       if(!userInfo.signFlag){
      //         this.openState = 2 
      //       }else{
      //           if(!userInfo.withdrawAuthFlag){            
      //           this.openState = 3
      //         }
      //       }
      //     }
      // });
  }
};
</script>

<style scoped lang="less">
.dialog_view {
  background-image: "@/assets/images/toast_open_account.png";
  background-color: reb;
}
/deep/.el-dialog {
  width: 600px !important;
  background: none;
}
/deep/.el-dialog__header {
  padding: 0;
}
/deep/.el-dialog__headerbtn {
  position: absolute;
  top: 2px;
  right: 11px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
}
/deep/.el-dialog__headerbtn .el-dialog__close {
  color: transparent;
}
/deep/.el-dialog--center .el-dialog__body {
  padding: 0;
}
/deep/.el-dialog__body {
  padding: 0;
}
/deep/.el-dialog__footer {
  padding: 0;
}

.dialog_title {
  position: absolute;
  bottom: 150px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: white;
  font-weight: bold;
}
.dialog_intro {
  position: absolute;
  bottom: 120px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: white;
}
.button {
  position: absolute;
  bottom: 40px;
  height: 48px;
  background: transparent;
  color: white;
  font-size: 18px;
  width: 260px;
  margin-left: 175px;
  cursor: pointer;
  text-align: center;
  border: none;
}
.el-button.is-loading:before{
  background-color: transparent
}

</style>