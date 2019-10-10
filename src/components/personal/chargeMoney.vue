<template>
  <!-- 充值 -->
  <div class="charge">
    <div class="choose_charge_money">
        <div class="away">支付方式</div>
        <el-radio v-model="radio" label="1">快捷充值</el-radio>
        <el-radio v-model="radio" label="2">网银充值</el-radio>
      </div>
    <div class="top row">
      <span class="color_black">支付银行</span>
      <div>
        <div class="card row">
          <img :src="user.bankCardInfo && user.bankCardInfo.icoLink">
          <p class="color_black text_size_16">{{ user.bankCardInfo && user.bankCardInfo.name }}</p>
          <label>（尾号{{ bankCardlast }}）</label>
        </div>
        <p>单笔限额{{ singleQuota || 0}}元，单日限额{{ dayQuota || 0}}元，单月限额{{ monthQuota || 0}}元</p>
      </div>
    </div>

    <div class="bot row">
      <span class="color_black">充值金额</span>
      <div>
        <el-input :placeholder="'最低充值' + minCharge + '元'" v-model="inputPrice"><label slot="suffix"
            class="unit color_black">元</label></el-input>
        <!-- <p>最低充值<label class="color_red text_size_16">{{ minCharge }}</label>元</p> -->
      </div>
      <p class="message color_red">{{ message }}</p>
    </div>

    <el-button @click="toCharge" :disabled="isDisabled" :loading="isLoading" :class="isDisabled?'disable':'able'">确认充值
    </el-button>


    <!-- 验证码确认 -->
    <!-- <verify :price='inputPrice' :isShow.sync="isShow"></verify> -->
  </div>
</template>

<script>
  import {
    Input,
    Button,
    MessageBox,
    Dialog,
    Radio
  } from 'element-ui';
  //格式化数字
  import {
    number_format,
    redirectTripartite
  } from "@/libs/publicFun";
  // import verify from '@/components/personal/verify';

  export default {
    data() {
      return {
        radio:'1',
        inputPrice: '',
        user: {},
        bankCardlast: '',
        message: '',
        minCharge: '',
        minChargeNoFormat: '',
        isDisabled: true,
        isLoading: false,
        isShow: false,
        singleQuota: '',
        dayQuota: '',
        monthQuota: '',
      }
    },
    methods: {
      toCharge() {
        this.isLoading = true
        if(this.radio=='1'){
          this.$axios({
            url: '/v1/fin/recharge/recharge',
            data: {
              amt: this.inputPrice
            }
          })
          .then(data => {
            if (data.code === '0') {
              redirectTripartite(data.result)
            } else {
              this.isLoading = false
              MessageBox({
                title: '提示',
                message: data.message || '网络异常，请稍后再试'
              }).catch(() => {})
            }
          })
        }else{
          this.$axios({
            url: '/v1/fin/recharge/ratewayRecharge',
            data: {
              amt: this.inputPrice
            }
          })
          .then(data => {
            if (data.code === '0') {
              redirectTripartite(data.result)
            } else {
              this.isLoading = false
              MessageBox({
                title: '提示',
                message: data.message || '网络异常，请稍后再试'
              }).catch(() => {})
            }
          })
        }
        
        // //发送验证
        // this.$axios({
        //     url: "/v1/cms/core/smsCodeDefaultSend",
        //     data: 'replenish_sms_code'
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
      }
    },
    watch: {
      //按钮是否禁用
      inputPrice(val) {
        if (val == "") {
          this.message = ''
          this.isDisabled = true //禁用按钮
        } else {
          if (Number(val) > this.user.bankCardInfo.singleQuota) {
            this.message = `不可超出银行卡单笔限额${this.singleQuota}元`
            this.isDisabled = true //禁用按钮
          } else if (Number(val) < this.minChargeNoFormat) {
            this.message = `最低充值${this.minCharge}元`
          } else {
            if (!isNaN(val)) {
              this.isDisabled = false //按钮状态
            } else {
              this.isDisabled = true //禁用按钮
            }
          }
        }
      }
    },
    components: {
      'el-radio':Radio,
      'el-input': Input,
      'el-button': Button,
      // verify 
    },
    created() {
      //登录账户信息
      this.$axios("/v1/uc/user/investorCurrent")
        .then(data => {
          this.user = data.result.user
          localStorage.setItem('userInfo', JSON.stringify(data.result))
          let bankCardNo = this.user.bankCardInfo && this.user.bankCardInfo.cardNo
          if (bankCardNo != null || '') {
            this.bankCardlast = bankCardNo.substring(bankCardNo.length - 4)
          }

          //最小充值金额
          this.minCharge = number_format(JSON.parse(sessionStorage.platformConfig).minCharge || 0, 2, '.', ',')
          this.minChargeNoFormat = JSON.parse(sessionStorage.platformConfig).minCharge

          if (this.user.bankCardInfo.singleQuota >= 10000) {
            this.singleQuota = this.user.bankCardInfo.singleQuota / 10000 + '万'
          } else {
            this.singleQuota = this.user.bankCardInfo.singleQuota
          }

          if (this.user.bankCardInfo.dayQuota >= 10000) {
            this.dayQuota = this.user.bankCardInfo.dayQuota / 10000 + '万'
          } else {
            this.dayQuota = this.user.bankCardInfo.dayQuota
          }

          if (this.user.bankCardInfo.monthQuota >= 10000) {
            this.monthQuota = this.user.bankCardInfo.monthQuota / 10000 + '万'
          } else {
            this.monthQuota = this.user.bankCardInfo.monthQuota
          }

          if (this.$route.query.need) {
            this.inputPrice = this.$route.query.need.replace(',', '')
          }
        });
    }

  }

</script>

<style scoped lang="less">
  .charge {
    padding: 30px 0 100px 70px;
    .choose_charge_money{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 34px;
      .away{
        width: 100px;
        color: #000000;
      }
    }
    span {
      width: 100px;
      position: relative;
      top: 20px;
    }

    .top {

      .card {
        justify-content: center;
        align-items: center;
        width: 320px;
        box-sizing: border-box;
        border: 1px solid #ff4e30;
        padding: 10px 0;
        margin-bottom: 12px;
        border-radius: 8px;

        img {
          width: 32px;
          height: 32px;
          margin-right: 8px;
        }
      }
    }

    .bot {
      margin: 34px 0;

      /deep/.el-input__inner {
        width: 320px;
        height: 50px;
        margin-bottom: 12px;
        font-size: 16px;
        position: relative;

        &::-webkit-input-placeholder {
          font-size: 14px;
        }
      }

      .unit {
        position: absolute;
        top: 18px;
        right: 14px;
      }
    }

    /deep/.el-button {
      width: 240px;
      height: 50px;
      border-radius: 180px;
      margin-left: 100px;

      &.able {
        color: #fff;
        background: #ff4e30;
      }

      &.disable {
        color: #969090;
        background: #c4c7c8;
      }
    }

    .message {
      margin-top: 18px;
      margin-left: 10px;
    }
  }

</style>
