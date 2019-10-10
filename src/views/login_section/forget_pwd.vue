<template>
  <div class="forget_pwd">
    <img src="@/assets/images/login_register_forget_img/bg.jpg" alt="背景">
    <div class="components">
      <div class="forget_section">
        <header>
          <h1>{{showText}}</h1>
        </header>
        <div class="name">
          <input type="text" placeholder="手机号" class="text_size_14" v-if="showPhone" v-model="formData.phone">
          <p v-else class="text_left text_size_14">{{login_phone}}</p>
        </div>
        <div class="code">
          <input type="text" placeholder="请输入验证码" class="text_size_14" v-model="formData.code">
          <button :class="code_disabled?'color_gray':'color_red'" @click="code"
            :disabled='code_disabled'>{{word}}</button>
        </div>
        <div class="pwd">
          <input :type="this.typeClass?'password':'text'" placeholder="设置6-16字符的新登录密码" class="text_size_14"
            v-model="formData.newPwd">
          <i :class="this.typeClass?'icon iconfont icon-biyan text_size_16':'icon iconfont icon-yanjing text_size_16'"
            @click="typeClick"></i>
        </div>
        <p class="tips text_size_16 color_red text_left">{{message}}</p>
        <el-button type="primary" :loading="loading" @click="submit"
          :class="disabled?'text_size_16 disabled_gray':'text_size_16 color_white'" :disabled="disabled">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    MessageBox,
    Button
  } from 'element-ui';
  import {
    checkPwd,
    checkPhone,
    alertBox,
    redirectTripartite
  } from '@/libs/publicFun';
  import md5 from 'blueimp-md5'
  import {
    setTimeout
  } from 'timers';
  export default {
    components: {
      'el-button': Button
    },
    data() {
      return {
        loading: false,
        typeClass: true,
        disabled: false,
        word: '获取验证码',
        code_disabled: false,
        showPhone: true,
        showText: "忘记密码",
        login_phone: '',
        message: '',
        formData: {
          code: "",
          newPwd: "",
          phone: "",
          smsSimplify: "Rest_Password_sms_code"
        },
        path:''
      }
    },
    watch: {
      formData: {
        deep: true,
        handler() {
          this.message = ''
          if (this.$route.query.isLogin) {
            if (this.formData.code == "" || this.formData.newPwd == "") {
              this.disabled = true
            } else {
              this.disabled = false
            }
          } else {
            if (this.formData.phone == "" || this.formData.code == "" || this.formData.newPwd == "") {
              this.disabled = true
            } else {
              this.disabled = false
            }
          }
        }
      }
    },
    methods: {
      typeClick() {
        this.typeClass = !this.typeClass
      },
      //倒计时
      countdown() {
        let time = 60,
          that = this
        var sendTimer = setInterval(function () {
          that.code_disabled = true;
          time--;
          that.word = time + 'S';
          if (time < 0) {
            that.code_disabled = false;
            clearInterval(sendTimer);
            that.word = "获取验证码";
          }
        }, 1000)
      },
      //已登录的状态发送验证码
      smsCodeDefaultSend() {
        this.$axios({
            url: "/v1/cms/core/smsCodeDefaultSend",
            data: "Rest_Password_sms_code"
          })
          .then((data) => {
            if (data.code != 0) {
              this.message = data.message
            } else {
              this.countdown()
            }
          })
      },
      // 未登录的状态发送验证码
      smsCodeSend(phone) {
        if (!checkPhone(phone)) {
          this.message = '请输入正确的手机号码'
          return
        }
        this.message = ''
        this.$axios({
            url: "/v1/cms/core/smsCodeSend",
            data: {
              simplify: 'Rest_Password_sms_code',
              phone: phone,
              existUser: true
            }
          })
          .then((data) => {
            if (data.code != 0) {
              this.message = data.message
            } else {
              this.countdown()
            }
          })
      },
      //发送验证码
      code() {
        if (this.$route.query.isLogin) {
          this.smsCodeDefaultSend()
        } else {
          this.smsCodeSend(this.formData.phone)
        }
      },
      //提交
      submit() {
        if (!this.$route.query.isLogin) {
          if (!checkPhone(this.formData.phone)) {
            this.message = "请输入正确的手机号码"
            return
          }
        }
        if (!checkPwd(this.formData.newPwd)) {
          this.message = "请设置6-16位字符的新登录密码"
          return
        }
        let data = {
          code: this.formData.code,
          newPwd: md5(md5(md5(this.formData.newPwd))),
          phone: this.formData.phone,
          smsSimplify: "Rest_Password_sms_code"
        }
        this.loading = true
        this.$axios({
            url: '/v1/uc/user/userPasswordRest',
            data: data
        })
        .then(data => {
          this.loading = false
          if (data.code == 0) {
            const h = this.$createElement;
            MessageBox({
              title: '提示',
              message: h('p', null, [
                h('span', null, '密码修改成功 ')
              ]),
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = '跳转中...';
                  this.$axios('/v1/fin/account/openAccountShanBa')
                  .then(data => {
                    done();
                    instance.confirmButtonLoading = false;
                    window.history.pushState(null,null,this.path)
                    localStorage.setItem('path',this.path)
                    redirectTripartite(data.result)
                  })
                  .catch( () => {
                    this.loading = false
                  })
                } else {
                  done();
                }
              }
            }).then(action => {})
            // MessageBox('', '提示', {
            //   confirmButtonText: '确定',
            // }).then(() => {
            //   this.$router.push('/')
            // }).catch(() => {});
          } else {
            this.message = data.message
          }
        })
      }
    },
    mounted() {
      if (this.$route.query.isLogin) {
        window.document.title = "找回登录密码"
        this.showPhone = false
        this.showText = '找回登录密码'
        this.login_phone = JSON.parse(localStorage.userInfo) && JSON.parse(localStorage.userInfo).user.phone
      } else {
        window.document.title = '忘记密码'
        this.showPhone = true
      }
    },
    beforeRouteEnter (to, from, next) {
      next( vm => {
        vm.path = from.fullPath
      }) 
    }
  }

</script>

<style scoped lang='less'>
  .forget_pwd {
    position: relative;

    img {
      height: 100%;
    }

    .components {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 1200px;
      display: flex;
      flex-direction: row-reverse;

      .forget_section {
        width: 360px;
        background: rgba(249, 247, 242, .9);
        padding: 34px 30px 56px;
        border-radius: 10px;

        header {
          padding-bottom: 42px;

          h1 {
            text-align: left;
            font-size: 26px;
            color: #32363c;
          }
        }

        .name,
        .pwd {
          background: #fff;
          height: 44px;
          border-radius: 5px;
          padding-left: 20px;
          border: 1px solid #e2e2e2;
        }

        .name {
          margin-bottom: 14px;
          display: flex;
          align-items: center;

          input {
            width: 98%;
            height: 100%;
          }
        }

        .code {
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;

          input {
            padding-left: 20px;
            width: 224px;
            height: 100%;
            border: 1px solid #e2e2e2;
            border-radius: 5px;
          }

          button {
            width: 98px;
            border-radius: 5px;
            border: 1px solid #e2e2e2;
            background: #fff;
            height: 100%;
            cursor: pointer;
          }
        }

        .pwd {
          display: flex;
          align-items: center;
          margin-bottom: 12px;

          input {
            width: 90%;
            height: 100%;
          }

          i {
            flex: 1;
          }
        }

        .tips {
          height: 16px;
          padding-left: 20px;
        }

        &>button {
          width: 100%;
          height: 46px;
          border: 1px solid #e2e2e2;
          background: #ff4e30;
          border-radius: 5px;
          margin-top: 12px;
          cursor: pointer;
          transition: all .5s;
        }

        .disabled_gray {
          background: #c4c7c8;
          color: #fff
        }

        .disabled_hover:hover {
          background: #f78989;
        }
      }
    }
  }

</style>
