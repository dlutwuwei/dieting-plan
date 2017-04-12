<style lang="scss" scoped>
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
                <a href="/" slot="left">
                    <mt-button icon="back" @click="goback">返回</mt-button>
                </a>
            </mt-header>
            <HeatPlate :heat-plate="heatPlate" :user-type="userInfo.type" :hide-title="true"></HeatPlate>
            <div class="hd"><em class="lt-hander" @click="prevMonth"><span class="lt-btn"></span></em>{{now.getFullYear()}}年{{now.getMonth() + 1}}月<em class="rt-hander" @click="nextMonth"><span class="rt-btn"></span></em></div>
            <div class="bd">
                <div class="bd-hd">
                    <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
                </div>
                <ul>
                    <li v-for="(i, l) in dateList.length/7">
                        <span @click="onClick(item)" v-for="(item, index) in dateList.slice(l*7, l*7+7)" :class="{'gray': !item.currentMonth, 'curr': (item.date==now.getDate()&&now.getMonth()==new Date().getMonth()&&item.currentMonth)}">
                            {{item.date}}<em v-if="item.value"></em>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import InputWeightPop from '../components/index/inputWeightPop.vue';//录入体重日历弹窗
    import HeatPlate from '../components/index/heatPlate.vue';//能量盘

    import $ from 'webpack-zepto';
    import {fmtDate} from  "../libs/utils.js";
    import { MessageBox, Indicator } from 'mint-ui';
    require('../libs/flexible.js');

    export default {
        data() {
            return {
                popupVisible: false,
                selected: {},
                now: new Date(),
                dateString: '',
                weightList: [],
                weightData: {},
                heatPlate:[],
                userInfo: window.userInfo,
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
                    let datestr = year+'-'+(tmpMonth<=9 ? '0' + (tmpMonth+1) : (tmpMonth+1))+'-'+ ((index+1)<=9?'0'+(index+1):(index+1));
                    return {
                        currentMonth: true,
                        date: index + 1,
                        value: this.weightData[datestr]
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
                if (this.now.getTime() <= nextMonth.getTime()) {
                    this.now = new Date(this.now.getFullYear(), this.now.getMonth()+1, this.now.getDate());
                    this.getMothInfo();
                }
            },
            onClick: function (item) {
                if(!item.currentMonth) {
                    return;
                }
                let nowdate = new Date();
                let calendarDataA = this.now.getFullYear()+'-'+(this.now.getMonth()+1)+'-'+item.date;
                let calendarDataB = new Date(Date.parse(calendarDataA .replace(/-/g,"/")));
                if(calendarDataB <= nowdate){
                    Indicator.open('加载中...')
                    this.$http.get('/Plan/heatplate/time/' + fmtDate(new Date(calendarDataA), 'yyyy-MM-dd')).then(res => {
                        if(res.body.success) {
                            this.heatPlate = res.body.massages;
                        }
                        Indicator.close();
                    });

                    // this.popupVisible = true;
                    // let now = this.now;
                    // let year = now.getFullYear();
                    // let tmpMonth = now.getMonth()+1;
                    // let date = item.date;
                    // this.selected = item;
                    // this.selected.monthData = calendarDataA;
                    // this.selected.value = item.value || 0;
                    // this.dateString = `${year}-${tmpMonth<=9?'0'+tmpMonth:tmpMonth}-${date<=9?'0'+date:date}`;
                }
            },
            popClose: function () {
                this.popupVisible = false;
                let rulerEm = document.getElementById('ruler-em');
                rulerEm.style.left = '150px';
            },
            getMothInfo: function(){
                let postData = fmtDate(this.now, 'yyyy-MM');
                this.$http.get(`/plan/heatsearch/time/${postData}`).then(res => {
                    if(res.body.success) {
                        this.weightList = res.body.massages;
                        let data = {};
                        this.weightList.forEach(item => {
                            data[item.time] = item.time;
                        });
                        this.weightData = data;
                    }
                }, res=>{
                    MessageBox('注意', '获取信息失败');
                });
            },
            goback: function () {
                history.back();
            }
        },
        components: {
            InputWeightPop,
            HeatPlate,
        },
        mounted() {
            this.getMothInfo();
            let date = this.now.getFullYear()+'-'+(this.now.getMonth()+1)+'-'+this.now.getDate();
            Indicator.open('加载中...')
            this.$http.get('/Plan/heatplate/time/' + fmtDate(new Date(date), 'yyyy-MM-dd')).then(res => {
                if(res.body.success) {
                    this.heatPlate = res.body.massages;
                }
                Indicator.close();
            });
        },
    }

</script>
