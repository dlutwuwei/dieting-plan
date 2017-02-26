<style lang="scss" scoped>
    .slimming-share{
        margin-top:15px;
        .hd{
            height: 45px;
            line-height: 45px;
            font-size: 18px;
            color: #47a304;
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
                    top:159px;
                    overflow:hidden;
                    div:first-child{
                        float:left;
                        display:inline;
                        img{
                            display:inline-block;
                            width:45px;
                            height:45px;
                            margin-left:3px;
                            border-radius:999px;
                            border:1px solid #fff;
                        }
                        p{
                            position:relative;
                            margin:-10px 0 0;
                            width:50px;
                            background:#e3c8a5;
                            border-radius:4px;
                            overflow: hidden;
                            word-break: keep-all;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            text-align:center;
                            z-index:1;
                        }
                    }
                    div:last-child{
                        float:left;
                        display:inline;
                        margin:10px 0 0 10px;
                        font-size:12px;
                        line-height:1.3;
                    }

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
      <div class="hd"><span class="ico ico-1"></span>瘦身分享</div>
      <div class="bd">
          <div class="share" v-for="(item, index) in shareList">
              <a :href="item.target_url">
                  <img :src="item.image_url" class="share-pic" alt=""/>
                  <h5>{{item.title}}</h5>
                  <div class="share-info">
                      {{item.publish_time}}<span class="ico ico-follow"></span>{{item.like_num}}<span class="ico ico-flower"></span>{{item.comment_num}}
                  </div>
                  <div class="author-info">
                      <div>
                          <img :src="item.author.avatar_url" alt=""/>
                          <p>{{item.author.name}}</p>
                      </div>
                      <div>
                          {{item.author.description}}
                      </div>
                  </div>
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
