<template>
    <transition name="slide">
        <div class="prefer">
            <mt-header title="鸣鹿健康">
                <router-link to="/" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
                <mt-button icon="more" slot="right"></mt-button>
            </mt-header>
            <div class="title">{{title}}</div>
            <div class="select-items">
                <div class="item" v-for="item in items">
                    <div class="icon"><img :src="'../assets/images/sports/'+item.icon" alt=""></div>
                    <div class="name">{{item.name}}</div>
                </div>
                <div class="add-item">
                    <div class="icon">
                        <a href="/plan/add/food"><img src="../assets/images/jianfei/add.png" alt=""></a></a>
                    </div>
                    <div class="name">自定义</div>
                </div>
            </div>
            <div class="cell bottom">
                <mt-button type="primary" size="normal" v-on:click="post_prefer">下一步</mt-button>
            </div>
        </div>
    </transition>
</template>
<script>
    const next = {
        breakfast: 'lunch',
        lunch: 'supper',
        supper: 'sports'
    };
    export default {
        data() {
            return {
                items: null,
                title: null
            }
        },
        methods: {
            post_prefer: function (e) {
                let target;
                if (next[this.$route.params.type || 'breakfast'] == null) {
                    location.href = '/';
                } else {
                    target = '/prefer/' + next[this.$route.params.type || 'breakfast'];
                    this.$router.push({
                        path: target
                    });
                }
            },
            fetchData: function (e) {
                this.items = window.data[this.$route.params.type || 'breakfast'];
                this.title = window.titles[this.$route.params.type || 'breakfast'];
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        mounted() {
            this.items = window.data[this.$route.params.type || 'breakfast'];
            this.title = window.titles[this.$route.params.type || 'breakfast'];
        },
        created() {
            window.titles = {
                breakfast: '早餐选择',
                lunch: '午餐选择',
                supper: '晚餐选择',
                sports: '运动选择'
            };

            window.data = {
                breakfast: [
                    {
                        name: "牛肉",
                        icon: ''
                    },
                    {
                        name: "马肉",
                        icon: ''
                    },
                    {
                        name: "蔬菜",
                        icon: ''
                    },
                    {
                        name: "蔬菜",
                        icon: ''
                    },
                    {
                        name: "蔬菜",
                        icon: ''
                    }
                ],
                lunch: [
                    {
                        name: "苹果",
                        icon: ''
                    },
                    {
                        name: "鸡蛋",
                        icon: ''
                    },
                    {
                        name: "",
                        icon: ''
                    }
                ],
                supper: [
                    {
                        name: "鸡肉",
                        icon: ''
                    },
                    {
                        name: "蜂蜜",
                        icon: ''
                    },
                    {
                        name: "豆类",
                        icon: ''
                    }
                ],
                sports: [
                    {
                        name: "登山",
                        icon: 'dengshan.png'
                    },
                    {
                        name: "快走",
                        icon: 'kuaizou.png'
                    },
                    {
                        name: "篮球",
                        icon: 'lanqiu.png'
                    },
                    {
                        name: "排球",
                        icon: 'paiqiu.png'
                    },
                    {
                        name: "跑步",
                        icon: 'paobu.png'
                    },
                    {
                        name: "骑行",
                        icon: 'qixing.png'
                    },
                    {
                        name: "跳绳",
                        icon: 'tiaosheng.png'
                    },
                    {
                        name: "跳舞",
                        icon: 'tiaowu.png'
                    },
                    {
                        name: "游泳",
                        icon: 'youyong.png'
                    },
                    {
                        name: "瑜伽",
                        icon: 'yujia.png'
                    },
                    {
                        name: "足球",
                        icon: 'zuqiu.png'
                    }
                ]
            };
        }
    }

</script>
<style lang="scss">
    #app {
        height: 100%;
    }
    
    .prefer {
        background: #f7f7f7;
        height: 100%;
        position: relative;
        .title {
            text-align: center;
            font-size: 18px;
            line-height: 40px;
            color: #333;
        }
        .select-items {
            overflow: hidden;
            padding: 0 38px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .item,
            .add-item {
                margin-top: 15px;
            }
            .icon {
                height: 76px;
                width: 76px;
                img {
                    width: 100%;
                }
            }
            .name {
                text-align: center;
                font-size: 12px;
                line-height: 24px;
            }
        }
        .cell {
            text-align: center;
        }
    }
    
    .bottom {
        position: absolute;
        width: 100%;
        bottom: 20px;
    }
    
    .mint-button--primary {
        height: 40px;
        width: 180px;
        background-color: #fff;
        border: 1px solid #47a304;
        color: #47a304;
    }
</style>