<template>
    <div class="plan-add">
        <mt-header :title="title">
            <mt-button slot="left" icon="back" @click="goback">返回</mt-button>
        </mt-header>
        <div class="line search-card">
            <div class="search-bar">
                <input type="text" v-model="search">
            </div>
        </div>
        <div class="result-list">
            <div class="line result-item" id="item.pid" v-for="(item, index) in data" v-on:click="popUp(index)">
                <img :src="item.icon" alt="">
                <div class="food-info">
                    <div class="food-name">{{item.name}}</div>
                    <div class="food-energy">{{item.kcal}}千卡/{{type=='sport'?'60分钟':'100克'}}</div>
                </div>
            </div>
        </div>
        <mt-popup v-if="type!='sport'" class="select-popup" v-model="popupVisible" position="bottom">
            <addFood v-on:popClose="popClose" :data="selected" :type="type" :date="date" :list="data"></addFood>
        </mt-popup>
        <mt-popup v-if="type=='sport'" class="select-popup1" v-model="popupVisible" popup-transition="popup-fade">
            <addSport v-on:popClose="popClose" :data="selected" type="sport" :date="date" :list="data"></addSport>
        </mt-popup>
    </div>
</template>
<script>
    import addFood from '../components/plan/add-food.vue';
    import addSport from '../components/plan/add-sport.vue';
    import { getQuery } from '../libs/utils';
    export default {
        data() {
            return {
                buttonBottom: 0,
                popupVisible: false,
                data: [],
                selected: {},
                search: ''
            }
        },
        watch: {
            search(val) {
                this.fetchData(val, this.type);
            }
        },
        methods: {
            goback: function() {
                let target = getQuery('return');
                if(target){
                    location.href = target;
                } else {
                    this.$router.push(`/diet/${this.type}?date=${this.date}`)
                }
            },
            popUp: function (index) {
                this.selected = this.data[index];
                if(this.preferType) {
                    // 偏好添加
                    let x = this.selected;
                    let tmpPrefers = JSON.parse(localStorage.getItem('luming' + this.preferType) || '{}');
                    tmpPrefers[x.name] = x;
                    localStorage.setItem('luming' + this.preferType, JSON.stringify(tmpPrefers));
                    location.href = '/prefer/prefer/' + this.preferType;
                    return;
                }
                this.popupVisible = true;
            },
            popClose: function() {
                this.popupVisible = false;
            },
            fetchData: function(val, type) {
                if(val.trim()==='') return;
                let target = '';
                if (type=='sport'||this.preferType=='sport' || this.preferType=='sportRestrict') {
                    target = 'sportsearch';
                } else {
                    target = 'foodsearch';
                }
                this.$http.get(`/Record/${target}?name=${val.trim()}`).then(response => {
                    // get body data
                    let res = response.body;
                    if(res.success) {
                        res.data.forEach(item => {
                            item.value = 0;
                        })
                        this.data = res.data;
                    }
                }, response => {
                    // error callback
                });
            }
        },
        components: {
            addFood,
            addSport
        },
        created() {
            this.type = this.$route.params.type;
            this.date = getQuery('date');
            this.preferType = getQuery('prefer');
            if(this.isPrefer) {
                this.title = "自定义偏好"
            } else if(this.type=='sport'){
                this.title = "添加运动";
            } else {
                this.title = "添加食物"
            }
        },
        mounted() {

        }
    };

</script>
<style lang="scss">
    .select-popup {
        width: 100%;
    }
    .select-popup1{
        border-radius: 8px;
        overflow: hidden;
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