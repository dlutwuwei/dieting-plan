<template>
    <div style="height: 100%;">
        <mt-header title="鸣鹿健康">
            <a href="/" slot="left" ><mt-button icon="back">首页</mt-button></a>
        </mt-header>
        <list-tab></list-tab>
    </div>
</template>
<style lang="scss" scoped>
    .mint-header-title{
        padding-top: 3px;
        overflow: auto;
        height: 35px;
        line-height: 35px;
    }
</style>
<script>
    import listTab from '../components/plan/list-tab.vue';
    import { getQuery } from '../libs/utils';
    export default {
        components: {
            listTab
        },
        methods: {
            goback: function () {
                history.back();
            }
        }
    };

</script>
