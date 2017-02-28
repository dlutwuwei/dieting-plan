<template>
  <div>
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
<style lang="scss" scoped>
   
    .input-weight-pop{
        width:100%;
        padding: 0 35px;
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
