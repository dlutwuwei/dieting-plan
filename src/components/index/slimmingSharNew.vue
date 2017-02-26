<style lang="scss" scoped>
    .slimming-share{
        margin-top:15px;
        .hd{
            position:relative;
            height: 45px;
            line-height: 45px;
            font-size: 18px;
            color: #333;
            background-color: #fff;
            text-align:left;
            .ico-1:before{
                background-position:0 0 ;
            }
            .ico-1{
                display:inline-block;
                width:38px;
                height:20px;
                margin-top:-3px;
                margin-right:3px;
                padding-left:17px;
                overflow:hidden;
                vertical-align: middle;
            }
            .ico-2:before{
                background-position:-100px -25px;
            }
            .ico-2{
                position:absolute;
                right:18px;
                top:10px;
                display:inline-block;
                width:25px;
                height:25px;
                overflow:hidden;
                vertical-align: middle;
            }
        }
        .bd{
            .share{
                position:relative;
                margin-bottom:13px;
                color:#fff;
                a{
                    color:#fff;
                }
                h5{
                    position:absolute;
                    margin:0;
                    left:16px;
                    top:14px;
                    font-size:15px;
                }
            }
            .share-pic{
                width:100%;
                height:auto;
            }
        }

    }
</style>
<template>
  <div class="slimming-share">
      <div class="hd"><span class="ico ico-1"></span>瘦身分享<span class="ico ico-2"></span></div>
      <div class="bd">
          <div class="share" v-for="(item, index) in shareList">
              <a :href="item.target_url">
                  <img :src="item.image_url" class="share-pic" alt=""/>
              </a>
          </div>
      </div>
  </div>
</template>
<script>
    export default {
        props: {
            shareList: Array
        }
    }

</script>
