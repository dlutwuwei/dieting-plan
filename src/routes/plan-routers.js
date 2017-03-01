const planList = require('../views/plan-list.vue');
const planAdd = require('../views/plan-add.vue');
const planDetail = require('../views/plan-detail.vue');
const planDiet = require('../views/plan-diet.vue');

const routers = [{
    path: '/',
    component: planList
},
{
    path: '/plan/list',
    component: planList
},
{
    path: '/plan/add',
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