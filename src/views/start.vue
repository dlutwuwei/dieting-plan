<template>
    <div class="buy-container">
        <mt-header title="鸣鹿健康">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="buy-card">
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
                <mt-button type="primary" size="normal" v-on:click="post_prefer">下一步</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        created() {
            
        }
    }
</script>
<style lang="scss">
    .buy-container {
        background-color: #f7f7f7;
        .buy-card {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            margin-top: 8px;
            padding: 10px 25px;
            padding-bottom: 50px;
            background-color: #fff;
        }
        .buy-header {
            margin-top: 30px;
            height: 85px;
            img {
                height: 100%;
                border-radius: 5px;
            }
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
            font-size: 12px;
        }
        .cell {
            text-align: center;
            margin-top: 60px;
        }
        .mint-button--primary {
            height: 40px;
            width: 180px;
            background-color: #fff;
            border: 1px solid #47a304;
            color: #47a304;
        }
    }
    
</style>