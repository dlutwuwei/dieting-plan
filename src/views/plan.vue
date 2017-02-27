<template>
    <div class="plan">
      <mt-header title="15天饮食计划">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right">直接购买</mt-button>
      </mt-header>
      <dvi class="plan-card food">
        <span>饮食计划</span>
      </dvi>
      <div class="plan-card sport">
        <span>运动计划</span>
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
      color: #fff;
      span {
        line-height: 220px;
        text-align: center;
      }
    }
    .food {
      background-image: url('../assets/images/share1.png');
    }
    .sport {
      background-image: url('../assets/images/share2.png');
    }
  }
</style>