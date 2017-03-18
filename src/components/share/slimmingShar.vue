<style lang="scss">
    .slimming-share{

        .share{
            position:relative;
            margin-bottom:10px;
            color:#fff;
            max-height:162px;
            background:#f5f5f5;
            overflow:hidden;
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
            .share-info{
                position:absolute;
                left:16px;
                top:40px;
                font-size:12px;
                .ico{
                    margin-top:-3px;
                    margin-right:3px;
                    vertical-align:middle;
                    display:inline-block;
                    overflow:hidden;
                }
                .ico-follow{
                    width:12px;
                    height:12px;
                    margin-left:17px;
                    overflow:hidden;
                }
                .ico-follow:before{
                    background-position:-25px 0;
                }
                .ico-flower{
                    width:15px;
                    height:13px;
                    margin-left:12px;
                    overflow:hidden;
                }
                .ico-flower:before{
                    background-position:-50px 0;
                }
            }
            .author-info{
                position:absolute;
                left:20px;
                bottom:15px;
                overflow:hidden;
                img{
                    display:inline-block;
                    width:45px;
                    height:45px;
                    margin-left:3px;
                    border-radius:999px;
                    border:1px solid #fff;
                    vertical-align:middle;
                }
                p{
                    display:inline-block;
                    margin-left:10px;
                    font-size:12px;
                    vertical-align:middle;
                }
            }
        }
        .share-pic{
            width:100%;
            height:160px;
        }

    }
</style>
<template>
  <div class="slimming-share">
      <div class="share" v-for="(item, index) in shareList">
              <router-link :to="'/share/detail?cid='+ item.id" slot="left">
                  <img :src="item.titlepic" class="share-pic" alt=""/>
                  <h5>{{item.title}}</h5>
                  <div class="share-info">
                      {{item.time}}<span class="ico ico-follow"></span>{{item.click}}<span class="ico ico-flower"></span>{{item.laud}}
                  </div>
                 <div class="author-info">
                      <!--<img :src="item.author.avatar_url" alt=""/>-->
                      <p>{{item.content}}</p>
                  </div>
              </router-link>
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
