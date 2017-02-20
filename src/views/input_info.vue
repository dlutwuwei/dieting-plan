<template>
    <div class="detail">
        <mt-header title="鸣鹿健康">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <mt-radio title="性别" v-model="gender" :options="gender_options">
        </mt-radio>
        <mt-field v-model="age" label="年龄" placeholder="           岁" type="number"></mt-field>
        <mt-field v-model="height" label="身高" placeholder="           cm" type="number"></mt-field>
        <mt-field v-model="weight" label="体重" placeholder="           kg" type="number"></mt-field>
        <mt-checklist title="疾病史" v-model="diseases" :options="disease_options">
        </mt-checklist>
        <div class="cell">
            <select v-model="exercise">
                <option value="0">少量活动</option>
                <option value="1">大量活动</option>
            </select>
        </div>
        <div class="cell">
            <select v-model="method">
                <option value="0">只节食不运动</option>
                <option value="1">即节食又运动</option>
            </select>
        </div>
        <mt-button type="default" size="normal">下一步</mt-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                gender: '',
                exercise: 0,
                diseases: [],
                method: 0,
                age: 0,
                height: 0,
                weight: 0,

            }
        },
        created() {
            this.gender_options = [
                {
                    label: '男',
                    value: '1'
                },
                {
                    label: '女',
                    value: '0'
                }
            ];
            this.disease_options = [
                "糖尿病",
                "高血压",
                "高血脂",
                "高尿酸",
                "肠胃疾病"
            ];
        },
        mounted() {

        }
    };

</script>
<style>

</style>