<template>
    <div class="share-wapper">
        <div class="share-hd">
            <div class="go-back"></div>
            <div class="share-tab">
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">选项一</mt-tab-item>
                    <mt-tab-item id="2">选项二</mt-tab-item>
                </mt-navbar>
            </div>
            <div class="ico ico-1"></div>
        </div>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <!--s:瘦身分享-->
                <SlimmingShar :share-list="shareList"></SlimmingShar>
                <!--e:瘦身分享-->
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :title="'测试 ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
    import SlimmingShar from '../components/share/slimmingShar.vue';//瘦身分享

    export default {
        name: 'page-navbar',
        data() {
            return {
                selected: '1',
                shareList: window.shareList,
            }
        },
        components: {
            SlimmingShar,
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
    .share-hd{
        psition:relative;
        padding:10px 0;
        .go-back{
            position:absolute;
            left:10px;
            top:10px;
            vertical-align:middle;
            height: 20px;
            width: 20px;
            display: inline-block;
            border-bottom: 2px solid #999;
            border-right: 2px solid #999;
            transform: rotate(135deg) scale(0.5);
            -webkit-transform: rotate(135deg) scale(0.5);
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
    .share-tab{
        width:141px;
        height:30px;
        margin:0 auto;
        line-height:30px;
        border:1px solid #fe950f;
        border-radius:5px;
        .mint-tab-item{
            .mint-tab-item-label{
                font-size:15px;
                height:28px;
                line-height:28px;
            }
        }
        .mint-navbar .mint-tab-item.is-selected {
            border-bottom: 0px solid #26a2ff;
            color: #fff;
        }
    }
    .mint-navbar .mint-tab-item{
        padding:0px;
        height:28px;
        line-height:28px;
    }
    .mint-navbar .mint-tab-item.is-selected{
        background:#fe950f;
    }



</style>
