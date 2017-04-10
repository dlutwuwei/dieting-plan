<template>
    <div>
        <mt-header title="修改计划">
            <mt-button slot="left" icon="back" @click="goback">返回</mt-button>
        </mt-header>
        <div class="food-card">
            <div class="food-item" :class="{'deleted': +item.isdel, 'checked': +item.istrue}" v-for="(item, index) in data">
                <span class="food-delete" @click="deleteItem(item, index)" v-if="!(+item.isdel||+item.istrue)"></span>
                <span class="food-check" v-if="+item.istrue"></span>
                <div class="food" @click.stop="popup(item)">
                    <img :src="item.icon" alt="">
                    <div class="food-info">
                        <div class="food-name">{{item.name}}</div>
                        <div class="food-weight">{{item.weight || item.lasttime}}{{type=='sport'?'分钟':'克'}}</div>
                    </div>
                    <div class="food-calories">
                        {{item.kcal}}千卡
                    </div>
                </div>
            </div>
            <div class="cell bottom">
                <router-link :to="addUrl" slot="left">
                    <mt-button type="primary" size="normal">自定义添加</mt-button>
                </router-link>
            </div>
        </div>
        <mt-popup v-if="type!='sport'" class="select-popup" v-model="popupVisible" position="bottom">
            <addFood v-on:popClose="popClose" :data="selected" :type="type" :date="date" :isUpdate="true"></addFood>
        </mt-popup>
        <mt-popup v-if="type=='sport'" class="select-popup1" v-model="popupVisible" popup-transition="popup-fade">
            <addSport v-on:popClose="popClose" :data="selected" type="sport" :date="date" :isUpdate="true"></addSport>
        </mt-popup>
    </div>
</template>
<script>
    import addFood from '../components/plan/add-food.vue';
    import addSport from '../components/plan/add-sport.vue';
    import { getQuery } from '../libs/utils';
    import { MessageBox, Indicator } from 'mint-ui';

    const type_map = {
        'breakfast': 1,
        'lunch': 2,
        'dinner': 3
    }

    export default {
        data() {
            return {
                data: [],
                popupVisible: false,
                selected: {},
                type: '',
                title: ''
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        components: {
            addFood,
            addSport
        },
        methods: {
            fetchData: function () {
                this.type = this.$route.params.type;
                Indicator.open('加载中...')
                if (this.type != 'sport') {
                    //早中晚 type: breakfast, lunch, dinners
                    this.$http.get(`/plan/datefood/time/${this.date}`).then(res => {
                        let list = res.body[this.date][this.type]
                        list.pop(); //去掉总卡路里数
                        this.data = list;
                        Indicator.close();
                    }, () => {
                        Indicator.close();
                        MessageBox('注意', '请求失败');
                    });
                } else {
                    // 运动
                    this.$http.get(`/plan/datasport/time/${this.date}`).then(res => {
                        let list = [];
                        if (res.body.success) {
                            list = res.body.massages[this.date];
                        }
                        this.data = list;
                        Indicator.close();
                    }, () => {
                        Indicator.close();
                        MessageBox('注意', '请求失败');
                    });
                }
            },
            goback: function () {
                this.$router.push(`/detail/${this.type}?date=${this.date}`)
            },
            deleteItem: function (item, i) {
                MessageBox.confirm('确认删除此项计划?').then(action => {
                    if (this.type != 'sport') {
                        this.$http.get(`/Plan/delfood?pid=${item.pid}&class=${type_map[this.type]}`).then(res => {
                            if (!res.body.success) {
                                MessageBox('注意', '删除失败');
                            } else {
                                item.isdel = 1;
                            }
                        }, () => {
                            MessageBox('注意', '删除失败');
                        });
                    } else {
                        this.$http.get(`/Plan/delsport?pid=${item.pid}&time=${this.date}`).then(res => {
                            if (!res.body.success) {
                                MessageBox('注意', '删除失败');
                            } else {
                                item.isdel = 1;
                            }
                        }, () => {
                            MessageBox('注意', '删除失败');
                        });
                    }
                });
            },
            checkFood: function (item, i) {
                if (+item.istrue) {
                    MessageBox('提示', '已经确认完成，无法修改')
                    return;
                } else if (+item.isdel) {
                    MessageBox('提示', '已经从计划中删除')
                    return;
                }
                MessageBox.confirm('确认完成此项计划?').then(action => {
                    if (this.type != 'sport') {
                        this.$http.post('/Plan/istruefood', {
                            id: item.id,
                            time: this.date,
                            food: type_map[this.type]
                        }).then(res => {
                            if (res.body.success) {
                                item.istrue = 1;
                            } else {
                                MessageBox('注意', '确认失败');
                            }
                        });
                    } else {
                        this.$http.post('/Plan/istruesport', {
                            id: item.id,
                            time: this.date,
                        }).then(res => {
                            if (res.body.success) {
                                item.istrue = 1;
                            } else {
                                MessageBox('注意', '确认失败');
                            }
                        });
                    }
                });
            },
            popClose: function () {
                this.popupVisible = false;
            },
            popup: function (item) {
                if (+item.isdel) {
                    MessageBox('提示', '已经从计划中删除')
                    return;
                } else if (+item.istrue) {
                    MessageBox('提示', '已经确认完成，无法修改')
                    return;
                }
                this.selected = item;
                this.popupVisible = true;
            }
        },
        mounted() {
            this.fetchData();
            if (!this.user_type) {
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

            //如果是记录页面不显示删除，不能添加，隐藏添加按钮
            this.record = !!(+getQuery('record'));
            this.addUrl = `/add/${this.type}?date=${this.date}`;
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
            &.deleted {
                color: #999;
                &:before {
                    content: '';
                    display: block;
                    width: 34px;
                }
            }
            &.checked {
                color: #47a304;
            }
            .food {
                display: flex;
                justify-content: space-between;
                flex: 1;
                align-items: center;
                height: 50px;
            }
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
                margin-right: 10px;
            }
            .food-check {
                width: 24px;
                height: 24px;
                background: url(../assets/images/xuanzhong.png) no-repeat;
                background-size: cover;
                margin-right: 10px;
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
                width: 0;
                white-space: nowrap;
                .food-name {
                    font-size: 15px;
                    overflow: hidden;
                    text-overflow: ellipsis
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