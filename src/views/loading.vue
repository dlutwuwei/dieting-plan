<template>
    <div class="page-swipe">
        <mt-swipe :auto="0">
            <mt-swipe-item>
                <div class="swipe-bd">
                        <h5>量子检测+营养均衡+热量控制+合理运动</h5>
                        <router-link to="/loadingInfo"><p>详情</p></router-link>
                    <div>
                        <img src="/Public/render/img/loading-1.png" style="width:6.1rem;height:6.36rem"  alt=""/>
                    </div>
                </div>
            </mt-swipe-item>
            <mt-swipe-item>
                <div class="swipe-bd">
                        <h5>动态计划，专业指导，天天减重</h5>
                    <div style="padding-top:45px;">
                        <img src="/Public/render/img/loading-2.png"  alt=""/>
                    </div>
                </div>
            </mt-swipe-item>
            <mt-swipe-item>
                <div class="swipe-bd">
                        <h5>营养均衡</h5>
                        <h5>减脂不减健康</h5>
                    <div>
                        <img src="/Public/render/img/loading-3.png"  alt=""/>
                    </div>
                </div>
            </mt-swipe-item>
            <mt-swipe-item>
                <div class="swipe-bd">
                        <h5>专业检测+90食物限制+食物偏好优先权</h5>
                        <h5>吃您想吃的，补您该补的</h5>
                    <div>
                        <img src="/Public/render/img/loading-4.png"  alt=""/>
                    </div>
                </div>
            </mt-swipe-item>
            <mt-swipe-item>
                <div class="swipe-bd">
                    <div>
                        <img src="/Public/render/img/loading-5.png"  alt=""/>
                    </div>
                    <a href="/">
                        <span class="immediate-experience">立即体验</span>
                    </a>
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    import "../assets/scss/common/reset.scss";
    require('../libs/flexible.js');
</script>
<style lang="scss">
    .page-swipe{
        height:12rem;
        .swipe-bd{
            padding: 10px;
            text-align:center;
            h5{
                padding-bottom:.2rem;
                font-size:.28rem;
                font-weight:100;
                color:#333;
            }
            p{
                font-size:.28rem;
                color:#0154fe;
                text-decoration:underline;
            }
            div{
                padding-top:.6rem;
                img{
                    width:100%;
                    height:auto;
                }
            }
            .immediate-experience{
                display:block;
                width:180px;
                height:40px;
                border:1px solid #47a304;
                border-radius:5px;
                font-size:.36rem;
                color:#47a304;
                line-height:40px;
            }
        }
        .mint-swipe-indicator{
            background:#dedede;
            opacity: 0.9;
        }
        .mint-swipe-indicator.is-active{
            background:#47a304;
            opacity: 0.9;
        }
        .mint-swipe-indicators{
            bottom:2.5rem;
        }
    }
   /* @media screen and (min-width:320px) {
        .page-swipe{
            height:568px;
            .swipe-bd{
                h5{
                    padding-bottom:10px;
                    font-size:16px;
                }
                p{
                    padding-bottom:10px;
                    font-size:14px;
                }
                .immediate-experience{
                    width:150px;
                    height:30px;
                    margin:18% auto 0;
                    font-size:16px;
                    line-height:30px;
                }
            }
            .mint-swipe-indicators{
                bottom:12%;
            }
        }
    }
    @media screen and (min-width:375px) {
        .page-swipe{
            height:667px;
            .swipe-bd{
                .immediate-experience{
                    width:180px;
                    height:40px;
                    margin:30% auto 0;
                    font-size:18px;
                    line-height:40px;
                }
            }
        }
    }
    @media screen and (min-width:414px) {
        .page-swipe{
            height:736px;
        }
    }*/
</style>
