
require("./jweixin");
import $ from 'webpack-zepto';

module.exports = WxShare;

function WxShare() {
    this.shareData = {};
    this.successFun = null;
    this.cancellFun = null;
}

/*获取配置文件*/
WxShare.prototype.getConfig = function (callback) {
    var self = this;

    $.ajax({
        type: 'post',
        url: '/share/js_config',
        data: {url: window.location.href},
        timeout: 10000,
        success: function (result) {
            callback(null, result.data);
        },
        error: function (error) {
            if (error) {
                return callback(error, result.errmsg || '');
            }
        }
    });
};

WxShare.prototype.init = function (config) {
    var self = this;
    self.config = {
        "appId": config.appId,
        "nonceStr": config.nonceStr,
        "timestamp": config.timestamp,
        "url": config.url,
        "signature": config.signature,
        "jsApiList": [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareQZone'
        ]
    };
    wx.config(self.config);
    self.wxReady();
    self.wxError();
};

WxShare.prototype.wxReady = function () {
    var self = this;
    wx.ready(function () {
        self.shareTimeline();
        self.shareAppMessage();
        self.shareQQ();
        self.shareQZone();
    });
};

/*分享到朋友圈*/
WxShare.prototype.shareTimeline = function (success, canncel) {
    var self = this;
    wx.onMenuShareTimeline({
        title: self.shareData.title, // 分享标题
        link: self.shareData.link, // 分享链接
        imgUrl: self.shareData.img_url, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            self.successFun && self.successFun();
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            self.cancellFun && self.cancellFun();
        }
    });
};
/*分享给朋友*/
WxShare.prototype.shareAppMessage = function () {
    var self = this;
    wx.onMenuShareAppMessage({
        title: self.shareData.title, // 分享标题
        desc: self.shareData.desc, // 分享描述
        link: self.shareData.link, // 分享链接
        imgUrl: self.shareData.img_url, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            self.successFun && self.successFun();
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            self.cancellFun && self.cancellFun();
        }
    });
};
/*分享到qq*/
WxShare.prototype.shareQQ = function () {
    var self = this;
    wx.onMenuShareQQ({
        title: self.shareData.title, // 分享标题
        desc: self.shareData.desc, // 分享描述
        link: self.shareData.link, // 分享链接
        imgUrl: self.shareData.img_url, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            self.successFun && self.successFun();
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            self.cancellFun && self.cancellFun();
        }
    });
};
/*分享到qq空间*/
WxShare.prototype.shareQZone = function () {
    var self = this;
    wx.onMenuShareQZone({
        title: self.shareData.title, // 分享标题
        desc: self.shareData.desc, // 分享描述
        link: self.shareData.link, // 分享链接
        imgUrl: self.shareData.img_url, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            self.successFun && self.successFun();
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            self.cancellFun && self.cancellFun();
        }
    });
};

WxShare.prototype.wxError = function () {
    wx.error(function (res) {
        //alert('分享初始化失败：' + res.errMsg);
    });
};


/*入口方法*/
WxShare.prototype.start = function (data) {
    var self = this;
    self.shareData = data;

    //window.__wxshare_data__ = self.shareData || {
    //        "title": '',// 分享标题
    //        "desc": '',// 分享描述
    //        "link": '', // 分享链接
    //        "img_url": '', // 分享图标
    //        "link_weibo": '' //分享weibo链接
    //    };
    self.getConfig(function (error, reply) {
        if (error) {
            return;
        }
        self.init(reply);
    });
};
