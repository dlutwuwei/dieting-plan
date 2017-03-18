<template>
    <div style="height: 100%;">
        <mt-header title="鸣鹿健康">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="record-container">
            <a :href="'/plan/diet/breakfast?date='+date">
                <div class="btn breakfast">
                </div>
                <div class="name">早餐</div>
            </a>
             <a :href="'/plan/diet/lunch?date='+date">
                <div class="btn lunch">
                </div>
                <div class="name">午餐</div>
            </a>
             <a :href="'/plan/diet/dinner?date='+date">
                <div class="btn supper">
                </div>
                <div class="name">晚餐</div>
            </a>
             <a :href="'/plan/diet/sport?date='+date">
                <div class="btn sport">
                </div>
                <div class="name">运动</div>
            </a>
             <router-link to="/index/weight">
                <div class="btn weight">
                </div>
                <div class="name">体重</div>
            </router-link>
        </div>
    </div>
</template>
<style lang="scss">
    .record-container {
        display: flex;
        flex-wrap: wrap;
        div.btn {
            margin: 30px 30px 0 30px;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background-size: 30px 30px;
            background-position: center center;
            background-repeat: no-repeat;
        }
        .name {
            margin-top: 16px;
            color: #999;
            text-align: center;
        }
        .breakfast {
            background: #e3547d url(../assets/images/record/zaocan.png);
        }
        .lunch {
            background: #fd635e url(../assets/images/record/zhongcan.png);     
        }
        .supper {
            background: #f98d61 url(../assets/images/record/wancan.png);     
        }
        .sport {
            background: #4fd3c0 url(../assets/images/record/yundong.png);     
        }
        .weight {
            background: #7a9cf0 url(../assets/images/record/tizhong.png);     
        }
    }
</style>
<script>
    import {fmtDate} from  "../libs/utils.js";
    export default {
        created() {
            let now = new Date();
            this.date = fmtDate(now, 'yyyy-MM-dd');
        },
        components: {
        }
    };
</script>