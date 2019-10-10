<template>
  <!-- 提现 -->
  <div class="takeout">
    <div class="top row">
      <span class="color_black">到账银行卡</span>
      <div>
        <div class="card row">
          <img :src="user.bankCardInfo && user.bankCardInfo.icoLink">
          <p class="color_black text_size_16">{{ user.bankCardInfo && user.bankCardInfo.name }}</p>
          <label>（尾号{{ bankCardlast }}）</label>
        </div>
      </div>
    </div>

    <div class="center row">
      <span class="color_black">提现金额</span>
      <div>
        <div class="row input">
          <el-input :placeholder="minTitle + minPrice +'元'" v-model="inputPrice"><label slot="suffix"
              class="unit color_black">元</label></el-input>
        </div>
        <p :class="message == `可提现金额${usable}元`? 'color_gray': 'color_red'">{{ message }}</p>
      </div>
      <label class="takeAll" @click="takeAll">全部提现</label>
    </div>

    <div class="bot row">
      <span class="color_black">提现方式</span>
      <div class="takeType">
        <div v-for="(item,index) in typeList" :key="index">
          <div v-if="item.isUse">
            <el-radio v-model="typeId" :label="item.Id">{{ item.title }}</el-radio>
            <p>预计<label class="color_red">{{ item.subhead }}</label>到账，手续费{{ item.service }}元</p>
          </div>
        </div>
      </div>
    </div>

    <el-button @click="toTakeOut" :disabled="isDisabled" :loading="isLoading" :class="isDisabled?'disable':'able'">确认提现
    </el-button>

    <div class="tips row">
      <img src="@/assets/images/personal_img/icon_prompt.png">
      <div class="column">
        <p class="color_black text_size_16 title">温馨提示</p>
        <div v-for="(item,index) in typeList" :key="index">
          <p>{{item.title}}:{{ item.remark }}</p>
        </div>
      </div>
    </div>

    <!-- 验证码确认 -->
    <!-- <verify :price='inputPrice' :isShow.sync="isShow" :typeid="typeId"></verify> -->
  </div>
</template>

<script>
  import {
    Input,
    Button,
    Radio,
    MessageBox,
    Dialog
  } from 'element-ui';
  //格式化金额
  import {
    number_format,
    redirectTripartite
  } from "@/libs/publicFun";
  // import verify from '@/components/personal/verify';

  export default {
    data() {
      return {
        inputPrice: '',
        user: {},
        bankCardlast: '',
        message: '',
        usable: '',
        usableNoFormat: '',
        minTitle: '',
        minPrice: '',
        minPriceNoFormat: '',
        typeList: [],
        serviceCharge: '',
        serviceCharge_one: '',
        typeId: '',
        isDisabled: true,
        isLoading: false,
        isShow: false
      }
    },
    methods: {
      takeAll() {
        this.inputPrice = this.usable.replace(',', '')
      },
      toTakeOut() {
        this.isLoading = true
        this.$axios({
            url: '/v1/fin/withdraw/withdraw',
            data: {
              amt: this.inputPrice,
              type: this.typeId
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
                })
                .catch(() => {})
            }
          })
      },
    },
    watch: {
      inputPrice(val) {
        this.typeList.forEach(item => {
          item.service = number_format(item.extend.split('|')[0]+item.extend.split('|')[1] * val || 0, 2, '.', ',') //计算手续费 
        })

        if (val == "") {
          this.message = `账户余额${this.usable}元`
          this.isDisabled = true //禁用按钮
        } else {
          if (Number(val) < this.minPriceNoFormat) {
            this.message = `不可低于起提金额${this.minPrice}元`
            this.isDisabled = true //禁用按钮
          } else if (Number(val) > this.usableNoFormat) {
            this.message = `不可超出可提现金额${this.usable}元`
            this.isDisabled = true //禁用按钮
          } else {
            this.message = `可提现金额${this.usable}元`
            if (!isNaN(val)) {
              this.isDisabled = false //按钮状态
            } else {
              this.isDisabled = true //禁用按钮
            }
          }
        }
      },
    },
    components: {
      'el-input': Input,
      'el-button': Button,
      'el-radio': Radio,
      // verify
    },
    async created() {
      //登录账户信息
      await this.$axios("/v1/uc/user/investorCurrent")
        .then(data => {
          this.user = data.result.user
          localStorage.setItem('userInfo', JSON.stringify(data.result))

          let bankCardNo = this.user.bankCardInfo && this.user.bankCardInfo.cardNo
          if (bankCardNo != null || '') {
            this.bankCardlast = bankCardNo.substring(bankCardNo.length - 4)
          }
        });

      //可提现金额
      await this.$axios("/v1/fin/capital/accountInfo")
        .then(data => {
          this.usable = number_format(data.result && data.result.usable || 0, 2, '.', ',')
          this.usableNoFormat = data.result && data.result.usable

          this.message = `可提现金额${this.usable}元`
        })

      //提现类型
      await this.$axios({
          url: "/v1/cms/core/typeItemList",
          data: {
            queryType: 0,
            queryValue: "transaction_rate"
          }
        })
        .then(data => {
          data.result.forEach(item => {
            if (item.simplify == "minimum_cash_withdrawal") {
              this.minPriceNoFormat = item.subhead //10
              this.minPrice = number_format(item.subhead || 0, 2, '.', ',')
              this.minTitle = item.title
            } else {
              item.service = item.extend.split('|')[0]
              this.typeList.push(item)
              this.typeId = this.typeList[0].Id
            }
          })
        })
      console.log(this.typeList)
    }
  }

</script>

<style scoped lang="less">
  .takeout {
    padding: 30px 0 50px 70px;

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
        padding: 10px;
        border-radius: 8px;

        img {
          width: 32px;
          height: 32px;
          margin-right: 8px;
        }
      }
    }

    .center {
      margin: 34px 0 10px 0;

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

      .takeAll {
        margin-left: 16px;
        margin-top: 18px;
        color: #4e95ff;
        cursor: pointer;
      }
    }

    .bot {
      /deep/.el-radio {
        &:hover .el-radio__inner {
          border-color: #ff4e30;
        }

        .el-radio__label {
          color: #333;
        }

        .el-radio__inner {
          background: #fff;
          border-color: #333;
        }

        .el-radio__input.is-checked .el-radio__inner {
          background: #ff4e30;
          border-color: #ff4e30;
        }
      }

      .takeType {
        position: relative;
        top: 18px;

        p {
          margin-top: 8px;
          margin-left: 26px;
        }

        &>div {
          margin-bottom: 20px;

          &:last-of-type {
            margin-bottom: 0
          }
        }
      }
    }

    /deep/.el-button {
      width: 240px;
      height: 50px;
      border-radius: 180px;
      margin: 50px 0 40px 100px;

      &.able {
        color: #fff;
        background: #ff4e30;
      }

      &.disable {
        color: #969090;
        background: #c4c7c8;
      }
    }

    .tips {
      align-items: flex-start;
      line-height: 22px;

      .title {
        margin-bottom: 6px;
      }

      img {
        margin-right: 8px;
      }
    }
  }

</style>
