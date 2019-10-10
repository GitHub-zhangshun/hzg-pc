<template>
  <!-- 修改手机号 -->
  <div class="editPhone">
    <el-input v-model="pwd" placeholder="请输入登录密码" show-password></el-input>
    <el-input v-model="phone" placeholder="请输入新的手机号码"></el-input>
    <el-input v-model="code" placeholder="请输入验证码">
      <button slot="suffix" class="getCode" @click="getCode" :class="code_disabled?'color_gray':'color_red'" :disabled='code_disabled'>{{ word }}</button>
    </el-input>
    <p class="color_red message">{{ message }}</p>
    <el-button @click="save" :disabled="isDisabled" :loading="isLoading" :class="isDisabled?'disable':'able'">确&nbsp;定</el-button>
    <p class="forget" @click="$router.push({path:'/forget_pwd', query:{ isLogin: true }})">忘记密码</p>
  </div>
</template>

<script>
import { Input, Button } from "element-ui";
//验证手机号
import { checkPhone } from '@/libs/publicFun'
//md5加密
import md5 from 'blueimp-md5'

export default {
  data() {
    return {
      pwd:'',    //密码
      phone:'',   //手机号
      code:'',  //验证码
      message: '', 
      word:'获取验证码',
      code_disabled:false,
      isDisabled:true,
      isLoading:false,
    };
  },
  inject: ['reload'],
  methods: {
    save() {
      if(!checkPhone(this.phone)){
        this.message = '手机号格式不正确'
      }else{
        this.isLoading = true  //加载状态
        //验证密码
        this.$axios({
          url: "/v1/uc/user/userPasswordVerify",
          data: md5(md5(md5(this.pwd)))
        }).then(data => {
          if (data.code != 0) {
            this.isLoading = false  //加载状态
            this.message = data.message;
          } else {
            //修改手机号
            this.$axios({
              url: "/v1/uc/user/userPhoneEdit",
              data: { code:this.code, phone:this.phone, smsSimplify:'edit_phone_sms_code'}
            }).then(data => {
              this.isLoading = false  //加载状态
              if (data.code != 0) {
                this.message = data.message;
              } else {
                // let userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.userInfo);
                // userInfo.user.phone = this.phone;
                // localStorage.setItem("userInfo", JSON.stringify(userInfo));
                this.reload();
                //关闭弹框
                // this.$emit("closeDialog", {label: this.phone, title: "登录手机号码"});
              }
            });   
          }
        });   
      }
    },
    getCode() {
      this.message = ''
      this.$axios({
        url: "/v1/cms/core/smsCodeSend",
        data: {existUser:false, phone:this.phone, simplify:'edit_phone_sms_code'}
      }).then(data => {
        if (data.code != 0) {
          this.message = data.message;
        } else {
          let time = 60,that = this
          var sendTimer = setInterval(function(){
              that.code_disabled = true;
              time--;
              that.word = time+'S';
              if(time < 0){
                  that.code_disabled = false;
                  clearInterval(sendTimer);
                  that.word = "获取验证码";
              }
          },1000)
        }
      });  
    }
  }, 
  computed: {
    inputText(){
      let { pwd,phone,code } = this
      return { pwd,phone,code }
    }
  },
  watch: {
    //按钮是否禁用
    inputText(){
      if(this.pwd && this.phone && this.code){
        this.isDisabled = false
      }else{
        this.isDisabled = true
      }
    }
  },
  components: {
    "el-input": Input,
    "el-button": Button
  }
};
</script>

<style scoped lang="less">
.editPhone {
  text-align: center;
  .el-input {
    width: 70%;
    margin-top: 14px;
    position: relative;
    /deep/input::-webkit-input-placeholder {
      font-size: 14px;
    }
  }
  .getCode {
    position: absolute;
    top: 10px;
    right: 8px;
    white-space: nowrap;
    background: none;
    cursor: pointer;
  }
  .el-button {
    margin-top: 30px;
    width: 70%;
    height: 44px;
    font-size: 16px;
    border-radius: 180px;
    &.able{
      color: #fff;
      background: #ff4e30;
    }
    &.disable{   
      color: #969090;
      background: #c4c7c8;
    }
  }
  .forget {
    font-size: 14px;
    color: #ff4e30;
    margin-top: 10px;
    width: 84%;
    text-align: right;
    cursor: pointer;
  }
  .message {
    margin-top: 10px;
  }
}
</style>