<style lang="scss" scoped>
    .reduce-weight{
        margin-top:15px;
        .hd{
            height: 45px;
            padding-left:24px;
            line-height: 45px;
            font-size: 18px;
            color: #333;
            background-color: #fff;
            text-align:left;
            .ico-1:before{
                background-position: -75px 0 ;
            }
            .ico-1{
                display:inline-block;
                width:42px;
                height:25px;
                margin-top:-3px;
                margin-right:3px;
                padding-left:17px;
                overflow:hidden;
                vertical-align: middle;
            }
        }
        .bd{
            .reduce-style{
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
                    span{
                        display: inline-block;
                        width:51px;
                        height:51px;
                        overflow:hidden;
                    }
                }
                div:last-child {
                     width: 80%;
                     overflow: hidden;
                    span {
                        display: block;
                        font-size: 17px;
                        color: #333;
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
                 }
                 div[plan-id="1"]{
                    .ico2:before{
                        background-position: 0 0 ;
                    }
                }
                div[plan-id="2"]{
                    .ico2:before{
                        background-position: -55px 0 ;
                    }
                }
                div[plan-id="3"]{
                    .ico2:before{
                        background-position: -110px 0 ;
                    }
                }
                div[plan-id="4"]{
                    .ico2:before{
                        background-position: 0 -55px;
                    }
                }
            }
            .reduce-style:after {
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
  <div class="reduce-weight">
      <div class="hd">一分钟定制减肥方案</div>
      <div class="bd">
          <div class="reduce-style" @click="redirect(item.plan_id)" v-for="(item, index) in reduceList">
              <div :plan-id="item.plan_id"><span class="ico2"></span></div>
              <div>
                  <span>{{item.plan_name}}</span>
                  <em v-if="+item.jin == 5">{{item.day}}天掉{{item.jin}}斤肉，健康减肥，贵在坚持！</em>
                  <em v-if="+item.jin == 7">{{item.day}}天掉{{item.jin}}斤肉，合理速度，努力实现！</em>
                  <em v-if="+item.jin == 8">{{item.day}}天掉{{item.jin}}斤肉，我信我能，毅力致胜！</em>
                  <em v-if="+item.jin == 10">{{item.day}}天掉{{item.jin}}斤肉，坚信我行，信心满满！</em>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
    export default {
        props: {
            reduceList: Array
        },
        methods:{
            redirect(id) {
                location.href = `/detail/input/${id}`;
            },
        },
    }

</script>
