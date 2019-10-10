<template>
    <el-dialog :lock-scroll="false" top="20vh" :modal="true" custom-class="dialog_view" :visible.sync="isShow" width="30%"  center @close="dialogClose">
         <p class="dialog_title">和掌柜已接入晋城银行资金存管</p>
         <p class="dialog_intro">为了保证您的资金安全，您需要先进行认证，才可以出借、充值、提现哦~</p>
         <span class="button" @click="toVerify">立即认证</span>
        <img src="@/assets/images/toast_open_account.png" alt="">
       
    </el-dialog>
</template>

<script>
//提示框
import { MessageBox } from 'element-ui';

import { Dialog } from "element-ui";
export default {
  components: {
    "el-dialog": Dialog
  },
  props: {
    value: {
        type: Boolean,
        default: false
    }
  },
  watch: {
      value(newData, oldData){
          this.isShow = newData
          this.$emit('input', newData)
      }
  },
  data() {
    return {
       isShow: false
    };
  },
  methods: {
      dialogClose(){
          this.$emit('input', false)
      },
      toVerify(){
        this.$axios('/v1/fin/account/openAccount')
        .then(data => {
            if (data.code != 0) {
                MessageBox({
                    title:'提示',
                    message: data.message
                }).catch(() => {});
            } else {
                if(data.message !== '' || null){
                    //跳转银行
                    location.href = data.result.message
                }else{
                    MessageBox({
                        title:'提示',
                        message:'跳转银行失败，请稍后重试或联系客服电话400-020-0178'
                    }).catch(() => {});
                    return
                }
            }
        })
      }
  },
};
</script>

<style scoped lang="less">
.dialog_view{
    background-image: "@/assets/images/toast_open_account.png";
    background-color: reb;
}
/deep/.el-dialog{
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

.dialog_title{
    position: absolute;
    bottom: 160px;
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: white;
    font-weight: bold;
}
.dialog_intro{
    position: absolute;
    bottom: 130px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: white;
    font-weight: bold;
}
.button{
    position: absolute;
    bottom: 40px;
    height: 48px;
    line-height: 48px;
    background: none;
    color: white;
    font-size: 18px;
    width: 260px;
    margin-left: 170px;
    cursor: pointer;
    text-align: center;
}
</style>