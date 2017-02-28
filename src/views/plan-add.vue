<template>
    <div class="food-add">
        <mt-header title="添加食物">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="line search-card">
            <div class="search-bar">
                <input type="text">
            </div>
        </div>
        <div class="food-list">
            <div class="line food-item" v-for="item in 10" v-on:click="popUp">
                <img src="../assets/images/jianfei/apple.jpg" alt="">
                <div class="food-info">
                    <div class="food-name">苹果</div>
                    <div class="food-energy">100千卡/100克</div>
                </div>
            </div>
        </div>
        <mt-popup class="food-popup" v-model="popupVisible" position="bottom">
            <addFood></addFood>
        </mt-popup>
    </div>
</template>
<script>
    import addFood from '../components/plan/add-food.vue';
    export default {
        data() {
            return {
                popupVisible: false
            }
        },
        methods: {
            popUp: function () {
                this.popupVisible = true;
            }
        },
        components: {
            addFood
        }
    };

</script>
<style lang="scss">
    .food-popup {
        width: 100%;
    }
    
    .food-list {
        .food-item {
            height: 60px;
            padding: 0 18px;
            align-items: center;
            display: flex;
            img {
                width: 30px;
                height: 30px;
            }
            .food-info {
                font-size: 16px;
                margin-left: 14px;
                .food-energy {
                    color: #f18f20;
                    font-size: 14px;
                }
            }
        }
    }
    
    .line {
        position: relative;
    }
    
    .line:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        height: 1px;
        width: 100%;
        background: #dfdfdf;
        transform-origin: 0;
        transform: scaleY(0.5);
    }
    
    .search-card {
        margin-top: 8px;
        height: 80px;
        background: #fff;
        overflow: hidden;
        .search-bar {
            height: 30px;
            width: 270px;
            margin: auto;
            margin-top: 25px;
            border: 1px solid #999;
            border-radius: 15px;
            text-align: center;
            display: flex;
            &:before {
                content: '';
                display: inline-block;
                background-image: url(../assets/images/jianfei/glass.png);
                background-size: contain;
                background-repeat: no-repeat;
                margin: 3px 5px 0 15px;
                width: 23px;
                height: 23px;
            }
            input {
                width: 210px;
                height: 100%;
                font-size: 18px;
                color: #999;
                border: none;
            }
        }
    }
</style>