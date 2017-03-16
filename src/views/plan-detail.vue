<template>
    <div style="height: 100%;">
        <mt-header title="鸣鹿健康">
            <mt-button slot="left" icon="back" @click="goback">返回</mt-button>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <HeatPlate :heat-plate="heatPlate" v-if="type=='food'"></HeatPlate>
        <sportCard :data="sportList" v-if="type=='sport'" :date="date"></sportCard>
        <foodCard v-if="type=='food'" :type="index" :title="titleMap[index]" :date="date" :calories="calories[index]" :data="diet" v-for="(diet, index) in foodList"></foodCard>
    </div>
</template>
<script>
    import HeatPlate from '../components/index/heatPlate.vue';
    import foodCard from '../components/plan/food-card.vue';
    import sportCard from '../components/plan/sport-card.vue';
    export default {
        created() {
            this.type = this.$route.params.type;
            this.date = this.$route.params.date;
            this.heatPlate = window.heatPlate;
            const data = window.foodList[this.date];
            this.foodList = {
                breakfast: data.breakfast,
                lunch: data.lunch,
                dinner: data.dinner
            }
            this.sportList = [window.sportList[0][this.date]];
            this.calories = window.recoCalories;
            this.titleMap = {
                breakfast: '早餐',
                lunch: '午餐',
                dinner: '晚餐'
            };
           
        },
        mounted() {
            console.log('detail mounted')
        },
        methods: {
            goback: function () {
                history.back();
            }
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