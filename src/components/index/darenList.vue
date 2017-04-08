<style lang="scss" scoped>

    .daren-list{
        margin-top:15px;
        .hd{
            height: 45px;
            line-height: 45px;
            font-size: 18px;
            color: #333;
            background-color: #fff;
            text-align:left;
            .ico-1:before{
                background-position: -100px 0 ;
            }
            .ico-1{
                display:inline-block;
                width:40px;
                height:25px;
                margin-top:-3px;
                margin-right:3px;
                padding-left:17px;
                overflow:hidden;
                vertical-align: middle;
            }
        }
        .tab-hd{
            background:#f0ffdd;
            border-bottom:1px solid #dbe729;
            display: box;
            display: -webkit-box;
            -webkit-box-align: center;
            box-align: center;
            text-align: center;
            -webkit-box-pack: justify;
            box-pack: justify;
            span{
                box-flex: 1;
                -webkit-box-flex: 1;
                display: block;
                height:39px;
                line-height:39px;
                width:33.3%;
                font-size:17px;
                color:#47a304;
                text-align:center;
            }
            .curr{
                background:#47a304;
                color:#fff;
            }
        }
        .bd{
            .daren{
                display:none;
            }
            .daren-cen{
                background-color: #fff;
                font-size: 0;
                padding: 5% 0 5% 3.8%;
                position: relative;
                div {
                    display: inline-block;
                    font-size: 14px;
                    vertical-align: top;
                }
                div:first-child {
                    width: 20%;
                    text-align:center;
                    font-size: 36px;
                    font-style: italic;
                    font-weight:100;
                    color:#47a304;
                }
                div:first-child.red{
                    color:#fe520f;
                }
                div:last-child {
                     width: 80%;
                     overflow: hidden;
                    color:#666;
                    span {
                        display: block;
                        font-size: 15px;
                        line-height: 1.3;
                        padding-right: 16px;
                        overflow: hidden;
                        word-break: keep-all;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    em {
                        font-size:15px;
                        color: #666;
                        line-height: 1.3;
                        padding: 6px 16px 6px 0;
                        display: block;
                        overflow: hidden;
                        word-break: keep-all;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-style: normal;
                    }
                    strong{
                        font-weight:100;
                        color:#f2901e;
                    }
                 }
            }
            .daren-cen:after {
                content: " ";
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 1px;
                background-color: #e6e6e6;
                -webkit-transform-origin: 0 0;
                -ms-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scaleY(0.5);
                -ms-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }
        }
    }
</style>
<template>
  <div class="daren-list" v-if="darenShow && darenList.month && darenList.month.length > 0">
      <div class="hd"><span class="ico ico-1"></span>瘦身达人榜</div>
      <div class="tab-hd">
          <span class="curr" v-on:click.stop="tab(0)">本月排行</span>
          <span v-on:click.stop="tab(1)" v-if="userInfo.type != 0">总排行</span>
      </div>
      <div class="bd">
          <div class="daren" style="display:block" v-if="darenList && darenList.month && darenList.month.length > 0">
              <div class="daren-cen" v-for="(item, index) in darenList.month">
                  <div :class="index==0?'red':''">0{{index+1}}</div>
                  <div>
                      <span><strong>{{item.user_name}}</strong>最新体重：{{item.weight}}KG</span>
                      <em>已减肥{{item.duration}}天 本月减肥 <strong>{{item.lose_weight}}</strong>KG</em>
                  </div>
              </div>
          </div>
          <div class="daren"  v-if="userInfo.type != 0 && darenList && darenList.mine && darenList.mine.length > 0">
              <div class="daren-cen" v-for="(item, index) in darenList.mine">
                  <div :class="index==0?'red':''">0{{index+1}}</div>
                  <div>
                      <span><strong>{{item.user_name}}</strong>最新体重：{{item.weight}}KG</span>
                      <em>已减肥{{item.duration}}天 本月减肥 <strong>{{item.lose_weight}}</strong>KG</em>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                isTrue: true,
                userInfo: window.userInfo,
                darenShow: true,
            }
        },
        props: ['darenList'],
        methods:{
            tab: function(index){

                var darenList = document.querySelectorAll('.daren');
                var navTabsA = document.querySelectorAll('.tab-hd span');
                for(var i = 0; i<darenList.length; i++){
                    darenList[i].style.display='none';
                    navTabsA[i].className='';
                }
                darenList[index].style.display='block';
                navTabsA[index].className='curr';
            }
        },
        mounted() {
            // init data
            if(!this.darenList){
                this.darenShow = false;
            }
        }
    }

</script>
