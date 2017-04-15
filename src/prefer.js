import Vue from 'vue';
import $ from 'webpack-zepto';
import VueRouter from 'vue-router';
import routes from './routes/prefer-routers';
import store from './vuex/user';
import FastClick from 'fastclick';
import VueResource from 'vue-resource';
import 'mint-ui/lib/style.css';
import './assets/scss/common/reset.scss';

import { Header, Button } from 'mint-ui';
import WxShare from './libs/wx_share.js';

var shareData = {
    "title": '鸣鹿健康',// 分享标题
    "desc": '鸣鹿健康，瘦身伙伴',// 分享描述
    "link": location.href, // 分享链接
    "img_url": 'https://a1.nicaifu.com/dora/201701/ed587c92d6f09f4_ojv93q.jpg',
}


var wxShare = new WxShare();
wxShare.start(shareData);


Vue.component(Button.name, Button);
Vue.component(Header.name, Header);

Vue.use(VueResource);
Vue.use(VueRouter);

$.ajaxSettings.crossDomain = true;

// 实例化VueRouter
const router = new VueRouter({
    mode: 'history',
    routes
});

FastClick.attach(document.body);

new Vue({
    router,
    store
}).$mount('#app');
