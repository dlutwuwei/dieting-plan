<template>
  <div class="sport-card">
    <div class="sport-item" v-for="item in data">
      <div class="sport-info">
        <div class="sport-name">运动项目：{{item.name}}<img src="../../assets/images/jianfei/apple.jpg" alt=""></div>
        <div class="sport-weight">运动时长：{{item.time}}分钟</div>
        <div class="sport-weight">运动消耗：{{item.kcal}}千卡</div>
      </div>
    </div>
    <div class="cell bottom">
      <router-link :to="'/plan/diet/sport?date='+date" slot="left">
        <mt-button type="primary" size="normal">记录运动</mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
    },
    props: {
      date: String,
      data: Array,
      title: String,
      calories: String
    },
  }

</script>
<style lang="scss">
  body {
    background: #f7f7f7;
  }
  
  .cell {
    text-align: center;
    margin: 20px 0;
  }
  
  .sport-card {
    overflow: hidden;
    margin-top: 5px;
    background: #fff;
    padding: 0 26px;
    .sport-item {
      border-bottom: 1px solid #dfdfdf;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        height: 30px;
        width: 30px;
        margin: 5px;
      }
      .sport-info {
        flex: 1;
        line-height: 30px;
        margin-left: 10px;
        font-size: 16px;
        margin-bottom: 16px;
      }
    }
  }
</style>