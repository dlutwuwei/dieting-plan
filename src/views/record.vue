<template>
    <div style="height: 100%;">
        <mt-header title="鸣鹿健康">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="record-container">
            <a href="/plan/diet/breakfast">
                <div class="btn breakfast">
                </div>
                <div class="name">早餐</div>
            </a>
             <a href="/plan/diet/lunch">
                <div class="btn lunch">
                </div>
                <div class="name">午餐</div>
            </a>
             <a href="/plan/diet/supper">
                <div class="btn supper">
                </div>
                <div class="name">晚餐</div>
            </a>
             <a href="/plan/diet/sport">
                <div class="btn sport">
                </div>
                <div class="name">运动</div>
            </a>
             <router-link href="/index/weight">
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
            margin: 30px 35px 0 35px;
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
    export default {
        components: {
        }
    };
</script>