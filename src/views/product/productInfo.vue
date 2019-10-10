<template>
  <!-- 产品详情 -->
  <div>
    <div class="nav_view row">
      <p class="text_size_14 color_gray_blun">您所在的位置: <a href="/">首页</a> > <a href="/product">我要出借</a> > <span class="color_black">项目详情</span></p>
      <div class="right row">
        <img :src="require('@/assets/images/icon_prompt.png')" alt="">
        <p>网贷有风险, 出借需谨慎</p>
      </div>
      </div>
    <!--  基本信息 -->
    <productInfoBasic v-bind:productId="productId"></productInfoBasic>
    <productMenu v-bind:productId="productId"></productMenu>
  </div>
</template>

<script>
import productInfoBasic from "@/components/product/productInfoBasic";
import productMenu from "@/components/product/productMenu";
export default {
  components: {
    productInfoBasic,
    productMenu
  },
  data() {
    return {
      productId: ""
    };
  },
  created() {
    this.productId = this.$route.query.id;
  },
  methods: {}
};
</script>

<style scoped>
.nav_view{
  height: 50px;
  line-height: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
}
a{
cursor: pointer;
color: #848a93;
}
.right{
  margin-left: auto;
  align-items: center;
}
.right img{
  width: 14px;
  height: 14px;
  margin-bottom: 2px;
  /* margin-top: auto; */
  /* margin-bottom: auto; */
}
.right p{
  color: #848a93;
  font-size: 14px;
  margin-left: 4px;
}
</style>