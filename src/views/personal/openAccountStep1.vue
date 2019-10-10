<template>
<!-- 开通存款账户 -->
    <div class="content text_left">
        <p>开户</p>
        <div>
            <div class="row">
                <div class="row">
                    <span>真实姓名</span><el-input v-model="formData.name" clearable></el-input>  
                </div>
                <div class="row">
                    <span>身份证号</span><el-input v-model="formData.idCard" clearable></el-input>  
                </div>
            </div>

            <div class="row">
                <div class="row">
                    <span>开户银行</span>
                    <el-select v-model="formData.bank">
                        <el-option
                        v-for="(item,index) in bankList"
                        :key="index"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </div>
                <div class="row">
                    <span>银行卡号</span><el-input v-model="formData.cardNum" clearable></el-input>  
                </div>
            </div>

            <div class="row">
                <div class="row city">
                    <div class="row">
                        <span>开户省份</span>
                        <el-select v-model="formData.province">
                            <el-option
                            v-for="item in provinceList"
                            :key="item.parRegionId"
                            :label="item.parRegionName"
                            :value="item.parRegionId"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="row city_box">
                        <span class="city_name">城市</span>
                        <el-select v-model="formData.city" :disabled="cityDisable">
                            <el-option
                            v-for="(item,index) in cityList"
                            :key="index"
                            :label="item.regionName"
                            :value="item.regionCode"
                           >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="row">
                    <span>预留手机号</span><el-input v-model="formData.tel" clearable></el-input>  
                </div>
            </div>


            <p class="color_red msg">{{ message }}</p>
            <el-button @click="open" :disabled="isDisabled" :loading="isLoading" :class="isDisabled?'disable':'able'">立即开通</el-button>

            <p class="color_gray agree">开通代表你已经阅读并同意<span class="color_black" @click="agreement('license')">《用户授权协议》</span><span class="color_black" @click="agreement('funding')">《网贷客户交易结算资金账户三方协议》</span></p>
        </div>
    </div>
</template>

<script>
import { Input, Button, Select, Option, MessageBox } from 'element-ui'
import { checkPhone, checkIdcard } from '@/libs/publicFun'
import { getToken } from '@/libs/auth'

    export default {
        components: {
            'el-input': Input,
            'el-button': Button,
            'el-select': Select,
            'el-option': Option
        },
        data(){
            return {
                formData: {
                    name:'',
                    idCard:'',
                    bank:'',
                    cardNum:'',
                    province:'',
                    city:'',
                    tel:'',
                },
                isDisabled: true,
                isLoading:false,
                bankList: [],
                provinceList:[],
                cityList:[],
                message:'',
                cityDisable: true,
            }
        },
        methods: {
            open(){
                if(!checkIdcard(this.formData.idCard)){
                    this.message = '请输入正确的身份证号！'
                    return
                }
                if(!checkPhone(this.formData.tel)){
                    this.message = '请输入正确的手机号！'
                    return
                }

                // 开户
                this.isLoading = true
                this.$axios({
                    url:'/v1/fin/account/openAccount',
                    data:{
                        capAcntNo:this.formData.cardNum,
                        certifId:this.formData.idCard,
                        cityId:this.formData.city,
                        custNm:this.formData.name,
                        mobileNo:this.formData.tel,
                        parentBankId:this.formData.bank
                    }
                })
                .then(data => {
                    this.isLoading = false
                    if(data.code != 0){
                        MessageBox({
                            title:'提示',
                            message: data.message
                        }).catch(() => {});
                    }else{
                        //去签约
                        location.href = process.env.domain + '/v1/fin/account/appSignCard?isApp=false&token='+ getToken();
                    }
                })
                
            },
            // 查看协议
            agreement(a){
                sessionStorage.setItem('openAccountInfo', JSON.stringify(this.formData))
                if(a == 'license'){
                    if(sessionStorage.platformConfig){
                        this.$router.push({path:'/contract',query:{id:JSON.parse(sessionStorage.platformConfig).userLicenseAgreement,type:'text',title:'用户授权协议'}})
                    }
                }else if(a == 'funding'){
                    if(sessionStorage.platformConfig){
                        this.$router.push({path:'/contract',query:{id:JSON.parse(sessionStorage.platformConfig).fundingAgreement,type:'text',title:'网贷客户交易结算资金账户三方协议'}})
                    }
                }
            },
        },
        watch: {
            formData:{
                handler(val){
                    this.message = ''
                    if(this.formData.name && this.formData.idCard && this.formData.bank && this.formData.cardNum && this.formData.city && this.formData.tel){           
                        this.isDisabled = false
                    }else{
                        this.isDisabled = true
                    };

                    if(this.formData.province){
                        this.cityDisable = false
                        this.cityList = []
                        this.$axios('/v1/fin/account/getAllRegion',{data:this.formData.province})
                        .then(data => {
                            data.result.forEach(item => { 
                                this.cityList.push(item)
                            })
                        })
                    }
                },
                deep: true
            },
        },
        created(){
            //查询银行
            // this.$axios('/v1/fin/account/bankCode')
            // .then(data => {
            //     let dic = JSON.parse(sessionStorage.getItem('dictionaryListByAll'))
            //     let bank_jc_id = dic.find( i => { return i.simplify==="bank_fy"})
            //     let b = data.result.filter(item => {
            //         return item.operationId === bank_jc_id.Id
            //     })
            //     b.forEach( item => {
            //         this.bankList.push(item)
            //     })
            // })

            this.$axios('/v1/cms/op/bankListByOperation')
            .then(data => {
                this.bankList = data.result
            })

            //查询省份
            this.$axios('/v1/fin/account/region')
            .then(data => {
                data.result.forEach(item => {
                    this.provinceList.push(item)
                })
            })
        },
        beforeRouteEnter (to, from, next) {  
            next(vm => {
                if(from.path == '/contract' && sessionStorage.getItem('openAccountInfo')){
                    vm.formData = JSON.parse(sessionStorage.getItem('openAccountInfo'))
                }
            });
        }
    }
</script>

<style scoped lang="less">
.content{
    box-sizing: border-box;
    width: 920px;
    background: #fff;
    padding: 30px;
    &>p{
        font-size: 20px;
        margin: 10px 0 30px 0;
    }
    &>div{
        &>div{
            margin-left: 40px;
            &>div{
                align-items: center;
                margin-bottom: 20px;
                &:first-of-type{
                    margin-right: 30px;
                }
                span{
                    min-width: 70px;
                    margin-right: 10px;
                }
                /deep/.el-input{
                    width: 280px;
                }
                &.city{
                    &>div{
                        align-items: center;
                        margin-right: 20px;
                        /deep/.el-input{
                            width: 110px;
                        }
                        &.city_box{
                            margin-right: 0;
                            .city_name{
                                min-width: 30px !important;
                            }
                        }
                    }
                }
            }
        }
        .msg{
            text-align: center;
            margin-top: 20px;
        }
        .el-button{
            width: 240px;
            height: 50px;
            font-size: 16px;
            color: #fff;
            background: #ff4e30;
            border-radius: 180px;
            display: block;
            margin: 0 auto;
            margin-top: 20px;
            &.able{
                color: #fff;
                background: #ff4e30;
            }
            &.disable{   
                color: #969090;
                background: #c4c7c8;
            }
        }
        .agree{
            text-align: center;
            margin-top: 16px;
            span{
                cursor: pointer;
            }
        }
    }
}
</style>