<template>
    <div class="plan">
      <mt-header title="15天饮食计划">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right">直接购买</mt-button>
      </mt-header>
      <div class="plan-card food">
          <a href="/plan/listt?type=food"><span>饮食计划</span></a> 
      </div>
      <div class="plan-card sport">
          <a href="/plan/listt?type=sports"><span>运动计划</span></a>
      </div>
    </div>
</template>
<script>
    export default {
        components: {
        }
    };
</script>
<style lang="scss">
  .plan {
    .plan-card {
      display: block;
      margin-top: 5px;
      background-size: contain;
      background-repeat: no-repeat;
      height: 220px;
      text-align: center;
      span {
        line-height: 220px;
        text-align: center;
        font-size: 18px;
        color: #fff;
      }
    }
    .food {
      background-image: url('../assets/images/food.png');
      background-size: cover;
    }
    .sport {
      background-image: url('../assets/images/sports.png');
      background-size: cover;
    }
  }
</style>
