<template>
    <div class="share-wapper">
        <div class="share-hd">
            <router-link to="/" slot="left">
                <div class="go-back ico"></div>
            </router-link>
            <span>写分享</span>
            <em>发布</em>
        </div>

        <mt-field label="标题" placeholder=""></mt-field>

    </div>
</template>
<script>

    export default {
        name: 'page-navbar',
        data() {
            return {

            }
        },
        components: {

        }
    };
</script>
<style lang="scss">
    .ico:before{
        content: '';
        display:inline-block;
        width:150px;
        height:150px;
        background:url(../assets/images/ico-01.png) no-repeat;
        background-size:100% auto;
    }
    .ico2:before{
        content: '';
        display:inline-block;
        width:165px;
        height:165px;
        background:url(../assets/images/ico-02.png) no-repeat;
        background-size:100% auto;
    }
    body{
        background:#f7f7f7;
    }
    .share-hd{
        psition:relative;
        padding:10px 0;
        .go-back:before{
            background-position: -125px 0px;
        }
        .go-back{
            position:absolute;
            left:10px;
            top:13px;
            display:inline-block;
            width:10px;
            height:20px;
            overflow:hidden;
            vertical-align: middle;
        }
        .ico-1:before{
            background-position: -100px -25px;
        }
        .ico-1{
            position:absolute;
            right:17px;
            top:13px;
            display:inline-block;
            width:25px;
            height:25px;
            overflow:hidden;
            vertical-align: middle;
        }
    }


</style>
