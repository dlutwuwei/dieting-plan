<template>
    <div class="detail">
        <mt-header title="">
            <a href="/" slot="left">
                <mt-button icon="back">首页</mt-button>
            </a>
        </mt-header>
        <div class="gender detail-item">
            <div class="detail-title">性别</div>
            <div class="detail-options">
                <span class="check-item"><input class="checkbox" type="radio" name="gender" id="male" value="1" v-model="gender"><label for="male">男</label></span>
                <span class="check-item"><input class="checkbox" type="radio" name="gender" id="female" value="2" v-model="gender"><label for="female">女</label></span>
            </div>
        </div>
        <div class="input-box">
            <div class="input-box-span">岁</div>
            <mt-field class="detail-item" v-model="age" label="年龄" placeholder="" type="number"></mt-field>
        </div>
        <div class="input-box">
            <div class="input-box-span">cm</div>
            <mt-field class="detail-item" v-model="height" label="身高" placeholder="" type="number"></mt-field>
        </div>
        <div class="input-box">
            <div class="input-box-span">kg</div>
            <mt-field class="detail-item" v-model="weight" label="体重" placeholder="" type="number"></mt-field>
        </div>
        <div class="detail-item">
            <div class="detail-title">疾病史</div>
            <div class="detail-options">
                <span class="check-item" v-for="(item, index) in disease_options">
                    <input class="checkbox" v-model="diseases" type="checkbox" :id="index" :value="item"><label :for="index">{{item}}</label>
                </span>
            </div>
        </div>
        <div class="detail-item">
            <div class="detail-title">目前活动量</div>
            <select class="select-item" v-model="activity">
                <option value="0">未选择</option>
                <option value="1">极少活动</option>
                <option value="2">少量活动</option>
                <option value="3">轻度活动</option>
                <option value="4">中度活动</option>
                <option value="5">重度活动</option>

            </select>
            <span class="explain" @click="popupAcivity=true">!</span>
        </div>
        <div class="detail-item">
            <div class="detail-title">想怎么减&nbsp;&nbsp;&nbsp;</div>
            <select class="select-item" v-model="reduce">
                <option value="0">未选择</option>
                <option value="1">只节食不运动</option>
                <option value="2">大量节食稍微运动</option>
                <option value="3">节食运动一半一半</option>
                <option value="4">多运动稍微节食</option>
                <option value="5">只运动不节食</option>
            </select>
        </div>
        <div class="bottom-cell">
            <mt-button type="primary" size="normal" v-on:click="post_info">下一步</mt-button>
            <div class="notice">
                <span>填写详细的健康资料 ，有利于系统为您定制专属的私人健康减肥 方案</span>
            </div>
        </div>
        <mt-popup class="select-popup" v-model="popupAcivity" popup-transition="popup-fade">
            <div class="main">
                <p>极少运动：长时间坐在办公室、教室里、很少或是完全没有运动的人。</p>
                <p>少量运动：偶尔运动或散步、逛街、到郊外踏青，每周大约少量运动1~3次的人。</p>
                <p>轻度运动：有持续运动的习惯，或是会上健身房，每周大约运动3~6次的人。</p>
                <p>中度运动：热爱运动，每周运动6~7次，或是工作量相当大的人。</p>
                <p>重度运动：工作或生活作息需要大量劳动，相当消耗能量的人。</p>
            </div>
            <div class="bot"><mt-button type="primary" size="normal" v-on:click="popupAcivity=false">我知道</mt-button></div>
        </mt-popup>
    </div>
</template>
<script>
    import { getQuery } from '../libs/utils';
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                gender: '',
                activity: 0,
                diseases: [],
                age: '',
                height: '',
                weight: '',
                reduce: 0,
                popupAcivity: false,
            }
        },
        methods: {
            post_info: function (e) {
                if (this.gender
                    && this.age && this.height
                    && this.weight
                    && this.reduce > 0
                    && this.activity > 0
                    && this.classid > 0) {
                    
                    if( this.weight > 999 && this.weight < 1) {
                        MessageBox('注意', '体重输入值超出范围');
                        return;
                    }
                    if( this.age > 80 && this.age < 1) {
                        MessageBox('注意', '年龄输入值超出范围');
                        return;
                    }
                    if( this.height > 299 && this.height < 1) {
                        MessageBox('注意', '身高输入值超出范围');
                        return;
                    }
                    var data = {
                        "sex": this.gender, // 性别
                        "age": this.age, // 年龄
                        "height": this.height, //身高
                        "weight": this.weight, //体重
                        "disease": this.diseases.join(','), //疾病史
                        "activity": this.activity, //目前活动量
                        "reduce": this.reduce, //  想怎么减
                        "classid": this.classid // 减肥计划类型id
                    };

                    this.$router.push({
                        path: `/detail/bmi?w=${this.weight}&h=${this.height}&data=${JSON.stringify(data)}`
                    });
                } else {
                    MessageBox('注意', '信息填写不完整');
                }
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
                    value: '2'
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
            this.classid = this.$route.params.classid;
        }
    };

</script>
<style lang="scss">
    .bottom-cell {
        margin-top: 30px;
        margin-bottom: 10px;
        text-align: center;
    }
    .mint-field-clear{
        margin-left:9%;
    }
    .select-popup{
        border-radius: 8px;
        overflow: hidden;
        .main {
            width: 288px;
            padding: 22px;
            line-height: 24px;
            font-size: 14px;
            max-height: 500px;
            overflow: auto;
            p {
                padding-bottom: 24px;
            }
        }
        .bot {
            margin: 10px 0 20px 0;
            text-align: center;
        }

    }
    .detail {
        .input-box{
            position:relative;
            .input-box-span{
                position: absolute;
                left: 63%;
                top: 13px;
                z-index: 100;
                color: #999;
            }
        }
        .detail-item.gender {
            .detail-options {
                padding-top: 0;
            }
        }
        .mint-field-core {
            border: 1px solid #999;
            width: 50%;
            padding:0 10px;
            flex: none;
            text-align:right;
        }
        .detail-item {
            background: #fff;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-right: none;
            border-left: none;
            display: flex;
            .explain {
                line-height: 50px;
                padding: 0 10px;
                color: red;
                font-weight: bold;
            }
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
        .mint-cell-title{
            width:95px;
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
    @media screen and (max-width: 320px) {
        .detail .input-box .input-box-span{
            left:66%;
        }
        .mint-field-clear{
            margin-left: 11%;
        }
    }
</style>
