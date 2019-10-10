<template>
  <!-- 标基本信息  -->
  <div class="view row center_h">
    <div class="left_view column">
      <div class="title_view row">
        <h1 class="text_size_24 color_black title">{{productInfo.name}}</h1>
        <p class="tag" v-if="productInfo.productType=='e80c9c8c-6df6-49a8-b583-121392e2022d'">新手专享</p>
      </div>
      <div class="info_view row">
        <div class="column">
          <p class="rate color_red">
            {{productInfo.rate}}<span class="rate_unit text_size_22">%</span>
          </p>
          <p class="desc color_gray_blun text_size_16">参考年回报率</p>
        </div>

        <div class="time_view column">
          <p class="time">
            {{productInfo.count}}<span class="color_black text_size_22">{{unit}}</span>
          </p>
          <p class="desc color_gray_blun text_size_16">持有期限</p>
        </div>

        <div class="time_view column">
          <p class="color_black time">
            {{productInfo.statisticsInfo && productInfo.statisticsInfo.surplusMoney}}<span
              class="color_black text_size_22"
            >元</span>
          </p>
          <p class="desc color_gray_blun text_size_16">剩余额度</p>
        </div>
      </div>
      <!-- 进度 -->
      <div class="progress_view">
        <el-progress :percentage="progress" :color="progressColor"></el-progress>
      </div>

      <div class="chunk_view row">
        <p class="chunk text_size_14">
          标的总额:
          <span class="color_black">{{productInfoMoney}}元</span>
        </p>
        <p class="chunk text_size_14">
          截止时间:
          <span class="color_black">{{time}}</span>
        </p>
      </div>

      <div class="chunk_view row">
        <p class="chunk text_size_14">
          起息日:
          <span class="color_black">募集完成次日开始计息</span>
        </p>
        <p class="chunk text_size_14">
          计息方式:
          <span class="color_black">{{interestType}}</span>
        </p>
      </div>

      <div class="chunk_view row">
        <p class="chunk text_size_14">
          还款方式:
          <span class="color_black">{{repayment}}</span>
        </p>
      </div>
    </div>

    <div class="right_view column">
        <div v-if="!showUseCoupon">
            <div class="right_view_1 row">
                <p class="color_gray_blun">账户余额:</p>
                <a @click="goLogin" v-if="!isLogin" class="toast_login color_black">登录后查看</a>
                <p v-if="isLogin" class="color_black usable" style>{{usable}}元</p>
                <p v-if="isLogin" @click="goRecharge" class="recharge">去充值</p>
            </div>

              <!-- 新手标 -->
              <div class="column" v-if="isLogin&&productInfo.productType=='e80c9c8c-6df6-49a8-b583-121392e2022d'&&!isNovice">
                <p class="returned_txt">你已经不是新手!无法购买新手标</p>
                <button style="font-size:16px">立即出借</button>
              </div>

              <!-- 可投状态 -->
              <div v-else-if="showStatus=='cfed3414-a33e-4c43-9572-5777f21b543d'">
                  <div class="right_view_2 row">
                  <p class="color_gray_blun">出借金额</p>
                  <p class="txt_1 color_gray_blun">预期利息:</p>
                  <p class="color_red">{{interest}}</p>
                  <p class="unit color_black">元</p>
                  <i @click="query" class="icon iconfont icon-wenhao"></i>
                  </div>
                  <input v-model="money" v-on:input="count" :placeholder="limitMin" type="text">
                  <p class="toast_info" v-if="isLogin">
                  {{toast}}
                  <span class="color_red">{{difference}}</span>
                  {{txt_2}}
                  </p>

                  <!-- 选择优惠券 -->
                  <div class="row choose_coupon" @click="showCoupon">
                      <img src="@/assets/images/useCoupon.png" v-if="money">
                      <p class="color_black">
                          <span v-if="!couponType"><span v-if="money">选择优惠券</span><span v-else class="color_gray">暂无优惠券</span></span> 
                          <span v-else>{{currentTypeTxt}}：<span v-if="couponType==1">满{{minMoney}}元返利{{couponVal}}元</span><span v-if="couponType==2">加息{{couponVal}}%</span></span>
                          &emsp;<span v-if="showHint" class="color_red">请填写出借金额</span>
                      </p>
                  </div>
                  <el-button :class="isClick?'isClick':''" @click="isClick?confirm():''" :loading="loading"><span v-if="!isClick">立即出借</span><span v-else>确认支付:&nbsp;{{ needPaymoney }}元</span></el-button>
              </div>

              <!-- 募集完成  待放款-->
              <div class="column" v-else-if="showStatus=='bdc7ad49-80c2-4b3d-a160-2d739708b72f'||showStatus=='132ea5f0-f5a2-47a7-80fc-338ab2029279'">
                  <p class="returned_txt" style="color: #60c9b6;">募集完成待放款...</p>
                  <button @click="colse"  class="isClick" style="font-size:16px">该产品已截止募集,请点击查看其他产品</button>
              </div>

              <!-- 还款中 -->
              <div class="column" v-else-if="showStatus=='a3e2a0b8-4e9d-4a31-9028-8781012d92b1'||showStatus=='f8e7aa1f-2160-454a-8e78-9466bb1208a3'">
                  <p class="returned_txt">正在回款中...</p>
                  <button @click="colse" class="isClick" style="font-size:16px">该产品已截止募集,请点击查看其他产品</button>
              </div>

              <!-- 还款中 -->
              <div class="column" v-else>
                  <p class="returned_txt" style="color: #909696;">已结束</p>
                  <button @click="colse" class="isClick" style="font-size:16px">该产品已截止募集,请点击查看其他产品</button>
              </div>
              <p class="agreement">
                  我已阅读并同意
                  <span @click="deal" class="color_black">《出借协议》</span>
              </p>
            </div>

         <transition name="fade">
          <div v-if="showUseCoupon" class="choose_coupon2 text_left" transiton="fade">
              <div class="list"> 
                <div @click="hideCoupon" class="row"><img src="@/assets/images/path.png"><span>不使用优惠券</span></div>
                <div v-for="(item,index) in list" :key="index" @click="selectCoupon(item.typeTxt,item.Id,item.couponType,item.couponVal,item.minMoney)" class="row coupon" :class="{color_red:conponid==item.Id}">
                    <span>{{item.couponVal}}<span v-if="item.couponType == 1">元</span><span v-if="item.couponType == 2">%</span>&nbsp;{{item.typeTxt}}&nbsp;有限期{{item.createAt}}-{{item.validTime}}</span>&nbsp;
                    <img src="@/assets/images/check.png" v-if="conponid == item.Id">
                </div>
                <p v-if="list.length==0" style="width:100%;text-align:center">暂无数据</p>
              </div>
              <!-- 优惠券分页 -->
              <el-pagination 
              v-if="totalNum>pageSize"
              background 
              prev-text="上一页" 
              next-text="下一页" 
              layout="prev, pager, next" 
              :current-page="currentPage"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              :total="totalNum">
              </el-pagination>
          </div>
        </transition>
    </div> 
    <!-- 提示开户 -->
    <toastOpenAccount v-if="!isOpen" v-model="centerDialogVisible"></toastOpenAccount>
    <toastEvaluation v-else-if="!isEvaluation" v-model="centerDialogVisible"></toastEvaluation>
    <!-- <toastEvaluationGrade v-else-if="evalutionGrade<productEvalutionGrade" :productEvalutionGrade="productEvalutionGrade" :isShow="centerDialogVisible" v-on:value="isShow"></toastEvaluationGrade> -->
    <toastEvaluationGrade v-model="alertCenterDialog"></toastEvaluationGrade>

    <!-- 验证码确认 -->
    <verify :price='money' :isShow.sync="isShow" :conponId='conponid'></verify>
  </div>
</template>

<script>
import { Progress,Pagination,MessageBox,Button } from "element-ui";
import toastOpenAccount from "@/components/toastOpenAccount";
import toastEvaluation from "@/components/toastEvaluation";
import toastEvaluationGrade from "@/components/toastEvaluationGrade";
import { formatDate,number_format,listByAll,redirectTripartite} from "@/libs/publicFun";
import { isLogin } from "@/libs/auth";
import verify from '@/components/personal/verify';

export default {
  components: {
    "el-progress": Progress,
    toastOpenAccount,
    toastEvaluation,
    toastEvaluationGrade,
    'el-pagination': Pagination,
    'el-button':Button,
    verify
  },
  created() {
    if (isLogin()) {
      this.getAccountInfo();
      this.getUserInfo();
    }
  },
  props: ["productId"],
  watch: {
    productId: {
      immediate: true,
      handler: function() {
        this.getInfo(this.productId);
      }
    },
    money(val){
      this.currentTypeTxt = ''
      this.couponType = ''
      this.conponid = ''
      this.couponVal = ''
      this.minMoney = ''
      if(val){
        this.showHint = false
        this.needPaymoney = number_format(this.money,2)
        if(this.couponType == 1){
          this.needPaymoney = number_format((this.money - this.couponVal), 2)
        }
      }
    },
    couponVal(val){
      this.needPaymoney = number_format(this.money,2)
      if(this.couponType == 1){
        // this.needPaymoney = number_format((this.money - val), 2)//选择优惠券 减优惠券价格
        this.needPaymoney = number_format((this.money), 2)
      }

      if (this.money > this.usableNoFormat) {
        //余额不足
        this.toast = "可出借金额不足,还需充值";
        this.difference = number_format((this.money - this.usableNoFormat),2);
        // if(this.couponVal && this.couponType == 1){
        //   this.difference = number_format((this.money - this.usableNoFormat - this.couponVal),2);
        // }
        this.txt_2 = "元";
        this.isClick = false;
      }

    }
  },
  data() {
    return {
      loading:false,
      isLogin: isLogin(),
      //是否新手
      isNovice:true,
      productInfo: {},
      productInfoMoney:"0",
      progress: 0,
      progressColor:"#ff4e30",
      time: "",
      //余额
      usable: 0.0,
      usableNoFormat:'',
      centerDialogVisible: false,
      alertCenterDialog: {
          isShowBox:false,
          grade: ''
      },
      money: "",
      //提示文字
      toast: "可用余额",
      //差值
      difference: 0.0,
      txt_2: "元",
      //是否点击
      isClick: false,
      //预期利息
      interest: 0,
      //是否天标
      isDay: false,
      //是否开户
      isOpen: false,
      //是否有银行卡
      cardNo:false,
      //是否测评
      isEvaluation: false,
      //测评等级是否合格
      isEvalutionGrade: false,
      //测评等级
      evalutionGrade: 1,
      //产品等级
      productEvalutionGrade: 1,
      //起投金额
      limitMin:0,
      //标状态
      showStatus:"cfed3414-a33e-4c43-9572-5777f21b543d",
      //计息方式
      interestType:"",
      //单位
      unit:"",
      repayment:"",
      showUseCoupon: false,   //显示使用优惠券
      showHint: false,  //提示填写出借金额
      list:[],   //可用优惠券列表
      pageSize: 6,
      currentPage:1,
      totalNum:0,
      currentTypeTxt:'',  //选择券类型
      couponType:'',  //选择券类型
      couponVal:'',   //选择券面额
      minMoney:'',  //使用优惠券最小投金
      isShow:false,  //验证短信
      conponid:'',
      needPaymoney:'',  //确认支付
    };
  },
  component: {},
  methods: {
    //去登陆
    goLogin(){
      this.$router.push({path:'/login',query:{redirect:this.$route.fullPath}})
    },
    /**
     * 显示对话框
     */
    // isShow(val) {
    //   this.centerDialogVisible = val;
    // },
    /**
     * 获取详情
     */
    getInfo(id) {
      // console.log("id=" + id);
      this.$axios
        .post("/v1/bid/business/productDetailById", id)
        .then(result => {
          // console.log(result);
          var data = result.result;
          this.productInfo = result.result;
          this.showStatus = data.showStatus;
          //  console.log("截止时间=11111111111111111")
          this.productInfoMoney =number_format(data.money,2);
          if (data.timeInfo.raiseComplete == null) {
            this.time = formatDate(
              data.timeInfo.raiseExpectEnd,
              "yyyy-MM-dd hh:mm"
            );
          } else {
            this.time = formatDate(
              data.timeInfo.raiseComplete,
              "yyyy-MM-dd hh:mm"
            );
          }
          // console.log("截止时间="+this.time)
          this.progress = Number(((data.statisticsInfo.investMoney * 100) / data.money).toFixed(2));
          if (data.interestType == "4ec9a442-8379-45fc-8776-23a8fd4bbfa8") {
            this.isDay = true;
          } else {
            this.isDay = false;
          }
       
          if (
            data.attachInfo.riskLevel == "586d7297-7e8a-4a3d-86a9-ec13f6994d01"
          ) {
            //保守型
            this.productEvalutionGrade = 1;
          } else if (
            data.attachInfo.riskLevel == "95673ecf-21bb-42e1-97e1-0a436234c5cc"
          ) {
            //稳健型
            this.productEvalutionGrade = 2;
          } else if (
            data.attachInfo.riskLevel == "6a514396-de2b-49ee-ba9f-422f0d7810cd"
          ) {
            //积极型
            this.productEvalutionGrade = 3;
          }
          // console.log("起投金额=")
         
          // console.log("起投金额="+this.limitMin)
          this.interestType = listByAll(data.interestType).title;
          this.repayment = listByAll(data.repayment).title;
          this.unit= listByAll(data.interestType).subhead;

          if(this.productInfo.statisticsInfo.surplusMoney< this.productInfo.moneyInfo.limitMin){
             this.productInfo.moneyInfo.limitMin = this.productInfo.statisticsInfo.surplusMoney;
          }
           this.limitMin = this.productInfo.moneyInfo.limitMin+"元起投";//起投金额

          if(data.showStatus=="cfed3414-a33e-4c43-9572-5777f21b543d"){//募集中
            this.progressColor = "#ff4e30";
          }else if(data.showStatus=="bdc7ad49-80c2-4b3d-a160-2d739708b72f"||data.showStatus=="132ea5f0-f5a2-47a7-80fc-338ab2029279"){//募集
            this.progressColor = "#60c9b6";
          }else if(data.showStatus=='a3e2a0b8-4e9d-4a31-9028-8781012d92b1'||data.showStatus=='f8e7aa1f-2160-454a-8e78-9466bb1208a3'){//还款中
            this.progressColor = "#ff4e30";
          }else{
            this.progressColor = "#909696"
          }
          
        })
        .catch(err => {});
    },
    /**
     * 获取余额
     */
    getAccountInfo() {
      this.$axios
        .post("/v1/fin/capital/accountInfo", "")
        .then(result => {
          // console.log(result);
          this.usable =number_format(result.result.usable,2);
          this.usableNoFormat = result.result.usable
          this.difference = number_format(result.result.usable,2);
        })
        .catch(err => {});
    },
    /**
     * 获取用户信息
     */
    getUserInfo() {
      this.$axios
        .post("/v1/uc/user/investorCurrent", "")
        .then(result => {
          // console.log(result);
          var data = result.result;
          if(data.user.isOpen){
            this.isOpen = true
          }else{
            this.isOpen = false
          }
          if(data.user.bankCardInfo && data.user.bankCardInfo.cardNo!=''){
            this.cardNo = true
          }
          if (data.user.riskLevelInfo) {
            //  console.log("测评————————————————————")
          // console.log("++++++++++++++++++++++++")
            //评测信息
            this.isEvaluation = true;
            if (data.user.riskLevelInfo.riskLevelSimplify=="risk_level_keep") {
              //保守型
              this.evalutionGrade = 1;
            } else if (data.user.riskLevelInfo.riskLevelSimplify=="risk_level_steady") {
              //稳健型
              this.evalutionGrade = 2;
            } else if (data.user.riskLevelInfo.riskLevelSimplify=="risk_level_active") {
              //积极型
              this.evalutionGrade = 3;
            }
          } else {
            this.isEvaluation = false;
          }
          this.isNovice = data.user.isNew;
        })
        .catch(err => {});
    },
    /**
     * 计算利息
     */
    count(val) {
      var money = this.money;
      if (!money) {
        //没有输入值
        this.toast = "可用余额";
        this.difference = this.usable;
        this.txt_2 = "元";
        this.isClick = false;
        this.interest = 0;
        return;
      }
      if (this.isDay) {
        this.interest =
          (((money * this.productInfo.rate) / 100) * this.productInfo.count) /
          365;
      } else {
        this.interest =
          (((money * this.productInfo.rate) / 100) * this.productInfo.count) /
          12;
      }
      this.interest = Math.floor(this.interest * 100) / 100;
      var num = money;
      var productInfo = this.productInfo;
      if (productInfo.statisticsInfo && num >  productInfo.statisticsInfo.surplusMoney) {
        //判断剩余可投
        this.toast = "不可超出剩余可投金额";
        this.difference = "";
        this.txt_2 = "";
        this.isClick = false;
      } else if (num < productInfo.moneyInfo.limitMin) {
        //不能小于起投金额
        this.toast = "不可低于起投金额";
        this.difference = number_format(productInfo.moneyInfo.limitMin,2);
        this.txt_2 = "元";
        this.isClick = false;
      } else if (
        (num - productInfo.moneyInfo.limitMin) %
          productInfo.moneyInfo.increase !=
        0
      ) {
        //判断递增金额
        this.toast = "出借金额需以";
        this.difference = number_format(productInfo.moneyInfo.increase,2);
        this.txt_2 = "元递增";
        this.isClick = false;
      } else if (num > productInfo.moneyInfo.limitMax) {
        //超出最大金额
        this.toast = "单笔出借不可超出";
        this.difference = number_format(productInfo.moneyInfo.limitMax,2);
        this.txt_2 = "元";
        this.isClick = false;
      } else if (num > this.usableNoFormat) {
        //余额不足
        this.toast = "可出借金额不足,还需充值";
        this.difference = number_format((num - this.usableNoFormat),2);
        if(this.couponVal){
          this.difference = number_format((num - this.usableNoFormat - this.couponVal),2);
        }
        this.txt_2 = "元";
        this.isClick = false;
      } else {
        this.toast = "可用余额";
        this.difference = this.usable;
        this.txt_2 = "元";
        this.isClick = true;
      }
      console.log(val);
    },
    /**
     * 去充值
     */
    goRecharge() {
      if(!this.isOpen){
        this.centerDialogVisible = true;
        return;
      }
      if(!this.cardNo){
        MessageBox.confirm('您还未绑定存管银行卡，请先绑卡', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
        .then(() => {
          this.$router.push('/personal/setting')
        })
        .catch( () => {})
        return
      }
      if(this.money > this.usableNoFormat){
        this.$router.push({path:"/personal/charge", query:{need:this.difference}})
      }else{
        this.$router.push({path:"/personal/charge"});
      }
      localStorage.setItem('path',this.$route.fullPath)
    },
    //问答
    query() {
      this.$router.push('/product/anticipated')
    },
    /**
     * 出借协议
     */
    deal() {
      if(sessionStorage.platformConfig){
        this.$router.push({path:'/contract',query:{id:JSON.parse(sessionStorage.platformConfig).investAgreementLink,type:'text',title:'出借协议'}})
      }
    },
    /**
     * 确定出借
     */
    confirm() {
      if (!isLogin()) {
        //没有登录
        this.$router.push({ path: "/login" });
        return;
      }
      
      if(!this.isOpen){
        this.centerDialogVisible = true;
        return;
      }
      if(!this.cardNo){
        MessageBox.confirm('您还未绑定存管银行卡，请先绑卡', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
        .then(() => {
          this.$router.push('/personal/setting')
        })
        .catch( () => {})
        return
      }
      if(this.evalutionGrade<this.productEvalutionGrade){
        this.alertCenterDialog =  {
            isShowBox:true,
            grade: this.productEvalutionGrade
        }
        return
      }

      //陕坝跳转
      this.loading = true
      this.$axios({url:'/v1/bid/business/productInvest',data:{bidId:this.productId,money:this.money,couponId:this.conponid}})
      .then(data => {
        this.loading = false
        if(data.code==='0'){
          localStorage.setItem('path','/personal/myaccount')
          redirectTripartite(data.result)
        }else{
          MessageBox({
            title:'提示',
            message: data.message||'网络异常，请稍后再试'
          }).catch(() => {});
        }
      })
      // this.$axios({
      //     url: "/v1/cms/core/smsCodeDefaultSend",
      //     data: 'lenders_deal_captcha'
      // }).then(data => {
      //     if (data.code != 0) {
      //         MessageBox({
      //             title:'提示',
      //             message: data.message
      //         }).catch(() => {});
      //     }else{
      //         //弹出验证框
      //         this.isShow = true;
      //     }
      // });  

      //  this.$axios
      //   .post("/v1/bid/business/productInvest", {
      //       bidId:this.productId,
      //       money:this.money
      //   })
      //   .then(result => {
      //     console.log(result);
      //     window.location.href = result.result.code;
      //     // this.$router.push({path:result.result.code});
      //   })
      //   .catch(err => {});
    },
    /**
     * 关闭 */
    colse(){
      // console.log("关闭---------------")
        this.$router.back(-1)
    },
    //显示隐藏优惠券选择
    showCoupon(){
        if(this.money){
          this.showUseCoupon = true
          this.getCouponList()  //获取优惠券    
        }else{
          this.showHint = true
        }
    },
    hideCoupon(){
        this.showUseCoupon = false
        this.currentTypeTxt = ''
        this.couponType = ''
        this.conponid = ''
        this.couponVal = ''
        this.minMoney = ''
    },
    //选择优惠券
    selectCoupon(typeTxt,id,type,Val,min){
        this.currentTypeTxt = typeTxt
        this.conponid = id
        this.couponType = type
        this.couponVal = Val
        this.minMoney = min
        this.showUseCoupon = false
    },
    handleCurrentChange(currentPage){          
      this.currentPage = currentPage;
      this.getCouponList()  //获取优惠券             
    },
    getCouponList(){
      this.list = []
      this.$axios({
        url: "/v1/uc/user/couponUsableListByPage",
        data: { bidId: this.$route.query.id, money: this.money, num:this.currentPage, size:this.pageSize }
      }).then(data => {
          data.result && data.result.forEach(item => {                   
              item.createAt = formatDate(item.createAt,"yyyy.MM.dd")
              item.validTime = formatDate(item.validTime,"yyyy.MM.dd")
              console.log(item)
              if(item.isUsable){
                this.list.push(item)
              }
          })
          console.log(this.list)
          this.totalNum = data.total
      })
    }
  }
};
</script>

<style scoped lang="less">
.view {
  background-color: white;
  width: 1200px;
  height: 378px;
}
.left_view {
  width: 790px;
  padding-bottom: 30px;
}
.title_view {
  height: 35px;
  margin-top: 30px;
}
.title {
  margin-left: 40px;
  height: 25px;
  line-height: 25px;
  margin-top: auto;
  margin-bottom: auto;
}
.tag {
  height: 35px;
  line-height: 35px;
  width: 100px;
  background-color: #f0f5fb;
  border-radius: 90px;
  color: #ff4e30;
  font-size: 16px;
  margin-left: 20px;
  font-weight: bold;
  text-align: center;
}
p {
  text-align: left;
}
.info_view {
  margin-left: 60px;
  margin-top: 50px;
}
.rate {
  width: 220px;
  font-size: 46px;
}
.rate_unit {
  font-size: 22px;
}

.time_view {
  width: 200px;
}
.time {
  font-size: 46px;
  color: #333333;
}
.desc {
  margin-top: 8px;
}

.progress_view {
  width: 600px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 50px;
}

.chunk_view {
  margin-left: 60px;
  margin-bottom: 15px;
}
.chunk {
  width: 50%;
  color: #848a93;
}

.right_view {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 340px;
  border-left: 1px solid #dedede;
  padding-left: 35px;
  padding-right: 35px;
  position: relative;
  overflow: hidden;
    .choose_coupon{
        margin-top: 18px;
        align-items: center;
        cursor: pointer;
        img{
            width: 16px;
            height: 16px;
            margin-right: 6px;
        }
    }
    .choose_coupon2{
      background: #fff;
      position: absolute;
      top: 0;
      left: 35px;
      .list{
        min-height: 210px;
        &>div{
            cursor: pointer;
            margin-bottom: 26px;
            align-items: center;
            img{
                width: 16px;
                height: 16px;
            }
            &:first-of-type{
                font-size: 16px;
                img{
                    width: 22px;
                    height: 22px;
                    margin-right: 2px;
                }
            }
            &.coupon{
              white-space: nowrap;
            }
        }
      }
    }
    .fade-enter,.fade-leave-to{
        left: 500px;
        opacity: 0;
    }
    .fade-enter-to,.fade-leave{
      left: 35px;
      opacity: 1;
    }
    .fade-enter-active{
      transition: all 0.8s;
    }
    .fade-leave-active{
      transition: opacity 0.01s
    }
}

.right_view_1 {
  margin-top: 10px;
  font-size: 16px;
}
.toast_login {
  font-weight: bold;
  margin-left: 10px;
  cursor: pointer;
}
.usable {
  margin-left: 10px;
}
.recharge {
  margin-left: auto;
  color: #4e95ff;
  cursor: pointer;
}

.right_view_2 {
  font-size: 14px;
  margin-top: 40px;
}
.unit {
  margin-left: 5px;
}
.txt_1 {
  margin-left: auto;
  margin-right: 5px;
}
i {
  margin-left: 5px;
  cursor: pointer;
}

input {
  width: 300px;
  height: 50px;
  border: 1px solid #dedede;
  border-radius: 5px;
  margin-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  line-height: 50px;
  font-size: 14px;
  color: #333333;
}
input::-webkit-input-placeholder {
  color: #c4c7cb;
}

.toast_info {
  font-size: 12px;
  color: #848a93;
  margin-top: 10px;
}

.returned_txt{
  font-size: 20px;
  font-weight: bold;
  color: #ff4e30;
  margin-top: 50px;
  margin-bottom: 50px;
}
.el-button{
  line-height: 0;
}
/deep/.el-button:hover,.el-button:focus{
  color: white;
  border-color: #DCDFE6;
  background-color: #c4c7cb;
}
.isClick:hover,.isClick:focus{
   color: white;
  border-color: #DCDFE6;
  background-color: #ff4e30;
}
button {
  width: 100%;
  border-radius: 5px;
  height: 50px;
  line-height: 50px;
  background: #c4c7cb;
  margin-top: 20px;
  color: white;
  font-size: 18px;
  font-weight: bold;
}
.isClick {
  background: #ff4e30;
  cursor: pointer;
}
.agreement {
  width: 100%;
  color: #848a93;
  font-size: 14px;
  margin-top: 15px;
  text-align: center;
}
.agreement span {
  cursor: pointer;
}

/deep/.el-pagination{
  width: 100%;
  text-align: center;
  margin-top: 30px;
  .el-pager li{
      background: none !important;
      &.active{
          background: #ed5f4e !important;;
          &:hover{
              color: #fff !important;;
          }
      }
      &:hover{
          color: #ed5f4e !important;;
      }
  }
  span{
      background: #fff;
  }
}

/deep/.el-progress-bar{
  width: 98% !important;
}
</style>