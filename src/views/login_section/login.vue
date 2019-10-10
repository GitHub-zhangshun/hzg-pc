<template>
  <div class="login">
    <img src="@/assets/images/login_register_forget_img/bg.jpg" alt="背景">
    <div class="components">
      <div class="login_section">
        <header>
          <h1>欢迎回来</h1>
          <h3 class="text_size_14 color_red" style="cursor: pointer;" @click="$router.push('/register')">注册</h3>
        </header>
        <div class="name">
          <input type="text" placeholder="手机号/用户名" class="text_size_14" v-model="formData.phone">
        </div>
        <div class="pwd">
          <input :type="this.typeClass?'password':'text'" placeholder="登录密码" class="text_size_14"
            v-model="formData.pwd">
          <i :class="this.typeClass?'icon iconfont icon-biyan text_size_16':'icon iconfont icon-yanjing text_size_16'"
            @click="typeClick"></i>
        </div>
        <div class="tips">
          <span>{{message}}</span>
          <forgetText></forgetText>
        </div>
        <el-button type="primary" :loading="loading"
          :class="disabled?'text_size_16 disabled_gray':'text_size_16 color_white disabled_hover'" :disabled="disabled"
          @click="submit">登录</el-button>
        <button class="verification_code" @click="goLogin"><span>验证码登录</span><i
            class="icon iconfont icon-jiantou"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Button,
  } from 'element-ui';
  import forgetText from '@/components/other_components/forget_text.vue'
  import {
    setToken
  } from '@/libs/auth.js'
  import {
    number_format
  } from '@/libs/publicFun'
  import md5 from 'blueimp-md5'
  export default {
    components: {
      forgetText,
      'el-button': Button,
    },
    data() {
      return {
        typeClass: true,
        disabled: true,
        formData: {
          pwd: '',
          phone: ''
        },
        message: '',
        loading: false
      }
    },
    watch: {
      formData: {
        deep: true,
        handler() {
          this.message = ''
          if (this.formData.pwd != '' && this.formData.phone != '') {
            this.disabled = false
          } else {
            this.disabled = true
          }
        }
      }
    },
    methods: {
      goLogin() {
        if (this.$route.query.redirect) {
          this.$router.push({
            path: '/verification_code_login',
            query: {
              redirect: this.$route.query.redirect
            }
          })
        } else {
          this.$router.push('/verification_code_login')
        }

      },
      typeClick() {
        this.typeClass = !this.typeClass
      },
      submit() {
        this.loading = true
        this.$axios({
          url: "/v1/uc/user/investorLogin",
          data: {
            pwd: md5(md5(md5(this.formData.pwd))),
            phone: this.formData.phone
          }
        }).then(data => {
          this.loading = false
          if (data.code != 0) {
            this.message = data.message
          } else {
            setToken(data.result.token)
            window.localStorage.setItem('userInfo', JSON.stringify(data.result))
            if(data.result.attachInfo.isInitPassword){
              this.$store.commit('loginPwd',true)
            }
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)
            } else {
              this.$router.push('/')
            }
          }
        })
      }
    },
  }

</script>

<style scoped lang='less'>
  .login {
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

      .login_section {
        background: rgba(255, 255, 255, 0.8);
        padding: 34px 30px 56px;
        border-radius: 10px;
        width: 360px;

        header {
          padding-bottom: 42px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          h1 {
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

          input {
            width: 98%;
            height: 100%;
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
          color: #ff4e30;
          display: flex;
          justify-content: space-between;

          span {
            text-align: left;
          }

          &>p {
            cursor: pointer;
          }
        }

        button {
          width: 100%;
          height: 46px;
          border: 1px solid #e2e2e2;
          background: #ff4e30;
          border-radius: 5px;
          margin-top: 28px;
          cursor: pointer;
          transition: all .5s;
        }

        .disabled_gray {
          background: #c4c7c8;
        }

        .disabled_hover:hover {
          background: #f78989;
        }

        .verification_code {
          display: flex;
          margin: 36px auto 0;
          align-items: center;
          width: 196px;
          height: 48px;
          border-radius: 48px;
          background: transparent;
          border-color: #696666;
          padding: 0 14px;

          span {
            flex: 1;
          }
        }
      }
    }
  }

</style>
