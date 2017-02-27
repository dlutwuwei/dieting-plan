<template>
    <div style="height: 100%;">
        <mt-header title="鸣鹿健康">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
         <HeatPlate :heat-plate="heatPlate"></HeatPlate>
            <!--e:能量盘-->
    </div>
</template>
<script>
    import HeatPlate from '../components/index/heatPlate.vue';//能量盘

    export default {
        created() {
            this.heatPlate = window.heatPlate;
        },
        components: {
            HeatPlate
        }
    };
</script>