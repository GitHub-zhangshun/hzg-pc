//出借记录
<template>
  <div class="column">
    <ul>
      <li class="top row">
        <p class="name">出借人</p>
        <p class="time">出借时间</p>
        <p class="money">出借金额</p>
      </li>

      <li class="row" v-for="(item, index) in list" :key="index">
        <img :src="item.headImg" alt>
        <p class="name">{{item.phone}}</p>
        <p class="time">{{item.time}}</p>
        <p class="money">{{item.money}}元</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatDate,number_format } from "@/libs/publicFun";
export default {
  data() {
    return {
      list: [],
      num:1,
      total:1,
      //总页数
      totalNum:1
    };
  },
  props: ["productId"],
  watch: {
    productId: {
      immediate: true,
      handler: function() {
        this.getData(this.productId);
      }
    }
  },
  methods:{
    pageChange(val){
      this.num = val;
      console.log(val)
    },
    /**
     * 获取数据
     */
    getData(id){
     
      this.$axios
        .post("/v1/bid/business/productInvestListByBid", {
          dataId:id,
          keyword:"",
          num:this.num,
          size:9999
        })
        .then(result => {
          var arr = result.result;
          this.total = arr.length;
          this.totalNum = parseInt((arr.length+10)/10);
          console.log(arr);
          for(var i=0;i<arr.length;i++){
             console.log("2222222222222")
            var item = arr[i];
            this.list.push({
              id:item.Id,
              phone:item.investorInfo.phone,
              headImg:item.investorInfo.headImg?item.investorInfo.headImg:require("@/assets/images/personal_img/icon_defaulticon.png"),
              money:number_format(item.money,2),
              time:formatDate(item.createAt,"yyyy-MM-dd hh:mm") 
            })
          }
           console.log("1111111111")

        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.top{
  background-color: #f3f6f8;
}

.top p {
  /* width: 210px; */
  font-size: 16px;
  color: #848a93;
  text-align: left;
}

ul{
    /* padding-bottom: 30px; */
    margin-top: 40px;
    margin-bottom: 40px;
}
li {
  line-height: 50px;
  font-size: 14px;
  color: #969090;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 180px;
  margin-bottom: auto;
  margin-top: auto;
  margin-left: 40px;
}
.top{
    margin-bottom: 10px;
}
.top .name{
    margin-left: 100px;
    width: 150px;
    text-align: left;
}
.name{
    width: 150px;
    text-align: left;
    margin-left: 20px;
}
.time{
    margin-left: 260px;
    width: 160px;
    text-align: left;
}
.money{
    margin-left: 200px;
    text-align: left;
}
</style>