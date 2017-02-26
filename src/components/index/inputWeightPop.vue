<style lang="scss" scoped>
    .isHide{
        display:none;
    }
    .mask{
        position:fixed;
        width:100%;
        height:100%;
        left:0px;
        top:0px;
        right:0px;
        bottom:0px;
        background:#333;
        filter:alpha(opacity=80);
        opacity:0.8;
        z-index:10000;
    }
    .input-weight-pop{
        position:fixed;
        top:180px;
        width:100%;
        padding: 0 35px;
        z-index:10002;
        text-align:center;
        .cen{
            background:#fff;
            border-radius:4px 4px 0px 0px;
        }
        .hd{
            height:57px;
            line-height:57px;
            border-bottom:1px solid #dfdfdf;
        }
        .bd{
            padding:45px 0;
            .weight{
                position:relative;
                color:#47a304;
                em{
                    font-size:36px;
                }
                span{
                    position:absolute;
                    top: 0px;
                    font-size: 15px;
                    margin-left: 10px;
                }
            }
        }
        .bot{
            height:50px;
            background:#47a304;
            line-height:50px;
            color:#fff;
            span{
                display:inline-block;
                wdith:50%;
            }
        }
    }
</style>
<template>
  <div class="isHide">
      <div class="input-weight-pop">
          <div class="cen">
              <div class="hd">今天</div>
              <div class="bd">
                  <div class="weight"><em id="value">55.4</em> <span>kg</span></div>
                  <div class="calipers"><input id="range" type="range" min="0" max="50000" value="5" step="10"></div>
              </div>
              <div class="bot"><span>取消</span><span>保存</span></div>
          </div>
      </div>
      <div class="mask"></div>
  </div>
</template>
<script>

    export default {

    }

</script>
