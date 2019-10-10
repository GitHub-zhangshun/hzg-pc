<template>
  <!-- 风险测评结果 -->
  <div class="group column">
    <img class="center_h" :src="relust.img" alt>
    <p class="center_h txt">您的风险测评等级为</p>
    <p class="center_h type color_black">{{relust.type}}</p>
    <p class="center_h desc">{{relust.description}}</p>
    <button @click="submit" class="center_h">完成测评</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      relust: {
        type: "",
        img: "",
        description:""
      },
      positive: {
        img: require("@/assets/images/personal_img/icon_positive.png")
      },
      keep: {
        img: require("@/assets/images/personal_img/icon_keep.png")
      }
    };
  },
  created() {
    this.list = this.$route.query.list;
    console.log("传入数据", this.list);
    this.getResult();
  },
  methods: {
    getResult() {
      this.$axios
        .post("/v1/uc/user/investorRiskEvaluate", {
          itemList: this.list
        })
        .then(result => {
          console.log("测评结果", result);
          var data = result.result;
          var obj = {};
          console.log("obj",0);
          obj.type = data.riskLevelTxt;
          console.log("obj",1);
          obj.description = data.riskLevelRemark;
          console.log("obj",2);
          if (data.riskLevelSimplify == "risk_level_keep") {
            obj.img = require("@/assets/images/personal_img/icon_keep.png");
          } else if (data.riskLevelSimplify == "risk_level_steady") {
            //稳健
            obj.img = require("@/assets/images/personal_img/icon_solid.png");
          } else if (data.riskLevelSimplify == "risk_level_active") {//积极
            obj.img =  require("@/assets/images/personal_img/icon_positive.png");
          }
          console.log("obj",obj);
          this.relust =obj;
        })
        .catch(err => {});
    },
    submit(){
        this.$router.go(-2)
    }
  }
};
</script>

<style scoped>
.group {
  width: 1200px;
  background: white;
  margin-top: 20px;
  margin-bottom: 35px;
  padding-top: 60px;
  padding-bottom: 80px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
img {
  width: 116px;
  height: 116px;
}
.txt {
  font-size: 12px;
  color: #848a93;
  margin-top: 20px;
}
.type {
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
}
.desc {
  font-size: 14px;
  color: #848a93;
  width: 745px;
  text-align: left;
  margin-top: 30px;
  line-height: 24px;
}
button {
  width: 320px;
  height: 50px;
  border-radius: 180px;
  background-color: #ff4e30;
  color: white;
  font-size: 16;
  font-weight: bold;
  margin-top: 30px;
  cursor: pointer;
}
</style>