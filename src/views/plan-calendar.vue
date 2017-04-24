<style lang="scss" scoped>
    .mint-header-title{
        padding-top: 1px;
        overflow: auto;
        height: 20px;
        line-height: 20px;
    }
    .input-weight {
        background: #f7f7f7;
    .hd {
        position: relative;
        height: 60px;
        text-align: center;
        font-size: 18px;
        color: #333;
        line-height: 60px;
    span {
        vertical-align: middle;
        height: 20px;
        width: 20px;
        display: inline-block;
        margin:0 auto;
        border-bottom: 2px solid #999;
        border-right: 2px solid #999;
        transform: rotate(-45deg) scale(0.5);
        -webkit-transform: rotate(-45deg) scale(0.5);
    }
    .lt-btn {
        transform: rotate(135deg) scale(0.5);
        -webkit-transform: rotate(135deg) scale(0.5);
    }
    em{
        vertical-align: middle;
        height: 35px;
        width: 35px;
        display: inline-block;
        line-height:30px;
    }
    }
    .hd:before {
        content: " ";
        position: absolute;
        background-color: #e6e6e6;
        bottom: -0.2rem;
        left: 0;
        right: 0;
        width: 100%;
        height: 1px;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    .bd {
    .bd-hd {
        padding-top: 10px;
    }
    .bd-hd,
    li {
        display: box;
        display: -webkit-box;
        -webkit-box-align: center;
        box-align: center;
        text-align: center;
        -webkit-box-pack: justify;
        box-pack: justify;
        font-size: .3rem;
        color: #333;
        position: relative;
        padding:.03rem;
    span {
        box-flex: 1;
        -webkit-box-flex: 1;
        display: block;
        text-align: center;
        width:1.07rem;
        height: .9rem;
        padding-top: .24rem;
        line-height: 1.2;
    }
    .gray {
        color: #999;
    }
    em {
        display: block;
        font-style: normal;
        font-size: .14rem;
        color: #47a304;
        background-color: #47a304;
        margin: auto;
        width: 4px;
        height: 4px;
        border-radius: 50%;
    }
    .curr {
        background: #f2901e;
        border-radius: 9999px;
    em {
        color: #fff;
    }
    }
    }
    li:before {
        content: " ";
        position: absolute;
        background-color: #e6e6e6;
        bottom: 1px;
        left: 0;
        right: 0;
        width: 100%;
        height: 1px;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    }
    }
</style>
<template>
    <div>
        <div class="input-weight">
            <mt-header title="鸣鹿健康">
                <router-link to="/#/" slot="left">
                    <mt-button icon="back" @click="goback">返回</mt-button>
                </router-link>
            </mt-header>
            <div class="hd"><em class="lt-hander" @click="prevMonth"><span class="lt-btn"></span></em>{{now.getFullYear()}}年{{now.getMonth() + 1}}月<em class="rt-hander" @click="nextMonth"><span class="rt-btn"></span></em></div>
            <div class="bd">
                <div class="bd-hd">
                    <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
                </div>
                <ul>
                    <li v-for="(i, l) in dateList.length/7">
                        <span @click="goLink(item)" v-for="(item, index) in dateList.slice(l*7, l*7+7)" :class="{'gray': !item.currentMonth, 'curr': (item.date==now.getDate()&&now.getMonth()==new Date().getMonth()&&item.currentMonth)}">
                            {{item.date}}<em v-if="item.value"></em>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'webpack-zepto';
    import {fmtDate} from  "../libs/utils.js";
    import { MessageBox } from 'mint-ui';
    require('../libs/flexible.js');

    export default {
        data() {
            return {
                popupVisible: false,
                selected: {},
                now: new Date(),
                dateString: '',
                planList: [],
                planData: {}
            }
        },
        watch: {
            // weightList(list) {
            //     if(list&&this.weightData) {
            //         list.forEach(item => {
            //             this.weightData[item.time] = item.weight;
            //         });
            //     }
            //     return list;
            // }
        },
        created() {
            this.now = new Date();
            this.type = this.$route.params.type;
        },
        computed: {
            dateList() {
                let now = this.now;
                let year = now.getFullYear();
                let tmpMonth = now.getMonth();
                let date = now.getDate();
                //获取当月的天数
                let currentMonthLength = new Date(year, tmpMonth + 1, 0).getDate();

                //先将当月的日期塞入dateList
                let dateList = Array.from({ length: currentMonthLength }, (val, index) => {
                    let datestr = year+'-'+(tmpMonth<9 ? '0' + (tmpMonth+1) : (tmpMonth+1))+'-'+ ((index+1)<=9?'0'+(index+1):(index+1));
                    return {
                        currentMonth: true,
                        date: index + 1,
                        value: this.planData[datestr]
                    }
                });
                //获取当月1号的星期是为了确定在1号前需要插多少天
                let startDay = new Date(year, tmpMonth, 1).getDay();
                // //确认上个月一共多少天
                let previousMongthLength = new Date(year, tmpMonth, 0).getDate();

                //在1号前插入上个月日期
                for (let i = 0, len = startDay; i < len; i++) {
                    dateList = [{ previousMonth: true, date: previousMongthLength - i }].concat(dateList)
                }
                //补全剩余位置
                let rest = (7 -  dateList.length%7);
                for (let i = 0; i< rest; i++) {
                    dateList[dateList.length] = { nextMonth: true, date: i + 1 }
                }
                return dateList;
            }
        },
        methods: {
            prevMonth: function(e){
                if (Date.now() > new Date(new Date().getFullYear()-1, 0, 1)) {
                    this.now = new Date(this.now.getFullYear(), this.now.getMonth()-1, this.now.getDate());
                    this.getMothInfo();
                }
            },
            nextMonth: function(e) {
                let nowdate = new Date();
                let nextMonth = new Date(nowdate.getFullYear(), nowdate.getMonth(), 0);
                if (this.now.getTime() < nextMonth.getTime()) {
                    this.now = new Date(this.now.getFullYear(), this.now.getMonth()+1, this.now.getDate());
                    this.getMothInfo();
                }
            },
            goLink: function (item) {
                let nowdate = new Date();
                let linkMoth = (this.now.getMonth()+1) > 9 ? this.now.getMonth()+1 : '0' + (this.now.getMonth()+1)
                let linkDate = item.date > 9 ? item.date : '0' + item.date;
                let calendarDataA = this.now.getFullYear()+'-'+(this.now.getMonth()+1)+'-'+(item.date+1);
                let calendarDataB = new Date(Date.parse(calendarDataA .replace(/-/g,"/")));

                if(calendarDataB < nowdate){
                    location.href = '/plan/listt?type=food#/detail/'+ this.type +'?date='+ this.now.getFullYear()+'-'+linkMoth+'-'+linkDate+'&from=history';
                } else {
                    location.href = '/plan/listt?type=food#/detail/'+ this.type +'?date='+ this.now.getFullYear()+'-'+linkMoth+'-'+linkDate;
                }
            },
            getMothInfo: function(){
                let postData = fmtDate(this.now, 'yyyy-MM');

                this.$http.get(`/plan/mon`+ this.type +`?time=${postData}`).then(res => {
                    if(res.body.success) {
                        this.planList = res.body.massages;
                        let data = {};
                        this.planList.forEach(item => {
                            data[item.time] = item.time;
                        });
                        this.planData = data;
                    }
                }, res=>{
                    MessageBox('注意', '获取信息失败');
                });
            },
            goback: function () {
                this.$router.push("/#/")
            }
        },
        mounted() {
            this.getMothInfo();
        },
    }

</script>
