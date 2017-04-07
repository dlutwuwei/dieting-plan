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
        height:160px;
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
            <!--<span class="ico">....</span>-->
            <img :src="shareDetailInfo.titlepic" class="share-pic" alt=""/>
            <div class="author-info">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488119479&di=6253d2e2902471865de24c306d766c26&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-09-14%2F194112664.jpg" alt=""/>
                <p>{{shareDetailInfo.title}}</p>
            </div>
        </div>
        <div class="detail-info">
            <div class="detail-info-hd">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488119479&di=6253d2e2902471865de24c306d766c26&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-09-14%2F194112664.jpg" alt=""/>
                <h5>{{author.name}}</h5>
                <p>{{shareDetailInfo.time}}</p>
            </div>
            <div class="detail-info-bd">
                <p  v-html="shareDetailInfo.content"></p>
            </div>
            <div class="detail-info-like">
                <p>已有<span>{{laudNum}}</span>人喜欢这篇文章</p>
                <div>
                    <span class="ico" @click="addLove"></span>
                    <em>喜欢</em>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { getQuery } from '../libs/utils';
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
        return {
            shareDetailInfo: {},
            author: {},
            laudNum: null,
        }
    },
    created() {
        this.cid = getQuery('cid');
    },
    methods: {
        goback: function () {
            history.back();
        },
        getShareDetail: function(){
            this.$http.get(`/share/datails?cid=${this.cid}`).then(res => {
                this.shareDetailInfo = res.body.massages[0];
            this.author = res.body.massages[0].author;
            this.laudNum = this.shareDetailInfo.laud;
        },() => {
            MessageBox('注意', '请求失败');
        });
    },
    addLove: function(){
        let postData = {
            id: this.cid
        }
        this.$http.post('/share/laud', postData).then(response => {
            let res = response.body;
        if (res.success) {
            this.laudNum++;
        }
    }, err => {
        MessageBox('注意', '请求失败');
    });
    }
    },
    mounted(){
        this.getShareDetail();
    }
    }
</script>
