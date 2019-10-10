//扩展信息
<template>
  <div class="group_view column">
    <ul class="column">
      <li v-for="(item, index) in list" :key="index" class="column">
        <h1>{{item.title}}</h1>
        <p v-if="item.content" class="describe">{{item.content}}</p>
        <ul v-if="item.list">
          <li class="img" v-for="(citem, index) in item.list" :key="index">
            <img :src="citem" alt>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  props: ["typeId"],
  watch: {
    typeId: {
      immediate: true,
      handler: function() {
        this.getInfo(this.typeId);
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
        .post("/v1/bid/business/discloseListByGroup", id)
        .then(result => {
          var arr = result.result;
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var imgs = item.imgLinkList;
            var extend = {};
            extend.title = item.title;
            if (item.content) {
              extend.content = item.content;
            }
            if (imgs) {
              extend.list = imgs;
            }
            this.list.push(extend);
          }
          console.log("discloseListByGroup");
           console.log( this.list);
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
  padding-bottom: 40px;
}
h1 {
  font-size: 16px;
  color: #333333;
  font-weight: bold;
  margin-top: 40px;
}
.describe {
  font-size: 14px;
  color: #333333;
  text-indent: 2em;
  margin-top: 25px;
  line-height: 25px;
}
ul {
  width: 1120px;
  box-sizing: border-box;
}
.img {
  float: left;
}
img {
  width: 200px;
  height: 180px;
  border-radius: 5px;
  margin-left: 20px;
  margin-top: 20px;
}
</style>