<template>
  <div class="group column">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="#333333"
      active-text-color="#ff4e30"
    >
      <el-menu-item
        v-for="(item, index) in menuList"
        :key="index"
        :index="item.showType"
      >{{item.title}}</el-menu-item>
    </el-menu>

    <productMenuIntroduce v-bind:productId="productId" v-if="activeIndex=='show_product_detail'"></productMenuIntroduce>
    <productHistoryBorrow v-else-if="activeIndex=='show_product_history_loan'" v-bind:userId="userId"></productHistoryBorrow>
    <productRefundRecord v-else-if="activeIndex=='show_product_refund_log'" v-bind:userId="userId"></productRefundRecord>
    <productLendRecord v-else-if="activeIndex=='show_product_invest_log'" :productId="productId"></productLendRecord>
    <productMenuExtend  v-else v-bind:typeId="typeId"></productMenuExtend>


  </div>
</template>

<script>
import { Menu, MenuItem } from "element-ui";
import productMenuIntroduce from "@/components/product/productMenuIntroduce";
import productMenuExtend from "@/components/product/productMenuExtend";
import productHistoryBorrow from "@/components/product/productHistoryBorrow";
import productRefundRecord from "@/components/product/productRefundRecord";
import productLendRecord from "@/components/product/productLendRecord";
export default {
  components: {
    "el-menu-item": MenuItem,
    "el-menu": Menu,
    productMenuIntroduce,
    productMenuExtend,
    productHistoryBorrow,
    productRefundRecord,
    productLendRecord
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
  data() {
    return {
      activeIndex: "show_product_detail",
      typeId:"",
      menuList: [],
      //用户Id
      userId:""
    };
  },
  methods: {
    /**
     * 菜单变化监听
     */
    handleSelect(key, keyPath) {
      this.activeIndex = key + "";
      for(var i =0;i<this.menuList.length;i++){
        if(this.menuList[i].showType==key){
          this.typeId = this.menuList[i].id;
          return
        }
      }
      console.log(key, keyPath);
    },
    /**
     * 获取详情
     */
    getInfo(id) {
      console.log("id=" + id);
      this.$axios
        .post("/v1/bid/business/productDetailById", id)
        .then(result => {
          var data = result.result;
          var arr = data.discloseGroupList;
          this.userId = data.userInfo.Id;
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            this.menuList.push({
              title: item.name,
              showType: item.showType,
              id: item.Id,
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.group {
  background-color: white;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 35px;
}
.el-menu-item {
  width: 140px;
}
</style>