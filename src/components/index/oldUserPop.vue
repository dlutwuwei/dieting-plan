<style lang="scss" scoped>
    .isHide{
        display:none;
    }
   .mask{
       position:fixed;
       width:100%;
       height:100%;
       left:0px;
       top:0px;
       right:0px;
       bottom:0px;
       background:#333;
       filter:alpha(opacity=80);
       opacity:0.8;
       z-index:10000;
   }
    .old-user-pop{
        position:fixed;
        top:180px;
        padding: 0 35px;
        z-index:10001;
        .bd{
            width:100%;
            height:205px;
            padding-top:40px;
            background:#fff;
            p{
                width:80%;
                margin: 0px auto;
               font-size:14px;
                color:#333;
            }
            div{
            margin-top:50px;
            text-align:center;
                span{
                    display:inline-block;
                    line-height:40px;
                    font-size:18px;
                }
                span:first-child{
                    width:152px;
                    height:40px;
                    margin-right:20px;
                    color:#47a304;
                    border:1px solid #47a304;
                    border-radius:4px;
                }
            }
        }
    }
</style>
<template>
    <div v-bind:class="{ isHide: showPop }">
        <div class="old-user-pop" >
            <div class="bd">
                <p>恭喜您已完成15天免费计划，购买正式计划向目标迈进！</p>
                <div>
                    <span>起驾</span>
                    <span v-on:click="closePop">残忍的拒绝</span>
                </div>
            </div>

        </div>
        <div class="mask"></div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                showPop: true,
            }
        },

        methods:{
            closePop() {
               this.showPop = !this.showPop;
            }
        },

        mounted(){


        },
    }

</script>
