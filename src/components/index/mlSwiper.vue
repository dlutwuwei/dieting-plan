<style lang="scss" scoped>
    .page-swipe{
        height:101px;
       a{
           display:block;
           img{
               width:100%;
               height:101px;
           }
       }
        .mint-swipe-indicator{
            background:#fff!important;
        }
        .mint-swipe-indicator.is-active{
            background:#fe970e!important;
        }
    }

</style>
<template>
    <div class="page-swipe">
        <mt-swipe :auto="4000">
            <template v-for="(item, index) in mlSwiper">
                <mt-swipe-item><a :href="item.target_url"><img :src="item.image_url" alt=""/></a></mt-swipe-item>
            </template>
        </mt-swipe>
    </div>
</template>

<script type="text/javascript">

    module.exports = {
        data(){
        return {
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
    }
</script>
