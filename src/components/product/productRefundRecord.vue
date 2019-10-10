//还款记录
<template>
  <div>
    <div class="record_show" v-if="record_show==1">还款记录维护中...</div>
    <div class="group_view column" v-if="record_show==2">
      <p class="text_size_14 color_gray">借款人在本平台内历史本息还款次数:
        <span class="color_black">{{repayCount}}次</span>
      </p>
      <p class="text_size_14 color_gray end">历史逾期次数:
        <span class="color_black">{{overdueCount}}次</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        record_show:0,
        repayCount: "",
        overdueCount: ""
      }
    },
    props: ["userId"],
    watch: {
      userId: {
        immediate: true,
        handler: function () {
          this.getData(this.userId);
        }
      }
    },
    methods: {
      /**
       * 获取数据
       */
      getData(id) {
        if (id == '26784cf4-97cd-4c0c-b299-9334b8f3f5df') {
          this.record_show = 1
          return
        }
        this.record_show = 2
        this.$axios
          .post("/v1/bid/business/loanStatisticsByUserId", id)
          .then(result => {
            var data = result.result;
            this.repayCount = data.repayCount;
            this.overdueCount = data.overdueCount;

          })
          .catch(err => {});
      }
    }
  };

</script>

<style scoped>
.record_show{
  padding-top: 40px;
  padding-bottom: 40px; 
  color: #848a93;
  font-size: 14px;
}
  .group_view {
    width: 1120px;
    text-align: left;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .end {
    margin-top: 20px;
  }

</style>
