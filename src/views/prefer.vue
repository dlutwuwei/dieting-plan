<template>
    <transition name="slide">
        <div class="prefer">
            <mt-header title="鸣鹿健康">
                <router-link v-if="type!='breakfast'" to="/prefer/prefer" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
            <div class="title">{{title}}</div>
            <div class="select-items">
                <div class="item" v-for="item in items" @click="select(item, $event)">
                    <div :class="{'selected': item.value, 'icon': true}"><img :src="'/Public/render/img/icons/'+item.icon" alt=""></div>
                    <div class="name">{{item.food_type}}</div>
                </div>
                <div class="add-item"></a>
                    <div class="icon" @click="addMore">
                        <img src="../assets/images/jianfei/add.png" alt="">
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
        supper: 'sports',
        sports: 'foodRestrict',
        foodRestrict: 'sportRestrict',
        sportRestrict: null,
        reason: null
    };
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                items: null,
                title: null,
                selected: {},
                type: 'breakfast'
            }
        },
        methods: {
            addMore: function() {
                location.href = "";
            },
            select: function (item, e) {
                if (!this.selected[this.type]) {
                    this.selected[this.type] = [];
                }

                if(item.value) {
                    item.value =false;
                    let index;
                    this.selected[this.type].forEach( (m, i) => {
                        if(m.food_type == item.food_type){
                            index = i;
                        }
                    });
                    delete this.selected[this.type][index];
                    return;
                }
                item.value = true;
                //e.target.parentNode.classList.add('selected');
                
                this.selected[this.type].push(item);
            },
            post_prefer: function (e) {
                let target;
                let type = this.type || 'breakfast';
                if (next[type || 'breakfast'] == 'foodRestrict') {
                    let data = {
                        breakfast: this.selected.breakfast,
                        lunch: this.selected.lunch,
                        dinner: this.selected.dinner,
                    };
                     // 添加食物或者偏好
                    this.$http.post('/Pre/addfood', data).then(response => {
                        let res = response.body;
                        if (res.success) {
                            target = '/prefer/prefer/' + next[type || 'breakfast'];
                            this.$router.push({
                                path: target
                            });
                        }
                    }, err => {
                        MessageBox('注意', '请求失败');
                    });

                } else if (next[type] == null) {

                    if(type === 'sportRestrict') {
                        // 提交饮食限制
                        let restrict = {
                            food: this.selected['foodRestrict'],
                            sport: this.selected['sportRestrict']
                        };
                        if(!restrict) {
                            MessageBox('注意', '请选择饮食限制');
                            return;
                        }
                        this.$http.post('/Restrict/addplace', restrict).then(response => {
                            debugger
                            let res = response.body;
                            if (res.success) {
                                location.href = '/buy/buy?type=15';
                            }
                        }, err => {
                            MessageBox('注意', '请求失败');
                        });
                    } else if(type === "reason") {
                        // 提交肥胖原因
                        let reason = this.selected['reason'];
                        if(!reason) {
                            MessageBox('注意', '请选择肥胖原因');
                            return;
                        }
                        this.$http.post('/Fifteen/obsadd', this.selected['reason']).then(response => {
                            let res = response.body;
                            if (res.success) {
                                location.href = '/';
                            }
                        }, err => {
                            MessageBox('注意', '请求失败');
                        });
                    }
                } else {
                    target = '/prefer/prefer/' + next[type || 'breakfast'];
                    this.$router.push({
                        path: target
                    });
                }
            },
            fetchData: function (e) {
                this.type =this.$route.params.type || 'breakfast';
                let data = window.data[this.type || 'breakfast'];
                data.forEach(item => {
                    if(item.value === undefined) {
                        item.value = false;
                    }
                });
                this.items = data;
                this.title = window.titles[this.type];
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        mounted() {
            this.type = this.$route.params.type || 'breakfast';
            let data = window.data[this.type ];
            data.forEach(item => {
                item.value = false;
            });
            this.items = data;

            this.title = window.titles[this.type];
        },
        created() {
            window.titles = {
                breakfast: '早餐选择',
                lunch: '午餐选择',
                supper: '晚餐选择',
                sports: '运动选择',
                foodRestrict: '饮食限制',
                sportRestrict: '运动限制',
                reason: '肥胖原因'
            };
            this.type = this.type || 'breakfast';
            window.data = {
                breakfast: [
                    {
                        pid: 1,
                        food_type: "包子",
                        icon: 'baozi.png'
                    },
                    {
                        pid: 1,
                        food_type: "豆浆",
                        icon: 'doujiang.png'
                    },
                    {
                        pid: 1,
                        food_type: "豆类",
                        icon: 'doulei.png'
                    },
                    {
                        pid: 1,
                        food_type: "麦片",
                        icon: 'maipian.png'
                    },
                    {
                        pid: 1,
                        food_type: "馒头",
                        icon: 'mantou.png'
                    },
                    {
                        pid: 1,
                        food_type: "粥",
                        icon: 'zhou.png'
                    }
                ],
                lunch: [
                    {
                        pid: 1,
                        food_type: "面条",
                        icon: 'miantiao.png'
                    },
                    {
                        pid: 1,
                        food_type: "米饭",
                        icon: 'mifan.png'
                    },
                    {
                        pid: 1,
                        food_type: "牛奶",
                        icon: 'niunai.png'
                    },
                    {
                        pid: 1,
                        food_type: "牛肉",
                        icon: 'niurou.png'
                    },
                    {
                        pid: 1,
                        food_type: "猪肉",
                        icon: 'zhurou.png'
                    }
                ],
                supper: [
                    {
                        pid: 1,
                        food_type: "青菜",
                        icon: 'qingcai.png'
                    },
                    {
                        pid: 1,
                        food_type: "沙拉",
                        icon: 'shala.png'
                    },
                    {
                        pid: 1,
                        food_type: "水类",
                        icon: 'shuilei.png'
                    },
                    {
                        pid: 1,
                        food_type: "水类",
                        icon: 'shuilei.png'
                    },
                    {
                        pid: 1,
                        food_type: "酸奶",
                        icon: 'suannai.png'
                    },
                    {
                        pid: 1,
                        food_type: "糖",
                        icon: 'tang.png'
                    },
                    {
                        pid: 1,
                        food_type: "羊肉",
                        icon: 'yangrou.png'
                    },
                    {
                        pid: 1,
                        food_type: "鱼",
                        icon: 'yu.png'
                    }
                ],
                sports: [
                    {
                        pid: 1,
                        food_type: "登山",
                        icon: 'dengshan.png'
                    },
                    {
                        pid: 1,
                        food_type: "快走",
                        icon: 'kuaizou.png'
                    },
                    {
                        pid: 1,
                        food_type: "篮球",
                        icon: 'lanqiu.png'
                    },
                    {
                        pid: 1,
                        food_type: "排球",
                        icon: 'paiqiu.png'
                    },
                    {
                        pid: 1,
                        food_type: "跑步",
                        icon: 'paobu.png'
                    },
                    {
                        pid: 1,
                        food_type: "骑行",
                        icon: 'qixing.png'
                    },
                    {
                        pid: 1,
                        food_type: "跳绳",
                        icon: 'tiaosheng.png'
                    },
                    {
                        pid: 1,
                        food_type: "跳舞",
                        icon: 'tiaowu.png'
                    },
                    {
                        pid: 1,
                        food_type: "游泳",
                        icon: 'youyong.png'
                    },
                    {
                        food_type: "瑜伽",
                        icon: 'yujia.png'
                    },
                    {
                        food_type: "足球",
                        icon: 'zuqiu.png'
                    }
                ],
                foodRestrict: [
                    {
                        pid: 1,
                        food_type: "羊肉",
                        icon: 'yangrou.png'
                    },
                    {
                        pid: 1,
                        food_type: "鱼",
                        icon: 'yu.png'
                    },
                    {
                        pid: 1,
                        food_type: "猪肉",
                        icon: 'dengshan.png'
                    },
                ],
                reason: [
                    {
                        pid: 1,
                        food_type: "油腻食物",
                        icon: 'dengshan.png'
                    },
                    {
                        pid: 1,
                        food_type: "运动少",
                        icon: 'kuaizou.png'
                    },
                    {
                        pid: 1,
                        food_type: "吃饭多",
                        icon: 'lanqiu.png'
                    },
                    {
                        pid: 1,
                        food_type: "跑步少",
                        icon: 'paiqiu.png'
                    },
                    {
                        pid: 1,
                        food_type: "不愿动",
                        icon: 'paobu.png'
                    },
                    {
                        pid: 1,
                        food_type: "骑行",
                        icon: 'qixing.png'
                    },
                    {
                        pid: 1,
                        food_type: "跳绳",
                        icon: 'tiaosheng.png'
                    },
                    {
                        pid: 1,
                        food_type: "跳舞",
                        icon: 'tiaowu.png'
                    },
                    {
                        pid: 1,
                        food_type: "游泳",
                        icon: 'youyong.png'
                    },
                    {
                        food_type: "瑜伽",
                        icon: 'yujia.png'
                    },
                    {
                        food_type: "足球",
                        icon: 'zuqiu.png'
                    }
                ],
                sportRestrict: [
                    {
                        pid: 1,
                        food_type: "游泳",
                        icon: 'yangrou.png'
                    },
                    {
                        pid: 1,
                        food_type: "跑步",
                        icon: 'yu.png'
                    },
                    {
                        pid: 1,
                        food_type: "登山",
                        icon: 'dengshan.png'
                    },
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
        min-height: 100%;
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
            padding-bottom: 100px;
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
            .selected {
                position: relative;
                &:before {
                    content: '';
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    width: 15px;
                    height: 15px;
                    background: url(../assets/images/xuanzhong.png) no-repeat;
                    background-size: cover;
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