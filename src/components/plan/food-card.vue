<template>
  <div class="food-card">
    <div class="food-title">
      {{title}}<span>（建议摄入{{total}}千卡）</span>
    </div>
    <div class="food-item" v-if="!+item.isdel" :class="{'checked': +item.istrue}" @click="onItemClick(item, type)" v-for="item in data">
      <img :src="item.icon" alt="">
      <div class="food-info">
        <div class="food-name">{{item.name}}</div>
        <div class="food-weight">{{item.weight}}克</div>
      </div>
      <div class="food-calories">
        {{item.kcal}}千卡
      </div>
    </div>
    <div class="cell bottom" v-if="!hideBtn && from != 'history'">
      <router-link :to="url" slot="left">
        <mt-button type="primary" size="normal">微调食谱</mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import { getQuery } from '../../libs/utils';
  export default {
    data() {
      return {
        total: 0,
        url: '',
      }
    },
    mounted() {
      this.url = '/diet/' + this.type +'?date=' + getQuery('date');
      this.total = this.data.pop().bkcal;
    },
    props: {
      data: Array,
      title: String,
      calories: String,
      type: String,
      date: String,
      onItemClick: {
        type: Function,
        default: () => {}
      },
      hideBtn: Boolean,
      from:String,
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

  .food-card {
    overflow: hidden;
    margin-top: 5px;
    background: #fff;
    padding: 0 26px;
    .food-title {
      line-height: 45px;
      font-size: 15px;
      span {
        font-size: 12px;
      }
      border-bottom: 1px solid #dfdfdf;
    }
    .food-item {
      height: 46px;
      border-bottom: 1px solid #dfdfdf;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        height: 30px;
        width: 30px;
        margin: 5px;
      }
      .food-info {
        flex: 1;
        line-height: 18px;
        margin-left: 10px;
        .food-name {
          font-size: 15px;
        }
        .food-weight {
          font-size: 9px;
          color: #999;
        }
      }
      .food-calories {
        text-align: right;
        font-size: 9px;
        line-height: 45px;
        color: #999;
      }
    }
  }
</style>
