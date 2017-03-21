<template>
  <div style="height: 100%;">
    <mt-header title="鸣鹿健康">
      <mt-button slot="left" icon="back" @click="goback">返回</mt-button>
    </mt-header>
    <!--<HeatPlate :heat-plate="heatPlate" v-if="type=='food'"></HeatPlate>-->
    <!--<sportCard v-if="type=='sport'" :data="sportList" :date="date"></sportCard>-->
    <div v-if="type=='sport'" class="food-card">
        <div class="food-item" v-if="!+item.isdel" @click="checkFood(item,type)" :class="{'checked': +item.istrue}" v-for="(item, index) in sportList">
            <div class="food">
                <img :src="item.icon" alt="">
                <div class="food-info">
                    <div class="food-name">{{item.name}}</div>
                    <div class="food-weight">{{item.lasttime}}分钟</div>
                </div>
                <div class="food-calories">
                    {{item.kcal}}千卡
                </div>
            </div>
        </div>
    </div>
    <foodCard v-if="type=='food'" :type="index" :hideBtn="true" :title="titleMap[index]" :date="date" :data="diet" v-for="(diet, index) in foodList"
      :onItemClick="(item, type)=>{ checkFood(item, type) }"></foodCard>
  </div>
</template>
<script>
  import HeatPlate from '../components/index/heatPlate.vue';
  import foodCard from '../components/plan/food-card.vue';
  import sportCard from '../components/plan/sport-card.vue';
  import { getQuery } from '../libs/utils';
  import { MessageBox } from 'mint-ui';
  const type_map = {
    'breakfast': 1,
    'lunch': 2,
    'dinner': 3
  };
  export default {
    data() {
      return {
        foodList: {},
        sportList: [],
        heatPlate: []
      }
    },
    created() {
      this.type = this.$route.params.type;
      this.date = getQuery('date');
      this.heatPlate = window.heatPlate || [];
      this.titleMap = {
        breakfast: '早餐',
        lunch: '午餐',
        dinner: '晚餐'
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      goback: function () {
        history.back();
      },
      fetchData: function () {
        if (this.type != 'sport') {
          //早中晚 type: breakfast, lunch, dinners
          this.$http.get(`/plan/datefood/time/${this.date}`).then(res => {
            const data = res.body[this.date];
            this.foodList = {
              breakfast: data.breakfast,
              lunch: data.lunch,
              dinner: data.dinner
            }
          }, () => {
            MessageBox('注意', '请求失败');
          });
        } else {
          // 运动
          this.$http.get(`/plan/datasport/time/${this.date}`).then(res => {
            let list = [];
            if (res.body.success) {
              list = res.body.massages[this.date];
            }
            this.sportList = list;
          }, () => {
            MessageBox('注意', '请求失败');
          });
        }
      },
      checkFood: function (item, type) {
        if (+item.istrue) {
          //MessageBox('提示', '已经确认完成，无法修改')
          return;
        } else if (+item.isdel) {
          //MessageBox('提示', '已经从计划中删除')
          return;
        }
        MessageBox.confirm('确认完成此项计划?').then(action => {
          if (type != 'sport') {
            this.$http.post('/Plan/istruefood', {
              id: item.id,
              time: this.date,
              food: type_map[type]
            }).then(res => {
              if (res.body.success) {
                item.istrue = 1;
              } else {
                MessageBox('注意', '确认失败');
              }
            });
          } else {
            this.$http.post('/Plan/istruesport', {
              id: item.id,
              time: this.date,
            }).then(res => {
              if (res.body.success) {
                item.istrue = 1;
              } else {
                MessageBox('注意', '确认失败');
              }
            });
          }
        });
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    components: {
      HeatPlate,
      foodCard,
      sportCard
    }
  };

</script>