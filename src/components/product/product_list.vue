// 产品列表
<template>
  <div>
    <ul>
      <li    @click="producut(item.id)" v-for="(item, index) in list" :key="index" class="item row">
        <img class="tag" v-if="item.firstBuy" src="@/assets/images/home_img/new_tag.png">
        <div class="item_content row">
          <div class="title_view column">
            <p class="title color_black text_size_16">{{item.title}}</p>
            <p class="rate color_red text_size_34">
              {{item.rate}}<span class="color_red text_size_14">%</span>
            </p>
            <p class="rate_txt color_gray text_size_12">参考年回报率</p>
          </div>

          <div class="time_view column">
            <p class="color_black text_size_24">
              {{item.count}}<span class="color_black text_size_14">{{item.unit}}</span>
            </p>
            <p class="rate_txt color_gray text_size_12">持有期限</p>
          </div>

          <div class="time_view column">
            <p class="color_black text_size_24">
              {{item.money}}<span class="color_black text_size_14">元</span>
            </p>
            <p class="rate_txt color_gray text_size_12">项目金额</p>
          </div>
          <!--  进度条视图 -->
          <div class="progress column">
            <canvas :v-model="item.tag" :id="item.tag" width="160" height="80"></canvas>
            <div class="center_h row" style="width: 134px;position: relative;">
              <p class="center_v text_size_12 color_gray" style="width: 20px;text-align: center;">0</p>

              <p
                v-if="item.state=='cfed3414-a33e-4c43-9572-5777f21b543d'"
                class="state_text text_size_14 color_red"
                style=" text-align: center;"
              >募集中</p>
              <p
                v-if="item.state=='bdc7ad49-80c2-4b3d-a160-2d739708b72f'
              ||item.state=='132ea5f0-f5a2-47a7-80fc-338ab2029279'"
                class="state_text text_size_14"
                style=" text-align: center;color:#60c9b6"
              >募集完成</p>

              <p
                v-if="item.state=='a3e2a0b8-4e9d-4a31-9028-8781012d92b1'
              ||item.state=='f8e7aa1f-2160-454a-8e78-9466bb1208a3'"
                class="state_text text_size_14"
                style=" text-align: center;color:#f09421"
              >还款中</p>

              <p
                v-if="item.state=='5969219f-b62a-4b41-9a23-a15fc8fce4c4'"
                class="state_text text_size_14"
                style=" text-align: center;color:#f09421"
              >已还款</p>

              <p
                v-if="item.state=='5033e319-5116-4b9a-8517-35df02491876'
              ||item.state=='340208fc-10fb-4604-baa6-9d8bb9862f38'
              ||item.state=='f741a93c-06ad-4722-a3bc-9b865b41e39c'"
                class="state_text text_size_14"
                style=" text-align: center;color:#b3b6b9"
              >已结束</p>
              <p
                class="end center_v text_size_12 color_gray"
                style="width: 20px;text-align: center;"
              >100</p>
            </div>
          </div>
        </div>

        <div class="right_view column">
          <button
            @click="producut(item.id)"
            v-if="item.state=='cfed3414-a33e-4c43-9572-5777f21b543d'"
            class="state_raise"
          >立即出借</button>
          <button v-else class="state_finish">已结束</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const F2 = require("@antv/f2");
import { productApi } from "@/api/product";
import { listByAll} from "@/libs/publicFun";

export default {
  data() {
    return {
      list: [],
      info: null,
      index: 1
    };
  },
  props: ["page","state","rate","min","max","screen",'number'],
  watch: {
   page:{
      immediate:true,
      handler:function(){
        this.getListData(10,this.page);
     }
    },
    state:{
      immediate:true,
      handler:function(){
        this.getListData(10,this.page);
     }
    },
    rate:{
      immediate:true,
      handler:function(){
        this.getListData(10,this.page);
     }
    },
    min:{
      immediate:true,
      handler:function(){
        this.getListData(10,this.page);
     }
    },
    max:{
      immediate:true,
      handler:function(){
        this.getListData(10,this.page);
     }
    },
    screen:{
      immediate:true,
      handler:function(){
        console.log("screen==",screen);
     }
    },
    
  },
  //
  created() {
  },
  mounted() {
  },
  methods: {
    
    /**
     * 获取数据
     */
    getListData(index, page) {
      this.list = [];
      this.$axios
        .post("/v1/bid/business/pcProductList", {
          num: page,
          size: 10,
          monthCountMax:this.max,
          monthCountMin:this.min,
          rate:this.rate,
          productStatus:this.state 
        })
        .then(result => {
          // console.log(result);
          this.total = result.total;
          this.$emit("total",result.total);
          var data = result.result;
          this.list = [];
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var product = {};
            product.id = item.Id;
            product.tag = "abc" + i;
            product.title = item.name;
            product.rate = item.rate;
            product.unit = listByAll(item.interestType).subhead;
            if (item.productType == "e80c9c8c-6df6-49a8-b583-121392e2022d") {
              product.firstBuy = true; //新手标
            } else {
              product.firstBuy = false; //不是新手标
            }

            if (
              item.attachInfo.riskLevel ==
              "586d7297-7e8a-4a3d-86a9-ec13f6994d01"
            ) {
              //保守型
              product.evalutionGrade = 1;
            } else if (
              item.attachInfo.riskLevel ==
              "95673ecf-21bb-42e1-97e1-0a436234c5cc"
            ) {
              //稳健型
              product.evalutionGrade = 2;
            } else if (
              item.attachInfo.riskLevel ==
              "6a514396-de2b-49ee-ba9f-422f0d7810cd"
            ) {
              //积极型
              product.evalutionGrade = 3;
            }
            product.count = item.count;
            product.money = item.money;
            product.state = item.showStatus;

            product.progress = item.statisticsInfo.investMoney / item.money; //可投百分比
            if(this.number==6){
                if(item.showStatus=="cfed3414-a33e-4c43-9572-5777f21b543d"){
                  this.list.push(product);
               }
            }else{
               this.list.push(product);
            }
            
            
          }

          this.$nextTick(() => {
            // console.log("加载完成");
            var list = this.list;
            for (var i = 0; i < list.length; i++) {
              this.Canvsprogress(list[i]);
            }
          });
        })
        .catch(err => {
        });
    },
    /**
     * 进度条绘制
     */
    Canvsprogress(item) {
      var _F = F2,
        Shape = _F.Shape,
        G = _F.G,
        Util = _F.Util,
        Global = _F.Global;
      var Vector2 = G.Vector2;
      // 极坐标下带圆角的柱子，只对极坐标生效
      Shape.registerShape("interval", "polar-tick", {
        draw: function draw(cfg, container) {
          var points = this.parsePoints(cfg.points);
          var style = Util.mix(
            {
              stroke: cfg.color
            },
            Global.shape.interval,
            cfg.style
          );

          var newPoints = points.slice(0);
          if (this._coord.transposed) {
            newPoints = [points[0], points[3], points[2], points[1]];
          }

          var center = cfg.center;
          var x = center.x,
            y = center.y;

          var v = [1, 0];
          var v0 = [newPoints[0].x - x, newPoints[0].y - y];
          var v1 = [newPoints[1].x - x, newPoints[1].y - y];
          var v2 = [newPoints[2].x - x, newPoints[2].y - y];

          var startAngle = Vector2.angleTo(v, v1);
          var endAngle = Vector2.angleTo(v, v2);
          var r0 = Vector2.length(v0);
          var r = Vector2.length(v1);

          if (startAngle >= 1.5 * Math.PI) {
            startAngle = startAngle - 2 * Math.PI;
          }

          if (endAngle >= 1.5 * Math.PI) {
            endAngle = endAngle - 2 * Math.PI;
          }
          //线宽
          var lineWidth = 5;
          var newRadius = r - lineWidth / 2;

          return container.addShape("Arc", {
            className: "interval",
            attrs: Util.mix(
              {
                x: x,
                y: y,
                startAngle: startAngle,
                endAngle: endAngle,
                r: newRadius,
                lineWidth: lineWidth,
                lineCap: "round"
              },
              style
            )
          });
        }
      });
      //actual 进度值
      var data = [
        {
          const: "a",
          actual: item.progress * 100,
          expect: 100
        }
      ];
      var chart = new F2.Chart({
        id: item.tag,
        padding: [10, 0, 10, 0],
        pixelRatio: window.devicePixelRatio
      });
      chart.source(data, {
        actual: {
          max: 100,
          min: 0,
          nice: false
        }
      });
      // 配置当前坐标系
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.8,
        startAngle: -Math.PI,
        endAngle: 0
      });
      chart.axis(false);
      var color = "";
      switch (item.state) {
        case "cfed3414-a33e-4c43-9572-5777f21b543d": //募集中
          color = "#ff4e30";
          break;
        case "bdc7ad49-80c2-4b3d-a160-2d739708b72f": //募集成功
        case "132ea5f0-f5a2-47a7-80fc-338ab2029279": //待放款
          color = "#60c9b6";
          break;
        case "a3e2a0b8-4e9d-4a31-9028-8781012d92b1": //还款中（还款中||已放待还）
        case "f8e7aa1f-2160-454a-8e78-9466bb1208a3": //已放待还
          color = "#f09421";
          break;
        case "5969219f-b62a-4b41-9a23-a15fc8fce4c4": //已还款
          color = "#f09421";
          break;
        case "5033e319-5116-4b9a-8517-35df02491876": //流标
        case "340208fc-10fb-4604-baa6-9d8bb9862f38": //流标完成
        case "f741a93c-06ad-4722-a3bc-9b865b41e39c": //结束
          color = "#b3b6b9";
          break;
      }
      //绘制背景
      chart
        .interval()
        .position("const*expect")
        .shape("polar-tick")
        .size(10)
        .color("#eeeeee")
        .animate(false); // 背景条
      //绘制进度
      chart
        .interval()
        .position("const*actual")
        .shape("polar-tick")
        .size(10)
        .color(color)
        .animate({
          appear: {
            duration: 1100,
            easing: "linear",
            animation: function animation(shape, animateCfg) {
              var startAngle = shape.attr("startAngle");
              var endAngle = shape.attr("endAngle");
              if (startAngle > endAngle) {
                // -Math.PI/2 到 0
                endAngle += Math.PI * 2;
              }
              shape.attr("endAngle", startAngle);
              shape
                .animate()
                .to(
                  Util.mix(
                    {
                      attrs: {
                        endAngle: endAngle
                      }
                    },
                    animateCfg
                  )
                )
                .onUpdate(function(frame) {
                  // $("#text").text(parseInt(frame * (item.progress*100).toFixed(2)) + "%");
                });
            }
          }
        }); // 实际进度
      chart.guide().html({
        position: ["50%", "80%"],
        html:
          '<div style="width: 120px;color: #969090;white-space: nowrap;text-align:center;">' +
          '<p id="text" style="font-size: 14px;margin-bottom:10px;">' +
          (item.progress * 100).toFixed(2) +
          "%</p>" +
          "</div>"
      });
      chart.render();
    },
    /**
     * 标详情
     */
    producut(id) {
      this.$router.push({ path: "/product/productInfo",query:{
        id:id}}
        );
    }
  }
};
</script>


<style scoped lang="less">
ul {
  li {
    background-color: white;
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    position: relative;
    cursor: pointer;
    .tag {
      position: absolute;
      z-index: 2;
      top: -5px;
      left: -5px;
    }
    .item_content {
      margin-left: 70px;
      padding-top: 45px;
      padding-bottom: 45px;
      .title {
        font-weight: bold;
      }
      p {
        text-align: left;
      }
      .rate {
        margin-top: auto;
      }
      .rate_txt {
        margin-top: 8px;
      }
    }
  }
}
.title_view {
  width: 250px;
}
.time_view {
  margin-top: auto;
  width: 200px;
}
.progress {
  margin-top: auto;
  margin-bottom: auto;
}
.state_text {
  position: absolute;
  bottom: 3px;
  width: 100%;
  left: 0;
}
.end {
  margin-left: auto;
}
.right_view {
  border-left: 1px dashed #dedede;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  button {
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
    margin-left: 40px;
    margin-right: 40px;
    margin-top: auto;
    margin-bottom: auto;
    background: white;
    width: 200px;
    height: 44px;
    font-weight: bold;
  }
  //募集状态
  .state_raise {
    color: #ed5f4e;
    border: 1px solid #ff4e30;
    cursor: pointer;
    font-weight: normal;
  }
  //完成状态
  .state_finish {
    color: #969090;
    border: 1px solid #969090;
    font-weight: normal;
    cursor: pointer;
  }
  .state_raise:hover {
    background: #ff4e30;
    color: white;
    cursor: pointer;
  }
}
</style>