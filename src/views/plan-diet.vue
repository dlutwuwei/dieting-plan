<template>
    <div>
        <mt-header title="添加食物">
            <mt-button slot="left" icon="back" @click="goback">返回</mt-button>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="food-card">
            <div class="food-item" v-for="(item,index) in data">
                <span class="food-delete" @click="deleteItem"></span>
                <img :src="item.icon" alt="">
                <div class="food-info">
                    <div class="food-name">{{item.name}}</div>
                    <div class="food-weight">{{item.weight}}{{type=='sport'?'分钟':'克'}}</div>
                </div>
                <div class="food-calories">
                    {{item.kcal}}千卡
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
    import { getQuery } from '../libs/utils';
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                data:[]
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData: function() {
                if (this.type != 'sport') {
                    //早中晚 type: breakfast, lunch, dinners
                    this.$http.get(`/plan/datefood/time/${this.date}`).then(res => {
                        let list = res.body[this.date][this.type]
                        list.pop(); //去掉总卡路里数
                        this.data = list;
                    },() => {
                         MessageBox('注意', '请求失败');
                    });
                } else {
                    // 运动
                    this.data = [window.sportList[0][this.date]];
                }
            },
            goback: function () {
                history.back();
            },
            deleteItem: function(i) {
                this.data.splice(i, 1);
            }
        },
        mounted() {
            this.fetchData();
            if(!this.user_type) {
                // if no user type
                this.$http.get('/Info/usertype').then(res => {
                    if (res.body.success) {
                        this.user_type = JSON.parse(res.body.data).type;
                    }
                }, () => {
                        MessageBox('注意', '获取用户信息失败');
                });
            }
        },
        created() {
            this.type = this.$route.params.type;
            this.date = getQuery('date');
            this.addUrl = `/plan/add/${this.type}?date=${this.date}`;
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
            height: 50px;
            border-bottom: 1px solid #dfdfdf;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .food-delete {
                &:before {
                    display: block;
                    content: '';
                    width: 9px;
                    height: 1px;
                    background: #fff;
                    margin: 11px auto;
                }
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: #fe0100;
                text-align: center;
                margin-right: 20px;
            }
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