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
                <div class="add-item">
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
        supper: 'sport',
        sport: 'foodRestrict',
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
            addMore: function () {
                location.href = "/plan/listt/#/add/" + this.type + "?prefer=" + this.type;
            },
            select: function (item, e) {
                if (!this.selected[this.type]) {
                    this.selected[this.type] = [];
                }

                if (item.value) {
                    item.value = false;
                    let index;
                    this.selected[this.type].forEach((m, i) => {
                        if (m.food_type == item.food_type) {
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
                // 发送饮食偏好
                let target;
                let type = this.type || 'breakfast';
                if (next[type || 'breakfast'] == 'foodRestrict') {
                    let data = {
                        breakfast: this.selected.breakfast || [],
                        lunch: this.selected.lunch || [],
                        dinner: this.selected.dinner || [],
                        sport: this.selected.sport || []
                    };
                    // 添加食物或者偏好
                    this.$http.post('/Pre/addfood', data).then(response => {
                        let res = response.body;
                        // if (res.success) {
                        target = '/prefer/prefer/' + next[type || 'breakfast'];
                        this.$router.push({
                            path: target
                        });
                        // }
                    }, err => {
                        MessageBox('注意', '请求失败');
                    });

                } else if (next[type] == null) {

                    if (type === 'sportRestrict') {
                        // 提交饮食限制
                        let restrict = {
                            food: this.selected['foodRestrict'],
                            sport: this.selected['sportRestrict']
                        };
                        if (!restrict) {
                            MessageBox('注意', '请选择饮食限制');
                            return;
                        }
                        this.$http.post('/Restrict/addplace', restrict).then(response => {
                            let res = response.body;
                            // if (res.success) {
                            //     location.href = '/buy/buy?type=15';
                            // }
                            location.href = '/buy/buy?type=15';
                        }, err => {
                            MessageBox('注意', '请求失败');
                        });
                    } else if (type === "reason") {
                        // 提交肥胖原因
                        let reason = this.selected['reason'];
                        if (!reason) {
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
                this.type = this.$route.params.type || 'breakfast';
                let data = window.data[this.type || 'breakfast'];
                let adds = JSON.parse(localStorage.getItem('luming' + this.type) || '{}');
                let moreItems = [];
                Object.keys(adds).forEach(name => {
                    let item = adds[name];
                    moreItems.push({
                        food_type: item.name,
                        id: item.pid,
                        icon: item.icon
                    })
                });
                //将添加的值加入
                data = data.concat(moreItems);
                data.forEach(item => {
                    if (item.value === undefined) {
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
            let data = window.data[this.type];
            data.forEach(item => {
                item.value = false;
            });
            this.items = data;
            this.title = window.titles[this.type];
            // 首次载入
            this.fetchData();
        },
        created() {
            window.titles = {
                breakfast: '早餐选择',
                lunch: '午餐选择',
                supper: '晚餐选择',
                sport: '运动选择',
                foodRestrict: '饮食限制',
                sportRestrict: '运动限制',
                reason: '肥胖原因'
            };
            this.type = this.type || 'breakfast';
            window.data = {
                breakfast: [
                    {
                        pid: 1,
                        food_type: "粥",
                        icon: 'zhou.png'
                    },
                    {
                        pid: 1,
                        food_type: "汤",
                        icon: 'tang.png'
                    },
                    {
                        pid: 1,
                        food_type: "牛奶",
                        icon: 'niunai.png'
                    },
                    {
                        pid: 1,
                        food_type: "豆浆",
                        icon: 'doujiang.png'
                    },
                    {
                        pid: 1,
                        food_type: "酸奶",
                        icon: 'doulei.png'
                    },
                    {
                        pid: 1,
                        food_type: "包子",
                        icon: 'baozi.png'
                    },
                    {
                        pid: 1,
                        food_type: "馒头",
                        icon: 'mantou.png'
                    },
                    {
                        pid: 1,
                        food_type: "米饭",
                        icon: 'mifan.png'
                    },
                    {
                        pid: 1,
                        food_type: "面条",
                        icon: 'miantiao.png'
                    },
                    {
                        pid: 1,
                        food_type: "麦片",
                        icon: 'maipian.png'
                    },
                    {
                        pid: 1,
                        food_type: "水果（沙拉）",
                        icon: 'shuiguo.png'
                    },

                ],
                supper: [
                    {
                        pid: 1,
                        food_type: "鱼虾贝类",
                        icon: 'miantiao.png'
                    },
                    {
                        pid: 1,
                        food_type: "牛肉",
                        icon: 'niurou.png'
                    },
                    {
                        pid: 1,
                        food_type: "羊肉",
                        icon: 'yangtou.png'
                    },
                    {
                        pid: 1,
                        food_type: "猪肉",
                        icon: 'zhurou.png'
                    },
                    {
                        pid: 1,
                        food_type: "青菜",
                        icon: 'qingcai.png'
                    },
                    {
                        pid: 1,
                        food_type: "豆类",
                        icon: 'doulei.png'
                    },
                    {
                        pid: 1,
                        food_type: "馒头",
                        icon: 'mantou.png'
                    },
                    {
                        pid: 1,
                        food_type: "米饭",
                        icon: 'mifan.png'
                    },
                    {
                        pid: 1,
                        food_type: "薯类",
                        icon: 'shulei.png'
                    }
                ],
                lunch: [
                    {
                        pid: 1,
                        food_type: "鱼虾贝类",
                        icon: 'miantiao.png'
                    },
                    {
                        pid: 1,
                        food_type: "牛肉",
                        icon: 'niurou.png'
                    },
                    {
                        pid: 1,
                        food_type: "羊肉",
                        icon: 'yangtou.png'
                    },
                    {
                        pid: 1,
                        food_type: "猪肉",
                        icon: 'zhurou.png'
                    },
                    {
                        pid: 1,
                        food_type: "青菜",
                        icon: 'qingcai.png'
                    },
                    {
                        pid: 1,
                        food_type: "豆类",
                        icon: 'doulei.png'
                    },
                    {
                        pid: 1,
                        food_type: "馒头",
                        icon: 'mantou.png'
                    },
                    {
                        pid: 1,
                        food_type: "米饭",
                        icon: 'mifan.png'
                    },
                    {
                        pid: 1,
                        food_type: "面条",
                        icon: 'miantiao.png'
                    },
                    {
                        pid: 1,
                        food_type: "麦片",
                        icon: 'maipian.png'
                    },
                    {
                        pid: 1,
                        food_type: "薯类",
                        icon: 'shulei.png'
                    }
                ],
                sport: [
                    {
                        pid: 1,
                        food_type: "跑步",
                        icon: 'paobu.png'
                    },
                    {
                        pid: 1,
                        food_type: "跳绳",
                        icon: 'tiaosheng.png'
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
                        pid: 1,
                        food_type: "骑行",
                        icon: 'qixing.png'
                    },
                    {
                        pid: 1,
                        food_type: "篮球",
                        icon: 'lanqiu.png'
                    },
                    {
                        food_type: "足球",
                        icon: 'zuqiu.png'
                    },
                    {
                        pid: 1,
                        food_type: "排球",
                        icon: 'paiqiu.png'
                    },
                    {
                        pid: 1,
                        food_type: "快走",
                        icon: 'kuaizou.png'
                    },
                    {
                        pid: 1,
                        food_type: "跳舞",
                        icon: 'tiaowu.png'
                    },
                    {
                        pid: 1,
                        food_type: "登山",
                        icon: 'dengshan.png'
                    }
                ],
                foodRestrict: [
                    {
                        pid: 1,
                        food_type: "鱼",
                        icon: 'yu.png'
                    },
                    {
                        pid: 1,
                        food_type: "牛肉",
                        icon: 'niurou.png'
                    },
                    {
                        pid: 1,
                        food_type: "羊肉",
                        icon: 'yangtou.png'
                    },
                    {
                        pid: 1,
                        food_type: "猪肉",
                        icon: 'zhurou.png'
                    },
                    {
                        pid: 1,
                        food_type: "奶及奶制品",
                        icon: 'niunai.png'
                    },
                    {
                        pid: 1,
                        food_type: "豆类",
                        icon: 'doulei.png'
                    }
                ],
                sportRestrict: [
                    {
                        pid: 1,
                        food_type: "跑步",
                        icon: 'paobu.png'
                    },
                    {
                        pid: 1,
                        food_type: "跳绳",
                        icon: 'tiaosheng.png'
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
                        pid: 1,
                        food_type: "骑行",
                        icon: 'qixing.png'
                    },
                    {
                        pid: 1,
                        food_type: "篮球",
                        icon: 'lanqiu.png'
                    },
                    {
                        food_type: "足球",
                        icon: 'zuqiu.png'
                    },
                    {
                        pid: 1,
                        food_type: "排球",
                        icon: 'paiqiu.png'
                    },
                    {
                        pid: 1,
                        food_type: "快走",
                        icon: 'kuaizou.png'
                    },
                    {
                        pid: 1,
                        food_type: "跳舞",
                        icon: 'tiaowu.png'
                    },
                    {
                        pid: 1,
                        food_type: "登山",
                        icon: 'dengshan.png'
                    }
                ],
                reason: [
                    {
                        pid: 1,
                        food_type: "饮食油腻",
                        icon: 'youni.png'
                    },
                    {
                        pid: 1,
                        food_type: "爱吃零食",
                        icon: 'lingshi.png'
                    },
                    {
                        pid: 1,
                        food_type: "常喝饮料",
                        icon: 'yinliao.png'
                    },
                    {
                        pid: 1,
                        food_type: "经常喝酒",
                        icon: 'hejiu.png'
                    },
                    {
                        pid: 1,
                        food_type: "爱吃肥肉",
                        icon: 'feirou.png'
                    },
                    {
                        pid: 1,
                        food_type: "爱吃坚果（腰果，杏仁）",
                        icon: 'jianguo.png'
                    },
                    {
                        pid: 1,
                        food_type: "爱吃宵夜",
                        icon: 'xiaoye.png'
                    },
                    {
                        pid: 1,
                        food_type: "吃饭很晚",
                        icon: 'chifanwan.png'
                    },
                    {
                        pid: 1,
                        food_type: "吃饭很快",
                        icon: 'chifankuai.png'
                    },
                    {
                        food_type: "饭量时多时少",
                        icon: 'fanliang.png'
                    },
                    {
                        food_type: "通常每天坐着",
                        icon: 'zuozhe.png'
                    },
                    {
                        food_type: "每周运动少于两次",
                        icon: 'yundong.png'
                    }
                ],
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