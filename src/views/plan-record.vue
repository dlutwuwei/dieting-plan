<template>
    <div>
        <mt-header title="添加记录">
            <mt-button slot="left" icon="back" @click="goback">返回</mt-button>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="food-card">
            <div class="food-item" :class="{'deleted': item.deleted, 'checked': item.checked}" v-for="(item, index) in data">
                <div class="food">
                    <img :src="item.icon" alt="">
                    <div class="food-info">
                        <div class="food-name">{{item.name}}</div>
                        <div class="food-weight">{{item.weight || item.lasttime || 0}}{{type=='sport'?'分钟':'克'}}</div>
                    </div>
                    <div class="food-calories">
                        {{(item.kcal * (( (item.weight||0) / 100) || ((item.lasttime||0) / 60))).toFixed(2)}}千卡
                    </div>
                </div>
            </div>
            <div class="cell bottom">
                <router-link :to="addUrl" slot="left">
                    <mt-button type="primary" size="normal">添加记录</mt-button>
                </router-link>
            </div>
        </div>
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
                type: ''
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
                Indicator.open('加载中...')
                this.type = this.$route.params.type;
                if (this.type != 'sport') {
                    //早中晚 type: breakfast, lunch, dinners
                    this.$http.get(`/record/recordsel?time=${this.date}`).then(res => {
                        let list = res.body[this.date][this.type];
                        list.pop();
                        this.data = list;
                        Indicator.close();
                    }, () => {
                        Indicator.close();
                        MessageBox('注意', '请求失败');
                    });
                } else {
                    // 运动
                    this.$http.get(`/record/sportsel?time=${this.date}`).then(res => {
                        let list = [];
                        if(res.body.success) {
                            list = res.body.data;
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
                history.back();
            },
            popClose: function() {
                this.popupVisible = false;
            },
            popup: function(item) {
                this.selected = item;
                this.popupVisible = true;
            }
        },
        mounted() {
            this.fetchData();
        },
        created() {
            this.type = this.$route.params.type;
            this.date = getQuery('date');
            this.addUrl = `/add/${this.type}?date=${this.date}`;
        }
    }

</script>
<!-- css is same as plan-diet-->
<style lang="scss">
</style>