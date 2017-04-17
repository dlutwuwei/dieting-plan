<template>
    <div class="share-wapper">
        <div class="share-hd">
            <div class="go-back ico" slot="left" @click="goback"></div>
            <span>写分享</span>
            <em v-if="" @click="releaseShare">发布</em>
        </div>

        <div class="share-editor-cen">
            <mt-field label="标题" placeholder="" :attr="{ minlength: 4,maxlength: 30 }"></mt-field>
            <div class="upload-pic input-box">
                <div class="img-btn">
                    <input ref="inputfile" @change="fileChange" type="file" id="upfile" name="upfile" accept="image/*" />
                    <span>+</span>
                </div>
                <h5>封面</h5>
                <p>(用美美的图片做封面会受到更多人喜欢哦~)</p>
                <div class="sample id-no-uploaded">
                    <div>
                        <img src="" alt="图片">
                    </div>
                    <span class="sample-tips">请选择4M以下图片上传！</span></div>
            </div>
            <div class="editor-text input-box">
                <h5>正文
                    <!--<span>(文字和图片都可以)</span>--></h5>
                <textarea name="" id="editor-textarea" cols="30" rows="10" minlength="4" maxlength="1000"></textarea>
            </div>
        </div>

        <div class="operate_loading_pc">图片上传中......</div>
        <div class="operate_loading_pc_share__layer"></div>
    </div>
</template>
<script>
    import $ from 'webpack-zepto';
    import { MessageBox } from 'mint-ui';
    import WxShare from '../libs/wx_share.js';

    export default {
        name: 'page-navbar',
        data() {
        return {

        }
    },
    created() {
        var shareData = {
            "title": '鸣鹿健康',// 分享标题
            "desc": '鸣鹿健康，瘦身伙伴',// 分享描述
            "link": window.location.origin+'/share/listt#/edit', // 分享链接
            "img_url": 'https://a1.nicaifu.com/dora/201701/ed587c92d6f09f4_ojv93q.jpg',
        }


        var wxShare = new WxShare();
        wxShare.start(shareData);
    },
    methods: {
        goback: function () {
            this.$router.push('/#/')
        },
        uploadFile(data, callback) {
            $.ajax({
                url: '/Share/fileimg',
                type: 'POST',
                data: data,
                cache: false,
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
        //上传图片
        uploadIdCard(ev) {
            var self = this;

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

            $('.operate_loading_pc').show();
            $('.operate_loading_pc_share__layer').show();

            var imgReg = new RegExp('png|gif|jpg|JPEG');
            if (img.size / 1024 > 4000) {
                MessageBox('注意', '图片过大，请选择4M以下图片重新上传！');
                $('.operate_loading_pc').hide();
                $('.operate_loading_pc_share__layer').hide();
                return;
            }

            data.append("upfile", img);
            //data.append("cat", "idcard");//增加图片压缩

            this.uploadFile(data, function (error, result) {
                if (!error) {
                    self.id_card_img = result.massages;//获取图片地址
                    $('.sample').removeClass('id-no-uploaded');
                    $('.sample').find('img').attr('src', self.id_card_img).show();
                    $('.sample').find('div').show();
                    MessageBox('', '图片上传成功!');
                    $('.operate_loading_pc').hide();
                    $('.operate_loading_pc_share__layer').hide();
                } else {
                    MessageBox('注意', '图片上传失败!');
                    $('.operate_loading_pc').hide();
                    $('.operate_loading_pc_share__layer').hide();
                }
                return;
            })
        },
        releaseShare() {
            let title = $.trim($('.mint-field-core').val());
            let titlepic = $('.sample').find('img').attr('src');
            let content = $.trim($('#editor-textarea').val());

            if (title == "") {
                MessageBox('注意', '请填写分享标题!');
                return;
            }
            if(title.length < 4 || title.length > 30){
                MessageBox('注意', '标题长度应大于4个并小于30个字符');
                return;
            }
            if ($('.sample img').css('display') == "" || $('.sample img').css('display') == "none") {
                MessageBox('注意', '请上传封面图片!');
                return;
            }
            if (content == "") {
                MessageBox('注意', '请填写分享内容!');
                return;
            }
            if(content.length < 4 || content.length > 1000){
                MessageBox('注意', '标题长度应大于4个并小于1000个字符');
                return;
            }
            let reqBody = {
                title: title,
                titlepic: titlepic,
                content: content,
            };

            this.$http.post(
                '/Share/shareadd',
                reqBody
            ).then(res => {
                /* 发布成功 */
                $('.mint-field-core').val('');
                $('.sample').find('img').attr('src', '').hide();
                $('#editor-textarea').val('');
            location.href = '/share/listt?from=myshare'
        }, res => {
            MessageBox('注意', '发布失败');
        });
    },
    imgBtnUpLoad(e) {
        if (!$(e.target).hasClass('prohibit')) {
            this.$refs.inputfile.click();
            document.querySelector('input').click()
            return false;
        }
    },
    fileChange() {
        this.uploadImage('upfile');
        $('#upfile').val('');
        return false;
    }
    },
    mounted() {
    }
    };

</script>
<style lang="scss">
    .input-box {
        margin-top: 10px;
        background: #fff;
        border: 1px solid #cccccc;
    }
    .share-hd {
        background: #fff;
        border-bottom: 1px solid #cccccc;
        text-align: center;
    span {
        font-size: 15px;
        color: #333;
    }
    em {
        position: absolute;
        right: 0px;
        top: 4px;
        font-style: normal;
        font-size: 14px;
        color: #333;
        display: block;
        padding: 10px 29px;
        height: 35px;
    }
    }

    .share-editor-cen {
        padding: 10px 18px 0;
    .mint-cell-wrapper {
        border: 1px solid #ccc;
    }
    .mint-field .mint-cell-title {
        width: 50px;
    }
    .mint-cell-text {
        font-size: 18px;
        color: #999;
    }
    .upload-pic {
        padding: 19px 8px 24px;
        overflow: hidden;
    h5 {
        font-size: 18px;
        color: #999;
    }
    p {
        font-size: 12px;
        color: #999;
    }
    .img-btn {
        float: right;
    #upfile {
        width: 80px;
        height: 80px;
        opacity: 0;
        z-index: 1;
        float: left;
    }
    span {
        display: block;
        width: 80px;
        height: 80px;
        font-size: 0px;
        background: url(../assets/images/upload-btn.png) no-repeat;
        background-size: 100% auto;
    }
    }
    }
    .editor-text {
        padding: 19px 8px 24px;
        min-height: 200px;
    h5 {
        font-size: 18px;
        color: #999;
    span {
        font-size: 12px;
    }
    }
    textarea {
        width: 100%;
        height: 160px;
        padding: 5px;
        color: #333;
        border: 1px solid #ccc;
        overflow-y: auto;
    }
    }
    .sample {
        clear: both;
        padding-top: 5px;
        div{
            display: none;
            width: 100%;
            height:160px;
            overflow:hidden;
            img {
                display:none;
                width: 100%;
                height: auto;
            }
        }
    }
    .sample-tips {
        display: block;
        font-size: 12px;
    }
    }

    .operate_loading_pc {
        display: none;
        position: fixed;
        z-index: 3099;
        margin: 0 auto;
        left: 50%;
        -moz-transform: translate(-50%, 0);
        -webkit-transform: translate(-50%, 0);
        -o-transform: translate(-50%, 0);
        overflow: hidden;
        top: 45%;
        height: 26px;
        line-height: 26px;
        font-size: 18px;
        color: #3882fa;
        /*background: white;*/
        text-align: center;
        padding: 5px 10px;
        width: 100px\9;
        margin-left: -60px\9;
    }

    .operate_loading_pc_share__layer {
        display: none;
        position: fixed;
        z-index: 3000;
        opacity: 0.5;
        filter: alpha(opacity=20);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        background-color: gainsboro;
    }
</style>
