<template>
  <!-- 设置用户名 -->
  <div class="setUsername">
    <el-input v-model="input" placeholder="请设置6-10个字符的用户名"></el-input>
    <p class="color_red message">{{ message }}</p>
    <el-button @click="save" :disabled="isDisabled" :loading="isLoading" :class="isDisabled?'disable':'able'">确&nbsp;定</el-button>
    <p class="hint">用户名仅支持大小写字母、数字和下划线，设置后不允许修改</p>
  </div>
</template>

<script>
import { Input, Button } from "element-ui";

export default {
  data() {
    return {
      input: "",
      message: "",
      isDisabled:true,
      isLoading:false
    };
  },
  inject: ['reload'],
  methods: {
    save() {
      var regex=/^[A-Za-z0-9_\-]+$/ig;
      if (this.input.length < 6 || this.input.length > 10 || !regex.test(this.input)) {
        this.message = "请设置6-10个字符(字母/数字/下划线)的用户名";
      } else {
        this.isLoading = true  //加载状态
        this.$axios({
          url: "/v1/uc/user/userAccountEdit",
          data: this.input
        }).then(data => {
          this.isLoading = false  //加载状态
          if (data.code != 0) {
            this.message = data.message;
          } else {
            let userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.userInfo);
            userInfo.user.accountInfo.account = this.input;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            this.reload();
            //点击确认关闭弹框
            // this.$emit("closeDialog", {label: this.input, title: '我的用户名'});
          }
        });
      }
    }
  },
  watch: {
    //按钮是否禁用
    input(val){
        if(val !== ''){
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
.setUsername {
  text-align: center;
  .el-input {
    width: 70%;
    margin-top: 30px;
    /deep/input::-webkit-input-placeholder {
      font-size: 14px;
      text-align: center;
    }
  }
  .el-button {
    margin-top: 30px;
    width: 50%;
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
  .hint {
    font-size: 14px;
    color: #969090;
    margin-top: 20px;
  }
  .message {
    margin-top: 10px;
  }
}
</style>