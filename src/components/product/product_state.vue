//产品状态
<template>
  <div class="view row">
    <!-- 状态 -->
    <div class="state_view">
      <ul class="state_list">
        <li class="item row">
          <p class="center_v text_size_14 color_gray">出借利率</p>
          <ul class="row">
            <li v-for="(item, index) in rates" :key="index">
              <p
                @click="selectRate(rates,index,1)"
                class="state text_size_12"
                :class="item.isSelect?'state_select':''"
              >{{item.title}}</p>
            </li>
          </ul>
        </li>

        <li class="item row">
          <p class="center_v text_size_14 color_gray">借款期限</p>
          <ul class="row">
            <li v-for="(item, index) in times" :key="index">
              <p
                @click="selectRate(times,index,2)"
                class="state text_size_12"
                :class="item.isSelect?'state_select':''"
              >{{item.title}}</p>
            </li>
          </ul>
        </li>

        <li class="item row">
          <p class="center_v text_size_14 color_gray">项目状态</p>
          <ul class="row">
            <li v-for="(item, index) in stateList" :key="index">
              <p
                @click="selectRate(stateList,index,3)"
                class="state text_size_12"
                :class="item.isSelect?'state_select':''"
              >{{item.title}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 公告 -->
    <div class="notice_view column">
      <h1>还款公告</h1>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in noticeList" :key="index">
          <a>{{item.name}} {{item.currentNum}}/{{item.totalNum}}期 {{item.amount}}元</a>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      //状态列表
      stateList: [],
      //利率
      rates: [],
      //借款时间
      times: [
        {
          title: "全部",
          min: "",
          max: "",
          isSelect: true
        },
        {
          title: "0-3个月",
          min: 0,
          max: 3,
          isSelect: false
        },
        {
          title: "3-6个月",
          min: 3,
          max: 6,
          isSelect: false
        },
        {
          title: "6-9个月",
          min: 6,
          max: 9,
          isSelect: false
        },
        {
          title: "9-12个月",
          min: 9,
          max: 12,
          isSelect: false
        }
      ],
      //公告列表
      noticeList: [],
      screen: {
        state: "",
        rate: "",
        min: "",
        max: ""
      },
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        autoplay: true,
        loopFillGroupWithBlank: true,
        direction: "vertical",
        slidesPerView : 3,
        
      }
    };
  },
  created() {
    this.getProductState();
    this.getNoticeList();
  },
  methods: {
    /**
     * 获取产品状态列表
     */
    getProductState() {
      this.$axios
        .post("/v1/cms/core/typeItemList", {
          queryType: 0,
          queryValue: "bid_product_rate"
        })
        .then(result => {
          console.log("getProductState=", result);
          var arr = result.result;
          this.rates.push({
            title: "全部",
            id: "",
            isSelect: true,
            value: ""
          });
          for (var i = 0; i < arr.length; i++) {
            var jsonItem = arr[i];
            this.rates.push({
              title: jsonItem.title,
              id: jsonItem.Id,
              isSelect: false,
              value: jsonItem.extend
            });
          }
          console.log("getProductState");
          console.log(result);
        })
        .catch(err => {});

      this.$axios
        .post(
          "/v1/cms/core/statusListByTypeSimplify",
          "bid_product_status_show"
        )
        .then(result => {
          var arr = result.result;
          this.stateList.push({
            title: "全部",
            id: "",
            isSelect: true
          });
          for (var i = 0; i < arr.length; i++) {
            var jsonItem = arr[i];
            this.stateList.push({
              title: jsonItem.title,
              id: jsonItem.Id,
              isSelect: false
            });
          }
          console.log(result);
        })
        .catch(err => {});
    },
    /**
     * 获取消息列表
     */
    getNoticeList() {
      this.$axios
        .post("/v1/fin/capital/repaymentNotice", "")
        .then(result => {
          console.log("getNoticeList=", result);
          console.log(result);
          var arr = result.result;
          arr.forEach(element => {
            this.noticeList.push({
              name: element.name,
              currentNum: element.currentNum,
              totalNum: element.totalNum,
              amount: element.amount
            });
          });
        })
        .catch(err => {});
    },
    //利率选择
    selectRate(arr, index, type) {
      for (var i = 0; i < arr.length; i++) {
        switch (type) {
          case 1:
            if (i == index) {
              this.rates[i].isSelect = true;
              this.screen.rate = this.rates[i].value;
            } else {
              this.rates[i].isSelect = false;
            }
            break;
          case 2:
            if (i == index) {
              this.times[i].isSelect = true;
              this.screen.min = this.times[i].min;
              this.screen.max = this.times[i].max;
            } else {
              this.times[i].isSelect = false;
            }
            break;
          case 3:
            if (i == index) {
              this.stateList[i].isSelect = true;
              this.screen.state = this.stateList[i].id;
            } else {
              this.stateList[i].isSelect = false;
            }
            break;
        }
      }
      console.log("---1213", this.screen);
      this.$emit("screen", this.screen);
    }
  }
};
</script>

<style scoped lang="less">
.view {
  width: 1200px;
  height: 170px;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
.state_view {
  margin-top: auto;
  margin-bottom: auto;
}
.state_list {
  margin-bottom: 20px;
}
.item {
  margin-left: 20px;
  margin-top: 20px;
}

.state {
  height: 24px;
  line-height: 24px;
  align-items: center;
  margin-left: 20px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;
}
/* 选择状态 */
.state_select {
  background-color: #ff4e30;
  color: white;
  border-radius: 90px;
}

.notice_view {
  margin-left: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px;
  border-left: 1px solid #dedede;
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
}
h1 {
  margin-top: 5px;
  text-align: left;
  font-size: 14px;
  color: #969090;
  margin-bottom: 10px;
}
a {
  font-size: 12px;
  color: #333333;
  height: 30px;
  line-height: 30px;
}

/deep/.swiper-container {
  height: 100px;
  overflow: hidden;
  margin:0;
  .swiper-wrapper {
    .swiper-slide {
      height: 30px;
      line-height: 30px;
      a {
        font-size: 12px;
        color: #333333;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
/deep/.swiper-pagination-bullet {
  border: 1px solid #fff;
  background: transparent;
  opacity: 1;
}
/deep/.swiper-pagination-bullet-active {
  background: transparent;
  border: 1px solid #ff4e3c;
}
</style>