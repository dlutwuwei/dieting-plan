import Vue from 'vue';
import $ from 'webpack-zepto';
import VueRouter from 'vue-router';
import routes from './routes/detail-routers';
import Alert from './libs/alert';
import store from './vuex/user';
import FastClick from 'fastclick';
import MintUI from 'mint-ui';
import VueResource from 'vue-resource';
import 'mint-ui/lib/style.css';
import './assets/scss/common/reset.scss';

Vue.use(Alert);
Vue.use(MintUI);
Vue.use(VueResource);
Vue.use(VueRouter);

$.ajaxSettings.crossDomain = true;

// 实例化VueRouter
const router = new VueRouter({
    mode: 'history',
    routes
});
router.replace('/detail/input');

FastClick.attach(document.body);

new Vue({
    router,
    store
}).$mount('#app');
