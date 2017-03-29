<template>
    <div class="share-wapper">
        <div class="share-hd">
            <router-link to="/" slot="left">
                <div class="go-back ico" @click="goback"></div>
            </router-link>
            <span>写分享</span>
            <em @click="releaseShare">发布</em>
        </div>

        <div class="share-editor-cen">
            <mt-field label="标题" placeholder=""></mt-field>
            <div class="upload-pic input-box">
                <div class="img-btn">
                    <a href="javascript:;">+</a>
                    <input type="file" id="upfile" name="upfile" style="display:none">
                    <!--<input type="hidden" name="cat" value="idcard" />-->
                </div>
                <h5>封面</h5>
                <p>(用美美的图片做封面会受到更多人喜欢哦~)</p>
                <div class="sample id-no-uploaded"><img src="" alt="图片"><span class="sample-tips">请选择5M以下图片上传！</span></div>
            </div>
            <div class="editor-text input-box">
                <h5>正文 <span>(文字和图片都可以)</span></h5>
                <textarea name="" id="editor-textarea" cols="30" rows="10"></textarea>
            </div>
        </div>
    </div>
</template>
<script>

    import $ from 'webpack-zepto';
    import { MessageBox } from 'mint-ui';

    export default {
        name: 'page-navbar',
        data() {
            return {

            }
        },
        components: {

        },
        methods: {
            goback: function () {
                history.back();
            },
            getParameter(){
                var _this = this;
                NCF.fetch({
                    url:'/mv2/ucenter/upload_img',
                    data:{
                        reqtoken: token
                    },
                    type : "post"
                }).done((data)=>{
                    if(data.errno == 0){
                    _this.accessid = data.data.accessid;
                    _this.host = data.data.host;
                    _this.policy = data.data.policy;
                    _this.signature = data.data.signature;
                    _this.expire = data.data.expire;
                    _this.callback = data.data.callback;
                    _this.dir = data.data.dir;
                        }
                    else{

                        }
                        _this.callPlugin();
                    });
                },
            callPlugin(){
                var that = this;

                $(".file").each(function () {
                    var _this = $(this);

                    var browse_button_id = _this.attr("id");
                    //console.log("插件外browse_button_id：" + browse_button_id);
                    var desc = _this.siblings('p.sibFile');
                    var cueTxt = _this.siblings('p.sibFile').children("span.cue_txt");
                    var cueProccess = _this.siblings('p.sibFile').children("span.cue_proccess");
                    var cueResult = _this.siblings('p.sibFile').children("span.cue_result");

                    var uploader = new plupload.Uploader({
                        runtimes: 'html5,flash,silverlight,html4',//上传插件初始化选用那种方式的优先级顺序，如果第一个初始化失败就走第二个，依次类推
                        browse_button: browse_button_id,
                        container: this.containerName,
                        flash_swf_url: '/themes/js/new/user/Moxie.swf',//flash文件所在目录,swf文件，当需要使用swf方式进行上传时需要配置该参数
                        silverlight_xap_url: '/themes/js/new/user/Moxie.xap',//silverlight文件所在路径,silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
                        url: that.host,//用户要往哪个域名发往上传请求,服务端上传路径
                        filters: {
                            mime_types: [ //只允许上传图片和zip文件
                                {title: "Image files", extensions: "jpg,gif,png,bmp"},
                                {title: "Zip files", extensions: "zip"}
                            ],
                            max_file_size: '400kb', //最大只能上传400kb的文件
                            prevent_duplicates: true //不允许选取重复文件
                        },
                        init: {
                            PostInit: function () {//init执行完以后要执行的事件触发
                                //console.log("插件内browse_button_id:" + browse_button_id)
                            },
                            FilesAdded: function (up, files) {//用户选择文件时触发
                                var _this = this;
                                desc.removeClass("hide");
                                plupload.each(files, function (file) {
                                    var that = this;
                                    //_this.randomName = _this.getRandomName(file.name);
                                    _this.randomName = (function (filename) {
                                        var pos = filename.lastIndexOf('.');
                                        var suffix = '';
                                        if (pos != -1) {
                                            suffix = filename.substring(pos);//获得文件后缀
                                        }
                                        //设置随机文件名
                                        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                                        var maxPos = chars.length;
                                        var pwd = '';
                                        for (var i = 0; i < 32; i++) {
                                            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
                                        }
                                        return pwd + suffix;
                                    }(file.name));
                                    //$(".cue_txt").html("文件名：" + _this.randomName);//提示信息
                                    cueTxt.html("文件名:" + file.name);//提示信息
                                });
                                that.collectImgName(_this.randomName);
                                up.start();//开始上传
                            },
                            BeforeUpload: function (up, file) {//文件上传完之前触发的事件
                                var _this = this;
                                up.setOption({
                                    'multipart_params': {
                                        'key': that.dir + _this.randomName,//上传文件的名称
                                        'policy': that.policy,
                                        'OSSAccessKeyId': that.accessid,
                                        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                                        'signature': that.signature,
                                        'expire': that.expire,
                                        'callback': that.callback
                                    }
                                });
                            },
                            UploadProgress: function (up, file) {//当文件正在被上传中触发
                                //$(".cue_proccess").html("上传进度:" + file.percent + '%');
                                cueProccess.html("上传进度:" + file.percent + '%');
                            },
                            FileUploaded: function (up, file, response) {//文件上传成功的时候触发
                                var res = $.parseJSON(response.response);
                                cueResult.html('上传结果:' + res.Status);

                                that.btnStatus();//判断提交按钮状态
                            },
                            Error: function (up, err) {
                                $(".cue_error").innerHTML += "\nError #" + err.code + ": " + err.message;
                            }
                        }
                    });
                    uploader.init();
                });
            }
        },
        mounted() {
            this.uploadIdCard();
        }
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
            textarea{
                width: 100%;
                height: 160px;
                padding:5px;
                color:#333;
                border: 1px solid #ccc;
                overflow-y: auto;
            }
        }
        .sample{
            clear:both;
            padding-top:5px;
            img{
                display:none;
                width:100%;
                height:160px;
            }
        }
        .sample-tips{
            display:block;
            font-size:12px;
        }
    }

</style>
