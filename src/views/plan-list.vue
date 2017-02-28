<template>
    <div style="height: 100%;">
        <mt-header title="鸣鹿健康">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <list-tab></list-tab>
    </div>
</template>
<script>
    import listTab from '../components/plan/list-tab.vue';
    export default {
        components: {
            listTab
        }
    };
</script>