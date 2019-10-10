<template>
<div>


    <nav>
        <div class="wrapper">
            <div class="banner">
                <img src="@/assets/images/information_img/info_banner.png" alt="">
            </div>
            <div class="nav-bar">
                <div class="bar-wrapper">
                <ul>
                    <router-link class="pointer" to="aboutUS" tag="li">
                    关于我们</router-link>
                    <router-link class="pointer" to="bankInfo" tag="li">
                    银行存管</router-link>
                    <router-link class="pointer" to="archivalInfo" tag="li">
                    备案信息</router-link>
                    <router-link class="pointer" to="companyInfo" tag="li">
                    公司概况</router-link>
                    <router-link class="pointer" to="expReport" tag="li">
                    审查报告</router-link>
                    <router-link class="pointer" to="operationData" tag="li" >
                    运营数据</router-link>
                    <router-link class="pointer" to="riskContrl" tag="li">
                    风险管理</router-link>
                    <router-link class="pointer" to="riskTips" tag="li">
                    风险提示</router-link>
                    <router-link class="pointer" to="lawInfo" tag="li">
                    法律法规</router-link>
                    <router-link class="pointer" to="statement" tag="li">
                    信披声明</router-link>
                </ul>
                <img src="@/assets/images/information_img/choose.png" alt="" :style="{left: `${leftPosition}px`}">
                </div>
            </div>            
        </div>
        
    </nav>
    <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            leftPosition: 0,
            items:[]
        }
    },   
    watch: {
        $route(nd) {
            // this.path = nd.path
            this.getLetPosition()
        }
    },
    created() {
        this.getLetPosition()
    },
    computed: {
    },
    methods: {
        getLetPosition() {
            let path = this.$route.query.path || this.$route.path
            let likePath = path.split('/')
            switch (likePath[2]) {
                case 'aboutUS':
                this.leftPosition = 6
                break;
                case 'bankInfo':
                this.leftPosition = 132
                break;
                case 'archivalInfo':
                this.leftPosition = 258
                break;
                case 'companyInfo':
                this.leftPosition = 384
                break;
                case 'expReport':
                this.leftPosition = 510
                break;
                case 'operationData':
                this.leftPosition = 640
                break;
                case 'riskContrl':
                this.leftPosition = 766
                break;
                case 'riskTips':
                this.leftPosition = 892
                break;
                case 'lawInfo':
                this.leftPosition = 1020
                break;
                case 'statement':
                this.leftPosition = 1146
                break;
                default:
                break;
            }
        }
    }
}
</script>
<style lang="less" scoped>
  nav {
    min-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .wrapper {
      // width: 1200px;
      position: relative;

      .banner {
        img {
          width: 100%;
          vertical-align: middle;
        }
      }

      .nav-bar {
        position: absolute;
        left: 0;
        bottom: 0;
        border-top: 1px solid #fff;
        width: 100%;
        display: flex;
        justify-content: center;

        .bar-wrapper {
          width: 1200px;
          display: flex;
          justify-content: flex-start;
          color: rgb(221, 218, 218);
          font-weight: 500;
          line-height: 3.5em;
          position: relative;

          img {
            transition: all .3s;
            position: absolute;
            top: -6px;
            // left: 8px;
            width: 48px;

          }

          ul {
            display: flex;
            justify-content: space-between;
            width: 100%;


            li {
              cursor: pointer;
              transition: all 1s;
              &:hover{
                color: #fff;
              }

              &.router-link-active {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }

</style>
