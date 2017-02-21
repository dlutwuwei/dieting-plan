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

FastClick.attach(document.body);

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.user) {
    store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user));
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
    // 处理左侧滚动不影响右边

    // $('html, body, #page').removeClass('scroll-hide');
    // if (to.matched.some(record => record.meta.requiresAuth)) {
    //     if (store.state.userInfo.userId) {
    //         next();
    //     } else {
    //         next({
    //             path: '/login',
    //             query: { redirect: to.fullPath }
    //         });
    //     }
    // } else {
    //     next();
    // }
});


new Vue({
    router,
    store
}).$mount('#app');
