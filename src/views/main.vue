<template>
  <div id="app">
    <mt-header title="鸣鹿健康">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="page-swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item class="slide1">1</mt-swipe-item>
        <mt-swipe-item class="slide2">2</mt-swipe-item>
        <mt-swipe-item class="slide3">3</mt-swipe-item>
      </mt-swipe>
    </div>

    <!--s:瘦身分享-->
    <SlimmingShar :share-list="shareList"></SlimmingShar>
    <!--e:瘦身分享-->

    <card class="card">
      <div slot="header" class="card-header">
        <span class="title">瘦身达人榜</span>
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">本月排行</mt-tab-item>
        <mt-tab-item id="2">总排行</mt-tab-item>
        <mt-tab-item id="3">我的排行</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell v-for="n in 6" :title="'内容 ' + n" />
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-cell v-for="n in 6" :title="'测试 ' + n" />
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mt-cell v-for="n in 6" :title="'选项 ' + n" />
        </mt-tab-container-item>
      </mt-tab-container>
    </card>
    <!--e:瘦身分享-->
    <!--e:瘦身分享-->
  </div>
</template>

<script>
  import card from '../components/card.vue';
  import SlimmingShar from '../components/index/slimmingShar.vue';//瘦身分享

  window.shareList = [{
      "shareimg":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487524631615&di=48f3d53159d148514b09f4ee0e9bd1d5&imgtype=0&src=http%3A%2F%2Fpic55.nipic.com%2Ffile%2F20141206%2F13551740_235750235000_2.jpg",
      "title":"即将踏入30岁的行列，狠狠逼自己一把",
      "time":"2016-12-29",
      "follow":22333,
      "flower":1412,
      "authorpic":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488119479&di=6253d2e2902471865de24c306d766c26&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-09-14%2F194112664.jpg",
      "authorname":"ABBBBB",
      "authortitle":"即将踏入30岁的行列，狠狠逼自己一把"
  },{
      "shareimg":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1034097970,1628516374&fm=23&gp=0.jpg",
      "title":"即将踏入30岁的行狠逼自己一把",
      "time":"2016-12-29",
      "follow":223,
      "flower":14333,
      "authorpic":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487524813632&di=5c928ed45785697000da773e614de77f&imgtype=0&src=http%3A%2F%2Fwww.gpqqtx.com%2Fuploads%2Fallimg%2F160105%2F1-160105150236.jpg",
      "authorname":"AAAAAs",
      "authortitle":"即将踏入30岁逼自己一把"
  }]

  export default {
    data() {
      return {
        selected: '1',
        msg: 'Use Vue 2.0 Today!',
        shareList: window.shareList,
      }
    },

    methods: {
      startHacking() {
        this.$refs.picker.open();
      }
    },

    components: {
      card,
      SlimmingShar,
    }
  }

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
  body {
      background:#f7f7f7;
    font-family: Helvetica, sans-serif;
    margin: 0;
    padding: 0;
  }

  .mint-header {
    background-color: #47a304;
  }
  .card {
    .card-header:before{
      content: '';
      display: inline-block;
    }
    .share {
      img{
        width: 100%;
      }
    }
  }
  #app {
    max-width: 400px;
    margin: auto;
  }

  .page-swipe {
    height: 100px;
  }

  .page-swipe .slide1 {
    background-color: #0089dc;
    color: #fff;
  }

  .page-swipe .slide2 {
    background-color: #ffd705;
    color: #000;
  }

  .page-swipe .slide3 {
    background-color: #ff2d4b;
    color: #fff;
  }

  .page-swipe-desc {
    text-align: center;
    color: #666;
    margin-bottom: 5px;
  }
</style>
