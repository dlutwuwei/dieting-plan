const buy = require('../views/buy.vue');
const start = require('../views/start.vue');
const routers = [{
    path: '/',
    component: buy
},
{
    path: '/buy',
    component: start
},
{
    path: '/start',
    component: buy
}];

export default routers;