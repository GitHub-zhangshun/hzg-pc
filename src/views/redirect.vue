<template>
  <div>

  </div>
</template>

<script>
  import {
    MessageBox
  } from 'element-ui';
  import {
    getToken
  } from '@/libs/auth'
  export default {
    data() {
      return {
        userInfo: {}
      }
    },
    created() {
      this.code = this.$route.query.retCode
      if (this.$route.query.retCode == '0') {
        this.msg = null
      } else if (this.$route.query.retCode == '406') {
        this.msg = '处理中'
      } else {
        this.msg = !this.$route.query.retMsg || this.$route.query.retMsg === 'null' || (this.$route.query.retMsg ===
          this.$route.query.retCode) ? '处理失败' : this.$route.query.retMsg
      }
      this.bCode = this.$route.query.bCode
      let path = localStorage.path || '/'
      if (this.code === '0' && this.bCode !== 'CancelAccount') {
        this.$router.replace(path)
      } else if (this.code === '0' && this.bCode === 'CancelAccount') {
        localStorage.clear()
        sessionStorage.clear()
        this.$router.replace('/')
      } else {
        MessageBox({
            title: '提示',
            message: this.msg || '网络异常，请稍后再试'
          })
          .then(() => {
            this.$router.replace(path)
          })
          .catch(() => {})
      }
      // if(localStorage.getItem('path')){    
      //     if(this.$route.query.retCode==='0000'){
      //         //登录账户信息
      //        this.$axios("/v1/uc/user/investorCurrent")
      //        .then(data => {
      //            this.userInfo = data.result.user
      //            if(this.userInfo.signFlag&&!this.userInfo.withdrawAuthFlag){
      //                //去授权
      //                location.href = process.env.domain + '/v1/fin/account/appAuth?isApp=false&token='+ getToken()
      //            }else if(this.userInfo.withdrawAuthFlag){
      //                this.$router.push(localStorage.getItem('path'))
      //            } 
      //        });
      //     }else{
      //         MessageBox(this.$route.query.retMsg, '提示', {
      //             confirmButtonText: '确定',
      //         }).then(() => {
      //             this.$router.push('/personal/openaccountstep')
      //         }).catch(() => {});
      //         return
      //     }                           
      // }else{
      //     this.$router.push('/')
      // }
    }
  }

</script>

<style scoped>

</style>
