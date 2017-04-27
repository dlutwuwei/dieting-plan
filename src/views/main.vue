<template>
  <div id="app" class="wrapper">
    <mt-header title="鸣鹿健康">
      <router-link to="/" slot="left">
      </router-link>
      <template v-if="userInfo.type > 1 && userInfo.type != 7">
        <router-link to="/index/myplan" slot="right">
          <mt-button>我的计划</mt-button>
        </router-link>
      </template>
    </mt-header>

    <!--s:鸣鹿轮播图-->
    <MlSwiper :ml-swiper="mlSwiper"></MlSwiper>
    <!--e:鸣鹿轮播图-->

    <template v-if="userInfo.type!=7 && userInfo.type!=15 && userInfo.type!=9">
      <!--新用户-->
      <ReduceWeight :reduce-list="reduceList"></ReduceWeight>
      <!--e:一分钟减肥方案-->
    </template>

    <template v-else>
      <!--老用户-->

      <HeatPlate :heat-plate="heatPlate" :user-type="userInfo.type" :hide-title="false"></HeatPlate>
      <!--e:能量盘-->

      <WeightCurve :weight-curve="weightCurve" ></WeightCurve>
        <!--e:体重曲线-->

      <OldUserPop></OldUserPop>
      <!--e:老用户弹窗-->
    </template>

     <!--s:瘦身分享-->
    <div class="slimming-share">
        <div class="hd"><span class="ico ico-1"></span>瘦身分享</div>
        <div class="bd">
            <a href="/share/listt" slot="right">
              <img :src="sharePic != ''? sharePic : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492449431073&di=71f9d0091acf691c3d2ef0ba00b47846&imgtype=0&src=http%3A%2F%2Fimage.tianjimedia.com%2FuploadImages%2F2013%2F248%2F1U6B8SS92G10_1000x500.jpg'" class="share-pic" alt=""/>
            </a>
        </div>
    </div>
    <!--e:瘦身分享-->

    <!--s:瘦身达人榜-->
    <DarenList :daren-list="darenList"></DarenList>
    <!--e:瘦身达人榜-->

    <BottomBar></BottomBar>
  </div>
</template>

<script>
  import "../assets/scss/common/reset.scss";
  import MlSwiper from '../components/index/mlSwiper.vue';//轮播图
  import ReduceWeight from '../components/index/reduceWeight.vue';//一分钟减肥计划
  import DarenList from '../components/index/darenList.vue';//瘦身达人榜
  import HeatPlate from '../components/index/heatPlate.vue';//能量盘
  import WeightCurve from '../components/index/weightCurve.vue';//能量盘
  import BottomBar from '../components/common/bottomBar.vue';//底部栏
  import OldUserPop from '../components/index/oldUserPop.vue';//老用户弹窗
  import { MessageBox } from 'mint-ui';
  import WxShare from '../libs/wx_share.js';

  export default {
    data() {
      return {
        selected: '1',
        msg: 'Use Vue 2.0 Today!',
        userInfo: window.userInfo || {},
        user_type: window.userInfo.type,
        sharePic: window.sharePic || '',
        reduceList: window.reduceList || [],
        darenList: window.darenList || {},
        mlSwiper: window.mlSwiper || [],
        heatPlate: window.heatPlate || [],
        weightCurve: window.weightCurveData || [],
      }
    },

    beforeCreate: function(){
        var shareData = {
            "title": '鸣鹿健康',// 分享标题
            "desc": '鸣鹿健康，减肥伙伴',// 分享描述
            "link": location.href, // 分享链接
            "img_url": 'https://a1.nicaifu.com/dora/201701/ed587c92d6f09f4_ojv93q.jpg',
        }


        var wxShare = new WxShare();
        wxShare.start(shareData);
    },

    methods: {
      startHacking() {
        this.$refs.picker.open();
      }
    },
    mounted: function() {

      //alert(shareData.link)
        if (this.user_type == 2) {
            MessageBox.confirm('继续填写减肥信息？').then(action => {
                location.href = '/prefer/prefer/foodRestrict';
            });
        } else if (this.user_type == 0) {
            MessageBox.confirm('继续填写减肥信息？').then(action => {
                location.href = '/prefer/prefer';
            });
        } else if (this.user_type == 3) {
            MessageBox.confirm('信息已经填写完成，开启减肥计划？').then(action => {
                location.href = '/buy/buy?type=1'
            });
        }

      this.$http.get('/plan/isfifteen').then(res => {
        if(res.body.success) {
          MessageBox.confirm('15天试用已经到期, 继续购买计划').then(action => {
            location.href = '/buy/buy?type=15';
          });
        }
      });
      this.$http.get('/seven/first').then(res => {
        if(res.body.success) {
          MessageBox.confirm(res.body.massages).then(action => {
            this.$http.get('/seven/last').then(res => {
              // 确认成为正式用户
            })
          });
        }
      });
    },
    components: {
      ReduceWeight,
      DarenList,
      MlSwiper,
      HeatPlate,
      WeightCurve,
      BottomBar,
      OldUserPop,
    }
  }

</script>

<style lang="scss">
    .mint-header-title{
        padding-top: 1px;
        overflow: auto;
        height: 20px;
        line-height: 20px;
    }
  .ico:before {
    content: '';
    display: inline-block;
    width: 150px;
    height: 150px;
    background: url(../assets/images/ico-03.png) no-repeat;
    background-size: 100% auto;
  }

  .ico2:before {
    content: '';
    display: inline-block;
    width: 165px;
    height: 165px;
    background: url(../assets/images/ico-02.png) no-repeat;
    background-size: 100% auto;
  }

  .wrapper {
    padding-bottom: 80px;
  }

  body {
    background: #f7f7f7;
    font-family: Helvetica, sans-serif;
    margin: 0;
    padding: 0;
  }

  .mint-header {
    background-color: #47a304;
  }

  .card {
    .card-header:before {
      content: '';
      display: inline-block;
    }
    .share {
      img {
        width: 100%;
      }
    }
  }

  #app {
    max-width: 700px;
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

  .slimming-share {
      margin-top: 15px;
      .hd {
          height: 45px;
          line-height: 45px;
          font-size: 18px;
          color: #47a304;
          background-color: #fff;
          text-align: left;
          .ico-1:before {
              background-position: 0 0;
          }
          .ico-1 {
              display: inline-block;
              width: 38px;
              height: 20px;
              margin-top: -3px;
              margin-right: 3px;
              padding-left: 17px;
              overflow: hidden;
              vertical-align: middle;
          }
      }
      .bd {
          height: 160px;
          overflow:hidden;
          .share-pic {
              width: 100%;
          }
      }
  }
</style>
