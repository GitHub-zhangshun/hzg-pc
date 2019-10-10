//提示测评
<template>
    <el-dialog :lock-scroll="false" top="20vh" :modal="true" custom-class="dialog_view" :visible.sync="isShow" width="30%"  center @close="dialogClose">
         <p class="dialog_title">风险测评提示</p>
         <p class="dialog_intro">网络出借可能获得比较高的出借收益，但也存在比较大的出借风险，请您根据自身的风险承受能力，审慎作出出借决定。为了便于您了解自身的风险承受能力，选择合适的出借标的和服务，请您填写以下风险承受能力评估问卷。下列问题可协助评估您对出借标的和服务的风险承受能力，请您根据自身情况认真选择。评估结果仅供参考，不构成出借建议。为了及时了解您的风险承受能力，我们建议您持续做好动态评估。我们承诺对您的所有个人资料保密。</p>
         <span class="button" @click="goEvaluation" >去测评</span>
        <img src="@/assets/images/toast_evaluation.png" alt="">
       
    </el-dialog>
</template>

<script>
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
      goEvaluation() {
      this.$router.push({ path: "/niskEvaluation" });
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
    width: 528px !important;
    height: 521px;
    background: none;
}
/deep/.el-dialog__header {
    padding: 0;
}
/deep/.el-dialog__headerbtn {
    position: absolute;
    top: 2px;
    right: 30px;
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
    bottom: 310px;
    width: 100%;
    text-align: center;
    font-size: 22px;
    color:#333333;
    font-weight: bold;
}
.dialog_intro{
    position: absolute;
    top: 230px;
    left: 50px;
    right: 50px;
    width: 428px;
    text-align: left;
    font-size: 12px;
    color: #848a93;
    font-weight: bold;
    line-height: 25px;
}
.button{
    position: absolute;
    bottom: 30px;
    height: 56px;
    line-height: 56px;
    background: none;
    color: white;
    font-size: 18px;
    width: 365px;
    margin-left: 80px;
    cursor: pointer;
    text-align: center;
}
</style>