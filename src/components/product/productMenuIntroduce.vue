//产品介绍 
<template>
  <div class="group_view column">
    <h1>标的详情</h1>
    <table border="1">
      <tr>
        <td class="key">借款方</td>
        <td class="value">{{name}}</td>
        <td class="key">本期借款金额</td>
        <td class="value">{{money}}元</td>
      </tr>

      <tr>
        <td class="key">发布时间</td>
        <td class="value">{{time}}</td>
        <td class="key">起息日</td>
        <td class="value">募集完成次日开始计息</td>
      </tr>

      <tr>
        <td class="key">参考年回报率</td>
        <td class="value">{{rate}}</td>
        <td class="key">借款用途</td>
        <td class="value">{{borrowCause}}</td>
      </tr>

      <tr v-if="repaymentSource != ''">
        <td class="key">保障方式</td>
        <td class="value" colspan="3">{{repaymentSource}}</td>
      </tr>
    </table>

    <h1 v-if="repaymentSource != ''">借款人描述</h1>
    <p class="describe" v-if="repaymentSource != ''">{{pledgeDetail}}</p>
  </div>
</template>

<script>
import { formatDate, number_format } from "@/libs/publicFun";
export default {
  data() {
    return {
      name: "",
      money:"",
      time:"",
      rate:"",
      //借款用途
      borrowCause:"",
      //保障方式
      repaymentSource:"",
      //借款人描述
      pledgeDetail:""
    };
  },
  props: ["productId"],
  watch: {
    productId: {
      immediate: true,
      handler: function() {
        this.getInfo(this.productId);
      }
    }
  },
  methods: {
    /**
     * 获取详情
     */
    getInfo(id) {
      console.log("id=" + id);
      this.$axios
        .post("/v1/bid/business/productDetailById", id)
        .then(result => {
          var data = result.result;
          var timeInfo = data.timeInfo;
          var userInfo = data.userInfo;
          if (data.isEnterprise) {
            this.name = userInfo.enterpriseName;
          } else {
            this.name = userInfo.realName;
          }
          this.money = number_format(data.money,2)
          this.time = formatDate(timeInfo.publish,"yyyy-MM-dd");
          this.rate = data.rate+"%";
          this.borrowCause = data.borrowCause;
          this.repaymentSource = data.repaymentSource;
          this.pledgeDetail = data.pledgeDetail;
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.group_view {
  width: 1120px;
  text-align: left;
  padding-left: 40px;
  padding-right: 40px;
}
h1 {
  font-size: 16px;
  color: #333333;
  font-weight: bold;
  margin-top: 40px;
}
table {
  margin-top: 20px;
  width: 100%;
}
table,
table tr th,
table tr td {
  border: 1px solid #eaeafa;
}
tr {
  height: 50px;
  font-size: 14px;
}
.key {
  width: 170px;
  background-color: #f3f7f7;
  text-align: center;
  line-height: 50px;
  color: #848a93;
}
.value {
  padding-left: 20px;
  color: #333333;
}
.describe {
  font-size: 14px;
  color: #333333;
  text-indent: 2em;
  margin-top: 25px;
  margin-bottom: 60px;
  line-height: 25px;
}
</style>