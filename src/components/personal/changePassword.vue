<template>
  <!-- 修改登录密码 -->
  <div class="content changepwd">
    <h3 class="text_size_22">修改登录密码</h3>
    <span>原登录密码&emsp;</span><el-input v-model="oldPwd" placeholder="请输入原密码" show-password></el-input>&emsp;<span class="forget" @click="$router.push({path:'/forget_pwd', query:{ isLogin: true }})">忘记密码</span>  <br>
    <span>新密码&emsp;&emsp;&emsp;</span><el-input v-model="newPwd" placeholder="请输入6-16字符的登录密码" show-password></el-input>
    <p class="color_red message">{{ message }}</p>
    <el-button @click="save" :disabled="isDisabled" :loading="isLoading" :class="isDisabled?'disable':'able'">确&nbsp;定</el-button>
  </div>
</template>

<script>
import { Input, Button } from "element-ui";
//验证密码
import { checkPwd } from '@/libs/publicFun'
//md5加密
import md5 from "blueimp-md5";
//修改成功提示
import { MessageBox } from 'element-ui';

export default {
  data() {
    return {
      message: "",
      oldPwd: "",
      newPwd: "",
      isDisabled:true,
      isLoading:false
      
    };
  },
  methods: {
    save() {
      if (!checkPwd(this.newPwd)) {
        this.message = "请设置6-16个字符的登录密码";
      } else {
        this.isLoading = true  //加载状态
        this.$axios({
          url: "/v1/uc/user/userPasswordEdit",
          data: {
            oldPwd: md5(md5(md5(this.oldPwd))),
            newPwd: md5(md5(md5(this.newPwd)))
          }
        }).then(data => {
          this.isLoading = false  //加载状态
          if (data.code != 0) {
            this.message = data.message;
          } else {
            //弹出修改成功
            MessageBox({
                title:'提示',
                message:data.message
            }).then(() => {
              this.$router.push('/personal/setting')
            }).catch(() => {});
          }
        });
      }
    }
  },
  computed: {
    inputText(){
      let { oldPwd,newPwd } = this
      return { oldPwd,newPwd }
    }
  },
  watch: {
    //按钮是否禁用
    inputText(){
      if(this.oldPwd && this.newPwd){
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
.content {
    box-sizing: border-box;
    width: 920px;
    background: #fff;
    padding: 40px;
    text-align: left;
    h3{
      margin-bottom: 20px;
    }
    .el-input {
      width: 40%;
      margin-top: 24px;
      position: relative;
      /deep/input::-webkit-input-placeholder {
        font-size: 14px;
      }
    }
    .el-button {
      margin-top: 28px;
      margin-left: 84px;
      width: 20%;
      height: 44px;
      font-size: 16px;
      border-radius: 8px;
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
      // text-align: right;
      cursor: pointer;
    }
    .message {
      margin-left: 84px;
      margin-top: 10px;
    }
}
</style>