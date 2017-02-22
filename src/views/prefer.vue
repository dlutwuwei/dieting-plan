<template>
    <transition name="slide">
    <div class="prefer">
        <mt-header title="鸣鹿健康">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="title">{{title}}</div>
        <div class="select-items">
            <div class="item" v-for="item in items">
                <div class="icon"><img src="" alt=""></div>
                <div class="name">{{item.name}}</div>
            </div>
            <mt-button type="primary" size="normal" v-on:click="post_prefer">下一步</mt-button>

        </div>
    </div>
    </transition>
</template>
<script>
    export default {
        data() {
            return {
                items: null,
                title: null
            }
        },
        methods: {
            post_prefer: function (e) {
                this.$router.push({
                    path: '/lunch'
                });
            },
            fetchData: function(e) {
                console.log(this.$route.params.type)
                this.items = window.data[this.$route.params.type || 'breakfast'];
                this.title = window.titles[this.$route.params.type || 'breakfast'];
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        mounted() {
            this.items = window.data[this.$route.params.type || 'breakfast'];
            this.title = window.titles[this.$route.params.type || 'breakfast'];
        },
        created() {
            window.titles = {
                breakfast: '早餐选择',
                lunch: '午餐选择',
                supper: '晚餐选择'
            }
            window.data = {
                breakfast: [
                    {
                        name: "牛肉",
                        icon_url: ''
                    },
                    {
                        name: "马肉",
                        icon_url: ''
                    },
                    {
                        name: "",
                        icon_url: ''
                    }
                ],
                lunch: [
                    {
                        name: "苹果",
                        icon_url: ''
                    },
                    {
                        name: "鸡蛋",
                        icon_url: ''
                    },
                    {
                        name: "",
                        icon_url: ''
                    }
                ]
            };
        }
    }

</script>
<style lang="scss">
    .prefer {
        .title {
            text-align: center;
            font-size: 18px;
            line-height: 40px;
            color: #333;
        }
    }
    
</style>