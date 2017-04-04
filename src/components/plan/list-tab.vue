
<template>
  <div class="plan-list">
      <div class="tab-hd">
          <span :class="['hd-item', {'curr': type == 'food' }]" v-on:click.stop="tab(0)">饮食</span>
          <span :class="['hd-item', {'curr': type == 'sport' }]" v-on:click.stop="tab(1)">运动</span>
      </div>
      <div class="bd">
          <div class="list-content" :class="{'active': type=='food'}">
              <div v-if="planList.food.length" class="list-item" v-for="(item, index) in planList.food">
                <router-link :to="'/detail/food?date=' + i" slot="left" v-for="(t, i) in item">
                    <div class="date">{{i}}</div>
                    <div>食物：{{t.count}}种</div>
                    <div>摄入：{{t.kcal}}千卡</div>
                </router-link>
              </div>
          </div>
          <div class="list-content" :class="{'active': type=='sport'}" v-if="planList.sport.length">
              <div class="list-item" v-for="(item, index) in planList.sport">
                <router-link :to="'/detail/sport?date=' + index" slot="left">
                      <div class="date">{{index}}</div>
                      <div>运动时长：{{item.lasttime}}分钟</div>
                      <div>运动消耗：{{item.kcal}}千卡</div>
                </router-link>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
    import { getQuery } from '../../libs/utils';
    export default {
        created() {
            this.type = getQuery('type');
            this.planList = {
                food: window.foodPlan,
                sport: window.sportPlan
            }
        },
        data() {
            return {
                isTrue: true,
            }
        },
        props: ['darenList'],
        methods:{
            tab: function(index){

                var darenList = document.querySelectorAll('.list-content');
                var navTabsA = document.querySelectorAll('.tab-hd span');
                for(var i = 0; i<darenList.length; i++){
                    darenList[i].style.display='none';
                    navTabsA[i].className='';
                }
                darenList[index].style.display='block';
                navTabsA[index].className='curr';
            }
        },
    }

</script>
<style lang="scss">
    body {
        background: #f7f7f7;
    }
    .plan-list{
        margin-top: 10px;
        background-color: #fff;
        padding: 0 18px;
        .tab-hd {
            font-size: 0;
            text-align: center;
            padding-top: 12px;
            &:after {
                content: '';
                margin-top: 8px;
                display: block;
                height: 1px;
                background: #dfdfdf;
                transform-origin: 0;
                transform: scaleY(0.5);
            }
            span{
                display: inline-block;
                width: 110px;
                height: 40px;
                border: 1px solid #f2901e;
                line-height: 40px;
                text-align: center;
                font-size: 18px;
            }
            .curr{
                background-color: #f2901e;
                color: #fff;
            }
        }
        .list-content {
            &.active {
                display: block;
            }
            display: none;
            .list-item {
                &:after {
                    content: '';
                    margin-top: 8px;
                    display: block;
                    height: 1px;
                    background: #dfdfdf;
                    transform-origin: 0;
                    transform: scaleY(0.5);
                }
                .date {
                    color: #f2901e;
                    font-size: 15px;
                    line-height: 45px;
                }
            }
        }

    }
</style>
