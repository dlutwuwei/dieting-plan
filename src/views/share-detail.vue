<style lang="scss">
    .share-detail-pic{
        position:relative;
        min-height:180px;
        overflow:hidden;
        .go-back:before{
            background-position: -125px -25px;
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
        span:before{
            background-position: -125px -50px;
        }
        span{
            position:absolute;
            right:10px;
            top:20px;
            display:inline-block;
            width:25px;
            height:7px;
            overflow:hidden;
            vertical-align: middle;
        }
        .share-pic{
            width:100%;
        }
        .author-info{
            position:absolute;
            left:20px;
            bottom:25px;
            img{
                display:inline-block;
                width:39px;
                height:39px;
                border-radius:9999px;
                border:2px solid #fff;
                vertical-align:middle;
            }
            p{
                display:inline-block;
                vertical-align:middle;
                font-size:12px;
                color:#fff;
            }
        }
    }
    .detail-info{
        margin-top:10px;
        padding:10px 15px 25px;
        background:#fff;
        border-top:1px solid #f7f7f7;
        border-bottom:1px solid #f7f7f7;
        .detail-info-hd{
            position:relative;
            padding-left:45px;
            img{
                position:absolute;
                left:0px;
                top:0px;
                width:40px;
                height:40px;
                border-radius:9999px;
            }
            h5{
                font-size:18px;
                color:#333;
            }
            p{
                font-size:12px;
                color:#999;
            }
        }
        .detail-info-bd{
            padding-top:5px;
            p{
                line-height:1.5;
                font-size:13px;
                color:#333;
            }
        }
        .detail-info-like{
            padding-top:20px;
            text-align:center;
            p{
                font-size:12px;
                color:#999;
            }
            div{
                padding-top:13px;
                em{
                    display:block;
                    font-size:15px;
                    color:#999;
                    font-style:normal;
                }
                span:before{
                    background-position: 0px -75px;
                }
                span{
                    display:inline-block;
                    width:39px;
                    height:34px;
                    overflow:hidden;
                }
            }
        }
    }
</style>
<template>
    <div class="share-detail">
        <div class="share-detail-pic">
            <div class="go-back ico" @click="goback"></div>
            <span class="ico">....</span>
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1034097970,1628516374&fm=23&gp=0.jpg" class="share-pic" alt=""/>
            <div class="author-info">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488119479&di=6253d2e2902471865de24c306d766c26&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-09-14%2F194112664.jpg" alt=""/>
                <p>狠狠逼自己一把</p>
            </div>
        </div>
        <div class="detail-info">
            <div class="detail-info-hd">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488119479&di=6253d2e2902471865de24c306d766c26&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-09-14%2F194112664.jpg" alt=""/>
                <h5>Alina</h5>
                <p>02月09日12:12</p>
            </div>
            <div class="detail-info-bd">
                <p>2017年的第二天我还记得我昨天疯狂的狂吃矿和的没听过，
                    02年的妹妹子身高173体重122 2016对自己的承诺到现在没
                    完成，新的一年要更加努力 Fighing！！！</p>
                <p><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488561445338&di=35794f4e7cf910f82da30cccaa65e1ef&imgtype=0&src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2015%2F0105%2F52120df037d85671e47554da7c3698b3.jpg" alt=""/></p>
            </div>
            <div class="detail-info-like">
                <p>已有<span>25</span>人喜欢这篇文章</p>
                <div>
                    <span class="ico"></span>
                    <em>喜欢</em>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            goback: function () {
                history.back();
            }
        }
    }

</script>
