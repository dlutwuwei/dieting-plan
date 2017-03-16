<template>
    <div class="app bmi-page">
        <mt-header title="鸣鹿健康">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="bmi-container">
            <div class="title">你的BMI指数为<span class="number">{{bmi}}</span><span class="text">（{{perform}}）</span></div>
            <div class="info">(身高：{{height}}，体重：{{weight}}kg)</div>
            <div class="line">
                <div class="line-arrow"><img src="../assets/images/jianfei/bmi-arrow.png" v-bind:style="{left: bmi*100/50 + '%'}"></div>
                <div class="bmi-line"><img src="../assets/images/jianfei/bmi-line.png" alt=""></div>
            </div>
            <div class="description">您目前的体重属于瘦弱，请加强营养，健康增重。</div>
            <div class="buy-notice">若想获得专属个性化减肥方案，请 购买思维必专业减肥。<span class="text">点击购买</span></div>
        </div>
        <div class="terms"><input type="checkbox" id="terms">同意<label class="text" for="terms">《鸣鹿减肥法用户协议</label></div>
        <div class="next-btn">
            <mt-button type="primary" @click="start">开始减肥</mt-button>
        </div>
    </div>
</template>
<script>
    function getQuery(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    function calculateBmi(weight, height) {
        if (weight > 0 && height > 0) {
            var finalBmi = weight / (height / 100 * height / 100)
            return finalBmi;
        }
        else {
            return 0;
        }
    }
    export default {
        data() {
            return {
                weight: getQuery('w'),
                height: getQuery('h')
            }
        },
        computed: {
            bmi: function () {
                return calculateBmi(this.weight, this.height).toFixed(2);
            },
            perform: function() {
                let perform = '';
                if (this.bmi <= 18.5) {
                    perform = '偏瘦';
                } else if(this.bmi <= 24) {
                    perform = '正常';
                } else if(this.bmi <= 28) {
                    perform = '超重';
                } else {
                    perform = '肥胖';
                }
                return perform;
            }
        },
        methods: {
            start: function() {
                location.href = '/prefer/prefer';
            }
        }
    }

</script>
<style lang="scss">
    .next-btn {
        text-align: center;
    }
    
    .bmi-page {
        padding-bottom: 80px;
    }
    
    .terms {
        margin: 17px 0 40px 0;
        text-align: center;
    }
    
    .buy-notice {
        margin-bottom: 50px;
        padding: 0 12px;
    }
    
    .description {
        font-size: 15px;
        padding: 18px 0;
        text-align: center;
        border-top: solid 1px #999;
        margin: 35px 10px 0 10px;
        color: #333;
    }
    
    body {
        background: #f7f7f7;
    }
    
    .bmi-container {
        overflow: hidden;
        margin: 15px 16px;
        background: #fff;
        .title {
            font-size: 15px;
            text-align: center;
            vertical-align: middle;
            padding-top: 25px;
            overflow: hidden;
            .number {
                font-size: 18px;
                color: #f2901e;
            }
            .text {
                font-size: 18px;
                color: #f2901e;
            }
        }
        .info {
            font-size: 15px;
            margin-top: 18px;
            text-align: center;
        }
        .line {
            margin-top: 14px;
            .bmi-line {
                text-align: center;
                img {
                    width: 80%;
                }
            }
            .line-arrow {
                height: 30px;
                position: relative;
                left: -10px;
                width: 80%;
                margin: auto;
                img {
                    width: 23px;
                    left: 100%;
                    position: absolute;
                }
            }
        }
    }
</style>