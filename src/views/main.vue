<template>
  <div id="app" class="wrapper">
    <mt-header title="鸣鹿健康">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
     <router-link to="/plan" slot="right">
        <mt-button>我的计划</mt-button>
      </router-link>
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

      <InputWeight v-if="false"></InputWeight>
      <!--e:录入体重日历-->

      <InputWeightPop v-if="false"></InputWeightPop>
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
