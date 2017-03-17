<template>
    <div style="height: 100%;">
        <mt-header title="鸣鹿健康">
            <mt-button slot="left" icon="back" @click="goback">返回</mt-button>
            <!--<mt-button icon="more" slot="right"></mt-button>-->
        </mt-header>
        <list-tab></list-tab>
    </div>
</template>
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