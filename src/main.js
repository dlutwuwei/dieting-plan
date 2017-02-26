import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from './views/main.vue';

Vue.use(MintUI);

new Vue({
    el: '#app',
    render: h => h(App)
});
