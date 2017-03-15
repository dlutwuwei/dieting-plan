<template>
    <div class="detail">
        <mt-header title="">
            <router-link to="/" slot="left">
                <mt-button icon="back">填写个人信息</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="gender detail-item">
            <div class="detail-title">性别</div>
            <div class="detail-options">
                <span class="check-item"><input class="checkbox" type="radio" name="gender" id="male" value="1" v-model="gender"><label for="male">男</label></span>
                <span class="check-item"><input class="checkbox" type="radio" name="gender" id="female" value="0" v-model="gender"><label for="female">女</label></span>
            </div>
        </div>
        <mt-field class="detail-item" v-model="age" label="年龄" placeholder="           岁" type="number"></mt-field>
        <mt-field class="detail-item" v-model="height" label="身高" placeholder="           cm" type="number"></mt-field>
        <mt-field class="detail-item" v-model="weight" label="体重" placeholder="           kg" type="number"></mt-field>
        <div class="detail-item">
            <div class="detail-title">疾病史</div>
            <div class="detail-options">
                <span class="check-item" v-for="(item, index) in disease_options">
                    <input class="checkbox" v-model="diseases" type="checkbox" :id="index" :value="index"><label :for="index">{{item}}</label>
                </span>
            </div>
        </div>
        <div class="detail-item">
            <div class="detail-title">目前活动量</div>
            <select class="select-item" v-model="activity">
                <option value="0">少量活动</option>
                <option value="1">大量活动</option>
            </select>
        </div>
        <div class="detail-item">
            <div class="detail-title">想怎么减</div>
            <select class="select-item" v-model="reduce">
                <option value="0">只节食不运动</option>
                <option value="1">即节食又运动</option>
            </select>
        </div>
        <div class="bottom-cell">
            <mt-button type="primary" size="normal" v-on:click="post_info">下一步</mt-button>
            <div class="notice">
                <span>填写详细的健康资料 ，有利于系统为您定制专属的私人健康减肥 方案</span>
            </div>
        </div>
    </div>
</template>
<script>
    function getQuery(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                gender: '',
                activity: 0,
                diseases: [],
                method: 0,
                age: '',
                height: '',
                weight: '',
                reduce: 0
            }
        },
        methods: {
            post_info: function (e) {

                this.$http.post('/Info/infoadd', {
                    "sex": this.gender, // 性别
                    "age": this.age, // 年龄
                    "height": this.height, //身高
                    "weight": this.weight, //体重
                    "disease": this.diseases, //疾病史
                    "activity": this.activity, //目前活动量
                    "reduce": this.reduce, //  想怎么减
                    "classid": this.classid // 减肥计划类型id
                }).then(response => {
                    let data = response.body;
                    if (data.success !== 'false' || !data.success) {
                        this.$router.push({
                            path: `bmi?w=${this.weight}&h=${this.height}`
                        });
                    } else {
                        MessageBox('注意', '信息没有填写完整');
                    }
                }, response => {
                    MessageBox('注意', '抱歉，链接出现问题');
                });

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
            this.classid = getQuery('plan_id')
        }
    };

</script>
<style lang="scss">
    .bottom-cell {
        margin-top: 30px;
        margin-bottom: 10px;
        text-align: center;
    }
    
    .detail {
        .detail-item.gender {
            .detail-options {
                padding-top: 0;
            }
        }
        .detail-item {
            background: #fff;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-right: none;
            border-left: none;
            display: flex;
            .select-item {
                width: 125px;
                height: 30px;
                margin-top: 10px;
            }
            .detail-title {
                white-space: nowrap;
                line-height: 50px;
                padding-left: 50px;
                padding-right: 20px;
            }
            .detail-options {
                flex: 1;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                padding-top: 10px;
                .check-item {
                    line-height: 36px;
                    white-space: nowrap;
                }
                .checkbox {
                    height: 16px;
                    width: 16px;
                    background: #fff;
                    margin-right: 10px;
                    vertical-align: -2px;
                }
                label {
                    margin-right: 20px;
                }
            }
        }
        .mint-cell-text {
            padding-left: 38px;
        }
        .mint-cell-wrapper {
            background-image: none;
        }
    }
    
    .notice {
        color: #ff0000;
        font-size: 12px;
        padding: 15px 16px;
        text-align: left;
    }
</style>