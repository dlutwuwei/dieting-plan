<style lang="scss" scoped>

    .weight-curve{
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
    }
</style>
<template>
  <div class="weight-curve">
      <div class="hd">体重曲线 <span class="ico ico-1"></span></div>
      <div class="bd" id="rada-block" style="width:100%px;height:120px;"></div>
  </div>
</template>
<script>
    var echarts = require('echarts');

    export default {
        data() {
            return {
                myChart: null,
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
                        left: '5%',
                        top: '5%',
                        right: '5%',
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
                        position: ['40%', '20%'],
                        formatter: '{c}公斤',
                        alwaysShowContent: true,
                    },
                    xAxis : [
                        {
                            boundaryGap : false,
                            data : list.map(item=>item.date),
                            axisLine: 'false',
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
                                }
                            },
                            symbol: 'circle',
                            symbolSize: 5,
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
            this.showChart(this.weightCurve);

        },
    }

</script>
