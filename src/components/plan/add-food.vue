<template>
    <div class="add-food">
        <div class="date">2月8日/早餐</div>
        <div class="food-item">
            <img :src="item.icon" alt="">
            <div class="food-info">
                <div class="food-name">{{item.name}}</div>
                <div class="food-energy">{{item.kcal}}千卡/100克</div>
            </div>
        </div>
        <div class="weight-select">
            <div class="food-text">
                <div>{{total}}千卡</div>
                <div>{{item.weight}}克</div>
            </div>
            <div class="bd">
                <div class="weight"><input type="number" @keyup="getNum" v-model="item.weight" id="ruler-input" /><span>g</span></div>
                <div class="calipers"><em id="ruler-em"></em><span class="one">-</span><span class="two">-</span><span class="three">-</span></div>
            </div>
        </div>
        <div class="bottom-btn"><span v-on:click="cancel">取消</span><span v-on:click="click_to_save">保存</span></div>
    </div>
</template>
<script>
    const type_map = {
        'breakfast': 1,
        'lunch': 2,
        'dinner': 3
    }
    import { MessageBox } from 'mint-ui';
    import { getQuery } from '../../libs/utils';

    export default {
        data() {
            return {
                item: this.data
            }
        },
        props: ['data', 'type', 'isUpdate'],
        computed: {
            total: function () {
                return (this.item.kcal * this.item.weight / 100).toFixed(2);
            }
        },
        watch: {
            data(val) {
                if(!val.weight) {
                    val.weight = val.gram;
                }
                this.item = val;
            }
        },
        methods: {
            cancel: function () {
                this.$emit('popClose');
            },
            click_to_save(){
                if(this.user_type == 15 || this.user_type == 9) {
                    // 老用户和15天试用用户修改减肥计划
                    this.save();
                } else if(this.user_type == 7) {
                    // 7天过渡期记录
                    this.record();
                }
            },
            save: function () {
                if(!this.item.weight) {
                    return;
                }
                let url = '/plan/updatefood';
                if(!this.isUpdate) {
                    url = '/plan/addfood';
                }
                this.$http.post(url, {
                    "food": type_map[this.type],
                    "pid": this.item.pid,
                    "name": this.item.name,
                    "kcal": (this.item.kcal * this.item.weight/100).toFixed(2),
                    "weight": this.item.weight,
                    "class": this.item.class,
                    "time": this.date,
                }).then(response => {
                    let res = response.body;
                    if(res.success){
                        this.$router.push(`/plan/diet/${this.type}?date=${this.date}`);
                    }
                    // get body data
                }, response => {
                    // error callback
                    MessageBox('注意', '请求失败');
                });
                
                this.$emit('popClose');
            },
            record: function () {
                if(!this.item.weight) {
                    return;
                }
                this.$http.post('/Record/foodadd', {
                    "class": type_map[this.type],
                    "pid": this.item.pid,
                    "name": this.item.name,
                    "kcal": this.item.kcal,
                    "gram": this.item.weight,
                    "energy": this.item.energy
                }).then(response => {
                    let res = response.body;
                    if(res.success){
                        this.$router.push(`/plan/diet/${this.type}?date=${this.date}`);
                    }
                    // get body data
                }, response => {
                    // error callback
                    MessageBox('注意', '请求失败');
                });
                
                this.$emit('popClose');
            },
            getNum: function (event) {
                let rulerNum = event.target.value;
                let rulerEm = document.getElementById('ruler-em');
                let rumberOne = document.querySelector('.one');
                let rumberTwo = document.querySelector('.two');
                let rumberThree = document.querySelector('.three');
                let samllNum = rulerNum - parseFloat(rulerNum).toFixed(0);

                if (rulerNum == '' || rulerNum <= 0) {
                    rumberOne.innerHTML = 0;
                    rumberTwo.innerHTML = 1;
                    rumberThree.innerHTML = 2;
                    rulerEm.style.left = '150px';
                } else {
                    rumberOne.innerHTML = parseFloat(rulerNum) - 1;
                    rumberTwo.innerHTML = parseFloat(rulerNum);
                    rumberThree.innerHTML = parseFloat(rulerNum) + 1;
                    rulerEm.style.left = (rulerNum - parseFloat(rulerNum).toFixed(0)) * 102 + 150 + 'px';
                }
            }
        },
        created() {
            this.date = getQuery('date');
        },
        mounted() {
            this.$http.get('/Info/usertype').then(res => {
                if (res.body.success) {
                    this.user_type = JSON.parse(res.body.data).type;
                }
            }, () => {
                    MessageBox('注意', '获取用户信息失败');
            });
        }
    }

</script>
<style lang="scss" scoped>
    .add-food {
        width: 100%;
        .date {
            line-height: 70px;
            font-size: 18px;
            text-align: center;
        }
        .bottom-btn {
            bottom: 0;
            height: 50px;
            background: #47a304;
            position: relative;
            &:before {
                content: '';
                position: absolute;
                top: 10px;
                left: 50%;
                height: 30px;
                width: 1px;
                background: #fff;
            }
            span {
                display: inline-block;
                text-align: center;
                line-height: 50px;
                font-size: 14px;
                width: 50%;
                color: #fff;
            }
        }
        .food-item {
            padding: 0 18px;
            height: 80px;
            border-bottom: 1px solid #dfdfdf;
            display: flex;
            align-items: center;
            justify-content: space-between;
            img {
                height: 50px;
                width: 50px;
                margin: 15px 0;
            }
            .food-info {
                flex: 1;
                line-height: 30px;
                margin-left: 10px;
                .food-name {
                    font-size: 20px;
                }
                .food-energy {
                    font-size: 14px;
                    color: #999;
                }
            }
            .food-calories {
                text-align: right;
                font-size: 9px;
                line-height: 45px;
                color: #999;
            }
        }
    }
    
    .weight-select {
        position: relative;
        .food-text {
            position: absolute;
            left: 40px;
            top: 40px;
            font-size: 16px;
            color: #999;
        }
        .hd {
            height: 57px;
            line-height: 57px;
            border-bottom: 1px solid #dfdfdf;
        }
        .bd {
            padding: 50px 0;
            text-align: center;
            .weight {
                position: relative;
                color: #47a304;
                input {
                    width: 85px;
                    height: 45px;
                    text-align:center;
                    font-size: 30px;
                    color: #47a304;
                }
                span {
                    position: absolute;
                    top: 0px;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .calipers {
                position: relative;
                width: 288px;
                height: 88px;
                margin-top: 15px;
                background: url(../../assets/images/jianfei/ruler.png) no-repeat;
                background-size: 288px auto;
                margin: auto;
                em {
                    position: absolute;
                    left: 150px;
                    top: 0px;
                    display: block;
                    width: 3px;
                    height: 46px;
                    background: #47a304;
                    border-radius: 2px;
                }
                span {
                    position: absolute;
                    top: 58px;
                    font-size: 18px;
                    color: #333;
                }
                .one {
                    left: 37px;
                }
                .two {
                    left: 142px;
                }
                .three {
                    left: 247px;
                }
            }
        }
    }
    
    .ruler {
        position: relative;
        width: 288px;
        height: 88px;
        margin-top: 38px;
        background: url(../../assets/images/jianfei/ruler.png) no-repeat;
        background-size: 288px auto;
    }
</style>