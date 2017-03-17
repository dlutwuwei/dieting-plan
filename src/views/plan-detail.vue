<template>
    <div style="height: 100%;">
        <mt-header title="鸣鹿健康">
            <mt-button slot="left" icon="back" @click="goback">返回</mt-button>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <!--<HeatPlate :heat-plate="heatPlate" v-if="type=='food'"></HeatPlate>-->
        <sportCard :data="sportList" v-if="type=='sport'" :date="date"></sportCard>
        <foodCard v-if="type=='food'" :type="index" :title="titleMap[index]" :date="date" :data="diet" v-for="(diet, index) in foodList"></foodCard>
    </div>
</template>
<script>
    import HeatPlate from '../components/index/heatPlate.vue';
    import foodCard from '../components/plan/food-card.vue';
    import sportCard from '../components/plan/sport-card.vue';
    import { getQuery } from '../libs/utils';
    export default {
        data() {
            return {
                foodList: {},
                sportList: [],
                heatPlate: []
            }
        },
        created() {
            this.type = this.$route.params.type;
            this.date = getQuery('date');
            this.heatPlate = window.heatPlate || [];
            this.titleMap = {
                breakfast: '早餐',
                lunch: '午餐',
                dinner: '晚餐'
            };
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            goback: function () {
                history.back();
            },
            fetchData: function() {
                if (this.type != 'sport') {
                    //早中晚 type: breakfast, lunch, dinners
                    this.$http.get(`/plan/datefood/time/${this.date}`).then(res => {
                        const data = res.body[this.date];
                        this.foodList = {
                            breakfast: data.breakfast,
                            lunch: data.lunch,
                            dinner: data.dinner
                        }
                    },() => {
                         MessageBox('注意', '请求失败');
                    });
                } else {
                    // 运动
                    this.sportList = [window.sportList[0][this.date]];
                }
            },
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        components: {
            HeatPlate,
            foodCard,
            sportCard
        }
    };

</script>