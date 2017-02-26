<template>
  <div id="app" class="wrapper">
    <mt-header title="鸣鹿健康">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!--s:鸣鹿轮播图-->
    <MlSwiper :ml-swiper="mlSwiper"></MlSwiper>
    <!--e:鸣鹿轮播图-->

    <!--s:瘦身分享-->
    <SlimmingSharNew :share-list="shareList"></SlimmingSharNew>
    <!--e:瘦身分享-->

    <!--s:瘦身达人榜-->
    <DarenList :daren-list="darenList"></DarenList>
    <!--e:瘦身达人榜-->

    <!--s:一分钟减肥方案-->
      <ReduceWeight :reduce-list="reduceList"></ReduceWeight>
    <!--e:一分钟减肥方案-->

      <HeatPlate :heat-plate="heatPlate"></HeatPlate>
    <!--e:能量盘-->

      <WeightCurve :weight-curve="weightCurve"></WeightCurve>
      <!--e:体重曲线-->

      <OldUserPop></OldUserPop>
      <!--e:老用户弹窗-->

      <InputWeight></InputWeight>
      <!--e:录入体重日历-->

      <InputWeightPop></InputWeightPop>
      <!--e:录入体重日历弹窗-->

      <BottomBar></BottomBar>
  </div>
</template>

<script>

  import "../assets/scss/common/reset.scss";
  import MlSwiper from '../components/index/mlSwiper.vue';//轮播图
  import SlimmingSharNew from '../components/index/slimmingSharNew.vue';//瘦身分享
  import ReduceWeight from '../components/index/reduceWeight.vue';//一分钟减肥计划
  import DarenList from '../components/index/darenList.vue';//瘦身达人榜
  import HeatPlate from '../components/index/heatPlate.vue';//能量盘
  import WeightCurve from '../components/index/weightCurve.vue';//能量盘
  import BottomBar from '../components/common/bottomBar.vue';//底部栏
  import OldUserPop from '../components/index/oldUserPop.vue';//老用户弹窗
  import InputWeight from '../components/index/inputWeight.vue';//录入体重日历
  import InputWeightPop from '../components/index/inputWeightPop.vue';//录入体重日历弹窗

  window.mlSwiper = [{
        "image_url": 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1034097970,1628516374&fm=23&gp=0.jpg',
        "target_url": '',
      },{
        "image_url": 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1034097970,1628516374&fm=23&gp=0.jpg',
        "target_url": '',
      },{
        "image_url": 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1034097970,1628516374&fm=23&gp=0.jpg',
        "target_url": '',
      }]

  window.shareList = [{
      "image_url":'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1034097970,1628516374&fm=23&gp=0.jpg',
      "target_url": 'http://www.baidu.com',
      "title":"即将踏入30岁的行列，狠狠逼自己一把",
      "publish_time":"2016-12-29",
      "like_num":22333,
      "comment_num":1412,
      "author":{
          "avatar_url":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488119479&di=6253d2e2902471865de24c306d766c26&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-09-14%2F194112664.jpg",
          "name":"ABBBBB",
          "description":"即将踏入30岁的行列，狠狠逼自己一把"
        }

  },{
      "image_url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1034097970,1628516374&fm=23&gp=0.jpg",
      "target_url": "",
      "title":"即将踏入30岁的行狠逼自己一把",
      "publish_time":"2016-12-29",
      "like_num":223,
      "comment_num":14333,
      "author":{
        "avatar_url":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488119479&di=6253d2e2902471865de24c306d766c26&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-09-14%2F194112664.jpg",
        "name":"ABBBBB",
        "description":"即将踏入30岁的行列，狠狠逼自己一把"
      }
  }]

  window.darenList = {
      "month": [{
          "user_name": 'Alice',
          "weight": 50,
          "lose_weight": 10,
          "duration": 18
      },{
          "user_name": 'Blice',
          "weight": 50,
          "lose_weight": 10,
          "duration": 18
      },{
          "user_name": 'Clice',
          "weight": 50,
          "lose_weight": 10,
          "duration": 18
      },{
          "user_name": 'Dlice',
          "weight": 50,
          "lose_weight": 10,
          "duration": 18
      }],
      "mine": [{
          "user_name": 'Lily',
          "weight": 50,
          "lose_weight": 10,
          "duration": 18
      }]
  }

  window.reduceList = [{
        "plan_name": "保守型",
        "plan_id": 1,
        "description":"30天掉4斤肉，健康减肥，贵在坚持！"
      },{
        "plan_name": "平衡型",
        "plan_id": 2,
        "description":"30天掉6斤肉，合理速度，努力实现！"
      },{
        "plan_name": "激进型",
        "plan_id": 3,
        "description":"30天掉8斤肉，我信我能，毅力致胜！"
      },{
      "plan_name": "急速型",
      "plan_id": 4,
      "description":"30天掉10斤肉，坚信我行，信心满满！"
  }]

  //热量盘
  window.heatPlate = [{
      "date": "2017-2-11",
      "obtain": 1151,
      "left": 52,
      "consume": 100,
      "metrology":"摄入适中",
  },{
      "date": "2017-2-12",
      "obtain": 1152,
      "left": 52,
      "consume": 100,
      "metrology":"摄入适中",
  },{
      "date": "2017-2-13",
      "obtain": 1153,
      "left": 52,
      "consume": 100,
      "metrology":"摄入适中",
  },{
      "date": "2017-2-14",
      "obtain": 1154,
      "left": 52,
      "consume": 100,
      "metrology":"摄入适中",
  },{
      "date": "2017-2-25",
      "obtain": 1155,
      "left": 52,
      "consume": 100,
      "metrology":"摄入适中",
  }]

  //体重曲线
  window.weightCurveData = [{
      "date": "2017-2-3",
      "value": 51.2,
  },{
      "date": "2017-2-4",
      "value": 55.2,
  },{
      "date": "2017-2-5",
      "value": 59.2,
  },{
      "date": "2017-2-6",
      "value": 75.2,
  }]

  export default {
    data() {
      return {
        selected: '1',
        msg: 'Use Vue 2.0 Today!',
        shareList: window.shareList,
        reduceList: window.reduceList,
        darenList: window.darenList,
        mlSwiper: window.mlSwiper,
        heatPlate: window.heatPlate,
        weightCurve: window.weightCurveData,
      }
    },

    methods: {
      startHacking() {
        this.$refs.picker.open();
      }
    },

    components: {
      SlimmingSharNew,
      ReduceWeight,
      DarenList,
      MlSwiper,
      HeatPlate,
      WeightCurve,
      BottomBar,
      OldUserPop,
      InputWeight,
      InputWeightPop,
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
    .ico2:before{
        content: '';
        display:inline-block;
        width:165px;
        height:165px;
        background:url(../assets/images/ico-02.png) no-repeat;
        background-size:100% auto;
    }
    .wrapper{
        padding-bottom: 80px;
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
</style>
