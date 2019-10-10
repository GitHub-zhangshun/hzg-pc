<template>
<!-- 运营数据 -->
    <div class="operationDate">
        <div class="header">
            <span>运营时间</span>
            <ul class="time">
                <li>{{diffYears}}</li>
                <li>年</li>
                <li>{{diffDays}}</li>
                <li>天</li>
                <li>{{diffHours}}</li>
                <li>小时</li>
            </ul>            
        </div>
        <div class="choose">
            <el-date-picker
            v-model="chooseTime"
            type="month"
            :picker-options="pickerOptions2"
            placeholder="选择月"
            value-format="yyyy-MM"
            >
            </el-date-picker>
        </div>
        <div class="listTop">
            <ul>
                <li>
                    <div class="left">
                        <img src="@/assets/images/information_img/info_7.png" alt="">
                    </div>
                    <div class="right">
                        <h1>累计交易总额 (元)</h1>
                        <p>{{typeOne[0] && typeOne[0].textvalue}}</p>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="@/assets/images/information_img/info_6.png" alt="">
                    </div>
                    <div class="right">
                        <h1>累计交易笔数 (笔)</h1>
                        <p>{{typeOne[1] && typeOne[1].textvalue}}</p>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="@/assets/images/information_img/info_3.png" alt="">
                    </div>
                    <div class="right">
                        <h1>借贷余额 (元)</h1>
                        <p>{{typeOne[2] && typeOne[2].textvalue}}</p>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="@/assets/images/information_img/info_4.png" alt="">
                    </div>
                    <div class="right">
                        <h1>借贷余额笔数 (笔)</h1>
                        <p>{{typeOne[3] && typeOne[3].textvalue}}</p>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="@/assets/images/information_img/info_5.png" alt="">
                    </div>
                    <div class="right">
                        <h1>累计出借人数量 (人)</h1>
                        <p>{{typeOne[4] && typeOne[4].textvalue}}</p>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="@/assets/images/information_img/info_8.png" alt="">
                    </div>
                    <div class="right">
                        <h1>累计借款人数量 (人)</h1>
                        <p>{{typeOne[5] && typeOne[5].textvalue}}</p>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="@/assets/images/information_img/info_1.png" alt="">
                    </div>
                    <div class="right">
                        <h1>当前出借人数量 (人)</h1>
                        <p>{{typeOne[6] && typeOne[6].textvalue}}</p>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="@/assets/images/information_img/info_2.png" alt="">
                    </div>
                    <div class="right">
                        <h1>当前借款人数量 (人)</h1>
                        <p>{{typeOne[7] && typeOne[7].textvalue}}</p>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="@/assets/images/information_img/info_3.png" alt="">
                    </div>
                    <div class="right">
                        <h1>关联关系借款余额（元）</h1>
                        <p>{{typeOne[10] && typeOne[10].textvalue}}</p>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="@/assets/images/information_img/info_6.png" alt="">
                    </div>
                    <div class="right">
                        <h1>关联关系借款笔数（笔）</h1>
                        <p>{{typeOne[11] && typeOne[11].textvalue}}</p>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="@/assets/images/information_img/info_5.png" alt="">
                    </div>
                    <div class="right">
                        <h1>前十大借款人待还金额占比</h1>
                        <p>{{typeOne[8] && (typeOne[8].textvalue*100).toFixed(2)}}%</p>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="@/assets/images/information_img/info_5.png" alt="">
                    </div>
                    <div class="right">
                        <h1>最大单一借款人待还金额占比</h1>
                        <p>{{typeOne[9] && (typeOne[9].textvalue*100).toFixed(2)}}%</p>
                    </div>
                </li>
            </ul>
            <p>数据更新截止于{{time}}</p>
        </div> 
        <div class="contain" style="padding-bottom:0" >
            <p class="tips">（统计近一年的月度交易额，竖轴为交易额，横轴为月份）</p>
            <div class="canvasLine">
                <ve-line :data="chartDataMoney" :settings="chartSettingLine" :extend="extend" :colors="color" width="1060px" height="500px" :tooltip-visible="false" :legend-visible="false"></ve-line>
            </div>
        </div>   
        <div class="sexAgeBig">
            <div class="sexAge">
                <div class="ageLeft">
                    <div class="age">
                        <p>出借人年龄占比</p>
                    </div>
                    <div class="big_progress">
                        <div class="left_li">
                            <ul>
                                <li>25岁以下</li>
                                <li>25-35岁</li>
                                <li>36-50岁</li>
                                <li>50岁以下</li>
                            </ul>
                        </div>
                        <div class="center_progress">
                            <ul>
                                <li>
                                    <div class="progress">
                                        <span :style="{background: '#E0634F', width:Age[0] && Age[0].precent/total*100+'%'}"></span>
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span :style="{background: '#F7F01B', width:Age[1] && Age[1].precent/total*100+'%'}"></span>
                                    </div>
                                </li>
                                <li>     
                                    <div class="progress">
                                        <span :style="{background: '#33CEEA', width:Age[2] && Age[2].precent/total*100+'%'}"></span>
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span :style="{background: '#A83199', width:Age[3] && Age[3].precent/total*100+'%'}"></span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="right_li">
                            <ul>
                                <li>{{Age[0] && Age[0].precent}}人</li>
                                <li>{{Age[1] && Age[1].precent}}人</li>
                                <li>{{Age[2] && Age[2].precent}}人</li>
                                <li>{{Age[3] && Age[3].precent}}人</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="sexRight">
                    <div class="sex">
                        <p>出借人性别占比</p>
                    </div>
                    <div class="chart">
                        <ve-ring :data="chartDataAge" :colors="ageColors" :settings="chartSettings" height="200px" :legend-visible="false"></ve-ring>
                    </div>
                </div>
            </div>
            
        </div> 
        <div class="cl_box">
            <div class="cl_content">               
                <div class="qd_info">
                    <div class="qd_info_nr">
                        <img src="@/assets/images/information_img/2_03.png">
                        <h1>其他数据</h1>
                        <p>Other data</p>
                        <ul>
                            <li>逾期金额：{{overdueAmount}}元</li>
                            <li>逾期笔数：{{number}}笔</li>
                            <li>逾期90天（不含）以上金额：{{over_90_money}}元</li>
                            <li>逾期90天（不含）以上笔数：{{over_90_number}}笔</li>
                            <li>累计代偿金额：{{accumulatedCompensationAmount}}元</li>
                            <li>累计代偿笔数：{{accumulatedCompensationNumber}}笔</li>
                            <li>项目逾期率：{{project}}%</li>
                            <li>金额逾期率：{{money}}%</li>
                        </ul>
                    </div>
                </div>
                <div class="important_th">
                    <img src="@/assets/images/information_img/2_03.png">
                    <h1>出借人收费标准</h1>
                    <p>Charges for Lenders</p>
                    <ul>
                        <li>
                            <div class="im_left">充值费用</div>
                            <div class="im_right">平台目前不收取充值手续费</div>
                        </li>
                        <li>
                            <div class="im_left">提现费用</div>
                            <div class="im_right">平台目前不收取提现手续费</div>
                        </li>
                        <li>
                            <div class="im_left">利息服务费用</div>
                            <div class="im_right">平台目前不向出借人收取利息服务费用</div>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import VeRing from 'v-charts/lib/ring.common'
import {DatePicker} from 'element-ui'
import {formatDate,getPreMonth,number_format} from '@/libs/publicFun'
import returnPlanBoxVue from '../personal/returnPlanBox.vue';
    export default { 
        components:{
            'el-date-picker':DatePicker,
            've-line':VeLine,
            've-ring':VeRing
        },
        data(){
            this.chartSettings = {
                area: true,
                radius: [40, 70],
                offsetY: 100,
                hoverAnimation:false,
            }
            this.extend = {
                series: {
                    areaStyle:{
                        color:['#FFF5F3']
                    }
                }
            }
            this.chartSettingLine = {
                area:true,
                yAxisName:['亿'],
                yAxisType:['']
            }
            return{
                ageColors:['#2cb8f9','#f8238c'],
                chartDataAge:{
                    columns: ['sex', 'precent'],
                    rows: []
                },
                color:['#F58E9A'] , 
                chooseTime:getPreMonth(`${new Date().getFullYear()}-${new Date().getMonth()+1}`),
                pickerOptions2:{
                    disabledDate(time) {
                        return new Date('2015-05') > time || time >= new Date(`${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}`)
                    }
                },
                typeOne:[],
                diffYears:'',
                diffDays:'',
                diffHours:'',
                chartDataMoney: {
                    columns: ['日期', '交易量'],
                    rows: []
                },
                Age:[],
                total:'',
                overdueAmount:'',
                number:'',
                over_90_money:'',
                accumulatedCompensationAmount:'',
                over_90_number:'',
                accumulatedCompensationNumber:'',
                project:'',
                money:'',
            }
        },     
        computed:{
            time(){
                return formatDate((new Date()).getTime(),'yyyy年MM月dd日')
            },
            
        }, 
        methods:{
            requestList(val){
                console.log(1)
                this.chartDataMoney = {
                                        columns: ['日期', '交易量'],
                                        rows: []
                                    }
                this.typeOne = []
                this.total = ''
                this.Age = []
                this.chartDataAge = {
                    columns: ['sex', 'precent'],
                    rows: []
                }
                this.overdueAmount = ''
                this.number = ''
                this.over_90_money = ''
                this.accumulatedCompensationAmount = ''
                this.accumulatedCompensationNumber = ''
                this.project = ''
                this.money = ''
                //趋势图
                this.$axios({url:'/v1/sc/statistics/cumulativeTransactionMoney',data:val})
                .then(data=>{
                    data.result.forEach(item => {
                        this.chartDataMoney.rows.push({ '日期': item.monthStr, '交易量': item.money/100000000},)
                    })
                })
                .catch( ()=>{})
                //概况
                this.$axios({url:'/v1/sc/statistics/loanSituation',data:val})
                .then(data=>{
                    for(let i = 0;i<data.result.length;i++){
                        if(i==2){
                            this.typeOne.push({title:data.result[i].title,textvalue:number_format(data.result[i].textvalue,2,'.',',')})
                        }else if(i==8 || i==9){
                            this.typeOne.push({title:data.result[i].title,textvalue:data.result[i].textvalue})
                        }else{
                            this.typeOne.push({title:data.result[i].title,textvalue:number_format(data.result[i].textvalue,0,'.',',')})
                        }
                        
                    }
                })
                .catch( ()=>{})
                //年龄
                this.$axios({url:'/v1/sc/statistics/userAge',data:val})
                .then(data=>{
                    let totalNumber = 0
                        for(let i = 0;i<data.result.length;i++ ){
                            this.Age.push({ 'age': data.result[i].title, 'precent': data.result[i].textvalue})
                            totalNumber = totalNumber + data.result[i].textvalue
                        }
                        this.total = totalNumber
                })
                //性别
                this.$axios({url:'/v1/sc/statistics/userSex',data:val})
                .then(data=>{
                    data.result.forEach(item => {
                        this.chartDataAge.rows.push({'sex':item.title,'precent':item.textvalue})
                    
                    })                        
                })
                .catch( ()=>{})
                this.$axios({url:'/v1/sc/statistics/userOverdue',data:val})
                .then(data=>{
                    for(let i = 0;i<data.result.length; i++){
                        switch (data.result[i].title){
                            case '逾期金额（元）':
                            this.overdueAmount = data.result[i].textvalue
                            break;
                            case '逾期笔数':
                            this.number = data.result[i].textvalue
                            break;
                            case '逾期90天（不含）以上借款金额（元）':
                            this.over_90_money = data.result[i].textvalue
                            break;
                            case '累计代偿金额':
                            this.accumulatedCompensationAmount = data.result[i].textvalue
                            break;
                            case '逾期90天（不含）以上笔数':
                            this.over_90_number = data.result[i].textvalue
                            break;
                            case '累计代偿笔数':
                            this.accumulatedCompensationNumber = data.result[i].textvalue
                            break;
                            case '项目逾期率':
                            this.project = data.result[i].textvalue*100
                            break;
                            case '金额逾期率':
                            this.money = data.result[i].textvalue*100
                            break;
                        }
                    }  
                })
                .catch( ()=>{})
            },
            //月份加一
            getNewMonth(val){
                let a = val.split('-')
                let year = a[0]
                let month = a[1]
                let newMonth = Number(month)+1
                if(newMonth<10){
                    newMonth = `0${newMonth}`
                }
                if(month==12){
                    year = Number(year)+1
                    newMonth = '01'
                }
                return `${year}-${newMonth}-01 00:00:00`
            },
        },
        watch:{
            chooseTime(){
                let newDate = this.getNewMonth(this.chooseTime)
                this.requestList(new Date(newDate).getTime())
            }           
        },
        created(){
            //选择的日期 月份移动到下一个月并转为时间戳
            let newDate = this.getNewMonth(this.chooseTime)           
            this.$axios({url:'/v1/sc/statistics/GetStartRunTime'})
            .then(data=>{
                var seconds = 1000;
                var minutes = seconds * 60;
                var hours = minutes * 60;
                var days = hours * 24;
                var years = days * 365;
                var today = new Date();
                var todayYear = today.getFullYear();
                var todayMonth = today.getMonth()+1;
                var todayDate = today.getDate();
                var todayHour = today.getHours();
                var todayMinute = today.getMinutes();
                var todaySecond = today.getSeconds();
                var t1 = new Date(data.result); //北京时间2016-12-1 00:00:00
                // var t2 = Date.UTC(todayYear,todayMonth,todayDate,todayHour,todayMinute,todaySecond);
                var t2 = new Date()
                var diff = t2-t1;
                var diffYears = Math.floor(diff/years);
                var diffDays = Math.floor((diff/days)-diffYears*365);
                var diffHours = Math.floor((diff-(diffYears*365+diffDays)*days)/hours);
                this.diffYears = diffYears
                this.diffDays = diffDays
                this.diffHours = diffHours
            })
            .catch( ()=>{})
            this.requestList(new Date(newDate).getTime())
        },
    }
</script>

<style scoped lang='less'>
.operationDate{
    background: #fff;
    padding-top: 65px;
    .header{
        margin: 0 auto 50px;
        border-radius: 10px;
        width: 1070px;
        border:1px solid #f0624a;
        height: 70px; 
        position: relative;
        span{
            background: #fff;
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 20px;
            width: 163px;
        }
        .time{
            display: flex;
            justify-content: center;
            align-items: flex-end;
            position: absolute;
            bottom: -28px;
            left: 50%;
            transform: translateX(-50%);
            width: 360px;
            background: #fff;
            li:nth-of-type(2n+1){
                width: 66px;
                height: 58px;
                background: url('../../assets/images/information_img/img.png') no-repeat;
                background-size: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 26px;
                color: #fff;
            }
            li:nth-of-type(2n){
                padding:0 5px; 
            }
        }
    }
    .choose{
        padding-bottom: 30px;
    }
    .listTop{
        padding: 60px 0 0;
        margin: 0 auto;
        background: #e6edf2;
        border-radius: 10px;
        width: 1200px;
        ul{
            padding-bottom: 30px;
            display:flex;
            flex-wrap: wrap;
            li{
                padding-left: 36px;
                padding-bottom: 46px;
                width: 364px;
                display: flex;
                .left{
                    margin-right: 16px;
                }
                .right{                
                    h1{
                        font-size: 14px;
                        padding: 6px 0 10px;
                        color: #848a93;
                    }
                    p{
                        font-size: 20px;
                        color: #000;
                        text-align: left;
                    }
                }
            }    
            li:nth-of-type(7),
            li:nth-of-type(8){
                padding-bottom: 0;
            }
        }
        &>p{
            padding-right: 28px;
            padding-bottom: 18px;
            text-align: right;
            color: #848a93;
        }
                 
    }
    .contain{
        padding-top: 80px;
        background: #fff;
        padding-bottom: 60px;
        margin-bottom: 20px;
        &>.tips{
            font-size: 20px;
        }
        .canvasLine{
            width: 1060px;
            padding: 0 70px;
            margin: 0 auto;
        }
        
    }
    .sexAgeBig{
        padding-top: 60px;
        padding-bottom: 60px;       
        background: #eef2f4;
        .sexAge{
            display: flex;
            justify-content: space-between;
            width: 1060px;
            padding: 0 70px;
            margin: 0 auto;
            .ageLeft{
                width: 530px;
                .age{                    
                    color:#000;
                    padding-bottom: 30px;
                    p{
                        font-size:16px; 
                    }
                }
                .big_progress{
                    display: flex;
                    justify-content:space-between;
                    .left_li{
                        padding-top: 18px;
                        ul{
                            display: flex;
                            flex-flow: column;
                            li{
                                display: flex;
                                align-items: center;
                                justify-content: flex-end;
                                height: 25px;
                                padding-bottom: 21px;
                                font-size: 14px;
                                color: #88898D;
                            }
                        }
                    }
                    .center_progress{
                        flex: 1;
                        padding: 0 16px;
                        ul{
                            padding-top: 18px;
                            display: flex;
                            flex-flow: column;
                            border-bottom: 1px solid #E1E1E1;
                            border-left: 1px solid #E1E1E1;
                            li{
                                padding-bottom: 21px;
                                .progress{
                                    width: 100%;
                                    background: #fff;
                                    height: 25px;
                                    border-top-right-radius: 20px;
                                    border-bottom-right-radius: 20px;
                                    position: relative;
                                    span{
                                        position: absolute;
                                        transition: all 1s;
                                        left: 0;
                                        height: 25px;
                                        display: inline-block;
                                        border-top-right-radius: 20px;
                                        border-bottom-right-radius: 20px;
                                    }
                                }
                            }
                        }
                    }
                    .right_li{
                         padding-top: 18px;
                        ul{
                            display: flex;
                            flex-flow: column;
                            li{
                                display: flex;
                                align-items: center;
                                justify-content: flex-end;
                                height: 25px;
                                padding-bottom: 21px;
                                font-size: 14px;
                                color: #88898D;
                            }
                        }
                    }
                }               
            }
            .sexRight{
                width: 530px;
                .sex{
                    color:#000;
                    padding-bottom: 30px;
                    p{
                        font-size:16px; 
                    }
                }
            }
        }
    }  
    .cl_box{   
        padding-top: 80px;
        padding-bottom: 80px;
        .cl_content{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            .important_th{
                position: relative;
                background-color: #f2f2f2;
                margin-top: 190px;
                padding: 55px 0 36px 114px;
                text-align: left;
                flex: 1;
                h1{
                    position: absolute;
                    left: 152px;
                    top: 48px;
                    color: #333333;
                    font-size: 16px;
                }
                p{
                    position: absolute;
                    left: 185px;
                    top: 82px;
                    color: #333333;
                    font-size: 11px;
                    text-transform: uppercase;
                }
                ul{
                    padding-top: 50px;
                    li{
                        display: flex;
                        padding: 16px 20px 16px 30px;
                        justify-content: space-between;
                        align-items: center;
                        line-height: 1.4;
                        .im_left{
                            color: #333333;
                            font-size: 16px;
                        }
                        .im_right{
                            text-align: right;
                            color: #848a93;
                            font-size: 16px;
                        }
                    }
                    li:nth-of-type(2n+1){
                        // background-color: #ffffff;
                    }
                }
            }
            .qd_info{
                background-color: #fbe7e5;
                width: 600px;
                .qd_info_nr{
                    position: relative;
                    padding: 50px 30px 22px;
                    text-align: left;
                    h1{
                        position: absolute;
                        left: 70px;
                        top: 45px;
                        color: #333333;
                        font-size: 16px;
                    }
                    p{
                        position: absolute;
                        left: 100px;
                        top: 79px;
                        color: #333333;
                        font-size: 11px;
                        text-transform: uppercase;
                    }
                    ul{
                        padding-top: 50px;
                        padding-left: 35px;
                        li{
                            font-size: 16px;
                            color: #333333;
                            margin-bottom: 28px;
                            line-height: 1.5;
                        }
                    }

                }
            }
        }
    }  
}

</style>