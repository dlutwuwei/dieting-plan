<style lang="scss" scoped>
    .ncf-box{display: box;display: -webkit-box;-webkit-box-align:center;box-align:center;text-align: center;-webkit-box-pack:justify;box-pack:justify;}
    .ncf-box .item{box-flex: 1;-webkit-box-flex: 1;display:block;}
    .nav-tap{position:fixed;bottom:0;left:0;right:0;background:#fff;padding:6px 0px 6px 0px;font-size:12px;z-index:9999;border-top:1px solid #dfdfdf;}
    .nav-tap{
        a{
            span{
                display:block;
            }
            .ico{
                width:23px;
                height:23px;
                margin:0 auto;
                overflow:hidden;
            }
            .curr{
                color:#47a304;
            }
        }
    }
    .page-index{
        .ico:before{
            background-position:0 -25px;
        }
        .curr:before{
            background-position:0 -50px;
        }
    }
    .page-service{
        .ico:before{
            background-position:-25px -25px;
        }
        .curr:before{
            background-position:-25px -50px;
        }
    }
    .page-shopping{
        .ico:before{
            background-position:-50px -25px;
        }
        .curr:before{
            background-position:-50px -50px;
        }
    }
    .page-ucenter{
        .ico:before{
            background-position:-75px -25px;
        }
        .curr:before{
            background-position:-75px -50px;
        }
    }
</style>

<template>
    <div class="nav-tap">
        <div class="ncf-box">
            <a class="item page-index">
                <span class="ico curr"></span>
                <span class="curr">首页</span>
            </a>
            <a class="item page-service">
                <span class="ico"></span>
                <span>服务</span>
            </a>
            <a class="item page-shopping">
                <span class="ico"></span>
                <span>购物车</span>
            </a>
            <a class="item page-ucenter"">
                <span class="ico"></span>
                <span>我的</span>
            </a>
        </div>
    </div>
</template>

<script>

    let barList = [
        {title: '首页', href: '/index/home', name: 'home'},
        {title: '理财', href: '/index/licai', name: 'licai'},
        {title: '基金', href: '/fund/index_v3', name: 'fund'},
        {title: '我的', href: '/ucenter', name: 'ucenter'},
    ];

    module.exports = {
        data(){
        return {
        }
    },
    methods:{
        redDottedHander(index){

        }
    }
    }
</script>
