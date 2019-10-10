<template>
  <!-- 个人中心 弹框 -->
  <div class="text_left messageBox">
    <el-dialog :visible.sync="dialogVisible" width="28%" @close="close">
      <span slot="title" class="title">{{ title }}{{capitalDModel.txnSsn}}</span>
  
      <!-- 内容切换 -->
      <div class="switchContent">
        <!-- 设置 -->
        <setNickname v-if="title == '设置昵称'" :key="new Date().toString()"></setNickname>
        <setUsername v-if="title == '设置用户名'" :key="new Date().toString()"></setUsername>
        <editPhone v-if="title == '修改手机号码'" :key="new Date().toString()"></editPhone>
        <!-- <bankAccount v-if="title == '银行存管账户'"></bankAccount> -->
        <myCard v-if="title == '我的银行卡'"></myCard>
  
        <!-- 资金记录 -->
        <div class="moneyRecord">
  
          <!-- 出借 -->
          <ul v-if="status == 'capital_transaction'" class="row">
            <li>
              <p>出借成功</p>
              <span class="color_red text_size_16">-{{capitalDModel.amount}}</span>
            </li>
            <li>
              <p>标的名称</p>
              <span class="color_black text_size_16">{{capitalDModel.bidName}}</span>
            </li>
            <li v-if="capitalDModel.full">
              <p>优惠券</p>
              <span class="color_black text_size_16">返利{{ capitalDModel.full }}元</span>
            </li>
          </ul>
  
          <!-- 回款 -->
          <ul v-if="status == 'capital_repay'" class="row">
            <li>
              <p>回款成功</p>
              <span class="color_red text_size_16">+{{capitalDModel.amount}}</span>
            </li>
            <li>
              <p>标的名称</p>
              <span class="color_black text_size_16">{{capitalDModel.bidName}}</span>
            </li>
            <li>
              <p>本金</p>
              <span class="color_black text_size_16">+{{capitalDModel.principal}}</span>
            </li>
            <li>
              <p>收益</p>
              <span class="color_black text_size_16">+{{capitalDModel.interest}}</span>
            </li>
            <li>
              <p>管理费</p>
              <span class="color_black text_size_16">-{{capitalDModel.serviceCharge}}</span>
            </li>
          </ul>
  
          <!-- 充值 -->
          <ul v-if="status == 'capital_recharge'" class="row">
            <li>
              <p>充值成功</p>
              <span class="color_red text_size_16">+{{capitalDModel.amount}}</span>
            </li>
            <li>
              <p>银行卡</p>
              <span class="color_black text_size_16">{{capitalDModel.cardNo}}</span>
            </li>
          </ul>
  
          <!-- 提现 -->
          <ul v-if="status == 'capital_withdraw'" class="row">
            <li>
              <p>提现成功</p>
              <span class="color_red text_size_16">-{{capitalDModel.amount}}</span>
            </li>
            <li>
              <p>手续费</p>
              <span class="color_black text_size_16">{{capitalDModel.serviceCharge}}</span>
            </li>
            <li>
              <p>银行卡</p>
              <span class="color_black text_size_16">{{capitalDModel.cardNo}}</span>
            </li>
          </ul>
  
          <!-- 退款 -->
          <ul v-if="status == 'capital_loss'" class="row">
            <li>
              <p>退款成功</p>
              <span class="color_red text_size_16">+{{capitalDModel.amount}}</span>
            </li>
            <li>
              <p>标的名称</p>
              <span class="color_black text_size_16">{{capitalDModel.bidName}}</span>
            </li>
            <li>
              <p>退款原因</p>
              <span class="color_black text_size_16">{{capitalDModel.remarks}}</span>
            </li>
          </ul>

           <!-- 加息 -->
          <ul v-if="status == 'capital_increase_interest'" class="row">
            <li>
              <p>回款成功</p>
              <span class="color_red text_size_16">+{{capitalDModel.amount}}</span>
            </li>
            <li>
              <p>标的名称</p>
              <span class="color_black text_size_16">{{capitalDModel.bidName}}</span>
            </li>         
            <li>
              <p>加息收益</p>
              <span class="color_black text_size_16">+{{ capitalDModel.increase || '0.00' }}元</span>
            </li> 
          </ul>
  
        </div>
  
      </div>
  
    </el-dialog>
  </div>
</template>

<script>
  import { Dialog } from "element-ui";
  //个人中心
  import setNickname from '@/components/personal/settingBox/setNickname'
  import setUsername from '@/components/personal/settingBox/setUsername'
  import editPhone from '@/components/personal/settingBox/editPhone'
  import bankAccount from '@/components/personal/settingBox/bankAccount'
  import myCard from '@/components/personal/settingBox/myCard'
  import {formatDate,number_format} from "@/libs/publicFun"

  export default {
    components: {
      "el-dialog": Dialog,
      setNickname,
      setUsername,
      editPhone,
      bankAccount,
      myCard
    },
    props: {
      // value: {
      //   type: Boolean,
      // //   default: false
      // },
      value: {
        type: Object
      }
    },
    data() {
      return {
        dialogVisible: false,
        title: '',
        status: '',
        //资金详情模型对象
        capitalDModel:{},
      };
    },
    watch: {
      value(a) {
        // this.dialogVisible = a; 
        this.dialogVisible = a.isShow;
        switch (a.text) {
          case 0:
            this.title = '设置昵称';
            break;
          case 1:
            this.title = '设置用户名';
            break;
          case 2:
            this.title = '修改手机号码';
            break;
          case 3:
            this.title = '修改登录密码';
            break;
          case 4:
            this.title = '我的银行卡';
            break;
          // case 5:
          //   this.title = '我的银行卡';
          //   break;
          // case 6:
          //   this.title = '重置交易密码';
          //   break;
          // case 7:
          //   this.title = '注销';
          //   break;
  
            //出借
          case 'capital_transaction':
            this.title = `交易流水号：`;
            this.status = a.text;
            break;
            //回款        
          case 'capital_repay':
            this.title = `交易流水号：`;
            this.status = a.text;
            break;
            //充值
          case 'capital_recharge':
            this.title = `交易流水号：`;
            this.status = a.text;
            break;
            //提现        
          case 'capital_withdraw':
            this.title = `交易流水号：`;
            this.status = a.text;
            break;
            //退款
          case 'capital_loss':
            this.title = `交易流水号：`;
            this.status = a.text;
            break;
            //加息
            case 'capital_increase_interest':
            this.title = `交易流水号：`;
            this.status = a.text;
            break;
  
        }
        if(a.capitalLogId){
          this.getCapitalRecordDetail(a.capitalLogId);
        }
      },
    },
    methods: {
      close() {
        this.$emit("input", {
          isShow: false,
          text: ''
        });
      },
      //获取资金记录详情
      getCapitalRecordDetail(capitalLogId) {
        this.$axios({
          url: "/v1/fin/capital/capitalDetail",
          data: capitalLogId
        }).then(data => {
          var res = data.result;
          this.capitalDModel = {
            //交易金额
            amount:number_format(res.amount,2),
            //银行名称
            bankName:res.bankName,
            //标的名称
            bidName:res.bidName,
            //银行卡号
            cardNo:res.cardNo,
            //提交时间
            createAt:formatDate(res.createAt,'yyyy-MM-dd hh:mm'),
            //完成时间
            operationAt:formatDate(res.operationAt,'yyyy-MM-dd hh:mm'),
            //流水号
            txnSsn:res.txnSsn,
            //备注||失败原因
            remarks:res.remarks,
            //手续费||管理费
            serviceCharge:number_format(res.serviceCharge,2),
            //违约金
            damages:number_format(res.damages,2),
            //回款本金
            principal:number_format(res.principal,2),
            //回款利息
            interest:number_format(res.interest,2),
            //满减券
            full: res.fullReduction,
            //加息券
            increase: res.increaseInterest
          }
        })
      }
    },
  };
</script>

<style scoped lang="less">
  .messageBox {
    /deep/.el-dialog {
      border-radius: 8px;
      width: 600px !important;
    }
    /deep/.el-dialog__wrapper {
      margin-top: 120px;
      .el-dialog__header {
        padding: 18px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        background: #f1f1f1;
        .title {
          font-size: 14px;
        }
        .el-dialog__headerbtn {
          top: 14px;
          background: #c7c7c7;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          .el-dialog__close {
            color: #f1f1f1;
          }
        }
      }
      .el-dialog__body {
        padding: 40px 20px 50px 20px;
      }
    }
    .moneyRecord {
      ul {
        flex-wrap: wrap;
        margin: 0 20px;
        li {
          width: 50%;
          margin-bottom: 20px;
          line-height: 30px;
        }
      }
    }
  }
</style>

