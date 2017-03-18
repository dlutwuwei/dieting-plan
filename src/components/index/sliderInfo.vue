<style lang="scss">
    .slider-info{
        background:#f7f7f7;
        .banner{
            max-height:175px;
            overflow:hidden;
            img{
                width:100%;
                height:120px;
            }
        }
        .info{
            background:#fff;
            margin-top:10px;
            padding:15px;
            line-height:1.5;
           p{
               padding-bottom:25px;
               font-size:13px;
               color:#333;
           }
        }
    }
    .no-data{
        font-size:28px;
        text-align:center;
        padding-top:50px;
    }
</style>
<template>
  <div class="slider-info">
      <template v-if="sliderInfo">
          <div class="banner"><img :src="sliderInfo.titlepic" alt=""/></div>
          <div class="info" v-html="sliderInfo.content"></div>
      </template>
      <div class="no-data" v-else><p>404</p><p>页面找不到了</p></div>
  </div>
</template>
<script>
    import { getQuery } from '../../libs/utils';
    import { MessageBox } from 'mint-ui';

    export default {
        data() {
            return {
                sliderInfo: {},
            }
        },
        created() {
            this.cid = getQuery('cid');

        },
        methods: {
            goback: function () {
                history.back();
            },
            getSliderInfo: function(){
                this.$http.get(`/share/news?cid=${this.cid}`).then(res => {
                    if(res.body.success){
                        this.sliderInfo = res.body.massages[0];
                    } else {
                        this.sliderInfo = '';
                    }
                    console.log(this.sliderInfo)
                },() => {
                    MessageBox('注意', '请求失败');
                });
            }
        },
        mounted(){
            this.getSliderInfo();
        }
    }
</script>
