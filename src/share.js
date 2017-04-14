import Vue from 'vue';
import $ from 'webpack-zepto';
import VueRouter from 'vue-router';
import routes from './routes/share-routers';
import FastClick from 'fastclick';
import VueResource from 'vue-resource';
import 'mint-ui/lib/style.css';
import './assets/scss/common/reset.scss';


import { TabContainer, TabContainerItem, Field, Navbar, TabItem, Header, Button } from 'mint-ui';

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabItem.name, TabItem);
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Field.name, Field);

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
}).$mount('#app');
