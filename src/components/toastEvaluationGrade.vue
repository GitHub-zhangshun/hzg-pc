//提示测评
<template>
  <el-dialog :lock-scroll="false" top="20vh" :modal="true" custom-class="dialog_view" :visible.sync="isShow" width="30%"
    center @close="dialogClose">
    <p class="dialog_title">风险提示</p>
    <p class="dialog_intro">
      感谢您参与测评，和掌柜产品须出借人的风险测评等级为{{gradeTxt}}及以上方能认购，您当前的风险测评结果为{{userGrade}}未能达标，请致电和掌柜客服400-020-0178了解详情。</p>
    <span class="button" @click="goEvaluation">去测评</span>
    <img src="@/assets/images/toast_evaluation_grade.png" alt>
  </el-dialog>
</template>

<script>
  import {
    Dialog
  } from "element-ui";
  import {
    isLogin
  } from "@/libs/auth";
  export default {
    components: {
      "el-dialog": Dialog
    },
    // props: ["isShow", "productEvalutionGrade"],
    props: {
      value: {
        type: Object
      }
    },
    watch: {
      value(a) {
        this.isShow = a.isShowBox
        if (a.grade == 1) {
          this.gradeTxt = "保守型";
        } else if (a.grade === 2) {
          this.gradeTxt = "稳健型";
        } else if (a.grade === 3) {
          this.gradeTxt = "积极型";
        }
      }

      // productEvalutionGrade: {
      //   immediate: true,
      //   handler: function() {
      //       if(this.productEvalutionGrade==1){
      //         this.gradeTxt = "保守型";
      //       }else if(this.productEvalutionGrade==2){
      //         this.gradeTxt = "稳健型";
      //       }else if(this.productEvalutionGrade==3){
      //         this.gradeTxt = "积极型";
      //       }
      //   }
      // }
    },
    data() {
      return {
        isShow: false,
        gradeTxt: "",
        userGrade: "",
      };
    },
    created() {
      if (isLogin()) {
        this.getUserInfo();
      }

    },
    methods: {
      dialogClose() {
        // this.$emit("value", false);
        this.$emit("input", {
          isShowBox: false,
          grade: ''
        });

      },
      goEvaluation() {
        this.$router.push({
          path: "/niskEvaluation"
        });
      },
      /**
       * 获取用户信息
       */
      getUserInfo() {
        this.$axios
          .post("/v1/uc/user/investorCurrent", "")
          .then(result => {
            console.log(result);
            var data = result.result;
            this.isOpen = data.user.isOpen;

            if (data.user.riskLevelInfo) {
              console.log("测评————————————————————");
              console.log("++++++++++++++++++++++++");
              //评测信息
              this.isEvaluation = true;
              if (
                data.user.riskLevelInfo.riskLevelSimplify == "risk_level_keep"
              ) {
                //保守型
                this.userGrade = "保守型";

              } else if (
                data.user.riskLevelInfo.riskLevelSimplify == "risk_level_steady"
              ) {
                //稳健型
                this.userGrade = "稳健型";
              } else if (
                data.user.riskLevelInfo.riskLevelSimplify == "risk_level_active"
              ) {
                //积极型
                this.userGrade = "积极型";
              }
            } else {
              this.isEvaluation = false;
            }
            this.isNovice = data.user.isNew;
          })
          .catch(err => {});
      }
    }
  };

</script>

<style scoped lang="less">
  .dialog_view {
    background-image: "@/assets/images/toast_open_account.png";
    background-color: reb;
  }

  /deep/.el-dialog {
    width: 528px !important;
    height: 429px;
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

  .dialog_title {
    position: absolute;
    top: 180px;
    width: 100%;
    text-align: center;
    font-size: 22px;
    color: #333333;
    font-weight: bold;
  }

  .dialog_intro {
    position: absolute;
    top: 220px;
    left: 50px;
    right: 50px;
    width: 428px;
    text-align: left;
    font-size: 12px;
    color: #848a93;
    font-weight: bold;
    line-height: 25px;
  }

  .button {
    position: absolute;
    bottom: 35px;
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
