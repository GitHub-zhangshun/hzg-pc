//历史借款
<template>
  <div>
    <div v-if="history_show == 1" class="history_show">历史借款维护中...</div>
    <div v-if="history_show == 2" class="group_view column">
      <ul>
        <li class="top row">
          <h1>序号</h1>
          <p>借款金额(元)</p>
          <p>期限(天)</p>
          <p>申请时间</p>
          <p>待还金额(元)</p>
          <p>状态</p>
        </li>
        <li class="item row" v-for="(item, index) in list" :key="index">
          <h1 class="number">{{index+1}}</h1>
          <p>{{item.money}}</p>
          <p>{{item.count}}</p>
          <p>{{item.time}}</p>
          <p>{{item.awaitMoney}}</p>
          <p style="color:#ff4e30" v-if="item.showStatus=='a3e2a0b8-4e9d-4a31-9028-8781012d92b1'">还款中</p>
          <p v-if="item.showStatus=='5969219f-b62a-4b41-9a23-a15fc8fce4c4'">已还款</p>
        </li>
      </ul>
      <div class="line"></div>
      <div class="bottom_view row">
        <p class="center_v color_gray">待还总额: </p>
        <p class="center_v color_black">{{repayMoney}}元</p>
        <p class="page_info center_v color_gray" v-if="list.length>10">第{{num}}页/共{{totalNum}}页 (共{{total}}条记录)</p>
        <el-pagination v-if="total>10" @current-change="pageChange" prev-text="上一页" next-text="下一页" background
          layout="prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Pagination
  } from "element-ui";
  import {
    formatDate,
    number_format,
    listByAll
  } from "@/libs/publicFun";
  export default {
    components: {
      'el-pagination': Pagination
    },
    data() {
      return {
        list: [],
        num: 1,
        total: 1,
        //总页数
        totalNum: 1,
        //待还总额
        repayMoney: 0,
        history_show: 0
      };
    },
    props: ["userId"],
    watch: {
      userId: {
        immediate: true,
        handler: function () {
          this.getData(this.userId);
          this.getRepayMoney(this.userId);
        }
      }
    },
    methods: {
      pageChange(val) {
        this.num = val;
        this.list = [];
        this.getData(this.userId);
        console.log(val)
      },
      /**
       * 获取数据
       */
      getData(id) {
        if (id == '26784cf4-97cd-4c0c-b299-9334b8f3f5df') {
          this.history_show = 1
          return
        }
        this.history_show = 2
        this.$axios
          .post("/v1/bid/business/productListByBorrow", {
            dataId: id,
            keyword: "",
            num: this.num,
            size: 10
          })
          .then(result => {
            console.log(result);
            var arr = result.result;
            this.total = result.total;
            this.totalNum = parseInt((result.total + 10) / 10);
            for (var i = 0; i < arr.length; i++) {
              var item = arr[i];
              var statisticsInfo = item.statisticsInfo;
              this.list.push({
                id: item.Id,
                time: formatDate(item.timeInfo.makeLoan, "yyyy-MM-dd hh:mm"),
                showStatus: item.showStatus,
                money: number_format(item.money, 2),
                count: listByAll(item.interestType).subhead == "天" ? item.count : item.count * 30,
                awaitMoney: number_format(statisticsInfo.stayPrincipal + statisticsInfo.stayInterest +
                  statisticsInfo.stayDamages + statisticsInfo.stayFee, 2)
              })
            }


          })
          .catch(err => {});
      },
      getRepayMoney(id) {
        this.$axios
          .post("/v1/bid/business/loanStatisticsByUserId", id).then((result) => {
            var data = result.result;
            var repayMoney = data.waitInterest + data.waitPrincipal + data.waitDamages + data.waitServiceCharge;
            this.repayMoney = number_format(repayMoney, 2);
          }).catch((err) => {

          });
      }
    }
  };

</script>

<style scoped lang='less'>
.history_show{
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 14px;
  color: #848a93;
}
  .group_view {
    margin-top: 40px;
    margin-bottom: 40px;
  }

  h1 {
    width: 110px;
    margin-left: 40px;
    text-align: left;
    color: #848a93;
  }

  .top p {
    width: 210px;
    font-size: 16px;
    color: #848a93;
    text-align: left;
  }

  .top h1 {
    font-size: 16px;
    color: #848a93;
  }

  .itme h1 {
    font-size: 14px;
  }

  .item p {
    width: 210px;
    font-size: 14px;
    text-align: left;
    color: #848a93;
  }

  li {
    height: 50px;
    line-height: 50px;
  }

  .top {
    background-color: #f3f6f8;
  }

  .line {
    height: 1px;
    background-color: #dedede;
    margin-top: 20px;
  }

  .bottom_view {
    margin-top: 35px;
    margin-left: 40px;
    margin-right: 40px;
    font-size: 14px;
  }

  .page_info {
    margin-left: auto;
    margin-right: 30px;
  }

  /deep/.btn-prev {
    width: 70px !important;
  }

  /deep/.btn-next {
    width: 70px !important;
  }

  /deep/.active {
    background-color: #ff4e30 !important;
  }

  /deep/.el-pager li:hover {
    color: #ff4e30 !important;
  }

</style>
