<template>
    <div class="share-wapper">
        <div class="share-hd">
            <router-link to="/" slot="left">
                <div class="go-back ico"></div>
            </router-link>
            <span>写分享</span>
            <em>发布</em>
        </div>

        <div class="share-editor-cen">
            <mt-field label="标题" placeholder=""></mt-field>
            <div class="upload-pic input-box">
                <div class="img-btn">
                    <a href="javascript:;" @click="uploadIdCard">+</a>
                    <input type="file" id="upfile" name="upfile" style="display:none">
                    <!--<input type="hidden" name="cat" value="idcard" />-->
                </div>
                <h5>封面</h5>
                <p>(用美美的图片做封面会受到更多人喜欢哦~)</p>
                <div class="sample id-no-uploaded"><img src="../assets/images/upload-btn.png" alt="身份证样例"><span class="sample-tips">请选择5M以下图片上传！</span></div>
            </div>
            <div class="editor-text input-box">
                <h5>正文 <span>(文字和图片都可以)</span></h5>
            </div>
        </div>
    </div>
</template>
<script>

    import $ from 'webpack-zepto';
    export default {
        name: 'page-navbar',
        data() {
            return {

            }
        },
        components: {

        },
        methods: {
            uploadFile(data, callback) {
                $.ajax({
                    url: '/viewpoint/up_img_base64',
                    type: 'POST',
                    data: data,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        callback(null, JSON.parse(result));
                    },
                    error: function (error) {
                        alert('网络链接失败，请稍后重试');
                        callback(error);
                    }
                });
            },
            //上传身份证
            uploadIdCard(ev) {
                var self = this;
                $('.img-btn').on('click', 'a', function () {
                    if(!$(this).hasClass('prohibit')){
                        $('#upfile').click();
                    }
                })

                $('#upfile').on('change', function () {
                    self.uploadImage('upfile');
                });
            },
            uploadImage(id) {
                var self = this;
                var data = new FormData();
                var files = $('#' + id)[0].files;
                if (!files) {
                    alert('图片不存在');
                    return;
                }
                let img = files[0];
                if (!img) {
                    alert('图片不存在');
                    return;
                }

                var imgReg = new RegExp('png|gif|jpg|jpeg');
                if (img.size / 1024 > 5000) {
                    alert('图片过大，请选择5M以下图片重新上传！');
                    return;
                }

                data.append("upfile", img);
                data.append("cat", "idcard");//增加图片压缩

                this.uploadFile(data, function (error, result) {
                    if (!error) {
                        self.id_card_img =  result.url;//获取图片地址
                        document.querySelector('.sample').removeClass('id-no-uploaded');
                        $('.sample').find('img').attr('src', result.url);
                    }
                })
            }
        },
    };
</script>
<style lang="scss">
    .input-box{
        margin-top:10px;
        background:#fff;
        border:1px solid #cccccc;
    }
    .share-hd{
        background:#fff;
        border-bottom:1px solid #cccccc;
        text-align:center;
        span{
            font-size:15px;
            color:#333;
        }
        em{
            position:absolute;
            right: 18px;
            top: 12x;
            font-style:normal;
            fobt-size:14px;
            color:#333;
        }
    }
    .share-editor-cen{
        padding: 10px 18px 0;
        .mint-cell-wrapper{
            border:1px solid #ccc;
        }
        .mint-field .mint-cell-title{
            width:50px;
        }
        .mint-cell-text{
            font-size: 18px;
            color: #999;
        }
        .upload-pic{
            padding:19px 8px 24px;
            overflow:hidden;
            h5{
                font-size:18px;
                color:#999;
            }
            p{
                font-size:12px;
                color:#999;
            }
            .img-btn{
                float:right;
                a{
                    display:block;
                    width:80px;
                    height:80px;
                    font-size:0px;
                    background: url(../assets/images/upload-btn.png) no-repeat;
                    background-size: 100% auto;

                }
            }
        }
        .editor-text{
            padding:19px 8px 24px;
            min-height:200px;
            h5{
                font-size:18px;
                color:#999;
                span{
                    font-size:12px;
                }
            }
        }
        .sample{
            display:block;
        }
        .sample-tips{
            display:block;
            font-size:12px;
        }
    }

</style>
