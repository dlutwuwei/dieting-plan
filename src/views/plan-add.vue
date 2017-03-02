<template>
    <div class="plan-add">
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
        <div class="result-list">
            <div class="line result-item" v-for="item in data" v-on:click="popUp">
                <img :src="item.icon" alt="">
                <div class="food-info">
                    <div class="food-name">{{item.name}}</div>
                    <div class="food-energy">{{item.unit}}/{{type=='sport'?'分钟':'100克'}}</div>
                </div>
            </div>
        </div>
        <mt-popup v-if="type=='food'" class="select-popup" v-model="popupVisible" position="bottom">
            <addFood v-on:popClose="popClose"></addFood>
        </mt-popup>
        <mt-popup v-if="type=='sport'" class="select-popup1" v-model="popupVisible" popup-transition="popup-fade">
            <addSport v-on:popClose="popClose"></addSport>
        </mt-popup>
    </div>
</template>
<script>
    import addFood from '../components/plan/add-food.vue';
    import addSport from '../components/plan/add-sport.vue';
    export default {
        data() {
            return {
                buttonBottom: 0,
                popupVisible: false,
                data: []
            }
        },
        methods: {
            popUp: function () {
                this.popupVisible = true;
            },
            popClose: function() {
                this.popupVisible = false;
            },
            fetchData: function() {
                if(this.type == 'sport') {
                    this.data = window.sportList;
                } else {
                    this.data = window.foodList.breakfast;
                }
            }
        },
        components: {
            addFood,
            addSport
        },
        created() {
            this.type = this.$route.params.type;
        },
        mounted() {
            this.fetchData();
        }
    };

</script>
<style lang="scss">
    .select-popup {
        width: 100%;
    }
    .select-popup1{
        border-radius: 8px;
    }
    
    .result-list {
        .result-item {
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