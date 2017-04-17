<template>
    <div class="share-wapper">
        <div class="share-hd">
            <div class="go-back ico" slot="left" @click="goback"></div>
            <div class="share-tab">
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">推荐</mt-tab-item>
                    <mt-tab-item id="2" v-if="uploadView">我的</mt-tab-item>
                </mt-navbar>
            </div>
            <router-link to="/edit"><div class="ico ico-1" v-if="uploadView"></div></router-link>
        </div>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <!--s:瘦身分享-->
                <SlimmingShar :share-list="shareList"></SlimmingShar>
                <!--e:瘦身分享-->
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <template v-if="myShareList && myShareList.length > 0 && uploadView">
                    <SlimmingShar :share-list="myShareList"></SlimmingShar>
                </template>
                <div class="write-share" v-else>
                    <h5>还没写过瘦身分享哦，赶紧去写分享吧！</h5>
                    <router-link to="/edit"><span>写分享</span></router-link>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
    import SlimmingShar from '../components/share/slimmingShar.vue';//瘦身分享
    import { MessageBox } from 'mint-ui';
    import { Indicator } from 'mint-ui';
    import { getQuery } from '../libs/utils';
    import WxShare from '../libs/wx_share.js';

    export default {
        name: 'page-navbar',
        data() {
            return {
                selected: '1',
                shareList: [],
                myShareList: [],
                uploadView: true,
            }
        },
        created() {
            var shareData = {
                "title": '鸣鹿健康',// 分享标题
                "desc": '鸣鹿健康，瘦身伙伴',// 分享描述
                "link": window.location.origin+'/share/listt#', // 分享链接
                "img_url": 'https://a1.nicaifu.com/dora/201701/ed587c92d6f09f4_ojv93q.jpg',
            }


            var wxShare = new WxShare();
            wxShare.start(shareData);
        },
        components: {
            SlimmingShar,
        },
        methods: {
            getUserInfoe(){
                this.$http.get('/Info/usertype').then(response => {
                    // get body data
                    var res = JSON.parse(response.data.data)
                    console.log(res.type)
                    if(res.type == null || res.type != 3 || res.type != 7 || res.type != 9 || res.type != 15){
                        this.uploadView = false;
                    }
                }, response => {
                    MessageBox('注意', '获取信息失败');
                });
            },
            getShareList() {
                this.$http.get('/Share/sharelist').then(response => {
                    // get body data
                    if(JSON.parse(response.body.massages) != null){
                        this.shareList = this.shareList.concat(JSON.parse(response.body.massages));
                        Indicator.close();
                        //console.log(this.shareList)
                    }
                }, response => {
                    MessageBox('注意', '获取信息失败');
                });
            },
            getMyShareList() {
                this.$http.get('/Share/myshare').then(response => {
                    if(JSON.parse(response.body.massages) != null){
                        this.myShareList = this.myShareList.concat(JSON.parse(response.body.massages));
                        //console.log(this.shareList)
                    }
                }, response => {
                    MessageBox('注意', '获取信息失败');
                });
            },
            goback: function () {
                location.href = '/';
            }
        },
        mounted() {
            Indicator.open('加载中...');
            this.getUserInfoe();
            this.getShareList();
            this.getMyShareList();

            this.from = getQuery('from');
            if(this.from == 'myshare'){
               this.selected = '2';
            }
        }
    };
</script>
<style lang="scss">
    .ico:before{
        content: '';
        display:inline-block;
        width:150px;
        height:150px;
        background:url(./../assets/images/ico-03.png) no-repeat;
        background-size:100% auto;
    }
    .ico2:before{
        content: '';
        display:inline-block;
        width:165px;
        height:165px;
        background:url(./../assets/images/ico-02.png) no-repeat;
        background-size:100% auto;
    }
    body{
        background:#f7f7f7;
    }
    .share-hd{
        position:relative;
        padding:10px 0;
        .go-back:before{
            background-position: -125px 0px;
        }
        .go-back{
            position: absolute;
            left: 1px;
            top: 3px;
            display: inline-block;
            width: 70px;
            height: 40px;
            overflow: hidden;
            vertical-align: middle;
            padding: 9px 15px 0px;
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
        border-radius:10px;
        .mint-tab-item{
            .mint-tab-item-label{
                font-size:15px;
                height:28px;
                line-height:28px;
            }
        }
        .mint-navbar{
            border-radius: 10px;
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
        border-radius:9px;
    }
    .mint-navbar .mint-tab-item.is-selected{
        background:#fe950f;
    }

    .write-share{
        text-align:center;
        h5{
            padding:74px 0 162px;
           font-size:15px;
            color:#999;
        }
        span{
            display:inline-block;
            width:235px;
            height:40px;
            line-height:40px;
            border:1px solid #47a304;
            border-radius:30px;
            font-size:18px;
            color:#47a304;
        }
    }

</style>
