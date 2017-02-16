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
    <card class="card">
      <div slot="header" class="card-header">
        <span class="title">瘦身分享</span>
      </div>
      <div class="share">
        <img src="../assets/images/share1.png" alt="">
      </div>
      <div class="share">
        <img src="../assets/images/share2.png" alt="">
      </div>
    </card>
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
    <card class="card">
      <div slot="header" class="card-header">
        <span class="title">一分钟定制减肥计划</span>
      </div>
      <div v-for="n in 6" class="plan-item">
        <div class="icon">
          <img src="" alt="">
        </div>
        <div class="content">
          <span class="title">保守型</span>
          <span class="description">icon 是图片</span>
        </div>
      </div>
    </card>
    <mt-datetime-picker ref="picker" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
  </div>
</template>

<script>
  import card from '../components/card.vue';

  export default {
    data() {
      return {
        selected: '1',
        msg: 'Use Vue 2.0 Today!'
      }
    },

    methods: {
      startHacking() {
        this.$refs.picker.open();
      }
    },
    
    components: {
      card,
    }
  }

</script>

<style lang="scss">
  body {
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