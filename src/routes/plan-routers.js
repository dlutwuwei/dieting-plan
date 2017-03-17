const planList = require('../views/plan-list.vue');
const planAdd = require('../views/plan-search.vue');
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
    path: '/plan/add/:type',
    component: planAdd
},
{
    path: '/plan/diet/:type',
    component: planDiet
},
{
    path: '/plan/detail/:type',
    component: planDetail
}];

export default routers;