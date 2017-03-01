<template>
    <div style="height: 100%;">
        <mt-header title="鸣鹿健康">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <HeatPlate :heat-plate="heatPlate" v-if="type=='food'"></HeatPlate>
        <sportCard :data="sportList" v-if="type=='sport'"></sportCard>
        <foodCard v-if="type=='food'" :type="index" :title="titleMap[index]" :calories="calories[index]" :data="diet" v-for="(diet, index) in foodList"></foodCard>
    </div>
</template>
<script>
    import HeatPlate from '../components/index/heatPlate.vue';
    import foodCard from '../components/plan/food-card.vue';
    import sportCard from '../components/plan/sport-card.vue';
    export default {
        created() {
            console.log('detail created')
            this.heatPlate = window.heatPlate;
            this.foodList = window.foodList;
            this.sportList = window.sportList;
            this.calories = window.recoCalories;
            this.titleMap = {
                breakfast: '早餐',
                lunch: '午餐',
                supper: '晚餐'
            }
            this.type = this.$route.params.type;
        },
        mounted() {
            console.log('detail mounted')
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