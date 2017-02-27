const main = require('../views/main.vue');
const plan = require('../views/plan.vue');
const weight = require('../components/index/inputWeight.vue'); // 录入体重日历

const routers = [{
    path: '/',
    component: main
},
{
    path: '/plan',
    component: plan
},
{
    path: '/weight',
    component: weight
}];

export default routers;