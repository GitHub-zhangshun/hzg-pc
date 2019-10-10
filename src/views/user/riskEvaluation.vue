<template>
  <!-- 风险测评 -->
  <div class="group column">
    <p class="top_button">风险能力承受评测</p>
    <ul>
      <li class="column" v-for="(item, index) in list" :key="index">
        <h1>{{item.title}}</h1>
        <el-radio-group class="column" v-model="item.radio">
          <el-radio
            @change="select"
            v-for="(citem, index) in item.list"
            :key="index"
            :label="citem.Id"
          >{{citem.remark}}</el-radio>
        </el-radio-group>
      </li>
    </ul>
    <button :class="isClick?'select':''" @click="isClick?submit():''">提交</button>
  </div>
</template>

<script>
import { Radio, RadioGroup } from "element-ui";
export default {
  components: {
    "el-radio": Radio,
    "el-radio-group": RadioGroup
  },
  created() {
    this.getData();
  },
  data() {
    return {
      list: [],
      isClick:false
    };
  },
  methods: {
    getData() {
      this.$axios
        .post("/v1/cms/core/typeItemList", {
          queryType: 1,
          queryValue: "investor_risk_evaluation"
        })
        .then(result => {
          console.log(result);
          var array = result.result;
          array.forEach(element => {
            var item = {};
            item.id = element.Id;
            item.title = element.title;
            item.list = element.children;
            item.radio = "";
            this.list.push(item);
          });
        })
        .catch(err => {});
    },
    select() {
      console.log("调用");
      var list = this.list;
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (!item.radio) {
          console.log("未选择完");
          this.isClick = false;
          return;
        }
      }
      this.isClick = true;
    },
    submit() {
      console.log("调用")
      var list = [];
      this.list.forEach(element => {
        list.push({
            subjectId:element.id,
            answerId:element.radio
        })
      });
      
      this.$router.push({ path: "/niskEvaluationResult" ,query:{
        list:list}});
    }
  }
};
</script>

<style scoped lang="less">
.group {
  width: 1130px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 60px;
  padding-bottom: 50px;
  background: white;
  margin-top: 20px;
  margin-bottom: 35px;
  padding-left: 35px;
  padding-right: 35px;
}
.top_button {
  width: 195px;
  height: 48px;
  line-height: 48px;
  background: #ff4e30;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  font-weight: bold;
}
li {
  text-align: left;
  margin-top: 30px;
  margin-left: 15px;
}
h1 {
  font-size: 15px;
  color: #333333;
  font-weight: bold;
}
.el-radio {
  margin-left: 20px;
  margin-top: 15px;
}

/deep/.el-radio {
  color: #969090;
}
/deep/.is-checked {
  color: #969090;
}
/deep/.el-radio__label {
  color: #969090;
  font-size: 13px;
}
/deep/.el-radio__input.is-checked + .el-radio__label {
  color: #969090;
}
/deep/.el-radio__input.is-checked .el-radio__inner {
  border-color: #ff4e30;
  background: white;
}

/deep/.el-radio__inner:hover {
  border-color: #ff4e30;
}

/deep/.el-radio__inner::after {
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: #ff4e30;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%) scale(0);
  transform: translate(-50%, -50%) scale(0);
  -webkit-transition: -webkit-transform 0.15s ease-in;
  transition: -webkit-transform 0.15s ease-in;
  transition: transform 0.15s ease-in;
  transition: transform 0.15s ease-in, -webkit-transform 0.15s ease-in;
  transition: transform 0.15s ease-in, -webkit-transform 0.15s ease-in;
}
button {
  width: 320px;
  height: 50px;
  background: #c4c7c8;
  border-radius: 180px;
  font-size: 16px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}
.select{
  cursor: pointer;
   background:#ff4e30;
}
</style>