const main = require('../views/main.vue');
const plan = require('../views/plan.vue');
const record = require('../views/record.vue');

const weight = require('../views/inputWeight.vue'); // 录入体重日历

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
},
{
    path: '/record',
    component: record
}];

export default routers;