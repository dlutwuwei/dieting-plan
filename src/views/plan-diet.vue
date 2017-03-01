<template>
    <div>
        <mt-header title="添加食物">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="food-card">
            <div class="food-item" v-for="item in data">
                <img :src="item.icon" alt="">
                <div class="food-info">
                    <div class="food-name">{{item.name}}</div>
                    <div class="food-weight">{{item.value}}{{type=='sport'?'分钟':'克'}}</div>
                </div>
                <div class="food-calories">
                    {{item.value * item.unit}}千卡
                </div>
            </div>
            <div class="cell bottom">
                <router-link :to="addUrl" slot="left">
                    <mt-button type="primary" size="normal">自定义添加</mt-button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data:[]
            }
        },
        methods: {
            fetchData: function() {
                if(this.type == 'sport') {
                    this.data = window.sportList;
                } else {
                    this.data = window.foodList.breakfast;
                }
            }
        },
        mounted() {
            this.fetchData();
        },
        created() {
            this.type = this.$route.params.type;
            this.addUrl = '/plan/add/' + this.type;
        }
    }

</script>
<style lang="scss">
    body {
        background: #f7f7f7;
    }
    
    .cell {
        text-align: center;
        margin: 20px 0;
    }
    
    .food-card {
        overflow: hidden;
        margin-top: 5px;
        background: #fff;
        padding: 0 26px;
        .food-title {
            line-height: 45px;
            font-size: 15px;
            span {
                font-size: 12px;
            }
            border-bottom: 1px solid #dfdfdf;
        }
        .food-item {
            height: 46px;
            border-bottom: 1px solid #dfdfdf;
            display: flex;
            align-items: center;
            justify-content: space-between;
            img {
                height: 30px;
                width: 30px;
                margin: 5px;
            }
            .food-info {
                flex: 1;
                line-height: 18px;
                margin-left: 10px;
                .food-name {
                    font-size: 15px;
                }
                .food-weight {
                    font-size: 9px;
                    color: #999;
                }
            }
            .food-calories {
                text-align: right;
                font-size: 9px;
                line-height: 45px;
                color: #999;
            }
        }
    }
</style>