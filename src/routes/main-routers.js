const main = require('../views/main.vue');
const plan = require('../views/plan.vue');
const record = require('../views/record.vue');
const weight = require('../views/input-weight.vue'); // 录入体重日历
const sliderInfo = require('../components/index/sliderInfo.vue');
const heatPlate = require('../views/heatPlate-calendar.vue');

const routers = [{
    path: '/',
    component: main
},
{
    path: '/index/myplan',
    component: plan
},
{
    path: '/index/weight',
    component: weight
},
{
    path: '/index/record',
    component: record
},
{
    path: '/index/sliderInfo',
    component: sliderInfo
},
{
    path: '/index/heatPlate',
    component: heatPlate
}];

export default routers;
