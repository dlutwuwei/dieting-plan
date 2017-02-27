
<template>
  <div class="plan-list">
      <div class="tab-hd">
          <span class="hd-item curr" v-on:click.stop="tab(0)">本月排行</span>
          <span class="hd-item" v-on:click.stop="tab(1)">我的排行</span>
      </div>
      <div class="bd">
          <div class="list-content" style="display:block">
              <div class="list-item" v-for="(item, index) in planList.food">
                <router-link to="/plan/detail" slot="left">
                    <div class="date">{{item.date}}</div>
                    <div>食物：{{item.food_count}}种</div>
                    <div>摄入：{{item.input}}千卡</div>
                </router-link>
              </div>
          </div>
          <div class="list-content">
              <div class="list-item" v-for="(item, index) in planList.sport">
                <router-link to="/plan/detail" slot="left">
                      <div class="date">{{item.date}}</div>
                      <div>运动时长：{{item.duration}}分钟</div>
                      <div>运动消耗：{{item.consume}}千卡</div>
                </router-link>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
    export default {
        created() {
            this.planList = window.planList;
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
