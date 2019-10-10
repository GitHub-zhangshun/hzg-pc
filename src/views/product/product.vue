<template>
  <!-- 我要出借 -->
  <div class="column product">
    
    <productBanner></productBanner>
    <productState v-on:screen="screen"></productState>
    <productList 
    :state="screenValue.state" 
    :rate="screenValue.rate" 
    :min="screenValue.min"
    :max="screenValue.max"
    :screen="screenValue"
     v-bind:page="page" v-on:total="totalNum"></productList>
    <div class="page">
      <el-pagination
        v-if="total>10"
        @current-change="pageChange"
        prev-text="上一页"
        next-text="下一页"
        :background=true
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import productBanner from "@/components/product/product_banner";
import productState from "@/components/product/product_state";
import productList from "@/components/product/product_list";
import { Pagination } from "element-ui";

export default {
  components: {
    productBanner,
    productState,
    productList,
    "el-pagination": Pagination
  },
  data() {
    return {
      page: 1+"",
      total: 1,
      screenValue:{
        state:"",
        rate:"",
        min:"",
        max:""
      },
    };
  },
  methods: {
    pageChange(val) {
      this.page = val+"";
      console.log(val);
    },
    totalNum(total) {
      this.total = total;
      console.log(total + "-------");
    },
    screen(val){
      this.screenValue = val;
      console.log("aaaa",val)
    }
  },
};
</script>

<style scoped lang='less'>

.product{
  min-height: 600px;
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
.page {
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>