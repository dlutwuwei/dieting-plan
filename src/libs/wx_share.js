import wx from './jweixin';
import $ from 'webpack-zepto';

module.exports = WxShare;

function WxShare() {
    /*this.shareData = {
        "title": '鸣鹿健康',// 分享标题
        "desc": '鸣鹿健康，减肥伙伴',// 分享描述
        //"link": location.href.split('#')[0] +'#'+ location.href.split('#')[1],
        "link": location.href, // 分享链接
        //"link": location.href.replace('#', '&'), // 分享链接
        "img_url": 'https://a1.nicaifu.com/dora/201701/ed587c92d6f09f4_ojv93q.jpg',
    };*/
    this.successFun = null;
    this.cancellFun = null;
}

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
WxShare.prototype.start = function () {
    var self = this;

    $.ajax({
        type: 'post',
        contentType:"application/json; charset=utf-8",
        url: '/Jsdk/jsdk',
        dataType: 'json',
        data: JSON.stringify({
            url: location.href.split('#')[0]
 	}),
        success: function (result) {
            var res = result;
            if(res.success){
                self.init(res.massages);
            }
        }
    });
};
