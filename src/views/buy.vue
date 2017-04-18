<template>
    <div class="buy-container">
        <mt-header title="鸣鹿健康">
        </mt-header>
        <div class="buy-card" v-if="type!=15 && type!=7">
            <div class="cell1 bottom">
                <mt-button type="primary" size="normal" v-on:click="test15">15天免费试用</mt-button>
            </div>
            <div>
                运用德国体质检测大数据库，制作针对东方人饮食习惯及体质特 点的短期减肥计划，定期推送专业指导！！
            </div>
        </div>
        <div class="buy-card" v-if="type!=7&&type!=9">
            <div class="cell1 bottom">
                <mt-button type="danger" size="normal" v-on:click="buy">购买鹿鸣减肥计划</mt-button>
            </div>
            <div>
                用户通过思维必体质检测，了解实时身体营养素含量状况，精准计算出用户每天所需摄入的蛋白质、脂肪、碳水化合物、膳食纤维和微量元素等营养物质的比值和含量，针对性提高用户身体新陈代谢机能，结合运算并达到最佳燃脂比率。让您在有限的热量摄入范围内吃您所缺的，补您该补的！从而达到全面有效的体重管理、健康减肥效果 ----你的专属减肥计划！
            </div>
        </div>
        <!--<div class="buy-card">
             <div class="address-title">请确认收货地址信息</div>
             <div class="address-notice">说明：鸣鹿将为您邮寄头发采集器及相关说明，请按 照要求完成采集！鸣鹿将在7日后开始为您推送减肥 计划！</div>
        </div>
        <div class="buy-card">
             <div class="address-receiver"><span class="name">收件人：杨萍</span><span class="phone">18510793512</span></div>
             <div class="address-text">收货地址：北京市朝阳区酒仙桥路20号颐堤港605-606</div>
        </div>
        <div class="buy-bill"><input type="checkbox" id="bill"><label for="bill">是否需要发票</label></div>-->


        <!--3-21 <div class="buy-card" v-if="showpay">
            <div class="buy-header">
                <img src="../assets/images/jianfei/buy-head.png" alt="">
                <div class="buy-title">
                    <div class="text">鸣鹿减肥计划</div>
                    <div class="price">&yen;9899</div>
                </div>
            </div>
            <div class="buy-content">
                <p>用户通过思维必体质检测，了解实时身体营养素含量状况，精 准计算出用户每天所需摄入的蛋白质、脂肪、碳水化合物、膳 食纤维和微量元用户通过思维必体质检测，了解实时身体营养素含量状况，精 准计算出用户每天所需摄入的蛋白质、脂肪、碳水化合物、膳 食纤维和微量元</p>
            </div>
            <div class="cell bottom">
                <mt-button type="primary" size="normal" v-on:click="pay">付款</mt-button>
            </div>
        </div>-->
        <div class="cell bottom" v-if="type==7">
            <mt-button type="primary" size="normal" v-on:click="start7">开启七天过渡期</mt-button>
        </div>
    </div>
</template>
<script>
    import {getQuery} from '../libs/utils';
    import { MessageBox } from 'mint-ui';

    export default {
        data() {
            return {
                type: getQuery('type'),
                /*showpay: false,
                showbuy: true*/
            }
        },
        methods: {
            pay: function() {
                let price = document.querySelector('.price').innerHTML;
                let priceEnd = price.substring(1);
                let postdata = {

                }
                console.log(priceEnd)
                //支付完成才开启7天计划 /seven/indexstage
                this.$http.post('buy/buyadd').then(res => {
                    if(res.body.success) {
                        //location.href = '/';
                    } else {
                        MessageBox('注意', '请求失败');
                    }
                }, () => {
                    MessageBox('注意', '请求失败');
                })
            },
            start7: function() {

                //开启7天计划
                this.$http.post('/seven/index').then(res => {
                    if(res.body.success) {

                    } else {
                        MessageBox('注意', '请求失败');
                    }
                }, () => {
                    MessageBox('注意', '请求失败');
                })
            },
            buy: function() {
                /*this.showbuy = false;
                this.showpay = true;*/
                location.href = 'http://wap.cellwellbeing.cn/index.php/Home/Lose/showlist';
            },
            test15: function() {
                // 开启15天试用
                this.$http.get('/Fifteen/findex',{}).then(res=>{
                    //跳转去选择肥胖原因
                    location.href = '/prefer/prefer/reason';
                });
            }
        },
        created() {

        }
    }
</script>
<style lang="scss">
    .mint-header-title{
        padding-top: 3px;
        overflow: auto;
        height: 35px;
        line-height: 35px;
    }
    .buy-container {
        background-color: #f7f7f7;
        font-size: 14px;
        overflow: hidden;
        .buy-card {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            margin-top: 8px;
            padding: 10px 25px;
            background-color: #fff;
        }
        .buy-bill {
            line-height: 50px;
        }
        .buy-header {
            margin-top: 30px;
            height: 85px;
            img {
                height: 100%;
                border-radius: 5px;
            }
        }
        .address-title {
            font-size: 18px;
            line-height: 44px;
        }
        .address-receiver {

            line-height: 36px;
        }
        .address-text{

            line-height: 24px;
        }
        .address-notice {

            color: #ff0000;
        }
        .buy-title {
            height: 85px;
            display: inline-block;
            vertical-align: top;
            font-size: 15px;
            padding-left: 20px;
            .text {
                margin-bottom: 10px;
            }
            .price {
                color: #ff0000;
            }

        }
        .buy-content {
            margin-top: 18px;

        }
        .cell {
            text-align: center;
            margin-top: 60px;
            margin-bottom: 50px;
        }
        .cell1 {
            text-align: center;
            margin: 30px 0 20px 0;
        }
    }

</style>
