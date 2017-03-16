<template>
    <div class="add-sport">
        <div class="sport-head">
            <span class="cancel orange" v-on:click="cancel">取消</span>
            <span class="title">添加运动</span>
            <span class="confirm orange" v-on:click="save">确定</span>
        </div>
        <div class="sport-item line">
            <img :src="item.icon" alt="">
            <div class="food-name">{{item.name}}</div>
            <div class="food-energy"><span class="orange">{{item.kcal}}</span>千卡/60分钟</div>
        </div>
        <div class="sport-select line">
            <div class="sport-quantity">
                <span class="duration red">{{value}}<span class="unit">分钟</span></span>
                <span class="amount">{{total}}千卡</span>
            </div>
            <div class="key-board" @click="onClickValue">
                <div class="key-button" :value="item" v-for="(item, index) in 9">{{item}}</div>
                <div class="key-button" value=".">.</div>
                <div class="key-button" value="0">0</div>
                <div class="key-button" value="del" @click="onDelete">DEL</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                item: this.data,
                inputVal: '',
            }
        },
        computed: {
            total: function () {
                return parseInt(this.item.kcal * this.value / 60);
            },
            value: function() {
                return parseInt(this.inputVal||0);
            }
        },
        props: ['data', 'type', 'list'],
        watch: {
            data(val) {
                this.item = val;//新增result的watch，监听变更并同步到myResult上
            },
            list(val) {
                this.list = val;
            }
        },
        methods: {
            cancel: function () {
                this.$emit('popClose');
            },
            save: function () {
                this.$http.get('/Record/sportadd', {
                    "class": type_map[this.type],
                    "pid": this.item.pid,
                    "name": this.item.name,
                    "kcal": this.item.kcal,
                    "gram": this.item.value,
                    "energy": this.item.value
                }).then(response => {
                    // get body data
                }, response => {
                    // error callback
                });
                this.$router.push('/plan/diet/' + this.type);
                this.$emit('popClose');
            },
            onClickValue: function(e) {
                let val = e.target.getAttribute('value');
                this.inputVal += val;
            },
            onDelete: function(e) {
                e.stopPropagation();
                let val = this.inputVal;
                this.inputVal = val.substring(0, val.length-1);
            }
        },
        mounted() {
            console.log(this.data)
        }
    }

</script>
<style lang="scss" scoped>
    .add-sport {
        .line {
            position: relative;
            &:before {
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
        }
        .red {
            color: #ff0101;
        }
        .orange {
            color: #f68e1f;
        }
        width: 290px;
        height: 492px;
        background: #f8f8f8;
        .sport-head {
            background: #fff;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:0 10px;
            .cancel, .confirm {

                font-size: 16px;
            }
            .title {
                font-size: 18px;
            }
        }
        .sport-item {
            height: 180px;
            padding-top: 45px;
            text-align: center;
            font-size: 16px;
            img {
                width: 40px;
            }
        }
        .sport-select {
            background: #fff;
            text-align: center;
            height: 54px;
            line-height: 54px;
            .sport-quantity {
                height: 54px;
                .duration {
                    font-size: 30px;
                }
                .unit {
                    font-size: 14px;
                    vertical-align: top;
                }
                .amount {
                    color: #999;
                }
            }
        }
        .key-board {
            height: 400px;
            background: #fff;
            display: flex;
            flex-wrap: wrap;
            width: 200%;
            transform: scale(.5);
            transform-origin: 0 0;
            .key-button {
                border: 1px solid #e0e0e0;
                width: 33.3%;
                font-size: 40px;
                height: 100px;
                line-height: 100px;
                color: black;
            }
        }
        
       
    }
</style>