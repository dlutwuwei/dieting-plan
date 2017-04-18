<template>
    <transition name="slide">
        <div class="prefer">
            <mt-header title="鸣鹿健康">
                <!--<router-link v-if="type!='breakfast'" to="/prefer/prefer" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>-->
            </mt-header>
            <div class="title">{{title}}</div>
            <div class="select-items">
                <div class="bd">
                    <div class="item" v-for="item in items" @click="select(item, $event)">
                        <div :class="{'selected': item.value, 'icon': true}"><img :src="'/Public/render/img/icons/'+item.icon" alt=""></div>
                        <div class="name">{{item.food_type}}</div>
                        <div class="tagname" v-if="item.food_type_tag">{{item.food_type_tag}}</div>
                    </div>
                    <div class="add-item" v-if="type!='reason'">
                        <div class="add-icon icon" @click="addMore">
                        <span>+</span>
                        </div>
                        <div class="name">自定义</div>
                    </div>
                </div>
            </div>
            <div class="cell bottom">
                <mt-button type="primary" size="normal" v-on:click="post_prefer">{{btnText}}</mt-button>
            </div>
        </div>
    </transition>
</template>
<script>
    require('../libs/flexible.js');
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
                type: 'breakfast',
                btnText: '下一步',
            }
        },
        methods: {
            addMore: function () {
                location.href = `/plan/listt/#/add/${this.type}?prefer=${this.type}&return=${encodeURIComponent(location.href)}`;
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
                } else {
                    item.value = true;
                    this.selected[this.type].push(item);
                }


                if(this.items){
                    localStorage.setItem('list' + this.type, JSON.stringify(this.items));
                }
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
                            location.href = '/buy/buy?type=1';
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

                // 添加项
                let adds = JSON.parse(localStorage.getItem('luming' + this.type) || '{}');

                // 选中项
                let list = JSON.parse(localStorage.getItem('list' + this.type) || '[]');

                // 更新选择项
                this.selected[this.type] = JSON.parse(localStorage.getItem('list' + this.type) || '[]').filter(item => {
                    if(item.value) {
                        return true;
                    }
                    return false;
                });

                if(list.length > 0) {
                    data = list;
                }

                let moreItems = [];
                Object.keys(adds).forEach(name => {
                    let item = adds[name];
                    moreItems.push({
                        food_type: item.name,
                        food_type_tag: item.tagname,
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
            if(this.type==='reason') {
                this.btnText = '继续';
            }
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
                breakfast: '早餐偏好',
                lunch: '午餐偏好',
                supper: '晚餐偏好',
                sport: '运动偏好',
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
                        icon: 'suannai.png'
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
                        icon: 'shala.png'
                    },

                ],
                supper: [
                    {
                        pid: 1,
                        food_type: "鱼虾扇贝",
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
                        icon: 'yangrou.png'
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
                        food_type: "薯类",
                        icon: 'shulei.png'
                    }
                ],
                lunch: [
                    {
                        pid: 1,
                        food_type: "鱼虾扇贝",
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
                        icon: 'yangrou.png'
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
                        food_type: "鱼虾扇贝",
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
                        icon: 'yangrou.png'
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
                        food_type_tag: "（含糖、碳酸）",
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
                        food_type: "爱吃坚果",
                        food_type_tag: "（腰果、杏仁）",
                        icon: 'jianguo.png'
                    },
                    {
                        pid: 1,
                        food_type: "爱吃宵夜",
                        food_type_tag: "（每周一次）",
                        icon: 'yexiao.png'
                    },
                    {
                        pid: 1,
                        food_type: "吃饭很晚",
                        food_type_tag: "（晚8点后）",
                        icon: 'chifanwan.png'
                    },
                    {
                        pid: 1,
                        food_type: "吃饭很快",
                        food_type_tag: "（20分钟内）",
                        icon: 'chifankuai.png'
                    },
                    {
                        food_type: "饭量时多时少",
                        icon: 'fanliang.png'
                    },
                    {
                        food_type: "通常每天都在坐着",
                        icon: 'zuozhe.png'
                    },
                    {
                        food_type: "每周运动少于2次",
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
            padding: 0 25px;
            /*display: flex;
            justify-content: space-between;
            flex-wrap: wrap;*/
            padding-bottom: 100px;
            overflow: hidden;
            .bd{
                width:6rem;
            }
            .item,
            .add-item {
                float:left;
                display:inline;
                width: 1.7rem;
                height: 2rem;
                margin-top: .3rem;
                margin-right: 0.3rem;
                text-align:center;
                .add-icon{
                    span{
                        font-size: 1.4rem;
                        font-weight: 100;
                        color: #bbb;
                        line-height:1rem;
                    }
                }
            }
            .icon {
                height: 1.5rem;
                width: 1.5rem;
                background: #ededed;
                border-radius: 9999px;
                text-align: center;
                vertical-align: middle;
                padding: .1rem;
                line-height: 1.5rem;
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
                display:inline-block;
                width:50px;
                text-align: center;
                font-size: 12px;
                line-height: 24px;
                color:#999;
            }
            .tagname{
                text-align: center;
                font-size: 12px;
                line-height: 24px;
                color:#999;
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
