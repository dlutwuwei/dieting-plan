<template>
    <div style="height: 100%;">
        <mt-header title="鸣鹿健康">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <HeatPlate :heat-plate="heatPlate"></HeatPlate>
        <foodCard :title="titleMap[index]" :calories="calories[index]" :data="diet" v-for="(diet, index) in foodList"></foodCard>
    </div>
</template>
<script>
    import HeatPlate from '../components/index/heatPlate.vue';
    import foodCard from '../components/plan/food-card.vue';
    export default {
        created() {
            this.heatPlate = window.heatPlate;
            this.foodList = window.foodList;
            this.calories = window.recoCalories;
            this.titleMap = {
                breakfast: '早餐',
                lunch: '午餐',
                supper: '晚餐'
            }
        },
        components: {
            HeatPlate,
            foodCard
        }
    };

</script>