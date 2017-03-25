<style lang="scss" scoped>

    .weight-curve{
        position:relative;
        margin-top:15px;
        .hd{
            position:relative;
            height: 45px;
            padding-left:20px;
            line-height: 45px;
            font-size: 18px;
            color: #333;
            background-color: #fff;
            border-bottom: 1px solid #dfdfdf;
            text-align:left;
            .ico-1:before{
                background-position: -100px -25px;
            }
            .ico-1{
                position: absolute;
                right: 18px;
                top: 10px;
                display: inline-block;
                width: 25px;
                height: 25px;
                overflow: hidden;
                vertical-align: middle;
            }
        }
        .bd{
            background:#fff;
            padding:10px 15px;
        }
        .weight-lt,.weight-rt{
            position:absolute;
            top: 60px;
            width:23px;
            line-height:1.3;
            font-size:12px;
            text-align:center;
            em{
                display: block;
                font-size: 10px;
                margin-top: 5px;
                font-style: normal;
            }
        }
        .weight-lt{
            left:2%;
        }
        .weight-rt{
           right:2%;
        }
    }
</style>
<template>
  <div class="weight-curve">
    <div class="hd">体重曲线 <router-link to="/index/weight"><span class="ico ico-1"></span></router-link></div>
    <div class="bd" id="rada-block" style="width:100%px;height:120px;"></div>
    <div class="weight-lt">初始体重 <em>{{weightLtVal}}</em></div>
    <div class="weight-rt">最新体重 <em>{{weightRtVal}}</em></div>
  </div>
</template>
<script>
    var echarts = require('echarts');

    export default {
        data() {
            return {
                myChart: null,
                weightLtVal: '',
                weightRtVal: ''
            }
        },
        props: ['weightCurve'],
        methods:{
            // 体重曲线
            showChart(list){


                // 基于准备好的dom，初始化echarts实例
                this.myChart = echarts.init(document.getElementById('rada-block'));

                let option = {
                    legend: {
                        padding: 0,
                        backgroundColor: 'transparent',
                    },
                    grid: {
                        show: false,
                        left: '10%',
                        top: '5%',
                        right: '10%',
                        bottom: '5%',
                        backgroundColor: '#fff',
                    },
                    textStyle:{
                        fontFamily: 'Microsoft Yahei',
                        fontSize: 10,
                    },
                    tooltip : {
                        trigger: 'item',
                        backgroundColor: 'transparent',
                        textStyle:{
                            color: '#666',
                            fontStyle: 18,
                            fontWeight:100,

                        },
                        position: ['45%', '0%'],
                        formatter: '{c}kg',
                        alwaysShowContent: true,
                    },
                    xAxis : [
                        {
                            boundaryGap : false,
                            data : list.map(item=>item.date),
                            axisLine: 'false',
                                axisLabel :{
                                interval:0
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine: 'false',
                            scale: true,
                            show:false,
                            splitLine:{
                                show:false
                            }
                        }
                    ],
                    series : [
                        {
                            type:'line',
                            stack: '总量',
                            data:list.map(item=>item.value),
                            itemStyle: {
                                normal: {
                                    color: 'green',
                                    show: true,
                                }
                            },
                            symbol: 'circle',
                            symbolSize: 10,
                        }
                    ],
                    backgroundColor: '#fff'
                }


                // 使用刚指定的配置项和数据显示图表。
                this.myChart.setOption(option);
            },


        },

        mounted(){
            let self = this;

            // 异步加载图表
            if(this.weightCurve && this.weightCurve.length > 0){
                this.showChart(this.weightCurve);
            }
            //默认把初始体重和最新体重输出
            let weightCurveLen = this.weightCurve.length;
            this.weightLtVal = this.weightCurve[0].value;
            this.weightRtVal = this.weightCurve[weightCurveLen - 1].value;
            console.log(weightCurveLen)
        },
    }

</script>
