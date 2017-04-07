import Vue from 'vue';
import $ from 'webpack-zepto';
import VueRouter from 'vue-router';
import routes from './routes/buy-routers';
import store from './vuex/user';
import FastClick from 'fastclick';
import VueResource from 'vue-resource';
import 'mint-ui/lib/style.css';
import './assets/scss/common/reset.scss';
import { Header, Button } from 'mint-ui';

var WxShare = require('./libs/wx_share.js');

/*分享*/
var wxShare = new WxShare();
wxShare.start();

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
