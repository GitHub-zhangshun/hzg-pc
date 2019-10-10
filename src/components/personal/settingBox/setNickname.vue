<template>
  <!-- 设置昵称 -->
  <div class="setNickname">
    <el-input v-model="input" placeholder="请设置1-10个字符的昵称"></el-input>
    <p class="color_red message">{{ message }}</p>
    <el-button @click="save" :disabled="isDisabled" :loading="isLoading" :class="isDisabled?'disable':'able'">确&nbsp;定</el-button>
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
      if (this.input.length < 1 || this.input.length > 10 ) {
        this.message = "请设置1-10个字符的昵称";
      } else {
        this.isLoading = true  //加载状态
        this.$axios({
          url: "/v1/uc/user/userEditNickName",
          data: this.input
        }).then(data => {
          this.isLoading = false  //加载状态
          if (data.code != 0) {
            this.message = data.message;
          } else {    
            let userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.userInfo);
            userInfo.user.nickName = this.input;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            this.reload();
            //点击确认关闭弹框
            // this.$emit("closeDialog", {label: this.input, title: '设置昵称'});
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
.setNickname {
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
    margin: 30px 0;
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
  .message {
    margin-top: 10px;
  }
}
</style>