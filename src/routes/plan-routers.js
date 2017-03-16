const planList = require('../views/plan-list.vue');
const planAdd = require('../views/plan-add.vue');
const planDetail = require('../views/plan-detail.vue');
const planDiet = require('../views/plan-diet.vue');

const routers = [{
    path: '/plan',
    component: planList
},
{
    path: '/plan/listt',
    component: planList
},
{
    path: '/plan/add/:type/:date',
    component: planAdd
},
{
    path: '/plan/diet/:type/:date',
    component: planDiet
},
{
    path: '/plan/detail/:type/:date',
    component: planDetail
}];

export default routers;