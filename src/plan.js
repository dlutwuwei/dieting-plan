import Vue from 'vue';
import $ from 'webpack-zepto';
import VueRouter from 'vue-router';
import routes from './routes/plan-routers';
import store from './vuex/user';
import FastClick from 'fastclick';
import VueResource from 'vue-resource';
import 'mint-ui/lib/style.css';
import './assets/scss/common/reset.scss';
import { Popup, Header, Button } from 'mint-ui';
require('./libs/wx_share.js');


Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Popup.name, Popup);

Vue.use(VueResource);
Vue.use(VueRouter);

$.ajaxSettings.crossDomain = true;

// 实例化VueRouter
const router = new VueRouter({
    mode: 'hash',
    routes
});
FastClick.attach(document.body);

new Vue({
    router,
    store
}).$mount('#app');
