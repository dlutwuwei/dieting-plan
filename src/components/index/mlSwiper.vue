<style lang="scss" scoped>
    /*S-首页的banner特有效果*/
    #swiper-home_item_0  .bd li  img {
        -webkit-animation: scaleFrame 2s;
        transition: all 2s linear;
        -webkit-transition: all 2s linear;
        height:2.8rem;
    }

    @-webkit-keyframes scaleFrame {
        0% {
            -webkit-transform: scale(1.04);
        }

        100% {
            -webkit-transform: scale(1);
        }
    }
    /*E-首页的banner特有效果*/
    .swiper {
        position: relative;
        .bd {
            li{
                max-height:100px;
                list-style:none;
                overflow: hidden;
            }
            img{
                width:100%;
            }
        }
        .index_focus_btn{
            width:100%;
            position:absolute;
            top:75px;
            text-align:center;
            z-index:10;
            .swiper-pagination-bullet-active{
                background:#fe950f;
            }
        }
    }
    .swiper-pagination-clickable .swiper-pagination-bullet{
        margin:0 2px;
        background:#fff;
    }
</style>
<template>
    <div class="swiper" :id="'swiper-' + name">
        <div class="bd swiper-container">
            <ul class="bd swiper-wrapper">
                <li v-for="item in mlSwiper" class="bd swiper-slide">
                    <a :data-url="item.target_url"><img :src="item.image_url"/></a>
                </li>
            </ul>
        </div>
        <p class="index_focus_btn"></p>
    </div>
</template>

<script type="text/javascript">

    import Swiper from "swiper"
    import "Swiper/dist/css/swiper.css";
    module.exports = {
        data(){
        return {
            name: this.id || Math.random().toString().split('.')[1]
        }
    },

    props: {
        mlSwiper: Array //这样可以指定传入的类型，如果类型不对，会警告
    },

    methods:{
        swiper(){
            let options = Object.assign({}, {
                autoplay:4000,
                loop:true,
                calculateHeight:true,//Swiper height auto resize
                grabCursor: true,
                paginationClickable: true,
                autoplayDisableOnInteraction : false,
                pagination : '.index_focus_btn'
            }, this.options);

            new Swiper('#swiper-'+this.name+' .bd.swiper-container', options);
        }
    },
    mounted(){

        if(mlSwiper && mlSwiper.length > 1){
            this.swiper()
        }
    }
    }
</script>
